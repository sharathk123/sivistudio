import EditorialHero from '@/components/editorial/EditorialHero'
import MoodBoardGrid from '@/components/editorial/MoodBoardGrid'
import JournalTeaser from '@/components/editorial/JournalTeaser'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'

export default function HomePage() {
    const collectionItems = [
        {
            id: '1',
            src: '/images/saree.png',
            alt: 'Pochampally Ikat Saree',
            aspectRatio: 'portrait' as const,
            label: 'Pochampally Silk Saree'
        },
        {
            id: '2',
            src: '/images/kurta.png',
            alt: 'Handwoven Cotton Kurta',
            aspectRatio: 'square' as const,
            label: 'Handwoven Cotton Kurta',
            colSpan: 1 as const
        },
        {
            id: '3',
            src: '/images/gadwal-silk.png',
            alt: 'Gadwal Silk-Cotton Blend',
            aspectRatio: 'landscape' as const,
            label: 'Gadwal Silk Weave',
            colSpan: 2 as const
        },
        {
            id: '4',
            src: '/images/dupatta.png',
            alt: 'Zari Embroidered Dupatta',
            aspectRatio: 'portrait' as const,
            label: 'Zari Dupatta'
        }
    ]

    return (
        <main className="bg-bone min-h-screen">
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
                            Each piece begins on the traditional looms of Telangana — where
                            Pochampally Ikat, Gadwal silks, and Uppada weaves have flourished
                            for generations. Our artisans carry forward centuries of textile wisdom.
                        </p>
                        <p>
                            From the rhythmic clatter of pit looms in Nalgonda to our design studio
                            in Hyderabad, Sivi bridges ancestral craftsmanship with contemporary
                            silhouettes that honor the body and the earth alike.
                        </p>
                    </div>
                </div>
            </section>

            {/* Marquee Divider */}
            <div className="overflow-hidden bg-bone py-4 border-b border-charcoal/10">
                <div className="animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.3em] text-charcoal-400 font-mono flex gap-8">
                    <span>Pochampally Ikat</span> • <span>Gadwal Silk</span> • <span>Uppada Weave</span> •
                    <span>Handspun Cotton</span> • <span>Zari Embroidery</span> • <span>Hyderabad Studio</span> •
                    <span>Pochampally Ikat</span> • <span>Gadwal Silk</span> • <span>Uppada Weave</span> •
                    <span>Handspun Cotton</span> • <span>Zari Embroidery</span> • <span>Hyderabad Studio</span>
                </div>
            </div>

            {/* Featured Collection - Asymmetrical Grid */}
            <MoodBoardGrid items={collectionItems} title="The Atelier" />

            {/* Essence Section - Asymmetrical Image-Text Layout */}
            <section className="bg-ivory py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                        {/* Large Lifestyle Image - 60% width */}
                        <div className="lg:col-span-3 relative h-[500px] lg:h-[700px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/gadwal-silk.png"
                                alt="Sivi Essence - Quiet Luxury"
                                className="w-full h-full object-cover rounded-sm"
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
                                    We believe in garments that age gracefully, that tell stories, that become part of
                                    your personal archive.
                                </p>
                                <p>
                                    Every stitch is intentional. Every fabric choice, deliberate. From the 60s count
                                    cotton that breathes with you, to the 40D foam structure that holds its shape
                                    season after season—we obsess over details you'll feel, not just see.
                                </p>
                            </div>

                            <div className="pt-6">
                                <a
                                    href="/story"
                                    className="inline-block border-b-2 border-sage text-sage hover:text-sage-700 hover:border-sage-700 transition-colors pb-1 text-sm uppercase tracking-widest"
                                >
                                    Read Our Story →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journal Teaser */}
            <JournalTeaser />

            {/* CTA Footer Tease */}
            <section className="py-24 px-6 text-center bg-ivory-50">
                <Link
                    href="/shop"
                    className="inline-block border border-charcoal text-charcoal px-12 py-6 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-colors duration-500"
                >
                    View Full Collection
                </Link>
            </section>

            <Footer />
        </main>
    )
}
