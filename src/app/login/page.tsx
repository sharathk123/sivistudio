'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { validateEmail, validatePassword, parseAuthError, useFormValidation } from '@/lib/auth'
import { FormInput, AlertMessage, AuthLayout, SubmitButton } from '@/components/auth'

import { Suspense } from 'react'

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bone flex items-center justify-center text-sag">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const router = useRouter()
    const supabase = createClient()
    const searchParams = useSearchParams()

    // Form validation
    const {
        validateField,
        validateAllFields,
        markFieldTouched,
        markAllFieldsTouched,
        getFieldError,
    } = useFormValidation({
        validators: {
            email: (value) => validateEmail(value),
            password: (value) => validatePassword(value),
        },
    })

    // Check for success or error message from redirect
    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            setMessage({
                type: 'success',
                text: 'Email verified successfully! Please sign in.',
            })
        }
        const error = searchParams.get('error')
        if (error) {
            setMessage({
                type: 'error',
                text: error,
            })
        }
    }, [searchParams])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // Mark all fields as touched and validate
        markAllFieldsTouched(['email', 'password'])
        const isValid = validateAllFields({ email, password })

        if (!isValid) {
            setMessage({
                type: 'error',
                text: 'Please correct the errors before continuing.',
            })
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            })

            if (error) throw error

            if (data.user) {
                setMessage({
                    type: 'success',
                    text: 'Login successful! Redirecting...',
                })

                // Redirect to dashboard/home
                setTimeout(() => {
                    router.push('/')
                    router.refresh()
                }, 1000)
            }
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
    const handleGoogleLogin = async () => {
        setLoading(true)
        setMessage(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) throw error
        } catch (error: any) {
            const errorMessage = parseAuthError(error)
            setMessage({
                type: 'error',
                text: errorMessage,
            })
            setLoading(false)
        }
    }


    const passwordError = getFieldError('password')
    // Safe check if passwordError is the hard error string or null (ignoring warning object complexity for now if irrelevant)
    // Actually getFieldError returns string | undefined usually. 
    // Wait, the previous code had 'isHardError' check? 
    // Let's re-use the exact UI logic from before.
    // Ah, I need to see if I am missing imports or helper functions used in the original.
    // ... Checked: parseAuthError, useFormValidation, validateEmail etc are imported.
    // Warning logic:
    // const passwordError = getFieldError('password')
    // const isPasswordWarning = passwordError && !isHardError(passwordError) 
    // <--- I need to make sure I copy this part correctly or import isHardError if it wasn't imported.

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Please enter your credentials to access your account."
        >
            <div className="space-y-6">
                {/* Google Sign In Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
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

                {/* Email/Password Form */}
                <form onSubmit={handleLogin} className="space-y-5" noValidate>
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
                        error={getFieldError('password')}
                        placeholder="Enter your password"
                        required
                        extraLabel={
                            <Link href="/forgot-password" title="Forgot Password" className="text-xs text-sage hover:text-sage-600 transition-colors">
                                Forgot?
                            </Link>
                        }
                    />

                    {message && (
                        <AlertMessage type={message.type} message={message.text} />
                    )}

                    <SubmitButton loading={loading} loadingText="Signing in...">
                        Sign In
                    </SubmitButton>

                    <div className="text-center pt-2">
                        <p className="text-sm text-charcoal-300">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-sage hover:text-sage-600 font-medium transition-colors underline decoration-sage/30 hover:decoration-sage-600">
                                Create one
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}
