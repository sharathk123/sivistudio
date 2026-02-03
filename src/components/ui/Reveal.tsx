'use client'

import { motion, useInView, useAnimation, Variant } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface RevealProps {
    children: React.ReactNode
    width?: 'fit-content' | '100%'
    delay?: number
    duration?: number
    className?: string
    variant?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'scale'
}

export default function Reveal({
    children,
    width = 'fit-content',
    delay = 0.25,
    duration = 0.5,
    className = "",
    variant = 'fade-up'
}: RevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView, mainControls])

    const getVariants = (): { hidden: Variant, visible: Variant } => {
        switch (variant) {
            case 'fade-in':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration, delay } }
                }
            case 'slide-in-right':
                return {
                    hidden: { opacity: 0, x: 75 },
                    visible: { opacity: 1, x: 0, transition: { duration, delay, type: "spring", stiffness: 100 } }
                }
            case 'scale':
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: "easeOut" } }
                }
            case 'fade-up':
            default:
                return {
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } }
                }
        }
    }

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    )
}
