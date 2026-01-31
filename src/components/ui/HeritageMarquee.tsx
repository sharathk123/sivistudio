'use client'

import Image from 'next/image'
import { marqueeItems } from '@/data/marqueeData'

/**
 * HeritageMarquee Component
 * Displays an infinite scrolling marquee of handloom heritage items.
 * Items are deduplicated and looped for a seamless visual experience.
 */
export default function HeritageMarquee() {
    // Create a triple set of items to ensure enough coverage for the animation on large screens
    // or very fast transitions. Two sets is usually enough fortranslateX(-50%), 
    // but three sets with translateX(-33.33%) is often more robust for very long marquees.
    // However, the current CSS is built for 50%, so we'll stick to 2 sets.
    const loopItems = [...marqueeItems, ...marqueeItems]

    return (
        <section className="overflow-hidden bg-ivory-50 border-y border-charcoal/10 py-16 md:py-24 relative" aria-label="Heritage Collection Marquee">
            <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 min-w-full">
                {loopItems.map((item, idx) => (
                    <div
                        key={`${item.name}-${idx}`}
                        className="flex flex-col items-center gap-4 md:gap-6 flex-shrink-0 group cursor-default min-w-[160px] md:min-w-[240px]"
                    >
                        <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-charcoal/20 group-hover:border-sage group-hover:shadow-2xl transition-all duration-300">
                            <Image
                                src={item.image}
                                alt={`${item.name} - ${item.category}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 128px, 224px"
                                priority={idx < 10} // Priority load the first few images
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <span className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-sage font-bold">
                                {item.category}
                            </span>
                            <span className="block text-sm md:text-base uppercase tracking-widest text-charcoal font-mono group-hover:text-sage transition-colors leading-tight max-w-[160px] md:max-w-[240px] font-medium">
                                {item.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gradient Fade Edges for Professional Polish */}
            <div className="absolute top-0 left-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-ivory-50 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-0 right-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-ivory-50 to-transparent z-10 pointer-events-none" aria-hidden="true" />
        </section>
    )
}
