'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/ui/Footer'
import { Ruler, Scissors, PenTool, MessageSquare, Truck, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const processSteps = [
    {
        title: 'Consultation',
        description: 'Discuss your vision, preferences, and occasion with our lead stylist.',
        icon: MessageSquare,
        delay: 0.1
    },
    {
        title: 'Fabric Selection',
        description: 'Choose from our curated collection of authentic handloom textiles.',
        icon: CheckCircle,
        delay: 0.2
    },
    {
        title: 'Design & Measure',
        description: 'We finalize the silhouette and take precise measurements for a perfect fit.',
        icon: Ruler,
        delay: 0.3
    },
    {
        title: 'Handcrafting',
        description: 'Our master tailors and artisans bring your garment to life.',
        icon: Scissors,
        delay: 0.4
    },
    {
        title: 'Delivery',
        description: 'Your bespoke outfit is delivered to your doorstep, ready to wear.',
        icon: Truck,
        delay: 0.5
    }
]

const galleryImages = [
    {
        src: '/images/heritage-pochampally-dress.png',
        alt: 'Custom Pochampally Dress',
        label: 'Ikat Evening Gown'
    },
    {
        src: '/images/heritage-kanjivaram-dress.png',
        alt: 'Bespoke Kanjivaram',
        label: 'Silk Wedding Ensemble'
    },
    {
        src: '/images/custom-ikat-tunic-modern.png',
        alt: 'Contemporary Ikat',
        label: 'Modern Ikat Tunic'
    }
]

export default function CustomTailoringPage() {
    return (
        <main className="bg-bone min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/custom-tailoring.png"
                        alt="Bespoke Tailoring"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-sage text-xs uppercase tracking-[0.3em] font-bold block mb-6"
                    >
                        The Atelier Service
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-bone italic leading-none mb-8"
                    >
                        Bespoke <br /> <span className="text-sage-100">Tailoring</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-ivory-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Where heritage fabric meets your personal style. <br className="hidden md:block" />
                        Experience the luxury of a garment made exclusively for you.
                    </motion.p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-24 px-6 bg-bone">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="font-serif text-4xl text-charcoal italic">
                        The Art of the Perfect Fit
                    </h2>
                    <div className="w-16 h-1 bg-sage mx-auto" />
                    <p className="text-charcoal-400 text-lg leading-relaxed">
                        At Sivi, we believe that true luxury lies in the details. Our custom tailoring service
                        allows you to co-create garments that are effectively yours—combining the
                        timeless beauty of Indian handlooms with modern silhouettes that fit you perfectly.
                    </p>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-24 px-6 bg-ivory border-y border-charcoal/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-sage text-xs uppercase tracking-widest font-bold">How It Works</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">The Journey</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-charcoal/10 -z-0" />

                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: step.delay, duration: 0.5 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-bone border border-charcoal/10 flex items-center justify-center mb-8 shadow-sm group-hover:border-sage/50 transition-colors duration-300">
                                    <step.icon strokeWidth={1} className="w-8 h-8 text-charcoal group-hover:text-sage transition-colors duration-300" />
                                </div>
                                <h3 className="font-serif text-xl text-charcoal mb-4">{step.title}</h3>
                                <p className="text-charcoal-400 text-sm leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Mini-Grid */}
            <section className="py-24 px-6 bg-bone overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-sage text-xs uppercase tracking-widest font-bold">Recent Commissions</span>
                            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-4 italic">Customer Stories</h2>
                        </div>
                        <Link href="/gallery" className="text-sm underline underline-offset-4 decoration-sage hover:text-sage transition-colors">
                            View Full Gallery
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                    <p className="text-bone font-serif text-xl italic">{img.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / Pricing */}
            <section className="py-32 px-6 bg-charcoal text-bone text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="font-serif text-4xl md:text-6xl italic text-sage-100">
                        Start Your Journey
                    </h2>
                    <p className="text-ivory-200 text-lg font-light max-w-2xl mx-auto">
                        Consultations are complimentary. Custom garments typically start from ₹8,500
                        and require 2-3 weeks for completion.
                    </p>
                    <div className="pt-8">
                        <Link
                            href="/contact"
                            className="inline-block bg-sage text-white px-12 py-4 text-sm uppercase tracking-widest hover:bg-sage-600 transition-colors duration-300"
                        >
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
