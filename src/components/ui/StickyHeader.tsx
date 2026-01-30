'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import NavigationOverlay from './NavigationOverlay'
import { useCart } from '@/context/CartContext'

export default function StickyHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const { openCart, itemCount } = useCart()

    const { scrollY } = useScroll()
    const lastY = useMotionValue(0)

    // Hide header on scroll down, show on scroll up
    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const previous = lastY.get()
            if (latest > previous && latest > 150) {
                setIsHidden(true)
            } else {
                setIsHidden(false)
            }
            lastY.set(latest)
        })
    }, [scrollY, lastY])

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: '-100%' },
                }}
                animate={isHidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-[40] px-6 py-6 mix-blend-difference text-bone flex justify-between items-center"
            >
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight italic z-50">
                    Sivi
                </Link>

                {/* Actions */}
                <div className="flex items-center space-x-8 z-50">
                    <button
                        onClick={openCart}
                        className="uppercase text-xs tracking-[0.2em] hover:text-sage transition-colors"
                    >
                        Cart ({itemCount})
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="uppercase text-xs tracking-[0.2em] hover:text-sage transition-colors"
                    >
                        Menu
                    </button>
                </div>
            </motion.header>

            <NavigationOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    )
}
