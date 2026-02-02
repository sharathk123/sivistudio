'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { CheckCircle, ArrowRight, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function CheckoutSuccessPage() {
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
        <main className="min-h-screen bg-bone pt-28 pb-24">
            <StickyHeader theme="light" />

            <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                        <CheckCircle size={48} strokeWidth={1.5} />
                    </div>
                </motion.div>

                <h1 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-4">Order Confirmed!</h1>
                <p className="text-lg text-charcoal-400 mb-8 max-w-lg mx-auto">
                    Thank you for shopping with Sivi Studio. Your timeless piece is being prepared with care.
                </p>

                {orderId && (
                    <div className="inline-block bg-white border border-charcoal/10 px-6 py-3 rounded-full mb-12">
                        <span className="text-charcoal-400 text-sm uppercase tracking-widest mr-2">Order ID:</span>
                        <span className="font-mono font-bold text-charcoal">{orderId.slice(0, 8).toUpperCase()}</span>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/account"
                        className="btn-secondary min-w-[200px] flex items-center justify-center gap-2"
                    >
                        <Package size={18} />
                        View Order Status
                    </Link>
                    <Link
                        href="/shop"
                        className="btn-primary min-w-[200px] flex items-center justify-center gap-2"
                    >
                        Continue Shopping
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    )
}
