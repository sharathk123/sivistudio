'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SiviImage from '@/components/ui/SiviImage'
import { GalleryItem as GalleryItemType } from '@/data/galleryData'
import { cn } from '@/lib/utils'
import { useSafeMotion } from '@/hooks/useSafeMotion'

interface GalleryItemProps {
    item: GalleryItemType
    onClick: (item: GalleryItemType) => void
    index: number
}

export default function GalleryItem({ item, onClick, index }: GalleryItemProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const isSafeMotion = useSafeMotion()

    return (
        <motion.div
            ref={ref}
            initial={isSafeMotion ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isSafeMotion ? index * 0.05 : 0 }}
            className="mb-8 break-inside-avoid group cursor-pointer relative"
            onClick={() => onClick(item)}
        >
            <div className="relative overflow-hidden rounded-sm bg-ivory-100">
                <SiviImage
                    src={item.src}
                    alt={item.alt}
                    aspectRatio={item.aspectRatio}
                    fill
                    className={cn(
                        "transition-transform duration-700",
                        isSafeMotion && "group-hover:scale-105"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Caption Reveal */}
                {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                        <span className="text-white text-xs uppercase tracking-widest font-medium drop-shadow-md">
                            {item.caption}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
