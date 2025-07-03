import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        reviews:reviews(
          id,
          rating,
          title,
          comment,
          verified_purchase,
          created_at,
          user:profiles(id, full_name, avatar_url)
        )
      `)
      .eq('id', params.id)
      .eq('active', true)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: product })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.enum(['liquid', 'spray']).optional(),
  colors: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  stock_quantity: z.number().int().min(0).optional(),
  for_use: z.array(z.string()).optional()
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const updateData = updateProductSchema.parse(body)

    const { data: product, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', params.id)
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
      message: 'Product updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', params.id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Product deactivated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
