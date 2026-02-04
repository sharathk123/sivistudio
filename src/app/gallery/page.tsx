'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GalleryFilter from '@/components/gallery/GalleryFilter'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { GALLERY_ITEMS, GalleryCategory } from '@/data/galleryData'

export default function GalleryPage() {
    const [currentCategory, setCurrentCategory] = useState<GalleryCategory>('All')

    return (
        <main className="min-h-screen bg-bone text-charcoal flex flex-col">
            <StickyHeader theme="light" />

            <section className="pt-40 pb-20 px-4 md:px-8 max-w-[1800px] mx-auto w-full flex-grow">
                {/* Intro Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-serif text-5xl md:text-7xl italic mb-6">
                            the Archive
                        </h1>
                        <div className="w-16 h-px bg-sage mx-auto mb-8" />
                        <p className="text-charcoal-600 font-light leading-relaxed">
                            A curated visual journey through our heritage looms, editorial campaigns, and the intricate details that define Sivi.
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <GalleryFilter
                    currentCategory={currentCategory}
                    onCategoryChange={setCurrentCategory}
                />

                {/* The Grid */}
                <GalleryGrid
                    items={GALLERY_ITEMS}
                    activeCategory={currentCategory}
                />
            </section>

            <Footer />
        </main>
    )
}
