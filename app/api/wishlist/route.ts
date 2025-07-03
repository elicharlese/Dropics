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

    const { data: wishlistItems, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(
          id,
          name,
          price,
          images,
          category,
          rating,
          review_count
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
      data: wishlistItems
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}

const addToWishlistSchema = z.object({
  product_id: z.string().uuid()
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    const body = await request.json()
    const { product_id } = addToWishlistSchema.parse(body)

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', product_id)
      .eq('active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if already in wishlist
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product_id)
      .single()

    if (existingItem) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 }
      )
    }

    const { data: wishlistItem, error } = await supabase
      .from('wishlist_items')
      .insert([{
        user_id: user.id,
        product_id
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: wishlistItem,
      message: 'Product added to wishlist successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}
