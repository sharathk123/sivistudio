'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { validateEmail, parseAuthError, useFormValidation, isHardError } from '@/lib/auth'
import { FormInput, AlertMessage, AuthLayout, SubmitButton } from '@/components/auth'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const [emailSent, setEmailSent] = useState(false)
    const supabase = createClient()

    // Form validation
    const {
        validateField,
        validateAllFields,
        markFieldTouched,
        markAllFieldsTouched,
        getFieldError,
        clearErrors,
    } = useFormValidation({
        validators: {
            email: (value) => validateEmail(value),
        },
    })

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // Mark all fields as touched and validate
        markAllFieldsTouched(['email'])
        const isValid = validateAllFields({ email })

        if (!isValid) {
            toast.error('Please enter a valid email address.')
            setMessage({
                type: 'error',
                text: 'Please enter a valid email address.',
            })
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
            })

            if (error) throw error

            setEmailSent(true)
            toast.success('Password reset link sent!')
            setMessage({
                type: 'success',
                text: 'Password reset link sent! Please check your email inbox and spam folder.',
            })
            setEmail('')
            clearErrors()
        } catch (error: any) {
            const errorMessage = parseAuthError(error)
            toast.error(errorMessage)
            setMessage({
                type: 'error',
                text: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Reset your password"
            subtitle="Enter your email address and we'll send you a link to reset your password."
        >
            {!emailSent ? (
                <form onSubmit={handleResetRequest} className="space-y-5" noValidate>
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            validateField('email', e.target.value)
                        }}
                        onBlur={() => {
                            markFieldTouched('email')
                            validateField('email', email)
                        }}
                        error={getFieldError('email')}
                        placeholder="you@example.com"
                        required
                    />

                    {message && (
                        <AlertMessage type={message.type} message={message.text} />
                    )}

                    <SubmitButton loading={loading} loadingText="Sending reset link...">
                        Send Reset Link
                    </SubmitButton>

                    <div className="text-center pt-2">
                        <Link href="/login" className="text-sm text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                            ← Back to login
                        </Link>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    {/* Success State */}
                    <div className="p-6 rounded-sm border bg-sage/10 border-sage/20 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Check your email</h3>
                        <p className="text-sm text-charcoal-600 mb-4">
                            We've sent a password reset link to your email address. Click the link in the email to create a new password.
                        </p>
                        <p className="text-xs text-charcoal-400">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => {
                                    setEmailSent(false)
                                    setMessage(null)
                                }}
                                className="text-sage hover:text-sage-600 font-medium underline"
                            >
                                try again
                            </button>
                        </p>
                    </div>

                    <div className="text-center">
                        <Link href="/login" className="text-sm text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                            ← Back to login
                        </Link>
                    </div>
                </div>
            )}
        </AuthLayout>
    )
}
