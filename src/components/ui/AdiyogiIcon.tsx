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
                {/* Simplified Adiyogi Silhouette */}
                <path
                    d="M50 15C45 15 40 18 38 22C38 22 35 25 35 30C35 35 38 40 42 42V45C42 45 40 46 38 48C35 50 30 55 30 65C30 75 40 85 50 85C60 85 70 75 70 65C70 55 65 50 62 48C60 46 58 45 58 45V42C62 40 65 35 65 30C65 25 62 22 62 22C60 18 55 15 50 15Z"
                    fill={color}
                    fillOpacity="0.2"
                />

                {/* Face & Features Detail */}
                <path
                    d="M50 25C47.2386 25 45 27.2386 45 30C45 32.7614 47.2386 35 50 35C52.7614 35 55 32.7614 55 30C55 27.2386 52.7614 25 50 25Z"
                    fill={color}
                />

                {/* Crescent Moon */}
                <path
                    d="M62 20C62 20 64 21 65 23C66 25 66 28 65 30C64 32 62 33 60 33C61 31 61 28 61 26C61 24 61 22 62 20Z"
                    fill={color}
                />

                {/* Third Eye / Tilak */}
                <path
                    d="M50 28V32"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Flowing Hair (Jata) simplified */}
                <path
                    d="M50 15C50 15 52 10 55 8C58 6 62 8 62 12M50 15C50 15 48 10 45 8C42 6 38 8 38 12"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Subtle Breathing Animation Effect */}
                <motion.path
                    d="M35 70C40 75 60 75 65 70"
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        y: [0, -2, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </svg>
        </motion.div>
    )
}
