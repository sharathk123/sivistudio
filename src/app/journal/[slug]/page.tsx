import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { getCraftStory, urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils/dateUtils'
import { PortableText } from '@portabletext/react'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const article = await getCraftStory(slug)

    if (!article) {
        return {
            title: 'Story Not Found | Sivi Studio',
        }
    }

    return {
        title: `${article.title} | Sivi Studio Journal`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: article.heroImage ? [urlFor(article.heroImage).width(1200).height(630).url()] : [],
        },
    }
}

export default async function JournalArticlePage({ params }: PageProps) {
    const { slug } = await params
    const article = await getCraftStory(slug)

    if (!article) {
        notFound()
    }

    return (
        <main className="bg-bone min-h-screen">
            <StickyHeader theme="light" />

            {/* Breadcrumbs */}
            <nav className="pt-32 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal-400">
                    <Link href="/journal" className="hover:text-sage transition-colors">Journal</Link>
                    <span>/</span>
                    <span className="text-sage font-bold capitalize">{article.category}</span>
                </div>
            </nav>

            {/* Article Header */}
            <header className="pt-12 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-xs font-mono text-charcoal-400 uppercase tracking-widest mb-6">
                    {formatDate(article.publishedAt)}
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic leading-tight mb-8">
                    {article.title}
                </h1>
                <p className="font-sans text-xl text-charcoal-600 font-light leading-relaxed max-w-2xl">
                    {article.excerpt}
                </p>
            </header>

            {/* Main Image */}
            {article.heroImage && (
                <section className="px-6 mb-20 max-w-6xl mx-auto">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-card">
                        <Image
                            src={urlFor(article.heroImage).width(1800).height(1012).url()}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>
            )}

            {/* Content Body */}
            <section className="px-6 pb-32 max-w-4xl mx-auto">
                <div className="prose-editorial">
                    {article.body && <PortableText value={article.body} />}
                </div>

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
        </main>
    )
}
