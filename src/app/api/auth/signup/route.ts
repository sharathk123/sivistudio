import { createAdminClient } from '@/lib/supabase/admin'
import { EmailService } from '@/lib/email-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password, fullName } = body

        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        // 1. Create User (Unverified)
        const { data: userData, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: false,
            user_metadata: {
                full_name: fullName,
            }
        })

        if (createError) {
            // If user already exists, we might want to just send a new OTP if they are unverified
            // But for simplicity, we return the error or handle "already registered"
            if (createError.message.includes('already registered')) {
                return NextResponse.json(
                    { error: 'This email is already registered. Please sign in.' },
                    { status: 400 }
                )
            }
            throw createError
        }

        const user = userData.user

        // 2. Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

        // 3. Store OTP in DB (using Service Role)
        const { error: otpError } = await supabase
            .from('otp_codes')
            .insert({
                email,
                code: otpCode,
                user_id: user.id
            })

        if (otpError) throw new Error('Failed to generate OTP')

        // 4. Send Email with OTP
        await EmailService.sendWelcomeEmail(email, fullName, otpCode) // Assuming sendWelcomeEmail now takes OTP

        return NextResponse.json({
            success: true,
            message: 'Account created. Please check your email for the verification code.',
        })

    } catch (error: any) {
        console.error('Signup Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create account' },
            { status: 500 }
        )
    }
}
