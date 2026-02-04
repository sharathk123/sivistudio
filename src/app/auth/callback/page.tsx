
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IMAGES } from '@/lib/images'

export default function AuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()
    const [status, setStatus] = useState<'verifying' | 'error'>('verifying')

    useEffect(() => {
        let mounted = true

        const handleAuth = async () => {
            // 1. Setup Request Listener (Robust way to catch Hash or Session)
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || session) {
                    console.log('Auth state change: Signed In')
                    if (mounted) router.push('/auth/verified')
                }
            })

            // 2. Check for PKCE Code explicitly
            const code = searchParams.get('code')
            if (code) {
                console.log('Exchanging code for session...')
                const { error } = await supabase.auth.exchangeCodeForSession(code)
                if (error) {
                    console.error('Code exchange error:', error)
                    // Don't error out yet, waiting for listener might still work
                }
            }

            // 3. One-time check in case we are already signed in (e.g. hydration)
            const { data: { session }, error } = await supabase.auth.getSession()
            if (session) {
                if (mounted) router.push('/auth/verified')
            } else if (!code && !window.location.hash.includes('access_token')) {
                // No code, no hash, no session -> Error
                // Only set error if we are sure (give a small grace period for listener)
                setTimeout(() => {
                    if (mounted) setStatus('error')
                }, 2000)
            } else {
                // We have a code or hash, wait for listener or timeout
                setTimeout(() => {
                    // Re-check one last time
                    supabase.auth.getSession().then(({ data }) => {
                        if (!data.session && mounted) setStatus('error')
                    })
                }, 4000)
            }

            return () => {
                subscription.unsubscribe()
                mounted = false
            }
        }

        handleAuth()
    }, [router, searchParams, supabase])

    // Handle Error Redirect in Effect, not Render
    useEffect(() => {
        if (status === 'error') {
            router.replace('/auth/error?message=Verification%20failed.%20Please%20try%20requesting%20a%20new%20link.')
        }
    }, [status, router])

    if (status === 'error') return null

    // Loading State
    return (
        <main className="min-h-screen bg-bone flex items-center justify-center p-6">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-charcoal font-serif italic text-xl">One moment, verifying your invitation...</p>
            </div>
        </main>
    )
}
