
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
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
        const { error: updateUserError } = await supabase.auth.admin.updateUserById(
            otpRecord.user_id,
            { email_confirm: true }
        )

        if (updateUserError) {
            console.error('Failed to confirm user:', updateUserError)
            throw updateUserError
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
