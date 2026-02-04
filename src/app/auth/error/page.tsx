
'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthErrorPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const supabase = createClient()
    const message = searchParams.get('message') || 'Authentication failed. Please try again.'

    // Start with loading true to prevent flash of error
    const [isVerifying, setIsVerifying] = useState(true)

    useEffect(() => {
        const checkHash = async () => {
            // If we have a hash with access_token, this is likely a success case
            // disguised as an error because the server missed the code.
            if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
                console.log('Hash detected on error page, attempting verification...')
                const { data, error } = await supabase.auth.getSession()

                if (data?.session) {
                    // Success! Redirect to verified
                    router.push('/auth/verified')
                    return
                }
            }

            // If we get here, it really is an error
            // Small delay to prevent flickering if it was just confirming
            setTimeout(() => {
                setIsVerifying(false)
            }, 500)
        }

        checkHash()
    }, [supabase, router])

    if (isVerifying) {
        return (
            <main className="min-h-screen bg-bone flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-charcoal font-serif italic text-xl">Verifying...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-bone flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-white border border-ivory-200 p-12 text-center shadow-sm">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-800/80">
                        <AlertCircle className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="font-serif text-3xl text-charcoal italic mb-4">
                    Link Expired or Invalid
                </h1>

                <p className="text-charcoal-400 font-light mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="block w-full py-3 bg-charcoal text-bone hover:bg-sage transition-colors duration-300 text-sm uppercase tracking-widest"
                    >
                        Return to Login
                    </Link>
                    <Link
                        href="/contact"
                        className="block w-full py-3 text-sage hover:text-charcoal transition-colors duration-300 text-sm uppercase tracking-widest text-xs"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    )
}
