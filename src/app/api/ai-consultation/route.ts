import { withAuth } from '@/lib/auth/jwt'
import { NextResponse } from 'next/server'
import { getStyleRecommendation } from '@/lib/gemini/client'
import { getProducts } from '@/lib/sanity/client'
import { createClient } from '@/lib/supabase/server'

export const POST = withAuth(async (request, { user }) => {
    try {
        const { message, conversationHistory = [] } = await request.json()

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        // Fetch products for context
        const products = await getProducts()

        // Get AI recommendation
        const recommendation = await getStyleRecommendation(
            message,
            products,
            conversationHistory
        )

        // Log consultation to Supabase
        const supabase = await createClient()
        await supabase
            .from('ai_consultations')
            .insert({
                user_id: user.id,
                conversation_log: {
                    messages: [
                        ...conversationHistory,
                        { role: 'user', parts: message },
                        { role: 'model', parts: recommendation }
                    ]
                },
                recommendations: {
                    products: products.slice(0, 3).map(p => p._id)
                }
            })

        return NextResponse.json({
            recommendation,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('AI Consultation Error:', error)
        return NextResponse.json(
            { error: 'Failed to get style recommendation' },
            { status: 500 }
        )
    }
})
