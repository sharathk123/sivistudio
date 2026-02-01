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
                    <div className="flex flex-col items-center antialiased">
                        <div className="flex flex-col items-center gap-1">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-3xl md:text-5xl tracking-[0.25em] uppercase"
                                style={{ fontFamily: 'var(--font-bodoni)', fontWeight: 700, textRendering: 'optimizeLegibility' }}
                            >
                                SIVI
                            </motion.span>
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-2xl md:text-3xl"
                                style={{ fontFamily: 'var(--font-allura)', fontWeight: 400, textRendering: 'optimizeLegibility' }}
                            >
                                the couturière
                            </motion.span>
                        </div>

                        {/* Minimalist Progress Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="h-[1px] bg-sage mt-6 w-full max-w-[120px]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
