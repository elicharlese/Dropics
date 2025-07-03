import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    let query = supabaseAdmin
      .from('reviews')
      .select(`
        *,
        user:profiles(
          id,
          full_name,
          avatar_url
        )
      `, { count: 'exact' })
      .eq('product_id', product_id)

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: reviews, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching reviews:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    // Calculate average rating
    const { data: ratingData, error: ratingError } = await supabaseAdmin
      .from('reviews')
      .select('rating')
      .eq('product_id', product_id)

    let averageRating = 0
    if (!ratingError && ratingData && ratingData.length > 0) {
      const totalRating = ratingData.reduce((sum, review) => sum + review.rating, 0)
      averageRating = totalRating / ratingData.length
    }

    const totalPages = Math.ceil((count || 0) / limit)

    return NextResponse.json({
      reviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: count || 0,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error('Error in reviews GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const body = await request.json()
    const { product_id, rating, title, comment } = body

    // Validate required fields
    if (!product_id || !rating) {
      return NextResponse.json(
        { error: 'Product ID and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if product exists
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('id, active')
      .eq('id', product_id)
      .eq('active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if user already reviewed this product
    const { data: existingReview, error: existingError } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('product_id', product_id)
      .eq('user_id', user.id)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      )
    }

    // Check if user has purchased this product (optional)
    const { data: orderItems, error: orderError } = await supabaseAdmin
      .from('order_items')
      .select(`
        id,
        order:orders!inner(
          user_id,
          status,
          payment_status
        )
      `)
      .eq('product_id', product_id)
      .eq('order.user_id', user.id)
      .eq('order.payment_status', 'paid')

    const verifiedPurchase = orderItems && orderItems.length > 0

    // Create review
    const { data: review, error: createError } = await supabaseAdmin
      .from('reviews')
      .insert({
        product_id,
        user_id: user.id,
        rating,
        title: title?.trim() || null,
        comment: comment?.trim() || null,
        verified_purchase: verifiedPurchase,
      })
      .select(`
        *,
        user:profiles(
          id,
          full_name,
          avatar_url
        )
      `)
      .single()

    if (createError) {
      console.error('Error creating review:', createError)
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      )
    }

    // Update product rating and review count
    const { data: allReviews, error: allReviewsError } = await supabaseAdmin
      .from('reviews')
      .select('rating')
      .eq('product_id', product_id)

    if (!allReviewsError && allReviews) {
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalRating / allReviews.length
      const reviewCount = allReviews.length

      await supabaseAdmin
        .from('products')
        .update({
          rating: Math.round(averageRating * 10) / 10,
          review_count: reviewCount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', product_id)
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('Error in reviews POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
