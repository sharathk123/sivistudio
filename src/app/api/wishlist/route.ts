import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { getProductsByIds } from '@/lib/sanity/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/wishlist
 * Get all wishlist items for the authenticated user, enriched with Sanity product data
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    try {
        const supabase = await createClient()

        // 1. Fetch wishlist items from Supabase
        const { data: wishlistItems, error } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 400 })
        }

        if (!wishlistItems || wishlistItems.length === 0) {
            return NextResponse.json({ success: true, data: [] })
        }

        // 2. Extract product IDs
        const productIds = wishlistItems.map(item => item.product_id)

        // 3. Fetch product details from Sanity
        const products = await getProductsByIds(productIds)

        // 4. Merge data
        const enrichedWishlist = wishlistItems.map(item => {
            const product = products.find(p => p._id === item.product_id)
            return {
                id: item.id, // Wishlist ID
                product_id: item.product_id,
                created_at: item.created_at,
                product: product || null // Full Sanity product data
            }
        })

        return NextResponse.json({ success: true, data: enrichedWishlist })
    } catch (error: any) {
        console.error('Wishlist GET Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to fetch wishlist' },
            { status: 500 }
        )
    }
})

/**
 * POST /api/wishlist
 * Add an item to the wishlist
 */
export const POST = withAuth(async (request: NextRequest, { user }) => {
    try {
        const body = await request.json()
        const { product_id } = body

        if (!product_id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
        }

        const supabase = await createClient()

        // Upsert to avoid duplicates (constraint handles it, but ignore duplicates)
        const { data: item, error } = await supabase
            .from('wishlist')
            .upsert(
                { user_id: user.id, product_id },
                { onConflict: 'user_id, product_id' }
            )
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: item }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to add to wishlist' },
            { status: 500 }
        )
    }
})
