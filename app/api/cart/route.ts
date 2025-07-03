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

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          id,
          name,
          price,
          images,
          category,
          stock_quantity
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

    // Calculate totals
    const subtotal = cartItems.reduce((sum: number, item: any) => {
      return sum + (item.product?.price || 0) * item.quantity
    }, 0)

    return NextResponse.json({
      data: {
        items: cartItems,
        subtotal,
        itemCount: cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}

const addToCartSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive().default(1)
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    const body = await request.json()
    const { product_id, quantity } = addToCartSchema.parse(body)

    // Check if product exists and is active
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, stock_quantity, active')
      .eq('id', product_id)
      .eq('active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.stock_quantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const { data: existingItem, error: existingError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', product_id)
      .single()

    let result
    if (existingItem) {
      // Update existing item
      const newQuantity = existingItem.quantity + quantity
      if (product.stock_quantity < newQuantity) {
        return NextResponse.json(
          { error: 'Insufficient stock' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      result = { data, error }
    } else {
      // Create new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{
          user_id: user.id,
          product_id,
          quantity
        }])
        .select()
        .single()

      result = { data, error }
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      message: 'Item added to cart successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}
