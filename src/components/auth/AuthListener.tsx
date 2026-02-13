'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AuthListener() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        if (typeof window === 'undefined') return

        // 1. Handle hash-based sessions (implicit flow/email confirmation)
        if (window.location.hash.includes('access_token')) {
            const handleSession = async () => {
                const { data, error } = await supabase.auth.getSession()

                if (data?.session) {
                    toast.success('Welcome to Sivi Studio!')
                    window.history.replaceState(null, '', window.location.pathname)
                    router.push('/')
                } else if (error) {
                    console.error('Error verifying email link:', error)
                }
            }
            handleSession()
        }

        // 2. Handle login=success query parameter (OAuth/Redirect flow)
        const params = new URLSearchParams(window.location.search)
        if (params.get('login') === 'success') {
            toast.success('Welcome back to Sivi Studio!')
            // Clean up the URL without refreshing
            const newUrl = window.location.pathname + (window.location.hash || '')
            window.history.replaceState(null, '', newUrl)
        }
    }, [router, supabase])

    return null
}
