'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { IMAGES } from '@/lib/images'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

interface NavigationOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const menuItems = [
    { label: 'Home', href: '/', image: IMAGES.heroIkat },
    { label: 'Collections', href: '/collections', image: IMAGES.sareeEditorial },
    { label: 'the Atelier', href: '/shop', image: IMAGES.contemporaryDress },
    { label: 'the Story', href: '/story', image: IMAGES.storyOrigins },
    { label: 'the Heritage', href: '/heritage', image: IMAGES.heritageHeroTextiles },
    { label: 'Custom Tailoring', href: '/custom-tailoring', image: IMAGES.customTailoring },
    { label: 'Account', href: '/account', image: IMAGES.account },
    { label: 'Contact', href: '/contact', image: IMAGES.contact },
]

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const firstFocusableRef = useRef<HTMLAnchorElement>(null)
    const { user, signOut } = useAuth()

    // Keyboard navigation: Escape key handler
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Focus first menu item when overlay opens
            setTimeout(() => {
                firstFocusableRef.current?.focus()
            }, 100)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[50] bg-charcoal text-bone flex"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    {/* Left: Navigation Links */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 z-10 relative">
                        <nav className="flex flex-col space-y-2" aria-label="Main navigation">
                            {menuItems.map((item, index) => {
                                // Skip "Account" in main list if we want custom handling, 
                                // but standard link is fine. We will dynamically change label though.
                                const label = item.label === 'Account' && !user ? 'Log In' : item.label

                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                        onMouseEnter={() => setActiveImage(item.image)}
                                        onMouseLeave={() => setActiveImage(null)}
                                    >
                                        <Link
                                            ref={index === 0 ? firstFocusableRef : null}
                                            href={item.label === 'Account' && !user ? '/login' : item.href}
                                            onClick={onClose}
                                            className="font-serif text-5xl md:text-7xl italic hover:text-sage transition-colors duration-300 block py-2 focus:outline-none focus:text-sage focus:underline"
                                        >
                                            {label}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                            {user && (
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + (menuItems.length * 0.1), duration: 0.5 }}
                                >
                                    <button
                                        onClick={() => {
                                            signOut()
                                            onClose()
                                        }}
                                        className="font-serif text-3xl md:text-5xl italic text-white/50 hover:text-white transition-colors duration-300 block py-2 mt-4 text-left focus:outline-none focus:text-white"
                                    >
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </nav>

                    </div>

                    {/* Right: Hover Reveal Image */}
                    <div className="hidden md:block w-1/2 h-full relative overflow-hidden bg-black/20">
                        <AnimatePresence mode="wait">
                            {activeImage && (
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={activeImage}
                                        alt="Menu Preview"
                                        fill
                                        className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                                        sizes="50vw"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-20 text-xs uppercase tracking-widest hover:text-sage focus:outline-none focus:text-sage focus:underline transition-colors"
                        aria-label="Close navigation menu"
                    >
                        Close [esc]
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
