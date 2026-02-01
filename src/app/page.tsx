import EditorialHero from '@/components/editorial/EditorialHero'
import MoodBoardGrid from '@/components/editorial/MoodBoardGrid'
import JournalTeaser from '@/components/editorial/JournalTeaser'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import Image from 'next/image'

import StickyHeader from '@/components/ui/StickyHeader'
import HeritageMarquee from '@/components/ui/HeritageMarquee'

import { IMAGES } from '@/lib/images'
import { collectionItems } from '@/data/homeData'
import { getCraftStories } from '@/lib/sanity/client'

export default async function HomePage() {
    const stories = await getCraftStories()
    return (
        <main id="main-content" className="bg-bone min-h-screen">
            <StickyHeader theme="dark" />
            <EditorialHero />

            {/* Philosophy Section - Chromatic Pacing (Charcoal) */}
            <section className="bg-charcoal text-bone py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-6 sticky top-32">
                        <span className="text-sage text-xs font-bold tracking-[0.2em] uppercase">
                            Our Heritage
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl italic text-sage-100 leading-tight">
                            Woven with <br /> Intention
                        </h2>
                        <div className="w-24 h-1 bg-sage" />
                    </div>
                    <div className="space-y-12 text-lg md:text-xl font-light text-ivory-200 leading-relaxed font-sans">
                        <p>
                            Sivi is a textile studio specializing in Indian handloom fabrics transformed
                            into contemporary dresses, modern outfits, and traditional sarees. We source
                            authentic handlooms from across India — Pochampally Ikat and Gadwal from Telangana,
                            Jamdani from Bengal, Sambalpuri from Odisha, Kanjivaram from Tamil Nadu, and more.
                        </p>
                        <p>
                            From the rhythmic clatter of pit looms across India to our design studio
                            in Hyderabad, we bridge ancestral craftsmanship with modern silhouettes.
                            Our artisans' centuries of textile wisdom meets contemporary design, creating
                            outfits that honor India's rich weaving heritage while embracing modern aesthetics.
                        </p>
                    </div>
                </div>
            </section>

            {/* Marquee Divider */}
            <HeritageMarquee />

            {/* Featured Collection - Asymmetrical Grid */}
            <MoodBoardGrid items={collectionItems} title="The Atelier" />

            {/* Essence Section - Asymmetrical Image-Text Layout */}
            <section className="bg-ivory py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                        {/* Large Lifestyle Image - 60% width */}
                        <div className="lg:col-span-3 relative h-[500px] lg:h-[700px]">
                            <Image
                                src={IMAGES.collectionStudio}
                                alt="Sivi Studio - Contemporary Handloom Dresses"
                                fill
                                className="object-cover rounded-sm"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        </div>

                        {/* Staggered Text Blocks - 40% width */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="space-y-4">
                                <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                                    The Essence
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl text-charcoal italic leading-tight">
                                    Crafted for <br />the Conscious
                                </h2>
                                <div className="w-16 h-1 bg-sage" />
                            </div>

                            <blockquote className="font-serif text-2xl md:text-3xl text-sage-700 italic leading-relaxed border-l-2 border-sage pl-6">
                                "True luxury whispers. It doesn't shout."
                            </blockquote>

                            <div className="space-y-6 text-charcoal-400 text-base leading-relaxed">
                                <p>
                                    In a world of fast fashion and fleeting trends, Sivi stands for something different.
                                    We transform authentic Indian handloom fabrics into contemporary dresses, modern
                                    outfits, and traditional sarees that honor both heritage and modern aesthetics.
                                </p>
                                <p>
                                    Every piece begins with carefully selected handloom cloth from master
                                    weavers across India. Our design studio in Hyderabad reimagines these
                                    heritage fabrics into silhouettes that fit contemporary lifestyles—garments
                                    that age gracefully and become part of your personal archive.
                                </p>
                            </div>

                            <div className="pt-6">
                                <Link
                                    href="/story"
                                    className="inline-block border-b-2 border-sage text-sage hover:text-sage-700 hover:border-sage-700 transition-colors pb-1 text-sm uppercase tracking-widest"
                                >
                                    Read Our Story →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journal Teaser */}
            <JournalTeaser articles={stories} />

            {/* CTA Footer Tease */}
            <section className="py-24 px-6 text-center bg-ivory-50">
                <Link
                    href="/shop"
                    className="btn-luxury"
                >
                    View Full Collection
                </Link>
            </section>

            <Footer />
        </main>
    )
}
