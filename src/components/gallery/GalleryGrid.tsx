'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryItem from './GalleryItem'
import Lightbox from './Lightbox'
import { GalleryItem as GalleryItemType, GalleryCategory } from '@/data/galleryData'

interface GalleryGridProps {
    items: GalleryItemType[]
    activeCategory: GalleryCategory
}

export default function GalleryGrid({ items, activeCategory }: GalleryGridProps) {
    const [selectedItem, setSelectedItem] = useState<GalleryItemType | null>(null)

    // Filter items based on active category
    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return items
        return items.filter(item => item.category === activeCategory)
    }, [items, activeCategory])

    return (
        <>
            <motion.div
                layout
                className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
            >
                <AnimatePresence>
                    {filteredItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={setSelectedItem}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedItem && (
                    <Lightbox
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
