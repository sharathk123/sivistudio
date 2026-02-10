'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import NavigationOverlay from './NavigationOverlay'
import { useWishlist } from '@/context/WishlistContext'
import { useAuth } from '@/context/AuthContext'
import CartButton from '@/components/cart/CartButton'
import { Heart, User as UserIcon } from 'lucide-react'

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

    // Using specific CSS variables for colors, ensuring we don't need 'as any'
    const textColor = useTransform(
        scrollY,
        [0, 100],
        theme === 'dark'
            ? ['#FDFCFB', '#1A1A1A'] // Bone -> Charcoal
            : ['#1A1A1A', '#1A1A1A'] // Charcoal -> Charcoal
    )

    // Optimized scroll handling using Framer Motion's event hook
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = lastY.get()
        if (latest > previous && latest > 150) {
            setIsHidden(true) // Scroll Down -> Hide
        } else {
            setIsHidden(false) // Scroll Up -> Show
        }
        lastY.set(latest)
    })

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: '-100%' },
                }}
                animate={isHidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    backgroundColor,
                    backdropFilter: backdropBlur,
                    WebkitBackdropFilter: backdropBlur,
                }}
                className="fixed top-0 left-0 right-0 z-[var(--z-header)] px-4 md:px-6 py-4 md:py-6 flex justify-between items-center"
            >
                {/* Center Brand Name */}
                <motion.div
                    style={{ color: textColor }}
                    className="z-50 md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                    <Link href="/" className="flex items-center gap-1.5 md:gap-3 group">
                        <span className="text-sm md:text-xl lg:text-2xl tracking-nav uppercase whitespace-nowrap font-bodoni font-bold transition-transform group-hover:scale-105 duration-500">
                            SIVI
                        </span>
                        <span className="text-sm md:text-xl lg:text-2xl whitespace-nowrap hidden md:block font-allura transition-transform group-hover:scale-105 duration-500">
                            the couturière
                        </span>
                    </Link>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center space-x-4 md:space-x-8 z-50 ml-auto h-8">
                    <motion.div style={{ color: textColor }} className="flex items-center">
                        <Link
                            href="/account?tab=wishlist"
                            className="relative group text-current block hover:text-sage transition-colors duration-300"
                            aria-label={`Wishlist (${wishlistItems.length} items)`}
                        >
                            <Heart className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-copper text-bone text-[8px] md:text-[10px] font-mono flex items-center justify-center rounded-full shadow-sm">
                                    {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                                </span>
                            )}
                        </Link>
                    </motion.div>

                    <motion.div style={{ color: textColor }} className="flex items-center">
                        <CartButton />
                    </motion.div>

                    <motion.div style={{ color: textColor }} className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="uppercase text-[10px] md:text-xs tracking-nav text-current hover:text-sage transition-colors duration-300"
                            aria-expanded={isMenuOpen}
                            aria-label="Open menu"
                        >
                            Menu
                        </button>
                    </motion.div>

                    <motion.div style={{ color: textColor }} className="flex items-center">
                        <Link
                            href={user ? "/account" : "/login"}
                            className="relative group text-current block hover:text-sage transition-colors duration-300"
                            aria-label={user ? 'Account' : 'Login'}
                        >
                            {/* Mobile: Icon */}
                            <UserIcon className="w-5 h-5 md:hidden transition-transform group-hover:scale-110" strokeWidth={1.5} />
                            {/* Desktop: Text */}
                            <span className="hidden md:block uppercase text-xs tracking-nav font-medium">
                                {user ? 'Account' : 'Login'}
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </motion.header>

            <NavigationOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    )
}

