'use client';

import { motion } from 'framer-motion';

const artisans = [
    {
        id: 1,
        name: "Lakshmi & Team",
        region: "Pochampally, Telangana",
        specialty: "Double Ikat Weaving",
        quote: "Each thread tells a story of mathematical precision and ancestral memory.",
    },
    {
        id: 2,
        name: "Master Weaver Devdas",
        region: "Burdwan, West Bengal",
        specialty: "Jamdani Muslin",
        quote: "To weave Jamdani is to paint with air. It requires patience that spans generations.",
    },
    {
        id: 3,
        name: "The Rao Collective",
        region: "Gadwal, Telangana",
        specialty: "Silk-Cotton Blends",
        quote: "Weaving is our rhythm of life. The loom's sound is the heartbeat of our village.",
    }
];

export default function ArtisanProfiles() {
    return (
        <section className="bg-ivory py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-4">Our Partners</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-6">Custodians of the Craft</h2>
                    <p className="max-w-2xl mx-auto text-charcoal-400 font-light leading-relaxed">
                        We work directly with master weaving families across India, ensuring fair wages and preserving heritage techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {artisans.map((artisan, index) => (
                        <motion.div
                            key={artisan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col text-center p-8 md:p-10 bg-bone border border-ivory-300 hover:border-sage/30 hover:shadow-lg hover:shadow-sage/5 transition-all duration-500 group"
                        >
                            <div className="mb-8 relative">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-sage/20 font-serif leading-none select-none">"</span>
                                <p className="font-serif text-xl md:text-2xl text-charcoal italic leading-relaxed relative z-10">
                                    {artisan.quote}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-charcoal/10 relative">
                                {/* Decorative knot/icon could go here */}
                                <div className="w-1.5 h-1.5 bg-sage/50 rounded-full mx-auto mb-4" />

                                <h3 className="font-serif text-lg text-charcoal mb-1 group-hover:text-sage transition-colors duration-300">{artisan.name}</h3>
                                <p className="text-xs uppercase tracking-widest text-charcoal-400 mb-2">{artisan.region}</p>
                                <p className="text-sm text-sage font-medium tracking-wide">
                                    {artisan.specialty}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
