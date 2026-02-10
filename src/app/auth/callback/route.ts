import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/auth/verified'

    if (code) {
        const supabase = await createClient()
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && session?.user) {
            // Check if profile exists
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', session.user.id)
                .single()

            if (!profile) {
                // If no profile exists, this user authenticated via Google but hasn't "registered" in our system.
                // We sign them out to prevent a partial session and tell them to register.
                await supabase.auth.signOut()
                return NextResponse.redirect(`${origin}/signup?error=account_not_found&message=No%20Sivi%20account%20found%20for%20this%20email.%20Please%20register%20first.`)
            }

            // In Vercel, 'origin' will correctly be the deployment URL
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            console.error('Auth Error during code exchange:', error)
        }
    }

    // Redirect to error page with fallback origin
    return NextResponse.redirect(`${origin}/auth/error?message=Verification%20failed.%20Please%20try%20requesting%20a%20new%20link.`)
}
