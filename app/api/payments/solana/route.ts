import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

// This would integrate with the Rust Solana library
// For now, we'll simulate the functionality

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com'
const MERCHANT_WALLET = process.env.SOLANA_MERCHANT_WALLET!

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const body = await request.json()
    const { order_id, payer_wallet } = body

    if (!order_id || !payer_wallet) {
      return NextResponse.json(
        { error: 'Order ID and payer wallet are required' },
        { status: 400 }
      )
    }

    // Get order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
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

    // Convert USD to SOL (approximate rate)
    const SOL_EXCHANGE_RATE = 0.01 // 1 USD = 0.01 SOL (update with real rate)
    const solAmount = order.total_amount * SOL_EXCHANGE_RATE
    const lamports = Math.floor(solAmount * 1_000_000_000) // Convert SOL to lamports

    // In a real implementation, this would call the Rust library
    // For now, we'll create a payment request
    
    const paymentRequest = {
      amount_lamports: lamports,
      recipient: MERCHANT_WALLET,
      payer: payer_wallet,
      order_id: order.id,
    }

    // Create Solana payment record
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 15) // 15 minutes for Solana payments

    const { data: solanaPayment, error: paymentError } = await supabaseAdmin
      .from('crypto_payments')
      .insert({
        order_id,
        currency: 'SOL',
        amount: solAmount,
        address: MERCHANT_WALLET,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error creating Solana payment:', paymentError)
      return NextResponse.json(
        { error: 'Failed to create Solana payment' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      payment_id: solanaPayment.id,
      amount_sol: solAmount,
      amount_lamports: lamports,
      recipient_address: MERCHANT_WALLET,
      payer_address: payer_wallet,
      expires_at: expiresAt.toISOString(),
      // In real implementation, would return transaction data for signing
      transaction_data: null,
    })
  } catch (error) {
    console.error('Error creating Solana payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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
    const { payment_id, signature } = body

    if (!payment_id || !signature) {
      return NextResponse.json(
        { error: 'Payment ID and transaction signature are required' },
        { status: 400 }
      )
    }

    // Get Solana payment record
    const { data: solanaPayment, error: paymentError } = await supabaseAdmin
      .from('crypto_payments')
      .select(`
        *,
        order:orders(
          id,
          user_id,
          total_amount,
          status
        )
      `)
      .eq('id', payment_id)
      .eq('currency', 'SOL')
      .single()

    if (paymentError || !solanaPayment) {
      return NextResponse.json(
        { error: 'Solana payment not found' },
        { status: 404 }
      )
    }

    if (solanaPayment.order?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    if (solanaPayment.status !== 'pending') {
      return NextResponse.json(
        { error: 'Payment already processed' },
        { status: 400 }
      )
    }

    // Check if payment has expired
    if (new Date() > new Date(solanaPayment.expires_at)) {
      await supabaseAdmin
        .from('crypto_payments')
        .update({ status: 'expired' })
        .eq('id', payment_id)

      return NextResponse.json(
        { error: 'Payment has expired' },
        { status: 400 }
      )
    }

    // TODO: Verify transaction on Solana blockchain using Rust library
    // For now, we'll simulate verification
    try {
      // In real implementation:
      // const verificationResult = await verifySolanaTransaction(signature)
      
      // Simulate successful verification
      const verified = true

      if (!verified) {
        return NextResponse.json(
          { error: 'Transaction verification failed' },
          { status: 400 }
        )
      }

      // Update Solana payment with signature
      const { error: updatePaymentError } = await supabaseAdmin
        .from('crypto_payments')
        .update({
          transaction_hash: signature,
          status: 'confirmed',
          confirmed_at: new Date().toISOString(),
        })
        .eq('id', payment_id)

      if (updatePaymentError) {
        console.error('Error updating Solana payment:', updatePaymentError)
        return NextResponse.json(
          { error: 'Failed to update payment status' },
          { status: 500 }
        )
      }

      // Update order status
      const { data: updatedOrder, error: orderUpdateError } = await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'processing',
          updated_at: new Date().toISOString(),
        })
        .eq('id', solanaPayment.order_id)
        .select()
        .single()

      if (orderUpdateError) {
        console.error('Error updating order:', orderUpdateError)
        return NextResponse.json(
          { error: 'Failed to update order status' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        payment_status: 'confirmed',
        transaction_signature: signature,
        order: updatedOrder,
      })
    } catch (error) {
      console.error('Error verifying Solana transaction:', error)
      return NextResponse.json(
        { error: 'Transaction verification failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error confirming Solana payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const { searchParams } = new URL(request.url)
    const signature = searchParams.get('signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Transaction signature is required' },
        { status: 400 }
      )
    }

    // TODO: Check transaction status on Solana blockchain using Rust library
    // For now, we'll simulate the status check
    
    try {
      // In real implementation:
      // const status = await checkSolanaTransactionStatus(signature)
      
      // Simulate status response
      const transactionStatus = {
        signature,
        confirmed: true,
        finalized: true,
        error: null,
      }

      return NextResponse.json({
        signature: transactionStatus.signature,
        confirmed: transactionStatus.confirmed,
        finalized: transactionStatus.finalized,
        error: transactionStatus.error,
      })
    } catch (error) {
      console.error('Error checking Solana transaction status:', error)
      return NextResponse.json(
        { error: 'Failed to check transaction status' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in Solana transaction status check:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
