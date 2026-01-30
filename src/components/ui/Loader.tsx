'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Force cleanup of any potential scroll locks from previous states or extensions
        document.body.classList.remove('antigravity-scroll-lock')
        document.body.style.overflow = ''

        // Simulate loading optimization (waiting for fonts/lenis/videos)
        // In production, we could bind this to actual asset loading events.
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-bone"
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Curtain Effect Content */}
                    <div className="relative overflow-hidden">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="font-serif text-4xl md:text-6xl text-charcoal italic"
                        >
                            Sivi Studio
                        </motion.h1>

                        {/* Minimalist Progress Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="h-[2px] bg-sage mt-4 w-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
