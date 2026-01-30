import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/profile
 * Get the authenticated user's profile
 * Protected route - requires valid JWT token
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    try {
        const supabase = await createClient()

        // Fetch user profile from database
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) {
            return NextResponse.json(
                { error: 'Profile not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: profile,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch profile' },
            { status: 500 }
        )
    }
})

/**
 * PUT /api/profile
 * Update the authenticated user's profile
 * Protected route - requires valid JWT token
 */
export const PUT = withAuth(async (request: NextRequest, { user }) => {
    try {
        const body = await request.json()
        const { full_name, hyderabad_locality } = body

        const supabase = await createClient()

        // Update user profile
        const { data, error } = await supabase
            .from('profiles')
            .update({
                full_name,
                hyderabad_locality,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .select()
            .single()

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update profile' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            data,
            message: 'Profile updated successfully',
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update profile' },
            { status: 500 }
        )
    }
})
