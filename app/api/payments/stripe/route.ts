import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const body = await request.json()
    const { order_id, return_url } = body

    if (!order_id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Get order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          id,
          quantity,
          price,
          product:products(
            id,
            name,
            images
          )
        )
      `)
      .eq('id', order_id)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.payment_status !== 'pending') {
      return NextResponse.json(
        { error: 'Order payment already processed' },
        { status: 400 }
      )
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total_amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
      description: `Order #${order.id.slice(-8)}`,
    })

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const body = await request.json()
    const { payment_intent_id, status } = body

    if (!payment_intent_id || !status) {
      return NextResponse.json(
        { error: 'Payment intent ID and status are required' },
        { status: 400 }
      )
    }

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if (paymentIntent.metadata.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const order_id = paymentIntent.metadata.order_id

    // Update order status based on payment status
    let payment_status = 'pending'
    let order_status = 'pending'

    if (paymentIntent.status === 'succeeded') {
      payment_status = 'paid'
      order_status = 'processing'
    } else if (paymentIntent.status === 'payment_failed') {
      payment_status = 'failed'
      order_status = 'cancelled'
    }

    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        payment_status,
        status: order_status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating order:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      order: updatedOrder,
      payment_status: paymentIntent.status,
    })
  } catch (error) {
    console.error('Error updating payment status:', error)
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    )
  }
}
