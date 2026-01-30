import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/orders
 * Get all orders for the authenticated user
 * Protected route - requires valid JWT token
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    try {
        const supabase = await createClient()

        // Fetch user's orders with items
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          unit_price,
          subtotal
        )
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch orders' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            data: orders || [],
            count: orders?.length || 0,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        )
    }
})

/**
 * POST /api/orders
 * Create a new order for the authenticated user
 * Protected route - requires valid JWT token
 */
export const POST = withAuth(async (request: NextRequest, { user }) => {
    try {
        const body = await request.json()
        const { items, total_amount, shipping_address } = body

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'Order must contain at least one item' },
                { status: 400 }
            )
        }

        if (!total_amount || !shipping_address) {
            return NextResponse.json(
                { error: 'Missing required order fields' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: user.id,
                    total_amount,
                    shipping_address,
                    status: 'pending',
                },
            ])
            .select()
            .single()

        if (orderError || !order) {
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 400 }
            )
        }

        // Create order items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            subtotal: item.quantity * item.unit_price,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            // Rollback: delete the order if items creation fails
            await supabase.from('orders').delete().eq('id', order.id)

            return NextResponse.json(
                { error: 'Failed to create order items' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: order,
                message: 'Order created successfully',
            },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        )
    }
})
