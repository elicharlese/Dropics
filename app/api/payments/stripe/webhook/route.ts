import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const order_id = paymentIntent.metadata.order_id

  if (!order_id) {
    console.error('No order_id in payment intent metadata')
    return
  }

  try {
    // Update order status
    const { error } = await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'processing',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id)

    if (error) {
      console.error('Error updating order after payment success:', error)
    } else {
      console.log(`Order ${order_id} marked as paid`)
      
      // TODO: Send confirmation email to customer
      // TODO: Notify fulfillment team
    }
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const order_id = paymentIntent.metadata.order_id

  if (!order_id) {
    console.error('No order_id in payment intent metadata')
    return
  }

  try {
    // Update order status and restore stock
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          product_id,
          quantity
        )
      `)
      .eq('id', order_id)
      .single()

    if (orderError) {
      console.error('Error fetching order for failed payment:', orderError)
      return
    }

    // Update order status
    await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'failed',
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id)

    // Restore product stock
    for (const item of order.order_items) {
      await supabaseAdmin
        .from('products')
        .update({
          stock_quantity: supabaseAdmin.rpc('increment_stock', {
            current_stock: 0, // This will be overridden by the RPC function
            increment: item.quantity
          })
        })
        .eq('id', item.product_id)
    }

    console.log(`Order ${order_id} marked as failed and stock restored`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}
