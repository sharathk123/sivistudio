'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
    return (
        <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto">
            {title && (
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl mb-16 text-charcoal italic"
                >
                    {title}
                </motion.h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8">
                {items.map((item, index) => (
                    <MoodBoardCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}

function MoodBoardCard({ item, index }: { item: MoodBoardItem, index: number }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={cn(
                "relative group cursor-pointer",
                // Asymmetrical Grid Logic
                item.colSpan === 2 ? "md:col-span-6" : "md:col-span-4",
                // Organic offsets for "drifting" feel
                index % 2 === 0 ? "md:translate-y-12" : "md:-translate-y-8",
                index % 3 === 0 && "md:col-start-2"
            )}
        >
            <div className={cn(
                "relative overflow-hidden bg-ivory-200 w-full",
                item.aspectRatio === 'portrait' ? "aspect-[3/4]" :
                    item.aspectRatio === 'landscape' ? "aspect-[16/9]" : "aspect-square"
            )}>
                {/* Image with Zoom Effect */}
                <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full h-full relative"
                    >
                        {/* Placeholder Skeleton Pulse */}
                        {!isLoaded && (
                            <div className="absolute inset-0 bg-ivory-300 animate-pulse z-10" />
                        )}

                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className={cn(
                                "object-cover transition-opacity duration-700 ease-out",
                                isLoaded ? "opacity-100" : "opacity-0"
                            )}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onLoad={() => setIsLoaded(true)}
                        />
                    </motion.div>
                </div>

                {/* Overlay Label (reveals on hover) */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Info Below */}
            <div className="mt-4 flex justify-between items-end">
                <div>
                    <p className="font-serif text-xl text-charcoal">{item.label}</p>
                    <p className="text-xs text-charcoal-400 font-mono mt-1 uppercase tracking-wider">
                        Hyderabad Studio
                    </p>
                </div>
                {item.price && (
                    <span className="font-mono text-xs border border-charcoal rounded-full px-3 py-1">
                        {item.price}
                    </span>
                )}
            </div>
        </motion.div>
    )
}
