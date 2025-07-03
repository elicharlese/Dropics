import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store contact message in database
    const { data: contactMessage, error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'Contact Form Submission',
        message: message.trim(),
        status: 'unread',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error storing contact message:', dbError)
      return NextResponse.json(
        { error: 'Failed to store message' },
        { status: 500 }
      )
    }

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@dropics.com',
        to: ['support@dropics.com'], // Replace with your support email
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending notification email:', emailError)
      // Don't fail the request if email fails
    }

    // Send auto-reply to user
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@dropics.com',
        to: [email],
        subject: 'Thank you for contacting Dropics',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24-48 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Best regards,<br>The Dropics Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending auto-reply email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Message sent successfully',
      id: contactMessage.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error in contact POST:', error)
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
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')

    let query = supabaseAdmin
      .from('contact_messages')
      .select('*', { count: 'exact' })

    if (status && ['unread', 'read', 'replied'].includes(status)) {
      query = query.eq('status', status)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: messages, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching contact messages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    const totalPages = Math.ceil((count || 0) / limit)

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error('Error in contact GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
