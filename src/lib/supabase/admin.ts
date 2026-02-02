
import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client with the Service Role Key (Admin).
 * This client BYPASSES Row Level Security (RLS).
 * USE WITH EXTREME CAUTION.
 * Only use this in server-side API routes where you have explicitly validated the user's permissions.
 */
export const createAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Supabase URL or Service Role Key is missing.')
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
}
