'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { journalArticles } from '@/data/journalData'
import { useEffect, useState } from 'react'

export default function JournalArticlePage() {
    const { slug } = useParams()
    const router = useRouter()
    const article = journalArticles.find((a) => a.slug === slug)

    if (!article) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-4xl mb-4">Story not found</h1>
                    <Link href="/journal" className="text-sage border-b border-sage">Return to Journal</Link>
                </div>
            </div>
        )
    }

    return (
        <main className="bg-bone min-h-screen">
            <StickyHeader theme="light" />

            {/* Breadcrumbs */}
            <nav className="pt-32 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal-400">
                    <Link href="/journal" className="hover:text-sage transition-colors">Journal</Link>
                    <span>/</span>
                    <span className="text-sage font-bold">{article.category}</span>
                </div>
            </nav>

            {/* Article Header */}
            <header className="pt-12 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-6">
                    {article.date}
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl text-charcoal italic leading-tight mb-8"
                >
                    {article.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="font-sans text-xl text-charcoal-600 font-light leading-relaxed max-w-2xl"
                >
                    {article.excerpt}
                </motion.p>
            </header>

            {/* Content Body */}
            <section className="px-6 pb-32 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="prose prose-lg prose-charcoal max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Navigation Footer */}
                <div className="mt-32 pt-16 border-t border-charcoal/10 flex justify-between items-center">
                    <Link
                        href="/journal"
                        className="group flex flex-col gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-400">Back to</span>
                        <span className="font-serif text-2xl italic group-hover:text-sage transition-colors">The Journal</span>
                    </Link>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
                .prose h3 {
                    font-family: 'Bodoni Moda', serif;
                    font-style: italic;
                    font-size: 2rem;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    color: var(--color-charcoal);
                }
                .prose p {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    color: rgba(51, 51, 51, 0.8);
                    font-weight: 300;
                }
                .prose .lead {
                    font-size: 1.5rem;
                    line-height: 1.6;
                    color: var(--color-charcoal);
                    font-family: 'Bodoni Moda', serif;
                    font-style: italic;
                    margin-bottom: 3rem;
                }
                .prose em {
                    font-family: 'Bodoni Moda', serif;
                    color: var(--color-sage);
                }
                .prose strong {
                    color: var(--color-charcoal);
                    font-weight: 600;
                }
                .prose ul {
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 2rem;
                }
                .prose li {
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }
                .prose li::before {
                    content: "—";
                    color: var(--color-sage);
                }
            `}</style>
        </main>
    )
}
