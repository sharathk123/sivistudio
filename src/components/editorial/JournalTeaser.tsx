'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function JournalTeaser() {
    const articles = [
        { title: "The Art of Pochampally Ikat", category: "Weaving", date: "Jan 26" },
        { title: "Natural Dyes of Telangana", category: "Craft", date: "Jan 12" },
        { title: "The Golden Thread: Zari Work", category: "Heritage", date: "Dec 28" }
    ]

    return (
        <section className="bg-ivory py-32 px-6 border-t border-charcoal/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Sticky Left: Title */}
                <div className="sticky top-32 h-fit">
                    <span className="text-charcoal-400 text-xs font-bold tracking-[0.2em] uppercase block mb-6">
                        The Journal
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl italic text-charcoal leading-none mb-8">
                        Notes from <br /> the Studio
                    </h2>
                    <Link
                        href="/journal"
                        className="text-sm border-b border-charcoal pb-1 hover:text-sage transition-colors"
                    >
                        Read all stories
                    </Link>
                </div>

                {/* Right: Article List */}
                <div className="space-y-12">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer border-b border-charcoal/20 pb-8"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-charcoal-400 uppercase tracking-widest">
                                    {article.category}
                                </span>
                                <span className="text-xs font-mono text-charcoal-400">
                                    {article.date}
                                </span>
                            </div>
                            <h3 className="font-serif text-3xl text-charcoal group-hover:italic transition-all duration-300">
                                {article.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
