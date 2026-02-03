'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/lib/images'

export default function EditorialHero() {
    return (
        <section
            className="relative h-screen w-full overflow-hidden bg-charcoal text-bone flex items-center justify-center"
        >
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative"
                >
                    <Image
                        src={IMAGES.heroIkat}
                        alt="Pochampally Ikat Fabric"
                        fill
                        priority
                        className="object-cover opacity-70"
                        sizes="100vw"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
            </div>

            {/* Typography Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl">

                {/* Top Label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs uppercase tracking-[0.3em] text-sage-300 mb-8 font-medium"
                >
                    Hyderabad • Telangana Looms
                </motion.span>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8"
                >
                    <div className="italic text-bone">
                        Indian Handlooms
                    </div>
                    <div className="text-sage-100">
                        Reimagined
                    </div>
                </motion.h1>

                {/* Bottom Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-md text-sm md:text-base font-light tracking-wide text-ivory-300 leading-relaxed"
                >
                    Handlooms from across India. <br />
                    Contemporary dresses, modern outfits, traditional sarees.
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
