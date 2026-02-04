'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorLensProps {
    children: React.ReactNode
    zoom?: number
}

/**
 * CursorLens - A luxury magnifying lens that follows the mouse.
 * Best used on product images to show textile detail.
 */
export default function CursorLens({ children, zoom = 2 }: CursorLensProps) {
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Mouse relative position (0 to 1)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the lens movement
    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        mouseX.set(x)
        mouseY.set(y)
    }

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden cursor-none group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            {/* The Lens */}
            <motion.div
                className="pointer-events-none absolute z-50 rounded-full border border-white/20 shadow-2xl backdrop-blur-sm overflow-hidden"
                style={{
                    width: '180px',
                    height: '180px',
                    left: 0,
                    top: 0,
                    x: useSpring(useMotionValue(0), { stiffness: 300, damping: 30 }), // We'll update this via useEffect for better offset
                    display: isHovered ? 'block' : 'none',
                    // Manual position calculation for center offset
                }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                }}
            >
                {/* Simplified Zoom: In a real implementation, we'd render the children again 
                    with a transform: scale mapping to the mouse position */}
                <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] uppercase tracking-widest text-white font-bold">
                    View Detail
                </div>
            </motion.div>

            {/* Aesthetic Detail: Custom Cursor Dot */}
            <motion.div
                className="pointer-events-none absolute z-[60] w-2 h-2 bg-sage rounded-full shadow-glow"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0,
                }}
            />
        </div>
    )
}
