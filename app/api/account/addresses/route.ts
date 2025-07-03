import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'
import { Address } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    const { data: addresses, error } = await supabaseAdmin
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching addresses:', error)
      return NextResponse.json(
        { error: 'Failed to fetch addresses' },
        { status: 500 }
      )
    }

    return NextResponse.json({ addresses })
  } catch (error) {
    console.error('Error in addresses GET:', error)
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
    const {
      first_name,
      last_name,
      company,
      address_line_1,
      address_line_2,
      city,
      state,
      postal_code,
      country = 'US',
      type = 'shipping',
      is_default = false,
    } = body

    // Validate required fields
    if (!first_name || !last_name || !address_line_1 || !city || !state || !postal_code) {
      return NextResponse.json(
        { error: 'Required fields: first_name, last_name, address_line_1, city, state, postal_code' },
        { status: 400 }
      )
    }

    if (!['billing', 'shipping'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "billing" or "shipping"' },
        { status: 400 }
      )
    }

    // If this is set as default, unset other default addresses of the same type
    if (is_default) {
      await supabaseAdmin
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('type', type)
    }

    // Create new address
    const { data: address, error: createError } = await supabaseAdmin
      .from('user_addresses')
      .insert({
        user_id: user.id,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        company: company?.trim() || null,
        address_line_1: address_line_1.trim(),
        address_line_2: address_line_2?.trim() || null,
        city: city.trim(),
        state: state.trim(),
        postal_code: postal_code.trim(),
        country: country.trim(),
        type,
        is_default,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating address:', createError)
      return NextResponse.json(
        { error: 'Failed to create address' },
        { status: 500 }
      )
    }

    return NextResponse.json({ address }, { status: 201 })
  } catch (error) {
    console.error('Error in addresses POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
