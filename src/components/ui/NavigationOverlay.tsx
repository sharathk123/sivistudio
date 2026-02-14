'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { IMAGES } from '@/lib/images'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { useSafeMotion } from '@/hooks/useSafeMotion'

interface NavigationOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const MENU_ITEMS = [
    { label: 'Home', href: '/', image: IMAGES.heroIkat },
    { label: 'Collections', href: '/collections', image: IMAGES.sareeEditorial },
    { label: 'the Atelier', href: '/shop', image: IMAGES.contemporaryDress },
    { label: 'the Story', href: '/story', image: IMAGES.storyOrigins },
    { label: 'the Heritage', href: '/heritage', image: IMAGES.heritageHeroTextiles },
    { label: 'the Archive', href: '/gallery', image: IMAGES.sareeEditorial },
    { label: 'Custom Tailoring', href: '/custom-tailoring', image: IMAGES.customTailoring },
    { label: 'Account', href: '/account', image: IMAGES.account },
    { label: 'Contact', href: '/contact', image: IMAGES.contact },
]

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
    const [activeImage, setActiveImage] = useState<string | null>(MENU_ITEMS[0].image)
    const { user, signOut, profile } = useAuth()
    const isSafeMotion = useSafeMotion()
    const overlayRef = useRef<HTMLDivElement>(null)

    // Derived menu items with dynamic labels
    const displayItems = useMemo(() => {
        const items = MENU_ITEMS.map(item => ({
            ...item,
            displayLabel: (item.label === 'Account' && !user) ? 'Log In' : item.label,
            displayHref: (item.label === 'Account' && !user) ? '/login' : item.href
        }))

        if (profile?.role === 'admin') {
            items.splice(items.length - 2, 0, { // Insert before Account
                label: 'Admin',
                href: '/admin',
                image: IMAGES.heroIkat,
                displayLabel: 'Dashboard',
                displayHref: '/admin'
            })
        }

        return items
    }, [user, profile])

    // Keyboard navigation and Focus Trapping
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()

            if (e.key === 'Tab' && overlayRef.current) {
                const focusableElements = overlayRef.current.querySelectorAll(
                    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                )
                const firstElement = focusableElements[0] as HTMLElement
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus()
                        e.preventDefault()
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus()
                        e.preventDefault()
                    }
                }
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'

            // Auto-focus first element
            const timer = setTimeout(() => {
                const firstLink = overlayRef.current?.querySelector('a')
                firstLink?.focus()
            }, 100)

            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                document.body.style.overflow = 'unset'
                clearTimeout(timer)
            }
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
                    transition={{ duration: isSafeMotion ? 0.5 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-charcoal text-bone flex"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x > 100 || velocity.x > 500) {
                            onClose()
                        }
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    {/* Left: Navigation Links */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 z-10 relative overflow-y-auto scrollbar-hide pt-24 pb-32">
                        <nav className="flex flex-col space-y-1 pointer-events-auto" aria-label="Main navigation">
                            {displayItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={isSafeMotion ? { x: -30, opacity: 0 } : { x: 0, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        delay: isSafeMotion ? 0.1 + (index * 0.05) : 0,
                                        duration: isSafeMotion ? 0.6 : 0.2,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    onMouseEnter={() => setActiveImage(item.image)}
                                >
                                    <Link
                                        href={item.displayHref}
                                        onClick={onClose}
                                        className="font-serif text-4xl md:text-5xl italic hover:text-sage transition-all duration-300 block py-3 md:py-2 focus:outline-none focus:text-sage focus:pl-4"
                                    >
                                        {item.displayLabel}
                                    </Link>
                                </motion.div>
                            ))}

                            {user && (
                                <motion.button
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    onClick={() => {
                                        signOut()
                                        onClose()
                                    }}
                                    className="font-serif text-xl md:text-2xl italic text-white/40 hover:text-white transition-colors duration-300 block py-3 text-left focus:outline-none focus:text-white"
                                >
                                    Sign Out
                                </motion.button>
                            )}
                        </nav>
                    </div>

                    {/* Right: Hover Reveal Image */}
                    <div className="hidden md:block w-1/2 h-full relative overflow-hidden bg-black/10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage || 'default'}
                                initial={isSafeMotion ? { opacity: 0, scale: 1.05 } : { opacity: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: isSafeMotion ? 0.95 : 1 }}
                                transition={{ duration: isSafeMotion ? 0.8 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                {activeImage && (
                                    <Image
                                        src={activeImage}
                                        alt="Menu Preview"
                                        fill
                                        className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                                        sizes="50vw"
                                        priority
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-20 text-xs uppercase tracking-widest hover:text-sage transition-all duration-300 focus:outline-none focus:text-sage"
                        aria-label="Close navigation menu"
                    >
                        Close [esc]
                    </button>

                    {/* Backdrop decorative element */}
                    <div className="absolute bottom-0 left-0 w-full h-px gradient-zari opacity-20" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

