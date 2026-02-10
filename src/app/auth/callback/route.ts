import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/auth/verified'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // In Vercel, 'origin' will correctly be the deployment URL
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            console.error('Auth Error during code exchange:', error)
        }
    }

    // Redirect to error page with fallback origin
    return NextResponse.redirect(`${origin}/auth/error?message=Verification%20failed.%20Please%20try%20requesting%20a%20new%20link.`)
}
