import Link from 'next/link'
import Footer from '@/components/ui/Footer'
import StickyHeader from '@/components/ui/StickyHeader'
import { getCraftStories } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils/dateUtils'

export const revalidate = 60 // Revalidate every minute

export default async function JournalPage() {
    const stories = await getCraftStories()

    return (
        <main className="bg-bone min-h-screen flex flex-col">
            <StickyHeader theme="light" />
            <div className="flex-grow pt-32 pb-20 px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">The Journal</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic leading-tight mt-6 mb-8">
                        Notes from the Studio
                    </h1>
                    <div className="w-24 h-1 bg-sage mx-auto" />
                </div>

                <div className="max-w-4xl mx-auto grid gap-12">
                    {stories.length > 0 ? (
                        stories.map((article) => (
                            <article key={article._id} className="group border-b border-charcoal/10 pb-12">
                                <Link href={`/journal/${article.slug.current}`}>
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                        <div className="flex items-center gap-4 text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-2 md:mb-0">
                                            <span className="text-sage capitalize">{article.category}</span>
                                            <span>—</span>
                                            <span>{formatDate(article.publishedAt)}</span>
                                        </div>
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal group-hover:text-sage transition-colors duration-300 mb-4">
                                        {article.title}
                                    </h2>
                                    <p className="text-charcoal-400 font-light leading-relaxed max-w-2xl">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-6">
                                        <span className="text-xs uppercase tracking-widest border-b border-charcoal/30 pb-1 group-hover:border-sage group-hover:text-sage transition-all">Read Story</span>
                                    </div>
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="font-serif text-2xl text-charcoal-400 italic">Writing the next chapter...</h2>
                            <p className="text-charcoal-400 mt-4">The studio journal is being refreshed. Check back soon.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    )
}
