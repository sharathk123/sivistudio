import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/measurements
 * Get all measurements for the authenticated user
 * Protected route - requires valid JWT token
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    try {
        const supabase = await createClient()

        // Fetch user's measurements
        const { data: measurements, error } = await supabase
            .from('measurements')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch measurements' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            data: measurements || [],
            count: measurements?.length || 0,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch measurements' },
            { status: 500 }
        )
    }
})

/**
 * POST /api/measurements
 * Create a new measurement for the authenticated user
 * Protected route - requires valid JWT token
 */
export const POST = withAuth(async (request: NextRequest, { user }) => {
    try {
        const body = await request.json()
        const { bust_cm, waist_cm, hips_cm, length_cm, age_group } = body

        // Validate required fields
        if (!bust_cm || !waist_cm || !hips_cm || !length_cm) {
            return NextResponse.json(
                { error: 'Missing required measurement fields' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Create new measurement
        const { data, error } = await supabase
            .from('measurements')
            .insert([
                {
                    user_id: user.id,
                    bust_cm,
                    waist_cm,
                    hips_cm,
                    length_cm,
                    age_group,
                },
            ])
            .select()
            .single()

        if (error) {
            return NextResponse.json(
                { error: 'Failed to create measurement' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data,
                message: 'Measurement created successfully',
            },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create measurement' },
            { status: 500 }
        )
    }
})
