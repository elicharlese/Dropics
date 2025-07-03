import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    // Check if email already exists
    const { data: existingSubscriber, error: existingError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, subscribed')
      .eq('email', cleanEmail)
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabaseAdmin
          .from('newsletter_subscribers')
          .update({ 
            subscribed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSubscriber.id)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          message: 'Successfully subscribed to newsletter',
        })
      }
    }

    // Create new subscription
    const { data: subscriber, error: createError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: cleanEmail,
        subscribed: true,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating subscription:', createError)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@dropics.com',
        to: [cleanEmail],
        subject: 'Welcome to Dropics Newsletter!',
        html: `
          <h2>Welcome to Dropics!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll be the first to know about:</p>
          <ul>
            <li>New product launches</li>
            <li>Exclusive offers and discounts</li>
            <li>Creative tips and inspiration</li>
            <li>Industry news and trends</li>
          </ul>
          <p>Stay creative!</p>
          <p>The Dropics Team</p>
          <hr>
          <p><small>You can unsubscribe at any time by clicking the unsubscribe link in our emails.</small></p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      id: subscriber.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error in newsletter POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token') // For unsubscribe links

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // In production, you'd verify the unsubscribe token here
    // For now, we'll just unsubscribe the email

    const { error: unsubscribeError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ 
        subscribed: false,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email.trim().toLowerCase())

    if (unsubscribeError) {
      console.error('Error unsubscribing:', unsubscribeError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Successfully unsubscribed from newsletter',
    })
  } catch (error) {
    console.error('Error in newsletter DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin authentication required
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const subscribed = searchParams.get('subscribed')

    let query = supabaseAdmin
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' })

    if (subscribed !== null) {
      query = query.eq('subscribed', subscribed === 'true')
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: subscribers, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching subscribers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    const totalPages = Math.ceil((count || 0) / limit)

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error('Error in newsletter GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
