'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { validatePassword, validatePasswordConfirmation, parseAuthError, useFormValidation, isHardError } from '@/lib/auth'
import { FormInput, AlertMessage, AuthLayout, SubmitButton } from '@/components/auth'
import { LogoLoader } from '@/components/ui'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const [isValidSession, setIsValidSession] = useState(false)
    const [checkingSession, setCheckingSession] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    // Check if user has a valid recovery session
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    setIsValidSession(true)
                } else {
                    setMessage({
                        type: 'error',
                        text: 'Invalid or expired reset link. Please request a new password reset.',
                    })
                }
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: 'Unable to verify reset link. Please try again.',
                })
            } finally {
                setCheckingSession(false)
            }
        }

        checkSession()
    }, [supabase.auth])

    // Form validation
    const {
        validateField,
        validateAllFields,
        markFieldTouched,
        markAllFieldsTouched,
        getFieldError,
    } = useFormValidation({
        validators: {
            password: (value) => validatePassword(value),
            confirmPassword: (value, values) => validatePasswordConfirmation(values?.password || '', value),
        },
    })

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // Mark all fields as touched and validate
        markAllFieldsTouched(['password', 'confirmPassword'])
        const isValid = validateAllFields({ password, confirmPassword })

        if (!isValid) {
            setMessage({
                type: 'error',
                text: 'Please correct the errors before continuing.',
            })
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            })

            if (error) throw error

            setMessage({
                type: 'success',
                text: 'Password updated successfully! Redirecting to login...',
            })

            // Redirect to login after a delay
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } catch (error: any) {
            const errorMessage = parseAuthError(error)
            setMessage({
                type: 'error',
                text: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bone px-4">
                <div className="text-center flex flex-col items-center">
                    <LogoLoader variant="inline" size="sm" />
                    <p className="mt-4 text-charcoal-400 font-light tracking-wide italic">Verifying reset link...</p>
                </div>
            </div>
        )
    }

    if (!isValidSession) {
        return (
            <AuthLayout
                title="Invalid Link"
                subtitle="This password reset link is invalid or has expired."
            >
                <div className="space-y-6">
                    <AlertMessage
                        type="error"
                        message={message?.text || "Your password reset session has expired. Please request a new link."}
                    />

                    <div className="text-center space-y-4">
                        <Link href="/forgot-password" title="Request New Link" className="btn-primary w-full rounded-sm block text-center py-3">
                            Request New Link
                        </Link>
                        <Link href="/login" className="block text-sm text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        )
    }

    const passwordError = getFieldError('password')
    const isPasswordWarning = passwordError && !isHardError(passwordError)
    const confirmError = getFieldError('confirmPassword')
    const passwordsMatch = !confirmError && confirmPassword && password === confirmPassword

    return (
        <AuthLayout
            title="Create new password"
            subtitle="Choose a strong password for your Sivi the Couturier account."
        >
            <form onSubmit={handlePasswordReset} className="space-y-5" noValidate>
                <FormInput
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        validateField('password', e.target.value)
                        // Also revalidate confirm password if it's been touched
                        if (confirmPassword) validateField('confirmPassword', confirmPassword, { password: e.target.value })
                    }}
                    onBlur={() => {
                        markFieldTouched('password')
                        validateField('password', password)
                    }}
                    error={!isPasswordWarning ? passwordError : undefined}
                    warning={isPasswordWarning ? passwordError! : undefined}
                    placeholder="Minimum 6 characters"
                    required
                />

                <FormInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        validateField('confirmPassword', e.target.value, { password })
                    }}
                    onBlur={() => {
                        markFieldTouched('confirmPassword')
                        validateField('confirmPassword', confirmPassword, { password })
                    }}
                    error={confirmError}
                    success={passwordsMatch ? "Passwords match" : undefined}
                    placeholder="Re-enter your password"
                    required
                />

                {message && (
                    <AlertMessage type={message.type} message={message.text} />
                )}

                <SubmitButton loading={loading} loadingText="Updating password...">
                    Reset Password
                </SubmitButton>

                <div className="text-center pt-2">
                    <Link href="/login" className="text-sm text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                        ← Back to login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}
