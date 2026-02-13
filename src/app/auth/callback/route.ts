import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && session?.user) {
            // Check if profile exists in public.profiles
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', session.user.id)
                .single()

            if (!profile) {
                // No profile found - sign them out and redirect to signup
                await supabase.auth.signOut()
                return NextResponse.redirect(
                    `${origin}/signup?error=${encodeURIComponent(
                        'No Sivi account found for this email. Please register first.'
                    )}`
                )
            }

            return NextResponse.redirect(`${origin}${next}`)
        } else if (error) {
            console.error('Auth Error during code exchange:', error)
        }
    }

    // Redirect to error page with fallback origin
    return NextResponse.redirect(`${origin}/auth/error?message=Verification%20failed.%20Please%20try%20requesting%20a%20new%20link.`)
}
