'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-bone flex flex-col">
            <StickyHeader theme="light" />

            <div className="flex-grow flex items-center justify-center px-6 py-24 relative overflow-hidden">
                {/* Background Decor - Subtle Weave */}
                <div className="absolute inset-0 weave-pattern opacity-30 pointer-events-none" />

                {/* Large Background Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif text-charcoal opacity-[0.03] select-none pointer-events-none italic">
                    404
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center max-w-2xl"
                >
                    <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold block mb-6">
                        Page Not Found
                    </span>

                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic mb-8">
                        The Thread Has <br /><span className="text-sage-100">Come Undone</span>
                    </h1>

                    <div className="w-16 h-1 bg-sage mx-auto mb-10" />

                    <p className="text-charcoal-400 text-lg md:text-xl font-light leading-relaxed mb-12">
                        We couldn't locate the page you're looking for. It may have been moved,
                        or perhaps it was never woven into our collection.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/"
                            className="bg-charcoal text-bone px-8 py-4 text-sm uppercase tracking-widest hover:bg-sage transition-all duration-300 shadow-lg flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Return Home
                        </Link>

                        <Link
                            href="/collections"
                            className="border border-charcoal text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-all duration-300"
                        >
                            View Collections
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
