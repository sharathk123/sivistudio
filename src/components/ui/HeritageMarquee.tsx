'use client'

import Image from 'next/image'
import { weaves } from '@/data/heritageData'

// Additional items not in the weaves data
const additionalItems = [
    {
        name: 'Handspun Cotton',
        image: '/images/ikat-fabric-closeup.png'
    },
    {
        name: 'Zari Embroidery',
        image: '/images/saree-editorial.png'
    },
    {
        name: 'Hyderabad Studio',
        image: '/images/collection-studio.png'
    }
]

// Combine and duplicate for infinite scroll
const marqueeItems = [
    ...weaves.map(w => ({ name: w.name, image: w.image })),
    ...additionalItems
]

export default function HeritageMarquee() {
    return (
        <div className="overflow-hidden bg-bone border-y border-charcoal/10 py-6 relative">
            <div className="flex animate-marquee whitespace-nowrap gap-16 min-w-full">
                {/* First set of items */}
                {marqueeItems.map((item, idx) => (
                    <div key={`marquee-1-${idx}`} className="flex items-center gap-4 flex-shrink-0 group cursor-default">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-charcoal/10 group-hover:border-sage transition-colors duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal-400 font-mono group-hover:text-charcoal transition-colors">
                            {item.name}
                        </span>
                        <span className="text-sage/40">•</span>
                    </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {marqueeItems.map((item, idx) => (
                    <div key={`marquee-2-${idx}`} className="flex items-center gap-4 flex-shrink-0 group cursor-default">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-charcoal/10 group-hover:border-sage transition-colors duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal-400 font-mono group-hover:text-charcoal transition-colors">
                            {item.name}
                        </span>
                        <span className="text-sage/40">•</span>
                    </div>
                ))}
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-bone to-transparent z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-bone to-transparent z-10" />
        </div>
    )
}
