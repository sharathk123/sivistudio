'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import ChromaticWrapper from '@/components/ui/ChromaticWrapper'
import Footer from '@/components/ui/Footer'

export default function HeritagePage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

    const [activeWeave, setActiveWeave] = useState<string>('pochampally')

    const weaves = [
        {
            id: 'pochampally',
            name: 'Pochampally Ikat',
            region: 'Telangana',
            description: 'A geometric tie-dye technique where threads are resist-dyed before weaving, creating distinctive blurred patterns. This ancient craft requires mathematical precision and artistic vision.',
            technique: 'Tie-dye resist technique on warp and weft threads before weaving',
            characteristics: 'Geometric patterns, double ikat, vibrant colors, cotton and silk blends',
            image: '/images/heritage-pochampally-dress.png',
            color: 'sage'
        },
        {
            id: 'jamdani',
            name: 'Jamdani',
            region: 'Bengal',
            description: 'An intricate supplementary weft technique creating delicate floral and geometric motifs on sheer cotton. Each motif is individually woven, making it one of the finest muslin weaves.',
            technique: 'Supplementary weft technique with individual motif insertion',
            characteristics: 'Sheer cotton, intricate motifs, lightweight, floral and paisley patterns',
            image: '/images/heritage-jamdani-saree.png',
            color: 'charcoal'
        },
        {
            id: 'sambalpuri',
            name: 'Sambalpuri',
            region: 'Odisha',
            description: 'Traditional ikat weaving featuring tribal motifs, shells, wheels, and flowers. The tie-dye process creates distinctive borders and pallus with cultural significance.',
            technique: 'Tie-dye ikat with traditional tribal motifs',
            characteristics: 'Bold borders, tribal patterns, cotton and silk, rich earthy tones',
            image: '/images/heritage-sambalpuri-outfit.png',
            color: 'rust'
        },
        {
            id: 'kanjivaram',
            name: 'Kanjivaram Silk',
            region: 'Tamil Nadu',
            description: 'Luxurious silk sarees with heavy gold zari borders and pallus. The contrasting border technique and temple motifs make Kanjivaram silks iconic South Indian wedding attire.',
            technique: 'Three-shuttle weaving with contrasting borders and zari work',
            characteristics: 'Lustrous silk, heavy zari, temple motifs, contrasting borders',
            image: '/images/heritage-kanjivaram-dress.png',
            color: 'gold'
        },
        {
            id: 'gadwal',
            name: 'Gadwal Silk',
            region: 'Telangana',
            description: 'A unique silk-cotton blend where the body is woven in cotton for comfort and borders in silk with zari for elegance. The interlocked border technique is distinctive to Gadwal.',
            technique: 'Silk-cotton blend with interlocked border weaving',
            characteristics: 'Cotton body, silk borders, zari work, lightweight yet elegant',
            image: '/images/heritage-gadwal-ensemble.png',
            color: 'sage'
        },
        {
            id: 'uppada',
            name: 'Uppada Jamdani',
            region: 'Andhra Pradesh',
            description: 'A lightweight silk weave combining Jamdani technique with traditional South Indian motifs. Known for its feather-light texture and intricate brocade work.',
            technique: 'Jamdani supplementary weft on silk base',
            characteristics: 'Lightweight silk, brocade motifs, delicate texture, traditional designs',
            image: '/images/heritage-uppada-jamdani-new.png',
            color: 'teal'
        }
    ]

    const activeWeaveData = weaves.find(w => w.id === activeWeave) || weaves[0]

    return (
        <main className="bg-bone">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* Heritage Hero Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/heritage-hero-textiles.png"
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
                        Timeless Artistry
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] text-bone italic mb-8"
                    >
                        Legacy <br />
                        <span className="text-sage-100">of the Loom</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-ivory-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        A journey through India's finest weaves—where every thread tells a story
                        of culture, craft, and timeless beauty, preserved for the modern world.
                    </motion.p>
                </div>
            </section>

            {/* Introduction Section */}
            <ChromaticWrapper startColor="#FDFCFB" endColor="#E4E4DE">
                <section className="py-32 px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                Living Traditions
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl text-charcoal italic leading-tight mt-6 mb-8">
                                Six Weaves, <br />Six Legacies
                            </h2>
                            <div className="w-24 h-1 bg-sage mx-auto mb-8" />
                            <p className="text-charcoal-400 text-lg leading-relaxed font-light max-w-3xl mx-auto">
                                India's handloom heritage is a tapestry of regional techniques, each with its own
                                history, symbolism, and artistry. At Sivi, we celebrate these diverse traditions
                                by sourcing authentic handlooms and transforming them into contemporary designs.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </ChromaticWrapper>

            {/* Interactive Weave Explorer */}
            <section className="bg-bone py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Weave Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {weaves.map((weave, index) => (
                            <motion.button
                                key={weave.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onClick={() => setActiveWeave(weave.id)}
                                className={`px-6 py-3 rounded-sm transition-all duration-300 ${activeWeave === weave.id
                                    ? 'bg-sage text-bone shadow-lg'
                                    : 'bg-ivory-100 text-charcoal-400 hover:bg-ivory-200'
                                    }`}
                            >
                                <div className="text-sm font-bold">{weave.name}</div>
                                <div className="text-xs opacity-70">{weave.region}</div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Active Weave Display */}
                    <motion.div
                        key={activeWeave}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        {/* Image */}
                        <div className="relative h-[600px] rounded-sm overflow-hidden order-2 lg:order-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={activeWeaveData.image}
                                alt={`${activeWeaveData.name} from ${activeWeaveData.region}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-8 order-1 lg:order-2">
                            <div>
                                <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                    {activeWeaveData.region}
                                </span>
                                <h3 className="font-serif text-5xl md:text-6xl text-charcoal italic leading-tight mt-4">
                                    {activeWeaveData.name}
                                </h3>
                                <div className="w-24 h-1 bg-sage mt-6" />
                            </div>

                            <p className="text-charcoal-400 text-lg leading-relaxed font-light">
                                {activeWeaveData.description}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-serif text-xl text-sage italic mb-2">Technique</h4>
                                    <p className="text-charcoal-400 leading-relaxed">
                                        {activeWeaveData.technique}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-serif text-xl text-sage italic mb-2">Characteristics</h4>
                                    <p className="text-charcoal-400 leading-relaxed">
                                        {activeWeaveData.characteristics}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pull Quote */}
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
                            "Each weave carries the wisdom <br />
                            of a thousand hands."
                        </motion.blockquote>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-8 text-ivory-300 text-sm uppercase tracking-[0.3em]"
                        >
                            — Indian Handloom Tradition
                        </motion.p>
                    </div>
                </section>
            </ChromaticWrapper>

            {/* Preservation Section */}
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
                                Our Commitment
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl text-charcoal italic leading-tight mt-6 mb-8">
                                Preserving Heritage, <br />Embracing Innovation
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
                                <h3 className="font-serif text-2xl text-sage italic">Authenticity</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    We source directly from master weavers, ensuring every piece is genuinely handwoven
                                    using traditional techniques.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl text-sage italic">Fair Practice</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    Our partnerships ensure artisans receive fair compensation, supporting sustainable
                                    livelihoods and craft preservation.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl text-sage italic">Evolution</h3>
                                <p className="text-charcoal-400 leading-relaxed">
                                    We collaborate with weavers to create contemporary designs that honor tradition
                                    while fitting modern lifestyles.
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
