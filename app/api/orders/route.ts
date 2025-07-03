import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Helper function to get user from request
async function getUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    throw new Error('No authorization token')
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    throw new Error('Invalid token')
  }

  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request)

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(
            id,
            name,
            images,
            category
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: orders
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}

const addressSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  company: z.string().optional(),
  address_line_1: z.string().min(1),
  address_line_2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postal_code: z.string().min(1),
  country: z.string().default('US')
})

const createOrderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int().positive()
  })).min(1),
  shipping_address: addressSchema,
  billing_address: addressSchema.optional(),
  payment_method: z.enum(['stripe', 'crypto']),
  notes: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    const body = await request.json()
    const { items, shipping_address, billing_address, payment_method, notes } = createOrderSchema.parse(body)

    // Validate products and calculate total
    let totalAmount = 0
    const validatedItems = []

    for (const item of items) {
      const { data: product, error } = await supabase
        .from('products')
        .select('id, price, stock_quantity, active')
        .eq('id', item.product_id)
        .eq('active', true)
        .single()

      if (error || !product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 400 }
        )
      }

      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${item.product_id}` },
          { status: 400 }
        )
      }

      totalAmount += product.price * item.quantity
      validatedItems.push({
        ...item,
        price: product.price
      })
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        total_amount: totalAmount,
        payment_method,
        shipping_address,
        billing_address: billing_address || shipping_address,
        notes
      }])
      .select()
      .single()

    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = validatedItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      // Rollback order if items creation fails
      await supabase
        .from('orders')
        .delete()
        .eq('id', order.id)

      return NextResponse.json(
        { error: itemsError.message },
        { status: 500 }
      )
    }

    // Update product stock
    for (const item of validatedItems) {
      await supabase
        .from('products')
        .update({
          stock_quantity: supabase.rpc('decrement_stock', {
            product_id: item.product_id,
            quantity: item.quantity
          })
        })
        .eq('id', item.product_id)
    }

    // Clear user's cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    return NextResponse.json({
      data: order,
      message: 'Order created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}
