import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

export default async function LandingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="min-h-screen bg-bone text-charcoal selection:bg-sage selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-bone/80 backdrop-blur-md border-b border-ivory-400">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="font-serif text-2xl font-bold italic tracking-tighter">
                        Sivi Studio
                    </Link>
                    <div className="flex items-center gap-8 text-sm tracking-widest uppercase font-medium">
                        <Link href="/shop" className="hover:text-sage transition-colors hidden md:block">
                            Atelier
                        </Link>
                        <Link href="/journal" className="hover:text-sage transition-colors hidden md:block">
                            Journal
                        </Link>
                        {user ? (
                            <Link href="/dashboard" className="bg-charcoal text-white px-5 py-2 rounded-sm hover:bg-sage transition-colors">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="text-charcoal px-5 py-2 hover:text-sage transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8 relative z-10">
                        <span className="text-sage text-sm font-bold tracking-[0.2em] uppercase block mb-4">
                            Est. Hyderabad 2024
                        </span>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-medium text-charcoal italic">
                            Quiet <br />
                            <span className="not-italic text-charcoal-300">Luxury</span> <br />
                            Redefined.
                        </h1>
                        <p className="max-w-md text-lg md:text-xl text-charcoal-400 font-light leading-relaxed pt-4">
                            Premium conscious craft and custom tailoring for the modern aesthete.
                            Experience the art of Sivi.
                        </p>
                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/shop"
                                className="bg-charcoal text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-sage transition-colors text-center"
                            >
                                Explore The Atelier
                            </Link>
                            <Link
                                href="/about"
                                className="border border-charcoal text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-ivory hover:border-sage hover:text-sage transition-colors text-center"
                            >
                                Our Philosophy
                            </Link>
                        </div>
                    </div>

                    {/* Abstract Visual Element (Placeholder for Editorial Image) */}
                    <div className="lg:col-span-5 relative h-[600px] w-full hidden lg:block">
                        <div className="absolute inset-0 bg-sage-100 rounded-t-full rounded-b-full opacity-60 mix-blend-multiply transform rotate-3"></div>
                        <div className="absolute inset-4 bg-ivory-300 rounded-t-full rounded-b-full opacity-80 mix-blend-multiply transform -rotate-2"></div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Dark Mode "Chromatic Pacing" */}
            <section className="bg-charcoal text-bone py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6 sticky top-32">
                            <h2 className="font-serif text-5xl md:text-6xl italic text-sage-100">
                                Conscious Craft
                            </h2>
                            <div className="w-24 h-1 bg-sage"></div>
                        </div>
                        <div className="space-y-12 text-lg md:text-xl font-light text-ivory-200 leading-relaxed">
                            <p>
                                We believe in the power of slow fashion. Every garment is a testament
                                to time-honored techniques, reimagined for the contemporary wardrobe.
                            </p>
                            <p>
                                From the bustling looms of Telangana to the quiet precision of our
                                Hyderabad studio, Sivi represents a dialogue between heritage and
                                modernity.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div>
                                    <h3 className="font-serif text-2xl text-sage mb-2">Sustainable</h3>
                                    <p className="text-sm text-ivory-400">Ethically sourced materials with minimal environmental footprint.</p>
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-sage mb-2">Bespoke</h3>
                                    <p className="text-sm text-ivory-400">Tailored to your unique measurements for the perfect fit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Collection Snippet */}
            <section className="py-32 px-6 bg-ivory-50">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="flex justify-between items-end">
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                            Latest Arrivals
                        </h2>
                        <Link href="/shop" className="text-sm uppercase tracking-widest border-b border-charcoal pb-1 hover:text-sage hover:border-sage transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Placeholder Product Card 1 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-[#E8E6E1] mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <h3 className="font-serif text-xl text-charcoal">The Linen Overlay</h3>
                            <p className="text-sm text-charcoal-400 mt-1">Sage Green • Organic Linen</p>
                            <p className="text-sage mt-2">₹4,500</p>
                        </div>
                        {/* Placeholder Product Card 2 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-[#E0DED9] mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <h3 className="font-serif text-xl text-charcoal">Structured Midi</h3>
                            <p className="text-sm text-charcoal-400 mt-1">Charcoal • Handloom Cotton</p>
                            <p className="text-sage mt-2">₹5,200</p>
                        </div>
                        {/* Placeholder Product Card 3 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-[#D8D6D1] mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <h3 className="font-serif text-xl text-charcoal">Asymmetric Tunic</h3>
                            <p className="text-sm text-charcoal-400 mt-1">Ivory • Raw Silk Blend</p>
                            <p className="text-sage mt-2">₹3,800</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-charcoal text-ivory-400 py-20 px-6 border-t border-charcoal-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-serif text-3xl italic text-bone mb-6">Sivi Studio</h4>
                        <p className="max-w-sm text-sm leading-relaxed mb-8">
                            A celebration of quiet luxury and conscious craft.
                            Designed and tailored in Hyderabad.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 rounded-full bg-charcoal-300"></div>
                            <div className="w-8 h-8 rounded-full bg-charcoal-300"></div>
                            <div className="w-8 h-8 rounded-full bg-charcoal-300"></div>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Explore</h5>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/shop" className="hover:text-sage transition-colors">The Atelier</Link></li>
                            <li><Link href="/about" className="hover:text-sage transition-colors">Our Story</Link></li>
                            <li><Link href="/journal" className="hover:text-sage transition-colors">Journal</Link></li>
                            <li><Link href="/careers" className="hover:text-sage transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Support</h5>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/contact" className="hover:text-sage transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-sage transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/care" className="hover:text-sage transition-colors">Garment Care</Link></li>
                            <li><Link href="/privacy" className="hover:text-sage transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-charcoal-300 text-xs flex justify-between items-center text-charcoal-400">
                    <p>&copy; 2024 Sivi Studio. All rights reserved.</p>
                    <p>Made with love in India.</p>
                </div>
            </footer>
        </div>
    )
}
