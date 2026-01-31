'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import NavigationOverlay from './NavigationOverlay'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

interface StickyHeaderProps {
    theme?: 'dark' | 'light'
}

export default function StickyHeader({ theme = 'dark' }: StickyHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const { openCart, itemCount } = useCart()
    const { user } = useAuth()

    const { scrollY } = useScroll()
    const lastY = useMotionValue(0)

    // Glassmorphism effect based on scroll
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ['var(--color-sage-transparent)', 'var(--color-sage-overlay)']
    )
    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ['blur(0px)', 'blur(12px)']
    )
    const textColor = useTransform(
        scrollY,
        [0, 100],
        theme === 'dark'
            ? ['var(--color-bone)', 'var(--color-charcoal)']
            : ['var(--color-charcoal)', 'var(--color-charcoal)']
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
                className="fixed top-0 left-0 right-0 z-[40] px-4 md:px-6 py-4 md:py-6 flex justify-between items-center transition-shadow duration-300"
            >
                {/* Center Brand Name */}
                <motion.div
                    style={{ color: textColor as any }}
                    className="z-50 md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                    <Link href="/" className="flex items-center gap-1.5 md:gap-3">
                        <span className="text-sm md:text-xl lg:text-2xl tracking-[0.15em] uppercase whitespace-nowrap" style={{ fontFamily: 'Bodoni Moda, serif', fontWeight: 700 }}>
                            SIVI
                        </span>
                        <span className="text-sm md:text-xl lg:text-2xl whitespace-nowrap hidden md:block" style={{ fontFamily: 'Allura, cursive', fontWeight: 400 }}>
                            the couturière
                        </span>
                    </Link>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center space-x-4 md:space-x-8 z-50 ml-auto">
                    <motion.button
                        onClick={openCart}
                        style={{ color: textColor as any }}
                        className="uppercase text-[10px] md:text-xs tracking-[0.2em] hover:opacity-70 transition-opacity"
                    >
                        <span className="hidden md:inline">Cart</span> ({itemCount})
                    </motion.button>
                    <motion.button
                        onClick={() => setIsMenuOpen(true)}
                        style={{ color: textColor as any }}
                        className="uppercase text-[10px] md:text-xs tracking-[0.2em] hover:opacity-70 transition-opacity"
                    >
                        Menu
                    </motion.button>
                    <Link
                        href={user ? "/account" : "/login"}
                        className="uppercase text-[10px] md:text-xs tracking-[0.2em] hover:opacity-70 transition-opacity hidden md:block" // Hidden on mobile to avoid clutter, visible in menu
                    >
                        <motion.span style={{ color: textColor as any }}>
                            {user ? 'Account' : 'Login'}
                        </motion.span>
                    </Link>
                </div>
            </motion.header>

            <NavigationOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    )
}
