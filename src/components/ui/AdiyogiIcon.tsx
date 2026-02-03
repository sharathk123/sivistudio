'use client'

import { motion } from 'framer-motion'

interface AdiyogiIconProps {
    className?: string
    size?: number
    color?: string
}

export default function AdiyogiIcon({
    className = "",
    size = 48,
    color = "var(--color-sage)"
}: AdiyogiIconProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.1,
                filter: "drop-shadow(0 0 8px rgba(156, 167, 112, 0.4))"
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center justify-center ${className}`}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Simplified Adiyogi Silhouette - More iconic */}
                <path
                    d="M50 15C42 15 35 22 35 31C35 38 38 41 42 43V46C38 49 30 54 30 65C30 78 39 88 50 88C61 88 70 78 70 65C70 54 62 49 58 46V43C62 41 65 38 65 31C65 22 58 15 50 15Z"
                    fill={color}
                    fillOpacity="0.15"
                />

                {/* Main Head & Features */}
                <path
                    d="M50 22C46 22 43 25 43 30C43 35 46 38 50 38C54 38 57 35 57 30C57 25 54 22 50 22Z"
                    fill={color}
                />

                {/* Third Eye / Tilak - Bolder */}
                <path
                    d="M50 26V32"
                    stroke="var(--color-bone)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-80"
                />

                {/* Crescent Moon - More distinct */}
                <path
                    d="M62 18C64 19 66 21 66 25C66 29 64 32 60 33C62 31 63 28 63 25C63 22 62 20 62 18Z"
                    fill={color}
                    stroke={color}
                    strokeWidth="1"
                />

                {/* Top Jata (Hair knot) - Defined */}
                <path
                    d="M45 15L50 8L55 15"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Subtle Breathing Base */}
                <motion.path
                    d="M38 75C42 78 58 78 62 75"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </svg>
        </motion.div>
    )
}
