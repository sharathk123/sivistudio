'use client'

/**
 * Client-side hook for role-based access control
 */

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserRole, UserProfile } from '@/lib/auth/roles'

export function useUserRole() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    setProfile(null)
                    setLoading(false)
                    return
                }

                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                setProfile(data)
            } catch (error) {
                console.error('Error loading user profile:', error)
                setProfile(null)
            } finally {
                setLoading(false)
            }
        }

        loadProfile()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            loadProfile()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    return {
        profile,
        loading,
        isAdmin: profile?.role === 'admin',
        isCustomer: profile?.role === 'customer',
        role: profile?.role as UserRole | null,
    }
}
