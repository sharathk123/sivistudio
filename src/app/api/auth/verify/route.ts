import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, rateLimiters } from '@/lib/middleware/rate-limiter'
import { getClientIP } from '@/lib/security/logger'

export async function POST(request: NextRequest) {
    try {
        // 0. Apply rate limiting (Max 10 attempts/minute per IP)
        const ip = getClientIP(request)
        const rateLimitResponse = await rateLimit(
            request,
            ip,
            {
                ...rateLimiters.moderate,
                identifier: 'auth-verify',
            }
        )

        if (rateLimitResponse) {
            return rateLimitResponse
        }
        const body = await request.json()
        const { email, code } = body

        if (!email || !code) {
            return NextResponse.json(
                { error: 'Email and code are required' },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()

        // 1. Verify OTP
        const { data: otps, error: otpError } = await supabase
            .from('otp_codes')
            .select('*')
            .eq('email', email)
            .eq('code', code)
            .order('created_at', { ascending: false })
            .limit(1)

        if (otpError || !otps || otps.length === 0) {
            return NextResponse.json(
                { error: 'Invalid verification code' },
                { status: 400 }
            )
        }

        const otpRecord = otps[0]

        // 2. Check Expiry
        const now = new Date()
        const expiresAt = new Date(otpRecord.expires_at)

        if (now > expiresAt) {
            return NextResponse.json(
                { error: 'Verification code has expired. Please signup again.' },
                { status: 400 }
            )
        }

        // 3. Confirm User
        const { data: { user }, error: updateUserError } = await supabase.auth.admin.updateUserById(
            otpRecord.user_id,
            { email_confirm: true }
        )

        if (updateUserError || !user) {
            console.error('Failed to confirm user:', updateUserError)
            throw updateUserError || new Error('User not found after confirmation')
        }

        // 3.5 Create User Profile (since trigger is removed to enforce manual registration)
        // We use upsert in case they attempt to re-verify for some reason
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            })

        if (profileError) {
            console.error('Failed to create profile:', profileError)
            throw profileError
        }

        // 4. Cleanup used OTP
        await supabase.from('otp_codes').delete().eq('id', otpRecord.id)

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        })

    } catch (error: any) {
        console.error('Verification Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to verify email' },
            { status: 500 }
        )
    }
}
