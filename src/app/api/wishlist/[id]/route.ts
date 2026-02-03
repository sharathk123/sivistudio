import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * DELETE /api/wishlist/[id]
 * Remove an item from the wishlist by Wishlist ID
 */
export const DELETE = withAuth(async (request: NextRequest, { params, user }) => {
    try {
        const resolvedParams = await params
        const id = resolvedParams.id
        const supabase = await createClient()

        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id) // Security check

        if (error) {
            return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to remove from wishlist' },
            { status: 500 }
        )
    }
})
