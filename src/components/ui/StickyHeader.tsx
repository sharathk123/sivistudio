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

    // Glassmorphism effect based on scroll
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ['rgba(154, 167, 112, 0)', 'rgba(154, 167, 112, 0.8)']
    )
    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ['blur(0px)', 'blur(12px)']
    )
    const textColor = useTransform(
        scrollY,
        [0, 100],
        ['#FDFCFB', '#1A1A1A']
    )

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
                style={{
                    backgroundColor,
                    backdropFilter: backdropBlur,
                    WebkitBackdropFilter: backdropBlur,
                }}
                className="fixed top-0 left-0 right-0 z-[40] px-6 py-6 flex justify-between items-center transition-shadow duration-300"
            >
                {/* Center Brand Name */}
                <motion.div
                    style={{ color: textColor }}
                    className="absolute left-1/2 -translate-x-1/2 z-50"
                >
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl tracking-[0.15em] uppercase" style={{ fontFamily: 'Bodoni Moda, serif', fontWeight: 700 }}>
                            SIVI
                        </span>
                        <span className="text-xl md:text-2xl" style={{ fontFamily: 'Allura, cursive', fontWeight: 400 }}>
                            the couturier
                        </span>
                    </Link>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center space-x-8 z-50 ml-auto">
                    <motion.button
                        onClick={openCart}
                        style={{ color: textColor }}
                        className="uppercase text-xs tracking-[0.2em] hover:opacity-70 transition-opacity"
                    >
                        Cart ({itemCount})
                    </motion.button>
                    <motion.button
                        onClick={() => setIsMenuOpen(true)}
                        style={{ color: textColor }}
                        className="uppercase text-xs tracking-[0.2em] hover:opacity-70 transition-opacity"
                    >
                        Menu
                    </motion.button>
                </div>
            </motion.header>

            <NavigationOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    )
}
