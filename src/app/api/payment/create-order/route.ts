import { withAuth } from '@/lib/auth/jwt'
import { createAdminClient } from '@/lib/supabase/admin'
import { razorpay } from '@/lib/razorpay/client'
import { NextRequest, NextResponse } from 'next/server'
import { validateCartPrices, calculateValidatedTotal, formatValidationResult } from '@/lib/payment/validate-prices'
import { logPriceTampering, getClientIP } from '@/lib/security/logger'
import { rateLimit, rateLimiters } from '@/lib/middleware/rate-limiter'

/**
 * POST /api/payment/create-order
 * 1. Validates the cart items (prices) from Sanity CMS to prevent tampering
 * 2. Creates a Razorpay Order
 * 3. Creates a Supabase Order with 'pending' status
 *
 * Rate limited to 5 requests per minute per user
 */
export const POST = withAuth(async (request: NextRequest, { user }) => {
    try {
        // Apply rate limiting
        const rateLimitResponse = await rateLimit(
            request,
            user.id,
            {
                ...rateLimiters.strict,
                identifier: 'payment-create-order',
            }
        )

        if (rateLimitResponse) {
            return rateLimitResponse
        }

        const body = await request.json()
        const { items, shipping_address_id } = body // Expecting items array and address ID

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in order' }, { status: 400 })
        }

        if (!shipping_address_id) {
            return NextResponse.json({ error: 'Shipping Address is required' }, { status: 400 })
        }

        // 1. Validate prices against database to prevent tampering
        const validation = await validateCartPrices(items)

        if (!validation.valid) {
            // Log price tampering attempt
            const ipAddress = getClientIP(request)
            for (const item of validation.validatedItems) {
                if (!item.isValid && item.cartPrice !== null && item.dbPrice !== null && item.dbPrice !== undefined && item.cartPrice !== item.dbPrice) {
                    await logPriceTampering(
                        user.id,
                        item.productId,
                        item.cartPrice,
                        item.dbPrice,
                        ipAddress
                    )
                }
            }

            console.error('Price validation failed:', formatValidationResult(validation))
            return NextResponse.json(
                {
                    error: 'Price validation failed',
                    details: validation.errors,
                    warnings: validation.warnings
                },
                { status: 400 }
            )
        }

        // Log warnings if any (e.g., out of stock items)
        if (validation.warnings.length > 0) {
            console.warn('Price validation warnings:', validation.warnings)
        }

        // 2. Calculate Total Amount from validated prices
        const totalAmount = calculateValidatedTotal(validation.validatedItems)

        // Razorpay accepts amount in paise (1 INR = 100 paise)
        const amountInPaise = Math.round(totalAmount * 100)

        // 2. Create Razorpay Order
        const payment_capture = 1 // Auto capture
        const currency = 'INR'

        const options = {
            amount: amountInPaise,
            currency,
            receipt: `receipt_${Date.now()}`,
            payment_capture,
            notes: {
                user_id: user.id
            }
        }

        const razorpayOrder = await razorpay.orders.create(options)

        // 3. Create Supabase Order
        // Use Admin Client to bypass RLS for Order Insertion if necessary.
        const supabaseAdmin = createAdminClient()

        // Fetch user's shipping address text to store snapshot
        const { data: addressData } = await supabaseAdmin
            .from('user_addresses')
            .select('*')
            .eq('id', shipping_address_id)
            .single()

        // Ensure Profile Exists (Self-Healing)
        // The foreign key constraint orders_profile_id_fkey requires a profile.
        // If the trigger failed or user doesn't have one, we create it here.
        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()

        if (!profile) {
            console.warn(`Profile missing for user ${user.id}. Creating/Restoring profile...`)
            const { error: createProfileError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown',
                })

            if (createProfileError) {
                console.error('Failed to create missing profile during checkout:', createProfileError)
                // Proceeding might fail, but let's try or return error?
                // If this fails, the order insert will almost certainly fail.
                return NextResponse.json({ error: 'Failed to restore user profile', details: createProfileError }, { status: 500 })
            }
        }

        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
                profile_id: user.id,
                total_amount: totalAmount,
                status: 'placed', // Matches default 'placed' in SQL
                payment_status: 'pending', // Matches check constraint
                razorpay_order_id: razorpayOrder.id,
                shipping_address: addressData || {} // Store full JSON object
            })
            .select()
            .single()

        if (orderError) {
            console.error('Supabase Order Creation Error:', orderError)
            return NextResponse.json({ error: 'Failed to create order record', details: orderError }, { status: 500 })
        }

        // 4. Create Order Items using validated prices
        const orderItems = validation.validatedItems.map((item) => ({
            order_id: order.id,
            sanity_product_id: item.productId,
            quantity: item.quantity,
            price: item.dbPrice || 0, // Use validated database price
            selected_size: item.selectedSize || null
        }))

        const { error: itemsError } = await supabaseAdmin
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            console.error('Order Items Creation Error:', itemsError)
            // Rollback: Delete the order if items fail
            await supabaseAdmin.from('orders').delete().eq('id', order.id)
            return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            orderId: razorpayOrder.id, // For Razorpay Checkout
            amount: totalAmount,
            currency: currency,
            dbOrderId: order.id // Our internal DB ID
        })

    } catch (error: any) {
        console.error('Payment Init Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to initialize payment' },
            { status: 500 }
        )
    }
})
