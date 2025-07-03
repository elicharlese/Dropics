import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        author:profiles(
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('slug', params.slug)
      .eq('published', true)
      .single()

    if (error || !post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
      published,
      featured,
    } = body

    // Prepare update object
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (title !== undefined) updateData.title = title.trim()
    if (slug !== undefined) updateData.slug = slug.trim()
    if (content !== undefined) updateData.content = content.trim()
    if (excerpt !== undefined) updateData.excerpt = excerpt?.trim()
    if (featured_image !== undefined) updateData.featured_image = featured_image
    if (category !== undefined) updateData.category = category?.trim()
    if (published !== undefined) updateData.published = published
    if (featured !== undefined) updateData.featured = featured

    // If slug is being changed, check uniqueness
    if (slug && slug !== params.slug) {
      const { data: existingPost } = await supabaseAdmin
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
    }

    // Update blog post
    const { data: post, error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('slug', params.slug)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating blog post:', updateError)
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      )
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error in blog PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Admin authentication required
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Soft delete by setting published to false
    const { data: post, error: deleteError } = await supabaseAdmin
      .from('blog_posts')
      .update({ 
        published: false, 
        updated_at: new Date().toISOString() 
      })
      .eq('slug', params.slug)
      .select()
      .single()

    if (deleteError) {
      console.error('Error deleting blog post:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      )
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error in blog DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
