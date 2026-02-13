'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import { validateEmail, validatePassword, validateFullName, parseAuthError, useFormValidation, isHardError } from '@/lib/auth'
import { FormInput, AlertMessage, AuthLayout, SubmitButton } from '@/components/auth'
import { toast } from 'sonner'

export default function SignUpPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bone flex items-center justify-center text-sage">Loading...</div>}>
            <SignUpForm />
        </Suspense>
    )
}

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        const error = searchParams.get('error')
        if (error) {
            toast.error(error)
            router.replace('/signup')
        }
    }, [searchParams, router])

    // Form validation
    const {
        validateField,
        validateAllFields,
        markFieldTouched,
        markAllFieldsTouched,
        getFieldError,
    } = useFormValidation({
        validators: {
            fullName: (value) => validateFullName(value),
            email: (value) => validateEmail(value),
            password: (value) => validatePassword(value),
        },
    })

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // Mark all fields as touched and validate
        markAllFieldsTouched(['fullName', 'email', 'password'])
        const isValid = validateAllFields({ fullName, email, password })

        if (!isValid) {
            toast.error('Please correct the errors before continuing.')
            setMessage({
                type: 'error',
                text: 'Please correct the errors before continuing.',
            })
            setLoading(false)
            return
        }

        try {
            // Call the custom signup API route
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                    fullName: fullName.trim(),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to sign up')
            }

            toast.success('Account created! Please verify your email.')
            // Redirect to OTP Verification
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)

        } catch (error: any) {
            toast.error(error.message)
            setMessage({
                type: 'error',
                text: error.message,
            })
        } finally {
            setLoading(false)
        }
    }
    const handleGoogleSignUp = async () => {
        setLoading(true)
        setMessage(null)

        try {
            const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${redirectUrl}/auth/callback`,
                },
            })

            if (error) throw error
        } catch (error: any) {
            console.error('Google Sign Up Error:', error)
            const errorMessage = parseAuthError(error)
            toast.error(errorMessage)
            setMessage({
                type: 'error',
                text: errorMessage,
            })
            setLoading(false)
        }
    }


    const passwordError = getFieldError('password')
    const isPasswordWarning = passwordError && !isHardError(passwordError)

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join Sivi the Couturier for a curated heritage experience."
        >
            <div className="space-y-6">
                {/* Google Sign Up Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-ivory-400 rounded-sm bg-white hover:bg-ivory-50 transition-all focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path
                            fill="var(--color-google-blue)"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="var(--color-google-green)"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="var(--color-google-yellow)"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="var(--color-google-red)"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="text-charcoal font-medium">Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-ivory-400"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-bone text-charcoal-400 italic">Or continue with email</span>
                    </div>
                </div>
                {/* Registration Form */}
                <form onSubmit={handleSignUp} className="space-y-5" noValidate>
                    <FormInput
                        id="fullName"
                        name="fullName"
                        type="text"
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value)
                            validateField('fullName', e.target.value)
                        }}
                        onBlur={() => {
                            markFieldTouched('fullName')
                            validateField('fullName', fullName)
                        }}
                        error={getFieldError('fullName')}
                        placeholder="Your full name"
                        required
                    />

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

                    <FormInput
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            validateField('password', e.target.value)
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

                    {message && (
                        <AlertMessage type={message.type} message={message.text} />
                    )}

                    <SubmitButton loading={loading} loadingText="Creating account...">
                        Sign Up
                    </SubmitButton>

                    <div className="text-center pt-2">
                        <p className="text-sm text-charcoal-300">
                            Already have an account?{' '}
                            <Link href="/login" className="text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

