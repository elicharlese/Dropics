import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    let query = supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true)

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query
      .order('created_at', { ascending: false })
      .range(from, to)

    const { data: posts, error, count } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      )
    }

    const totalPages = Math.ceil((count || 0) / limit)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error('Error in blog GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin authentication required
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      category,
      author_id,
      published = false,
      featured = false,
    } = body

    // Validate required fields
    if (!title || !slug || !content || !author_id) {
      return NextResponse.json(
        { error: 'Title, slug, content, and author_id are required' },
        { status: 400 }
      )
    }

    // Check if slug is unique
    const { data: existingPost, error: slugError } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    // Create blog post
    const { data: post, error: createError } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt?.trim(),
        featured_image,
        category: category?.trim(),
        author_id,
        published,
        featured,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating blog post:', createError)
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      )
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error in blog POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
