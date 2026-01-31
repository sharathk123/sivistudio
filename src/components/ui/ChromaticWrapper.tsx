'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ChromaticWrapperProps {
    children: ReactNode
    startColor?: string
    endColor?: string
    scrollRange?: [number, number]
}

/**
 * ChromaticWrapper - HOC for scroll-based background color transitions
 * Implements "Chromatic Pacing" to signal narrative shifts
 */
export default function ChromaticWrapper({
    children,
    startColor = 'var(--color-ivory)', // Use CSS variable
    endColor = 'var(--color-charcoal)',   // Use CSS variable
    scrollRange = [0, 800]
}: ChromaticWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [startColor, endColor, endColor]
    )

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor }}
            className="relative transition-colors duration-700"
        >
            {children}
        </motion.div>
    )
}
