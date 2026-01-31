'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import ChromaticWrapper from '@/components/ui/ChromaticWrapper'
import Footer from '@/components/ui/Footer'
import StickyHeader from '@/components/ui/StickyHeader'

export default function StoryPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

    return (
        <main className="bg-bone">
            <StickyHeader />
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/story-hero-threads.png"
                        alt="Indian Handloom Heritage"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="block text-sage text-xs uppercase tracking-[0.3em] mb-8"
                    >
                        Hyderabad Studio • Handlooms from Across India
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] text-bone italic mb-8"
                    >
                        Threads of <br />
                        <span className="text-sage-100">Innovation</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-ivory-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        From the rhythmic clatter of pit looms across India to our design studio in Hyderabad,
                        Sivi bridges ancestral craftsmanship with contemporary silhouettes.
                    </motion.p>
                </div>
            </section>

            {/* Origins Section - Ivory Background */}
            <ChromaticWrapper startColor="#FDFCFB" endColor="#E4E4DE">
                <section className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Text Block */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                    Chapter I
                                </span>
                                <h2 className="font-serif text-5xl md:text-6xl text-charcoal italic leading-tight">
                                    Where Craft <br />Meets Couture
                                </h2>
                                <div className="w-24 h-1 bg-sage" />
                                <p className="text-charcoal-400 text-lg leading-relaxed font-light">
                                    Across India, from the villages of Telangana to the workshops of Bengal, Odisha, and Tamil Nadu,
                                    master weavers continue their ancient craft. Pochampally Ikat, Jamdani, Sambalpuri, Kanjivaram—each
                                    a testament to centuries of textile wisdom passed down through generations.
                                </p>
                                <p className="text-charcoal-400 text-lg leading-relaxed font-light">
                                    Sivi was born from a simple belief: that these heritage techniques deserved to evolve,
                                    not fade. That handloom fabrics could be transformed into contemporary dresses, modern outfits,
                                    and traditional sarees that honor both heritage and modern aesthetics.
                                </p>
                            </motion.div>

                            {/* Image Block */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative h-[600px] rounded-sm overflow-hidden"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/story-origins-workshop.png"
                                    alt="Handloom Heritage Workshop"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
            </ChromaticWrapper>

            {/* Pull Quote - Charcoal Transition */}
            <ChromaticWrapper startColor="#E4E4DE" endColor="#1A1A1A">
                <section className="py-32 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.blockquote
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="font-serif text-4xl md:text-6xl text-sage-100 italic leading-tight"
                        >
                            "Every thread tells a story. <br />
                            Every weave holds a legacy."
                        </motion.blockquote>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-8 text-ivory-300 text-sm uppercase tracking-[0.3em]"
                        >
                            — Sivi Atelier Philosophy
                        </motion.p>
                    </div>
                </section>
            </ChromaticWrapper>

            {/* The Craft Section - Dark Background */}
            <section className="bg-charcoal py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Staggered Images */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative h-[400px] ml-0 lg:ml-16"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/story-jamdani-dress.png"
                                    alt="Jamdani Handloom Dress from Bengal"
                                    className="w-full h-full object-cover rounded-sm"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative h-[300px] mr-0 lg:mr-16"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/story-kanjivaram-outfit.png"
                                    alt="Kanjivaram Silk Contemporary Outfit"
                                    className="w-full h-full object-cover rounded-sm"
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8 lg:sticky lg:top-32"
                        >
                            <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                Chapter II
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl text-bone italic leading-tight">
                                Innovation in <br />Every Thread
                            </h2>
                            <div className="w-24 h-1 bg-sage" />
                            <div className="space-y-6 text-ivory-200 text-lg leading-relaxed font-light">
                                <p>
                                    From Pochampally's geometric Ikat patterns to Jamdani's delicate motifs, from Sambalpuri's
                                    traditional borders to Kanjivaram's lustrous silk—we source the finest handlooms from across India.
                                    Each region brings its unique heritage and technique.
                                </p>
                                <p>
                                    But we don't stop at tradition. Our Hyderabad design studio reimagines these heritage fabrics
                                    into contemporary silhouettes: asymmetric dresses, layered ensembles, modern outfits that fit
                                    today's lifestyles while honoring centuries of craftsmanship.
                                </p>
                                <p>
                                    Every piece is a collaboration between master weavers and modern designers, between ancestral
                                    wisdom and innovative vision. This is how handlooms evolve—not by abandoning tradition,
                                    but by giving it new life.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Return to Light */}
            <ChromaticWrapper startColor="#1A1A1A" endColor="#FDFCFB">
                <section className="py-32 px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                Our Promise
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl text-charcoal italic leading-tight mt-6 mb-8">
                                Quiet Luxury, <br />Conscious Craft
                            </h2>
                            <div className="w-24 h-1 bg-sage mx-auto" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                        >
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl text-sage italic">Transparency</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    Every piece comes with its story—the weaver, the village, the technique.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl text-sage italic">Timelessness</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    We design for decades, not seasons. Quiet elegance over fleeting trends.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl text-sage italic">Tailored</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    Custom sizing for every body, every age. Because luxury should fit you perfectly.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </ChromaticWrapper>

            <Footer />
        </main>
    )
}
