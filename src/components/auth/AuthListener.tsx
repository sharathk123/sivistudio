'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthListener() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Only run if we have a hash in the URL (implicit flow)
        if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
            const handleSession = async () => {
                const { data, error } = await supabase.auth.getSession()

                if (data?.session) {
                    // Successful login from the hash
                    console.log('Verified email session detected')

                    // Clear the hash to clean up the URL
                    window.history.replaceState(null, '', window.location.pathname)

                    // Redirect to the home page
                    // This handles the case where we might be on /auth/error incorrectly due to implicit flow
                    router.push('/')
                } else if (error) {
                    console.error('Error verifying email link:', error)
                }
            }

            handleSession()
        }
    }, [router, supabase])

    return null
}
