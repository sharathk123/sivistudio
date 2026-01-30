'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface MoodBoardItem {
    id: string
    src: string
    alt: string
    aspectRatio: 'portrait' | 'square' | 'landscape'
    label?: string
    price?: string
    colSpan?: 1 | 2
}

interface MoodBoardGridProps {
    items: MoodBoardItem[]
    title?: string
}

export default function MoodBoardGrid({ items, title }: MoodBoardGridProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax effects using CSS variables
    const y1 = useTransform(scrollYProgress, [0, 1], [0, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--parallax-slow') || '-80')])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--parallax-fast') || '-180')])

    const splitIndex = Math.ceil(items.length / 2)
    const col1 = items.slice(0, splitIndex)
    const col2 = items.slice(splitIndex)

    return (
        <section ref={containerRef} className="section-padding max-w-[1800px] mx-auto bg-ivory-50 relative weave-pattern">
            {/* Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 decorative-line-vertical gradient-decorative" />

            {/* 2026: Vertical Typography Label */}
            <div className="absolute left-8 top-32 label-vertical text-metallic hidden md:block">
                Heritage Craft
            </div>

            {title && (
                <div className="mb-32 flex flex-col items-center text-center relative">
                    {/* Metallic Accent Line */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="decorative-line mb-6 gradient-zari-subtle"
                    />

                    {/* Sustainability Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="sustainability-badge mb-4"
                    >
                        <span>✦</span>
                        <span>Handwoven • Sustainable • Artisan-Made</span>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="label-editorial tracking-ultra-wide text-sage-600 mb-6 font-semibold"
                    >
                        Handcrafted Collection
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="title-editorial relative"
                    >
                        {title}
                        {/* Metallic Underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-4 left-0 right-0 h-px gradient-zari origin-center shadow-metallic"
                        />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-charcoal-400 text-sm max-w-md leading-relaxed"
                    >
                        Each piece tells a story of heritage, craftsmanship, and timeless elegance
                    </motion.p>
                </div>
            )}

            <div className="grid-editorial items-start">
                <motion.div style={{ y: y1 }} className="flex flex-col gap-16 md:gap-32">
                    {col1.map((item, index) => (
                        <MoodBoardCard key={item.id} item={item} index={index} />
                    ))}
                </motion.div>

                <motion.div style={{ y: y2 }} className="flex flex-col gap-16 md:gap-32 md:pt-48">
                    {col2.map((item, index) => (
                        <MoodBoardCard key={item.id} item={item} index={index + splitIndex} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function MoodBoardCard({ item, index }: { item: MoodBoardItem, index: number }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    // Handle cached images that don't trigger onLoad
    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true)
        }
    }, [])

    // 2026: Blur parallax on scroll (reduced intensity for visibility)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const blur = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, 2])

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "relative overflow-hidden w-full rounded-sm hover-shadow macro-texture-overlay",
                "shadow-[var(--shadow-sm)]",
                item.aspectRatio === 'portrait' ? "aspect-portrait" :
                    item.aspectRatio === 'landscape' ? "aspect-landscape" : "aspect-square"
            )}>
                {/* 2026: Provenance Stamp */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-4 right-4 z-10 provenance-stamp"
                >
                    Authentic
                </motion.div>

                <motion.div
                    animate={{ scale: isHovered ? 'var(--scale-hover)' : 1 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full h-full relative"
                    style={{
                        scale: isHovered ? 'var(--scale-hover)' : 1,
                        filter: `blur(${blur}px)` // 2026: Blur parallax
                    }}
                >
                    {/* Placeholder Background - only shows while loading */}
                    {!isLoaded && (
                        <div className="absolute inset-0 gradient-loading animate-pulse" />
                    )}

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        ref={imgRef}
                        src={item.src}
                        alt={item.alt}
                        className={cn(
                            "w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
                            isLoaded ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsLoaded(true)}
                    />

                    {/* Enhanced Gradient Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 gradient-overlay-dark"
                    />

                    {/* Hover CTA with Metallic Accent */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute bottom-8 left-8 right-8 flex items-center justify-between"
                    >
                        <span className="label-editorial tracking-wider text-ivory">
                            View Details
                        </span>
                        <motion.div
                            animate={{
                                x: isHovered ? 4 : 0,
                                y: isHovered ? -4 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="icon-md rounded-full gradient-zari flex items-center justify-center shadow-metallic"
                        >
                            <ArrowUpRight className="icon-sm text-charcoal" />
                        </motion.div>
                    </motion.div>

                    {/* Metallic Border Accent */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute bottom-0 left-0 right-0 h-1 gradient-zari origin-left shadow-metallic"
                    />
                </motion.div>
            </div>

            {/* Enhanced Editorial Caption with Artisan Badge */}
            <motion.div
                className="mt-8 flex flex-col md:flex-row md:justify-between md:items-start gap-3"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <div className="space-y-2 flex-1">
                    <motion.p
                        className="subtitle-editorial"
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.label}
                    </motion.p>

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="decorative-divider" />
                        <p className="caption-editorial">
                            Hyderabad Studio — 2024
                        </p>
                    </div>

                    {/* 2026: Artisan Hours Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="artisan-hours"
                    >
                        <span>⏱</span>
                        <span>120+ Artisan Hours</span>
                    </motion.div>
                </div>

                {item.price && (
                    <motion.span
                        className="font-serif italic text-xl accent-copper mt-2 md:mt-0"
                        animate={{ scale: isHovered ? 'var(--scale-subtle)' : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            scale: isHovered ? 'var(--scale-subtle)' : 1
                        }}
                    >
                        {item.price}
                    </motion.span>
                )}
            </motion.div>
        </motion.article>
    )
}
