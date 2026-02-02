import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/addresses
 * Get all addresses for the authenticated user
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    try {
        const supabase = await createClient()

        const { data: addresses, error } = await supabase
            .from('user_addresses')
            .select('*')
            .eq('user_id', user.id)
            .order('is_default', { ascending: false }) // Default first
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: addresses || [] })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch addresses' },
            { status: 500 }
        )
    }
})

/**
 * POST /api/addresses
 * Create a new address for the authenticated user
 */
export const POST = withAuth(async (request: NextRequest, { user }) => {
    try {
        const body = await request.json()

        // Basic validation
        const requiredFields = ['full_name', 'address_line1', 'city', 'state', 'zip_code', 'phone_number']
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
            }
        }

        const supabase = await createClient()

        const { data: address, error } = await supabase
            .from('user_addresses')
            .insert({
                ...body,
                user_id: user.id
            })
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: 'Failed to create address' }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: address }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create address' },
            { status: 500 }
        )
    }
})
