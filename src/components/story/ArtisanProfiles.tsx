'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const artisans = [
    {
        id: 1,
        name: "Lakshmi & Team",
        region: "Pochampally, Telangana",
        specialty: "Double Ikat Weaving",
        quote: "Each thread tells a story of mathematical precision and ancestral memory.",
        image: "/images/story-origins-workshop.png" // Placeholder, should be unique if possible
    },
    {
        id: 2,
        name: "Master Weaver Devdas",
        region: "Burdwan, West Bengal",
        specialty: "Jamdani Muslin",
        quote: "To weave Jamdani is to paint with air. It requires patience that spans generations.",
        image: "/images/story-jamdani-dress.png"
    },
    {
        id: 3,
        name: "The Rao Collective",
        region: "Gadwal, Telangana",
        specialty: "Silk-Cotton Blends",
        quote: "Weaving is our rhythm of life. The loom's sound is the heartbeat of our village.",
        image: "/images/story-kanjivaram-outfit.png"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {artisans.map((artisan, index) => (
                        <motion.div
                            key={artisan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="aspect-[4/5] relative overflow-hidden bg-bone shadow-card mb-6 rounded-sm">
                                {/* Use a placeholder div if image fails, but ideally mapping to real images */}
                                <div className="absolute inset-0 bg-charcoal/5" />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent pt-20">
                                    <p className="text-bone/90 font-serif italic text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                        "{artisan.quote}"
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="font-serif text-2xl text-charcoal italic mb-1">{artisan.name}</h3>
                                <p className="text-sage text-xs uppercase tracking-widest font-bold mb-3">{artisan.region}</p>
                                <p className="text-sm text-charcoal-400 font-light border-t border-sage/20 pt-3 inline-block">
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
