import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { EmailService } from '@/lib/email-service'
import { getProductsByIds } from '@/lib/sanity/client'

/**
 * POST /api/payment/verify
 * Verifies the razorpay_signature sent by the checkout.
 * If valid, marks the order as 'paid' and triggers confirmation email.
 */
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
        }

        const secret = process.env.RAZORPAY_KEY_SECRET
        if (!secret) return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })

        // 1. Verify Signature
        // Formula: hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, secret)
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex')

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
        }

        // 2. Update Order Status in Supabase
        const supabase = await createClient()

        // Fetch the order AND updated it
        const { data: order, error } = await supabase
            .from('orders')
            .update({
                payment_status: 'paid',
                status: 'processing', // Move fulfillment status to processing
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                updated_at: new Date().toISOString()
            })
            .eq('razorpay_order_id', razorpay_order_id)
            .select('*, order_items(*), profiles(full_name, email)')
            .single()

        if (error) {
            console.error('Order Update Error:', error)
            return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
        }

        // 3. Trigger Email Confirmation (Async - don't block response)
        // We use setImmediate or just don't await strictly to ensure fast UI response
        // But in Vercel/Next serverless, we MUST await before the function terminates.

        try {
            if (order && order.profiles) {
                // Fetch product details from Sanity to get titles
                // order.order_items has sanity_product_id
                const sanityIds = order.order_items.map((item: any) => item.sanity_product_id)
                const products = await getProductsByIds(sanityIds)

                // Map items for email
                const emailItems = order.order_items.map((item: any) => {
                    const product = products.find(p => p._id === item.sanity_product_id)
                    return {
                        name: product?.title || 'Heritage Product',
                        quantity: item.quantity,
                        price: item.price,
                        image: product?.images?.[0] || undefined
                    }
                })

                // Format shipping address
                const rawAddress = order.shipping_address
                const formattedAddress = `${rawAddress.address_line1}, ${rawAddress.address_line2 ? rawAddress.address_line2 + ', ' : ''}\n${rawAddress.city}, ${rawAddress.state} - ${rawAddress.zip_code}\n${rawAddress.country || 'India'}`

                await EmailService.sendOrderConfirmation(
                    order.profiles.email,
                    order.razorpay_order_id, // Use public facing ID like RZP ID or DB ID
                    order.profiles.full_name,
                    emailItems,
                    order.total_amount,
                    formattedAddress
                )
            }
        } catch (emailError) {
            console.error('Email Trigger Failed:', emailError)
            // Do not fail the request, payment was successful
        }

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error('Payment Verification Error:', error)
        return NextResponse.json(
            { error: error.message || 'Payment verification failed' },
            { status: 500 }
        )
    }
}
