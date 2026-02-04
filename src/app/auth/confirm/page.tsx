
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ConfirmPage() {
    const router = useRouter()
    const supabase = createClient()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const handleConfirmation = async () => {
            // 1. Check for Hash (Implicit Flow)
            if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
                console.log('Implicit flow detected in client handler')
                const { data, error } = await supabase.auth.getSession()

                if (data?.session) {
                    router.push('/auth/verified')
                    return
                }
            }

            // 2. Check for existing session (PKCE that finished already)
            const { data } = await supabase.auth.getSession()
            if (data?.session) {
                router.push('/auth/verified')
                return
            }

            // 3. If neither, it's a true failure
            // Wait a moment to be sure
            setTimeout(() => {
                router.push('/auth/error?message=Verification failed. Please try logging in or requesting a new link.')
            }, 1500)
        }

        handleConfirmation()
    }, [router, supabase])

    return (
        <main className="min-h-screen bg-bone flex items-center justify-center p-6">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-charcoal font-serif italic text-xl">Confirming...</p>
            </div>
        </main>
    )
}
