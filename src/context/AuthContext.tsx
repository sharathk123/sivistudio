'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface Profile {
    id: string
    full_name: string | null
    email: string | null
    hyderabad_locality?: string | null
    role?: 'customer' | 'admin'
    // Add other profile fields as needed
}

interface AuthContextType {
    user: User | null
    session: Session | null
    profile: Profile | null
    isLoading: boolean
    signOut: () => Promise<void>
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession()
                setSession(currentSession)
                setUser(currentSession?.user ?? null)

                if (currentSession?.user) {
                    await fetchProfile(currentSession.user.id)
                }
            } catch (error) {
                console.error('Error fetching session:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            setSession(currentSession)
            setUser(currentSession?.user ?? null)

            if (currentSession?.user) {
                // If we don't have a profile yet or the user changed, fetch it
                if (!profile || profile.id !== currentSession.user.id) {
                    await fetchProfile(currentSession.user.id)
                }
            } else {
                setProfile(null)
            }
            setIsLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                // Supabase sometimes returns a generic error object or PGRST116 when no rows found
                const isNoRowsError = error.code === 'PGRST116' ||
                    (typeof error === 'object' && Object.keys(error).length === 0) ||
                    JSON.stringify(error) === '{}'

                if (isNoRowsError) {
                    setProfile(null)
                } else {
                    console.error('Error fetching profile:', error)
                }
            } else {
                setProfile(data)
            }
        } catch (error) {
            console.error('Error in fetchProfile:', error)
        }
    }

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id)
        }
    }

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        } finally {
            setUser(null)
            setSession(null)
            setProfile(null)
            // Using window.location.href to force a full page reload and clear any client-side state/cache
            window.location.href = '/login'
        }
    }

    return (
        <AuthContext.Provider value={{ user, session, profile, isLoading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
