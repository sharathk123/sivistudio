import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/orders/[id]
 * Get a specific order by ID
 */
export const GET = withAuth(async (request: NextRequest, { params, user }) => {
    try {
        const orderId = params.id

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
        }

        const supabase = await createClient()

        const { data: order, error } = await supabase
            .from('orders')
            .select('*, order_items(id, sanity_product_id, selected_size, quantity, price)')
            .eq('id', orderId)
            .eq('profile_id', user.id) // Security: Ensure user owns the order
            .single()

        if (error || !order) {
            console.error('[API] Order Detail Fetch Error:', error)
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: order })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch order' },
            { status: 500 }
        )
    }
})
