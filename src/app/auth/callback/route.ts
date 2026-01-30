import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const origin = requestUrl.origin

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Check if profile exists
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', data.user.id)
                .single()

            // Create profile if it doesn't exist (for Google OAuth users)
            if (!existingProfile) {
                const fullName = data.user.user_metadata.full_name || data.user.user_metadata.name || data.user.email?.split('@')[0] || 'User'

                await supabase.from('profiles').insert([
                    {
                        id: data.user.id,
                        full_name: fullName,
                        email: data.user.email!,
                    },
                ])
            }
        }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${origin}/`)
}
