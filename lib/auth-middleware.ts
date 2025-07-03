import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function withAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  
  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return { user, error: null }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}

export async function validateRequestBody<T>(
  request: NextRequest,
  schema: (data: any) => T | null
): Promise<{ data: T; error: null } | { data: null; error: NextResponse }> {
  try {
    const body = await request.json()
    const validatedData = schema(body)
    
    if (!validatedData) {
      return {
        data: null,
        error: NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
      }
    }
    
    return { data: validatedData, error: null }
  } catch (error) {
    return {
      data: null,
      error: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }
}
