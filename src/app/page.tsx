import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const handleSignOut = async () => {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-bone">
            {/* Header */}
            <header className="bg-ivory border-b border-ivory-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="font-serif text-3xl font-bold text-charcoal italic">
                            Sivi Studio
                        </h1>
                        <form action={handleSignOut}>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm text-charcoal-300 hover:text-sage transition-colors"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm border border-ivory-400 p-8">
                    <h2 className="font-serif text-4xl font-bold text-charcoal mb-4">
                        Welcome, {profile?.full_name || 'Guest'}
                    </h2>
                    <p className="text-lg text-charcoal-300 mb-8 tracking-wide-luxury">
                        Your journey into Quiet Luxury begins here.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="p-6 bg-ivory rounded-sm">
                            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                                Your Profile
                            </h3>
                            <p className="text-sm text-charcoal-300 mb-4">
                                Manage your personal information and preferences
                            </p>
                            <Link
                                href="/profile"
                                className="inline-block px-4 py-2 bg-sage text-white text-sm rounded-sm hover:bg-sage-600 transition-colors"
                            >
                                View Profile
                            </Link>
                        </div>

                        {/* Measurements Card */}
                        <div className="p-6 bg-ivory rounded-sm">
                            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                                Measurements
                            </h3>
                            <p className="text-sm text-charcoal-300 mb-4">
                                Add your custom sizing for personalized tailoring
                            </p>
                            <Link
                                href="/measurements"
                                className="inline-block px-4 py-2 bg-sage text-white text-sm rounded-sm hover:bg-sage-600 transition-colors"
                            >
                                Add Measurements
                            </Link>
                        </div>

                        {/* Shop Card */}
                        <div className="p-6 bg-ivory rounded-sm">
                            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                                Explore Collection
                            </h3>
                            <p className="text-sm text-charcoal-300 mb-4">
                                Discover our curated selection of conscious craft
                            </p>
                            <Link
                                href="/shop"
                                className="inline-block px-4 py-2 bg-sage text-white text-sm rounded-sm hover:bg-sage-600 transition-colors"
                            >
                                Browse Shop
                            </Link>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="mt-8 pt-8 border-t border-ivory-400">
                        <h3 className="font-medium text-charcoal mb-4">Account Details</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm text-charcoal-300">Email</dt>
                                <dd className="text-charcoal font-medium">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-charcoal-300">Location</dt>
                                <dd className="text-charcoal font-medium">
                                    {profile?.hyderabad_locality || 'Not specified'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </main>
        </div>
    )
}
