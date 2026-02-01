'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CraftStory } from '@/lib/sanity/types'
import { formatDate } from '@/lib/utils/dateUtils'

interface JournalTeaserProps {
    articles: CraftStory[]
}

export default function JournalTeaser({ articles }: JournalTeaserProps) {
    // Show only first 3 articles
    const displayedArticles = articles.slice(0, 3)

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
                    {displayedArticles.length > 0 ? (
                        displayedArticles.map((article, i) => (
                            <motion.div
                                key={article._id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group border-b border-charcoal/20 pb-8"
                            >
                                <Link href={`/journal/${article.slug.current}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-mono text-charcoal-400 uppercase tracking-widest capitalize">
                                            {article.category}
                                        </span>
                                        <span className="text-xs font-mono text-charcoal-400">
                                            {formatDate(article.publishedAt)}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-3xl text-charcoal group-hover:italic transition-all duration-300">
                                        {article.title}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-charcoal-400 italic">No recent notes from the studio.</p>
                    )}
                </div>
            </div>
        </section>
    )
}
