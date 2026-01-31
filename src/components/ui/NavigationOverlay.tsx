'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface NavigationOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const menuItems = [
    { label: 'Home', href: '/', image: '/images/hero-ikat.png' },
    { label: 'Collections', href: '/shop', image: '/images/saree-editorial.png' },
    { label: 'The Story', href: '/story', image: '/images/story-origins-workshop.png' },
    { label: 'Heritage', href: '/heritage', image: '/images/heritage-hero-textiles.png' },
    { label: 'Custom Tailoring', href: '/custom-tailoring', image: '/images/custom-tailoring.png' },
    { label: 'Account', href: '/account', image: '/images/account.png' },
    { label: 'Contact', href: '/contact', image: '/images/contact.png' },
]

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const firstFocusableRef = useRef<HTMLAnchorElement>(null)

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
                            {menuItems.map((item, index) => (
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
                                        href={item.href}
                                        onClick={onClose}
                                        className="font-serif text-5xl md:text-7xl italic hover:text-sage transition-colors duration-300 block py-2 focus:outline-none focus:text-sage focus:underline"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-12 flex space-x-6 text-xs uppercase tracking-widest text-white/50">
                            <span>Instagram</span>
                            <span>Pinterest</span>
                            <span>Support</span>
                        </div>
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
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={activeImage}
                                        alt="Menu Preview"
                                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
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
