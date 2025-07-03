import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      country,
      type,
      is_default,
    } = body

    // Get existing address to verify ownership
    const { data: existingAddress, error: fetchError } = await supabaseAdmin
      .from('user_addresses')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    // If setting as default, unset other default addresses of the same type
    if (is_default && !existingAddress.is_default) {
      await supabaseAdmin
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('type', type || existingAddress.type)
    }

    // Prepare update object
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (first_name !== undefined) updateData.first_name = first_name.trim()
    if (last_name !== undefined) updateData.last_name = last_name.trim()
    if (company !== undefined) updateData.company = company?.trim() || null
    if (address_line_1 !== undefined) updateData.address_line_1 = address_line_1.trim()
    if (address_line_2 !== undefined) updateData.address_line_2 = address_line_2?.trim() || null
    if (city !== undefined) updateData.city = city.trim()
    if (state !== undefined) updateData.state = state.trim()
    if (postal_code !== undefined) updateData.postal_code = postal_code.trim()
    if (country !== undefined) updateData.country = country.trim()
    if (type !== undefined) updateData.type = type
    if (is_default !== undefined) updateData.is_default = is_default

    // Update address
    const { data: updatedAddress, error: updateError } = await supabaseAdmin
      .from('user_addresses')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating address:', updateError)
      return NextResponse.json(
        { error: 'Failed to update address' },
        { status: 500 }
      )
    }

    return NextResponse.json({ address: updatedAddress })
  } catch (error) {
    console.error('Error in address PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult

    // Check if address exists and belongs to user
    const { data: existingAddress, error: fetchError } = await supabaseAdmin
      .from('user_addresses')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    // Delete address
    const { error: deleteError } = await supabaseAdmin
      .from('user_addresses')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Error deleting address:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      )
    }

    // If the deleted address was default, set another address of the same type as default
    if (existingAddress.is_default) {
      const { data: otherAddresses, error: otherError } = await supabaseAdmin
        .from('user_addresses')
        .select('id')
        .eq('user_id', user.id)
        .eq('type', existingAddress.type)
        .limit(1)

      if (!otherError && otherAddresses && otherAddresses.length > 0) {
        await supabaseAdmin
          .from('user_addresses')
          .update({ is_default: true })
          .eq('id', otherAddresses[0].id)
      }
    }

    return NextResponse.json({ message: 'Address deleted successfully' })
  } catch (error) {
    console.error('Error in address DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
