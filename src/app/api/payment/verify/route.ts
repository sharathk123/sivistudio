import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/payment/verify
 * Verifies the razorpay_signature sent by the checkout.
 * If valid, marks the order as 'paid'.
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

        const { error } = await supabase
            .from('orders')
            .update({
                payment_status: 'paid',
                status: 'processing', // Move fulfillment status to processing
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                updated_at: new Date().toISOString()
            })
            .eq('razorpay_order_id', razorpay_order_id)

        if (error) {
            console.error('Order Update Error:', error)
            return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
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
