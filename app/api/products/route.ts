import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
  category: z.string().optional(),
  featured: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['name', 'price', 'rating', 'created_at']).optional().default('created_at'),
  order: z.enum(['asc', 'desc']).optional().default('desc')
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const {
      page,
      limit,
      category,
      featured,
      search,
      sort,
      order
    } = querySchema.parse(Object.fromEntries(searchParams))

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const offset = (pageNum - 1) * limitNum

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('active', true)

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limitNum - 1)

    const { data: products, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const totalPages = Math.ceil((count || 0) / limitNum)

    return NextResponse.json({
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        pages: totalPages
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 }
    )
  }
}

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.enum(['liquid', 'spray']),
  colors: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  stock_quantity: z.number().int().min(0).default(0),
  for_use: z.array(z.string()).default([])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const productData = createProductSchema.parse(body)

    const { data: product, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: product,
      message: 'Product created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
