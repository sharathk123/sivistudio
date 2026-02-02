'use client'

import { motion } from 'framer-motion'


interface LogoLoaderProps {
    variant?: 'inline' | 'fullscreen' | 'overlay'
    className?: string
    textClassName?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function LogoLoader({
    variant = 'inline',
    className = '',
    textClassName = '',
    size = 'md'
}: LogoLoaderProps) {
    // Removed mounted check to allow SSR rendering
    // if (!mounted) return null

    const containerClasses = {
        inline: 'flex flex-col items-center justify-center p-8',
        fullscreen: 'fixed inset-0 z-[9999] flex items-center justify-center bg-bone',
        overlay: 'absolute inset-0 z-50 flex items-center justify-center bg-bone/80 backdrop-blur-sm'
    }

    const sizeClasses = {
        sm: {
            title: 'text-xl',
            subtitle: 'text-lg',
            gap: 'gap-0.5'
        },
        md: {
            title: 'text-3xl',
            subtitle: 'text-2xl',
            gap: 'gap-1'
        },
        lg: {
            title: 'text-5xl',
            subtitle: 'text-3xl',
            gap: 'gap-1'
        }
    }

    const currentSize = sizeClasses[size]

    return (
        <motion.div
            className={`${containerClasses[variant]} ${className}`}
            initial={variant !== 'inline' ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={`flex flex-col items-center antialiased ${currentSize.gap} ${textClassName}`}>
                <motion.span
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        y: [0, -2, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`${currentSize.title} tracking-[0.25em] uppercase text-charcoal`}
                    style={{ fontFamily: 'var(--font-bodoni)', fontWeight: 700, textRendering: 'optimizeLegibility' }}
                >
                    SIVI
                </motion.span>
                <motion.span
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className={`${currentSize.subtitle} text-charcoal-400`}
                    style={{ fontFamily: 'var(--font-allura)', fontWeight: 400, textRendering: 'optimizeLegibility', marginTop: '-0.25rem' }}
                >
                    the couturière
                </motion.span>

                {/* Minimalist Progress Line */}
                <motion.div
                    animate={{
                        width: ['0%', '100%', '0%'],
                        opacity: [0, 1, 0],
                        x: ['-25%', '0%', '25%']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="h-[1px] bg-sage mt-4 w-24 opacity-60"
                />
            </div>
        </motion.div>
    )
}
