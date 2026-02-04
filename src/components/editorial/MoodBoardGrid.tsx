'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useRef, useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useSafeMotion } from '@/hooks/useSafeMotion'
import SiviImage from '@/components/ui/SiviImage'

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

    // Parallax logic abstracted for the two primary columns
    // We use slightly different offsets for an asymmetrical, editorial feel
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -140])

    const { col1, col2 } = useMemo(() => {
        const splitIndex = Math.ceil(items.length / 2)
        return {
            col1: items.slice(0, splitIndex),
            col2: items.slice(splitIndex)
        }
    }, [items])

    return (
        <section ref={containerRef} className="section-padding max-w-[1800px] mx-auto bg-ivory-50 relative weave-pattern overflow-hidden">
            {/* Decorative Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 decorative-line-vertical gradient-decorative opacity-30" />
            <div className="absolute left-8 top-32 label-vertical text-metallic/40 hidden md:block select-none">
                Heritage Craft
            </div>

            {title && <MoodBoardHeader title={title} />}

            <div className="grid-editorial items-start relative z-10">
                <motion.div style={{ y: y1 }} className="flex flex-col gap-16 md:gap-32">
                    {col1.map((item, index) => (
                        <MoodBoardCard key={item.id} item={item} index={index} />
                    ))}
                </motion.div>

                <motion.div style={{ y: y2 }} className="flex flex-col gap-16 md:gap-32 md:pt-48">
                    {col2.map((item, index) => (
                        <MoodBoardCard key={item.id} item={item} index={index + col1.length} />
                    ))}
                </motion.div>
            </div>

            {/* Subtle Texture Overlay for the whole section */}
            <div className="absolute inset-0 pointer-events-none macro-texture-overlay mix-blend-multiply opacity-[0.03]" />
        </section>
    )
}

function MoodBoardHeader({ title }: { title: string }) {
    return (
        <div className="mb-32 flex flex-col items-center text-center relative pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="decorative-line mb-6 gradient-zari-subtle"
            />

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="sustainability-badge mb-4"
            >
                <span className="text-copper">✦</span>
                <span className="mx-2 font-medium">Handwoven • Sustainable • Artisan-Made</span>
            </motion.div>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="label-editorial tracking-ultra-wide text-sage-600 mb-6 font-semibold uppercase"
            >
                Handcrafted Collection
            </motion.span>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="title-editorial relative px-4"
            >
                {title}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "circIn" }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-px bg-copper/40"
                />
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-charcoal-400 text-sm max-w-sm leading-relaxed font-light"
            >
                Each piece tells a story of heritage, craftsmanship, and the timeless elegance of the looms.
            </motion.p>
        </div>
    )
}

function MoodBoardCard({ item, index }: { item: MoodBoardItem, index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const isSafeMotion = useSafeMotion()

    // Smoothing the parallax blur for a more luxury feel
    const rawBlur = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, 4])
    const blur = useSpring(rawBlur, { stiffness: 100, damping: 30 })

    const blurValue = isSafeMotion ? blur : 0

    return (
        <motion.article
            ref={cardRef}
            initial={isSafeMotion ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: isSafeMotion ? 1.2 : 0,
                delay: isSafeMotion ? (index % 3) * 0.1 : 0,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "relative overflow-hidden w-full rounded-sm transition-shadow duration-700",
                isHovered ? "shadow-2xl brightness-[1.02]" : "shadow-md brightness-100",
                item.aspectRatio === 'portrait' ? "aspect-portrait" :
                    item.aspectRatio === 'landscape' ? "aspect-landscape" : "aspect-square"
            )}>
                {/* 2026: Provenance Stamp - simplified and cleaner */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={isSafeMotion ? { opacity: 0, scale: 0.8, rotate: -5 } : { opacity: 1, scale: 1, rotate: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={isSafeMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0 }}
                            className="absolute top-6 right-6 z-20 provenance-stamp backdrop-blur-sm pointer-events-none"
                        >
                            Authentic
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={{ scale: isHovered && isSafeMotion ? 1.08 : 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative"
                    style={{ filter: isHovered || !isSafeMotion ? 'none' : `blur(${blurValue}px)` }}
                >
                    <SiviImage
                        src={item.src}
                        alt={item.alt}
                        fill
                        aspectRatio={item.aspectRatio}
                        className={cn(
                            "transition-all duration-1000",
                            isHovered ? "cursor-zoom-in" : ""
                        )}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Gradient Reveal */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent transition-opacity duration-700",
                        isHovered ? "opacity-100" : "opacity-0"
                    )} />

                    {/* Interaction UI */}
                    <div className={cn(
                        "absolute bottom-8 left-8 right-8 flex items-center justify-between transition-all duration-500",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-bone">
                            Discover the weave
                        </span>
                        <div className="w-10 h-10 rounded-full bg-bone text-charcoal flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Editorial Caption */}
            <div className="mt-8 space-y-2">
                <div className="flex justify-between items-baseline">
                    <h3 className={cn(
                        "font-serif italic text-2xl transition-colors duration-500",
                        isHovered ? "text-sage-600" : "text-charcoal"
                    )}>
                        {item.label}
                    </h3>
                    {item.price && (
                        <span className="text-sm font-sans tracking-wider text-copper font-medium">
                            {item.price}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "h-px bg-charcoal/10 transition-all duration-700",
                        isHovered ? "w-12 bg-sage/40" : "w-6"
                    )} />
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold">
                        Hyderabad Studio — Series No. {index + 1}
                    </p>
                </div>

                {/* Handcrafted Hours Badge */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 text-[9px] uppercase tracking-tighter text-copper/80 font-bold"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-copper/40" />
                    120+ Artisan Hours
                </motion.div>
            </div>
        </motion.article>
    )
}

