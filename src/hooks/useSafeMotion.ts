'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * useSafeMotion - A hook that respects user preferences and device capabilities
 * for animations.
 * 
 * Returns false if the user prefers reduced motion or if the device
 * is identified as low-performance (optional, simplified here).
 */
export function useSafeMotion() {
    const prefersReducedMotion = useFramerReducedMotion()
    const [isLowPowerMode, setIsLowPowerMode] = useState(false)

    useEffect(() => {
        // Basic check for low power mode if possible (standard JS doesn't have a direct API, 
        // but we can infer from battery status or frame rate drops if we wanted to be complex).
        // For now, we mainly focus on prefersReducedMotion.
    }, [])

    // If user prefers reduced motion, we absolutely respect it.
    if (prefersReducedMotion) return false

    return true
}

/**
 * Helper to get motion variants or empty objects based on motion safety
 */
export function getSafeMotion(variants: any, isSafe: boolean) {
    return isSafe ? variants : {}
}
