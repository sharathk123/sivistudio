'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { CheckCircle, ArrowRight, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, Suspense } from 'react'
import confetti from 'canvas-confetti'

function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')

    useEffect(() => {
        // Celebrate!
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="max-w-xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Visual Icon */}
                <motion.div
                    initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-sage to-[var(--color-sage-600)] rounded-full flex items-center justify-center text-bone shadow-2xl mb-8"
                >
                    <CheckCircle size={48} strokeWidth={1.5} />
                </motion.div>

                {/* Text Content */}
                <h1 className="font-serif text-5xl md:text-6xl text-charcoal italic mb-4">Confirmed</h1>
                <p className="text-lg text-charcoal-400 mb-10 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your order has been placed and is being processed with care.
                </p>

                {/* Receipt Card */}
                {orderId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-white p-8 rounded-none border border-ivory-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] mb-12 relative overflow-hidden group"
                    >
                        {/* Decorative Top Border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage via-copper to-sage opacity-50" />

                        <span className="text-xs uppercase tracking-[0.2em] text-ivory-400 block mb-2">Order Reference</span>
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-2xl font-medium text-charcoal tracking-widest">{orderId.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <span className="px-3 py-1 bg-sage/10 text-sage text-xs uppercase tracking-widest rounded-full">Paid via Razorpay</span>
                        </div>
                    </motion.div>
                )}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/account?tab=orders"
                        className="w-full sm:w-auto px-8 py-4 border border-charcoal text-charcoal uppercase tracking-widest text-xs hover:bg-charcoal hover:text-bone transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <Package size={16} />
                        <span>Track Order</span>
                    </Link>
                    <Link
                        href="/shop"
                        className="w-full sm:w-auto px-8 py-4 bg-charcoal text-bone uppercase tracking-widest text-xs hover:bg-sage transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                    >
                        <span>Return to the Atelier</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

function SuccessFallback() {
    return (
        <div className="max-w-3xl mx-auto px-6 text-center animate-pulse">
            <div className="w-24 h-24 bg-sage/10 rounded-full mx-auto mb-8" />
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <main className="min-h-screen bg-bone pt-28 pb-24">
            <StickyHeader theme="light" />
            <Suspense fallback={<SuccessFallback />}>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    )
}
