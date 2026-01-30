'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
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
            setMessage({
                type: 'error',
                text: error.message || 'An error occurred during login',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bone px-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="font-serif text-5xl font-bold text-charcoal italic">
                        Sivi Studio
                    </h1>
                    <p className="mt-4 text-lg text-charcoal-300 tracking-wide-luxury">
                        Welcome back
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-charcoal-200 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-ivory-400 rounded-sm bg-bone focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-charcoal-200 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-ivory-400 rounded-sm bg-bone focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    {message && (
                        <div
                            className={`p-4 rounded-sm ${message.type === 'error'
                                    ? 'bg-red-50 text-red-800 border border-red-200'
                                    : 'bg-green-50 text-green-800 border border-green-200'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-sage text-white font-medium rounded-sm hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    {/* Signup Link */}
                    <div className="text-center">
                        <p className="text-sm text-charcoal-300">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-sage hover:text-sage-600 font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
