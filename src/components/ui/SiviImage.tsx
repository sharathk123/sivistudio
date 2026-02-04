'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SiviImageProps extends Omit<ImageProps, 'onLoad'> {
    aspectRatio?: 'portrait' | 'square' | 'landscape' | 'wide' | 'original'
    showShimmer?: boolean
    hoverEffect?: 'zoom' | 'none'
    glowOnHover?: boolean
}

/**
 * SiviImage - A premium wrapper for Next.js Image
 * Features standardized shimmers, branded loading states, and elegant transitions.
 */
export default function SiviImage({
    src,
    alt,
    className,
    aspectRatio = 'original',
    showShimmer = true,
    hoverEffect = 'none',
    glowOnHover = false,
    ...props
}: SiviImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // Handle aspect ratio mapping
    const aspectRatioClasses = {
        portrait: 'aspect-portrait',
        square: 'aspect-square',
        landscape: 'aspect-landscape',
        wide: 'aspect-[21/9]',
        original: ''
    }

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-ivory-100",
                aspectRatioClasses[aspectRatio],
                glowOnHover && "hover:shadow-metallic transition-shadow duration-700",
                className
            )}
        >
            {/* Shimmer Placeholder */}
            {showShimmer && isLoading && !isError && (
                <div className="absolute inset-0 z-10">
                    <div className="w-full h-full bg-gradient-to-r from-ivory-100 via-sage-100/30 to-ivory-100 animate-shimmer"
                        style={{ backgroundSize: '1000px 100%' }} />
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ivory-200">
                    <span className="font-serif italic text-charcoal/40 text-xs uppercase tracking-widest">
                        Image Unavailable
                    </span>
                    <div className="w-8 h-px bg-sage/30 mt-2" />
                </div>
            )}

            {/* The Image */}
            {!isError && (
                <motion.div
                    animate={{
                        opacity: isLoading ? 0 : 1,
                        scale: (hoverEffect === 'zoom' && !isLoading) ? undefined : 1
                    }}
                    whileHover={hoverEffect === 'zoom' ? { scale: 1.08 } : undefined}
                    transition={{
                        opacity: { duration: 0.8, ease: "easeOut" },
                        scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="w-full h-full"
                >
                    <Image
                        src={src}
                        alt={alt}
                        className={cn(
                            "object-cover transition-all duration-700",
                            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
                        )}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsError(true)}
                        {...props}
                    />
                </motion.div>
            )}

            {/* Decorative Edge Glow - Purely aesthetic for Sivi brand */}
            <div className="absolute inset-0 border border-charcoal/5 pointer-events-none z-20" />
        </div>
    )
}
