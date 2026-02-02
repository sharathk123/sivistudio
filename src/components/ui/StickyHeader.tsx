'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import NavigationOverlay from './NavigationOverlay'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useAuth } from '@/context/AuthContext'
import CartButton from '@/components/cart/CartButton'
import { Heart } from 'lucide-react'

interface StickyHeaderProps {
    theme?: 'dark' | 'light'
}

export default function StickyHeader({ theme = 'dark' }: StickyHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const { user } = useAuth()
    const { items: wishlistItems } = useWishlist()

    const { scrollY } = useScroll()
    const lastY = useMotionValue(0)

    // Glassmorphism effect based on scroll - Sage Green Sticky Header
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ['rgba(156, 167, 112, 0)', 'rgba(156, 167, 112, 0.95)'] // Transparent to Opaque Sage
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
            ? ['#FDFCFB', '#1A1A1A'] // Bone -> Charcoal (Dark Text on Sage BG)
            : ['#1A1A1A', '#1A1A1A'] // Charcoal -> Charcoal (Stay Dark)
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
                className="fixed top-0 left-0 right-0 z-[var(--z-header)] px-4 md:px-6 py-4 md:py-6 flex justify-between items-center transition-shadow duration-300"
            >
                {/* Center Brand Name */}
                <motion.div
                    style={{ color: textColor as any }}
                    className="z-50 md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                    <Link href="/" className="flex items-center gap-1.5 md:gap-3">
                        <span className="text-sm md:text-xl lg:text-2xl tracking-nav uppercase whitespace-nowrap" style={{ fontFamily: 'var(--font-bodoni)', fontWeight: 700 }}>
                            SIVI
                        </span>
                        <span className="text-sm md:text-xl lg:text-2xl whitespace-nowrap hidden md:block" style={{ fontFamily: 'var(--font-allura)', fontWeight: 400 }}>
                            the couturière
                        </span>
                    </Link>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center space-x-4 md:space-x-8 z-50 ml-auto">
                    <motion.div style={{ color: textColor as any }}>
                        <Link href="/account?tab=wishlist" className="relative group text-current block" aria-label="Wishlist">
                            <Heart className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-copper text-bone text-xs font-mono flex items-center justify-center rounded-full animate-fadeInUp">
                                    {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                                </span>
                            )}
                        </Link>
                    </motion.div>

                    <motion.div style={{ color: textColor as any }}>
                        <CartButton />
                    </motion.div>

                    <motion.button
                        onClick={() => setIsMenuOpen(true)}
                        style={{ color: textColor as any }}
                        className="uppercase text-[10px] md:text-xs tracking-nav hover:opacity-70 transition-opacity"
                    >
                        Menu
                    </motion.button>
                    <Link
                        href={user ? "/account" : "/login"}
                        className="uppercase text-[10px] md:text-xs tracking-nav hover:opacity-70 transition-opacity hidden md:block" // Hidden on mobile to avoid clutter, visible in menu
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
