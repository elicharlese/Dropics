import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

// Exchange rates (in production, fetch from an API like CoinGecko)
const EXCHANGE_RATES = {
  BTC: 0.000016,    // 1 USD = 0.000016 BTC
  ETH: 0.00025,     // 1 USD = 0.00025 ETH
  USDT: 1,          // 1 USD = 1 USDT
  USDC: 1,          // 1 USD = 1 USDC
  SOL: 0.01,        // 1 USD = 0.01 SOL
}

// Merchant wallet addresses (replace with your actual addresses)
const MERCHANT_ADDRESSES = {
  BTC: process.env.BTC_MERCHANT_ADDRESS || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: process.env.ETH_MERCHANT_ADDRESS || '0x0000000000000000000000000000000000000000',
  USDT: process.env.USDT_MERCHANT_ADDRESS || '0x0000000000000000000000000000000000000000',
  USDC: process.env.USDC_MERCHANT_ADDRESS || '0x0000000000000000000000000000000000000000',
  SOL: process.env.SOLANA_MERCHANT_WALLET || 'So11111111111111111111111111111111111111112',
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const body = await request.json()
    const { order_id, currency } = body

    if (!order_id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    if (!currency || !EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES]) {
      return NextResponse.json(
        { error: 'Valid cryptocurrency currency is required' },
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

    // Calculate crypto amount
    const exchangeRate = EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES]
    const cryptoAmount = order.total_amount * exchangeRate
    const address = MERCHANT_ADDRESSES[currency as keyof typeof MERCHANT_ADDRESSES]

    // Create crypto payment record
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30) // 30 minutes to pay

    const { data: cryptoPayment, error: paymentError } = await supabaseAdmin
      .from('crypto_payments')
      .insert({
        order_id,
        currency,
        amount: cryptoAmount,
        address,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error creating crypto payment:', paymentError)
      return NextResponse.json(
        { error: 'Failed to create crypto payment' },
        { status: 500 }
      )
    }

    // Generate QR code data (for mobile wallets)
    let qrCodeData = ''
    switch (currency) {
      case 'BTC':
        qrCodeData = `bitcoin:${address}?amount=${cryptoAmount}`
        break
      case 'ETH':
      case 'USDT':
      case 'USDC':
        qrCodeData = `ethereum:${address}?value=${cryptoAmount * 1e18}` // Convert to wei
        break
      case 'SOL':
        qrCodeData = `solana:${address}?amount=${cryptoAmount}&spl-token=native`
        break
    }

    return NextResponse.json({
      payment_id: cryptoPayment.id,
      currency,
      amount: cryptoAmount,
      address,
      qr_code_data: qrCodeData,
      expires_at: expiresAt.toISOString(),
    })
  } catch (error) {
    console.error('Error creating crypto payment:', error)
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
    const { payment_id, transaction_hash } = body

    if (!payment_id || !transaction_hash) {
      return NextResponse.json(
        { error: 'Payment ID and transaction hash are required' },
        { status: 400 }
      )
    }

    // Get crypto payment record
    const { data: cryptoPayment, error: paymentError } = await supabaseAdmin
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
      .single()

    if (paymentError || !cryptoPayment) {
      return NextResponse.json(
        { error: 'Crypto payment not found' },
        { status: 404 }
      )
    }

    if (cryptoPayment.order?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    if (cryptoPayment.status !== 'pending') {
      return NextResponse.json(
        { error: 'Payment already processed' },
        { status: 400 }
      )
    }

    // Check if payment has expired
    if (new Date() > new Date(cryptoPayment.expires_at)) {
      await supabaseAdmin
        .from('crypto_payments')
        .update({ status: 'expired' })
        .eq('id', payment_id)

      return NextResponse.json(
        { error: 'Payment has expired' },
        { status: 400 }
      )
    }

    // TODO: Verify transaction on blockchain
    // For now, we'll mark as confirmed (in production, implement proper verification)
    
    // Update crypto payment with transaction hash
    const { error: updatePaymentError } = await supabaseAdmin
      .from('crypto_payments')
      .update({
        transaction_hash,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', payment_id)

    if (updatePaymentError) {
      console.error('Error updating crypto payment:', updatePaymentError)
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
      .eq('id', cryptoPayment.order_id)
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
      order: updatedOrder,
    })
  } catch (error) {
    console.error('Error updating crypto payment:', error)
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
    const payment_id = searchParams.get('payment_id')

    if (!payment_id) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    // Get crypto payment status
    const { data: cryptoPayment, error: paymentError } = await supabaseAdmin
      .from('crypto_payments')
      .select(`
        *,
        order:orders(
          id,
          user_id,
          status,
          payment_status
        )
      `)
      .eq('id', payment_id)
      .single()

    if (paymentError || !cryptoPayment) {
      return NextResponse.json(
        { error: 'Crypto payment not found' },
        { status: 404 }
      )
    }

    if (cryptoPayment.order?.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Check if payment has expired
    if (cryptoPayment.status === 'pending' && new Date() > new Date(cryptoPayment.expires_at)) {
      await supabaseAdmin
        .from('crypto_payments')
        .update({ status: 'expired' })
        .eq('id', payment_id)
      
      cryptoPayment.status = 'expired'
    }

    return NextResponse.json({
      payment_id: cryptoPayment.id,
      status: cryptoPayment.status,
      currency: cryptoPayment.currency,
      amount: cryptoPayment.amount,
      address: cryptoPayment.address,
      transaction_hash: cryptoPayment.transaction_hash,
      expires_at: cryptoPayment.expires_at,
      confirmed_at: cryptoPayment.confirmed_at,
    })
  } catch (error) {
    console.error('Error fetching crypto payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
