'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function EditorialHero() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax Effect for Typography
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-charcoal text-bone"
        >
            {/* Video Texture Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover opacity-60 mix-blend-overlay"
                    // Use a placeholder poster to prevent empty box before video loads
                    poster="https://picsum.photos/seed/editorial/2000/1000"
                >
                    {/* We'll need to add a real S3/CDN link here later */}
                    <source src="https://cdn.coverr.co/videos/coverr-fabric-waving-in-the-wind-5364/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Typography Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

                {/* Top Label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xs uppercase tracking-[0.3em] text-sage-300 mb-6"
                >
                    Hyderabad • Est. 2024
                </motion.span>

                {/* Main Title - Split for Parallax */}
                <h1 className="font-serif text-[12vw] md:text-[9vw] leading-[0.85] mix-blend-difference">
                    <motion.div style={{ y: y1 }} className="block italic">
                        Quiet
                    </motion.div>
                    <motion.div style={{ y: y2 }} className="block text-sage-100">
                        Luxury
                    </motion.div>
                </h1>

                {/* Bottom Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 max-w-md text-sm md:text-base font-light tracking-wide text-ivory-300 leading-relaxed"
                >
                    The art of conscious craft. <br />
                    Redefining bespoke tailoring for the modern aesthete.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50"
            >
                Scroll to Explore
            </motion.div>
        </section>
    )
}
