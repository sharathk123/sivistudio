
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

import { Suspense } from 'react'

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bone flex items-center justify-center text-sage">Loading...</div>}>
            <VerifyForm />
        </Suspense>
    )
}

function VerifyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const emailFromUrl = searchParams.get('email')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const supabase = createClient()

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const newOtp = [...otp]
        pastedData.split('').forEach((char, i) => {
            if (i < 6) newOtp[i] = char
        })
        setOtp(newOtp)
        inputsRef.current[Math.min(pastedData.length, 5)]?.focus()
    }

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        const code = otp.join('')
        if (code.length !== 6) {
            setError('Please enter the full 6-digit code.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailFromUrl,
                    code,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Verification failed')
            }

            // Success: Log the user in (SignInWithPassword won't work easily here without password)
            // Wait - we just confirmed the email. We don't have the password session.
            // But we can redirect to login, or auto-login if we had the password.
            // Since we don't have the password, we must ask them to Login.
            router.push('/login?verified=true')

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Auto-submit when 6 digits filled
    useEffect(() => {
        if (otp.join('').length === 6) {
            handleVerify()
        }
    }, [otp])

    if (!emailFromUrl) {
        return (
            <main className="min-h-screen bg-bone flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-charcoal mb-4">No email provided.</p>
                    <Link href="/signup" className="text-sage underline">Return to Signup</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen grid grid-cols-1 bg-bone">
            <div className="flex items-center justify-center p-8 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full space-y-8"
                >
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-serif italic text-charcoal">
                            Verification
                        </h2>
                        <p className="text-charcoal-400 font-light text-sm">
                            Enter the 6-digit code sent to <br />
                            <span className="font-medium text-charcoal">{emailFromUrl}</span>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputsRef.current[index] = el }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="one-time-code"
                                    className="w-full h-14 text-center text-xl font-serif border border-ivory-200 bg-white focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-colors rounded-sm"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleVerify}
                            disabled={loading || otp.join('').length !== 6}
                            className="w-full py-4 bg-charcoal text-bone hover:bg-sage transition-colors duration-300 text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-charcoal-400">
                            Didn't receive code? <Link href="/signup" className="underline hover:text-sage">Resend</Link> (Signup again)
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
