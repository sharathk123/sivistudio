/**
 * Role-based Access Control Utilities
 * 
 * Provides helper functions to check user roles and permissions.
 */

import { createClient } from '@/lib/supabase/server'

export type UserRole = 'admin' | 'customer'

export interface UserProfile {
    id: string
    email: string | null
    full_name: string | null
    role: UserRole
    hyderabad_locality: string | null
    created_at: string
    updated_at: string
}

/**
 * Get the current user's profile with role information
 */
export async function getUserProfile(): Promise<UserProfile | null> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return profile
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
    const profile = await getUserProfile()
    return profile?.role === 'admin'
}

/**
 * Check if a specific user is an admin (by user ID)
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    return profile?.role === 'admin'
}

/**
 * Require admin access - throws error if not admin
 * Use this in API routes to protect admin-only endpoints
 */
export async function requireAdmin(): Promise<UserProfile> {
    const profile = await getUserProfile()

    if (!profile) {
        throw new Error('Unauthorized: Not authenticated')
    }

    if (profile.role !== 'admin') {
        throw new Error('Forbidden: Admin access required')
    }

    return profile
}

/**
 * Client-side role check (for UI rendering)
 * Note: Always verify on the server side for security
 */
export function isAdminRole(role: string | null | undefined): boolean {
    return role === 'admin'
}
