
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { IMAGES } from '@/lib/images'
import Image from 'next/image'

export default function VerifiedPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Side */}
            <div className="relative hidden lg:block h-full bg-bone border-r border-ivory-200">
                <Image
                    src={IMAGES.heritage.ikat} // Reusing a nice heritage image
                    alt="Sivi Atelier Detail"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-charcoal/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="font-serif text-6xl text-white italic tracking-wide drop-shadow-md">
                        The Atelier
                    </h1>
                </div>
            </div>

            {/* Content Side */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-bone">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-sage">
                            Welcome Home
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-charcoal">
                            Account Verified
                        </h2>
                    </div>

                    <div className="w-16 h-[1px] bg-charcoal/20 mx-auto" />

                    <p className="text-charcoal-400 leading-relaxed font-light">
                        Your entrance to the Sivi Atelier is confirmed. You may now curate your wishlist, view exclusive collections, and manage your bespoke orders.
                    </p>

                    <div className="pt-8 space-y-4">
                        <Link
                            href="/shop"
                            className="block w-full py-4 bg-charcoal text-bone hover:bg-sage transition-colors duration-300 text-sm uppercase tracking-widest"
                        >
                            Explore Collections
                        </Link>

                        <Link
                            href="/account"
                            className="block w-full py-4 border border-charcoal/20 text-charcoal hover:border-sage hover:text-sage transition-colors duration-300 text-sm uppercase tracking-widest"
                        >
                            View My Account
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
