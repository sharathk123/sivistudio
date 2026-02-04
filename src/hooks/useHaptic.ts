'use client'

import { useCallback } from 'react'

/**
 * useHaptic - Standardized haptic feedback for touch devices
 */
export function useHaptic() {
    const trigger = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' = 'light') => {
        if (typeof window !== 'undefined' && navigator.vibrate) {
            switch (type) {
                case 'light':
                    navigator.vibrate(10)
                    break
                case 'medium':
                    navigator.vibrate(20)
                    break
                case 'heavy':
                    navigator.vibrate([20, 10, 20])
                    break
                case 'success':
                    navigator.vibrate([10, 30, 10])
                    break
                case 'warning':
                    navigator.vibrate([100, 50, 100])
                    break
            }
        }
    }, [])

    return trigger
}
