'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) throw error

            if (data.user) {
                // Create profile in public.profiles table
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            email: email,
                        },
                    ])

                if (profileError) throw profileError

                setMessage({
                    type: 'success',
                    text: 'Account created successfully! Please check your email to verify your account.',
                })

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'An error occurred during sign up',
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
                        Create your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignUp} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-charcoal-200 mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 border border-ivory-400 rounded-sm bg-bone focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

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
                                placeholder="Minimum 6 characters"
                                minLength={6}
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
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-charcoal-300">
                            Already have an account?{' '}
                            <Link href="/login" className="text-sage hover:text-sage-600 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
