'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavigationOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const menuItems = [
    { label: 'Home', href: '/', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop' },
    { label: 'Collections', href: '/shop', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop' },
    { label: 'The Story', href: '/story', image: 'https://images.unsplash.com/photo-1502920313556-c0bbbcd00403?q=80&w=2124&auto=format&fit=crop' },
    { label: 'Heritage', href: '/story', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Custom Tailoring', href: '/shop', image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?q=80&w=2074&auto=format&fit=crop' },
    { label: 'Account', href: '/dashboard', image: 'https://images.unsplash.com/photo-1550614000-4b9519e07502?q=80&w=2148&auto=format&fit=crop' },
    { label: 'Contact', href: '/shop', image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop' },
]

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[50] bg-charcoal text-bone flex"
                >
                    {/* Left: Navigation Links */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 z-10 relative">
                        <nav className="flex flex-col space-y-2">
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
                                        href={item.href}
                                        onClick={onClose}
                                        className="font-serif text-5xl md:text-7xl italic hover:text-sage transition-colors duration-300 block py-2"
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
                        className="absolute top-8 right-8 z-20 text-xs uppercase tracking-widest hover:text-sage"
                    >
                        Close [esc]
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
