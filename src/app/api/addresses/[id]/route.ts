import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * PUT /api/addresses/[id]
 * Update an existing address
 */
export const PUT = withAuth(async (request: NextRequest, { params, user }) => {
    try {
        const resolvedParams = await params
        const addressId = resolvedParams.id
        const body = await request.json()

        const supabase = await createClient()

        const { data: address, error } = await supabase
            .from('user_addresses')
            .update(body)
            .eq('id', addressId)
            .eq('user_id', user.id) // Security check
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: 'Failed to update address' }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: address })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update address' },
            { status: 500 }
        )
    }
})

/**
 * DELETE /api/addresses/[id]
 * Delete an address
 */
export const DELETE = withAuth(async (request: NextRequest, { params, user }) => {
    try {
        const resolvedParams = await params
        const addressId = resolvedParams.id
        const supabase = await createClient()

        const { error } = await supabase
            .from('user_addresses')
            .delete()
            .eq('id', addressId)
            .eq('user_id', user.id) // Security check

        if (error) {
            return NextResponse.json({ error: 'Failed to delete address' }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete address' },
            { status: 500 }
        )
    }
})
