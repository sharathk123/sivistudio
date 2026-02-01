import { withAuth } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, RateLimitPresets, addRateLimitHeaders } from '@/lib/api/rateLimit'

/**
 * GET /api/profile
 * Get the authenticated user's profile
 * Protected route - requires valid JWT token
 * Rate limit: 30 requests per minute
 */
export const GET = withAuth(async (request: NextRequest, { user }) => {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(request, RateLimitPresets.STANDARD);
    if (!rateLimitResult.allowed) {
        return rateLimitResult.response!;
    }

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

        const response = NextResponse.json({
            success: true,
            data: profile,
        })

        // Add rate limit headers to response
        return addRateLimitHeaders(
            response,
            rateLimitResult.remaining,
            rateLimitResult.resetTime,
            RateLimitPresets.STANDARD.maxRequests
        )
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
 * Rate limit: 5 requests per minute (stricter for write operations)
 */
export const PUT = withAuth(async (request: NextRequest, { user }) => {
    // Apply stricter rate limiting for write operations
    const rateLimitResult = await rateLimit(request, RateLimitPresets.STRICT);
    if (!rateLimitResult.allowed) {
        return rateLimitResult.response!;
    }

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

        const response = NextResponse.json({
            success: true,
            data,
            message: 'Profile updated successfully',
        })

        // Add rate limit headers to response
        return addRateLimitHeaders(
            response,
            rateLimitResult.remaining,
            rateLimitResult.resetTime,
            RateLimitPresets.STRICT.maxRequests
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update profile' },
            { status: 500 }
        )
    }
})
