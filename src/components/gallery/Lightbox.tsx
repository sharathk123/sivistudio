'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { GalleryItem } from '@/data/galleryData'
import { useSafeMotion } from '@/hooks/useSafeMotion'

interface LightboxProps {
    item: GalleryItem | null
    onClose: () => void
}

export default function Lightbox({ item, onClose }: LightboxProps) {

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (item) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden' // Lock scroll
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset' // Unlock scroll
        }
    }, [item, onClose])

    const isSafeMotion = useSafeMotion()
    if (!item) return null

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: isSafeMotion ? 0.3 : 0.1 }}
                    className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
                    onClick={onClose} // Backdrop click to close
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    <div
                        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent close on image click
                    >
                        <motion.div
                            initial={isSafeMotion ? { scale: 0.9, opacity: 0 } : { opacity: 0 }}
                            animate={isSafeMotion ? { scale: 1, opacity: 1 } : { opacity: 1 }}
                            exit={isSafeMotion ? { scale: 0.9, opacity: 0 } : { opacity: 0 }}
                            transition={isSafeMotion ? { type: 'spring', damping: 25, stiffness: 300 } : { duration: 0.1 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>

                        {item.caption && (
                            <motion.div
                                initial={isSafeMotion ? { opacity: 0, y: 20 } : { opacity: 1 }}
                                animate={isSafeMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                                className="absolute bottom-4 md:bottom-8 left-0 right-0 text-center"
                            >
                                <span className="bg-charcoal/60 text-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-light tracking-wide">
                                    {item.caption}
                                </span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
