'use client'

import { motion } from 'framer-motion'
import { GalleryCategory } from '@/data/galleryData'
import { cn } from '@/lib/utils'
import { useSafeMotion } from '@/hooks/useSafeMotion'

interface GalleryFilterProps {
    currentCategory: GalleryCategory
    onCategoryChange: (category: GalleryCategory) => void
}

const CATEGORIES: GalleryCategory[] = ['All', 'Editorial', 'Heritage', 'Studio', 'Details']

export default function GalleryFilter({ currentCategory, onCategoryChange }: GalleryFilterProps) {
    const isSafeMotion = useSafeMotion()

    return (
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                        "relative text-sm tracking-widest uppercase py-2 transition-colors duration-300",
                        currentCategory === category ? "text-charcoal font-medium" : "text-charcoal-400 hover:text-charcoal"
                    )}
                >
                    {category}
                    {currentCategory === category && (
                        <motion.div
                            layoutId={isSafeMotion ? "activeTab" : undefined}
                            typeof='spring'
                            className="absolute -bottom-1 left-0 right-0 h-px bg-sage"
                            initial={isSafeMotion ? undefined : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
