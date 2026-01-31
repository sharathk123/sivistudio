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
        <div className="overflow-hidden bg-ivory-50 border-y border-charcoal/10 py-10 relative">
            <div className="flex animate-marquee whitespace-nowrap gap-12 min-w-full">
                {/* First set of items */}
                {marqueeItems.map((item, idx) => (
                    <div key={`marquee-1-${idx}`} className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-default min-w-[120px]">
                        <div className="relative w-20 h-20 rounded-sm overflow-hidden border-2 border-charcoal/20 group-hover:border-sage group-hover:shadow-lg transition-all duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="80px"
                            />
                        </div>
                        <span className="text-xs uppercase tracking-wider text-charcoal font-mono group-hover:text-sage transition-colors text-center leading-tight max-w-[120px]">
                            {item.name}
                        </span>
                    </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {marqueeItems.map((item, idx) => (
                    <div key={`marquee-2-${idx}`} className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-default min-w-[120px]">
                        <div className="relative w-20 h-20 rounded-sm overflow-hidden border-2 border-charcoal/20 group-hover:border-sage group-hover:shadow-lg transition-all duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="80px"
                            />
                        </div>
                        <span className="text-xs uppercase tracking-wider text-charcoal font-mono group-hover:text-sage transition-colors text-center leading-tight max-w-[120px]">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-ivory-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-ivory-50 to-transparent z-10 pointer-events-none" />
        </div>
    )
}
