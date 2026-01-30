import EditorialHero from '@/components/editorial/EditorialHero'
import MoodBoardGrid from '@/components/editorial/MoodBoardGrid'
import JournalTeaser from '@/components/editorial/JournalTeaser'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'

export default function HomePage() {
    const collectionItems = [
        {
            id: '1',
            src: 'https://picsum.photos/seed/linen/800/1000',
            alt: 'Linen Overlay',
            aspectRatio: 'portrait' as const,
            label: 'The Linen Overlay',
            price: '₹4,500'
        },
        {
            id: '2',
            src: 'https://picsum.photos/seed/midi/800/800',
            alt: 'Structured Midi',
            aspectRatio: 'square' as const,
            label: 'Structured Midi',
            price: '₹5,200',
            colSpan: 1 as const
        },
        {
            id: '3',
            src: 'https://picsum.photos/seed/silk/1600/900',
            alt: 'Raw Silk Texture',
            aspectRatio: 'landscape' as const,
            label: 'Handloom Textures',
            colSpan: 2 as const
        },
        {
            id: '4',
            src: 'https://picsum.photos/seed/tunic/800/1000',
            alt: 'Asymmetric Tunic',
            aspectRatio: 'portrait' as const,
            label: 'Asymmetric Tunic',
            price: '₹3,800'
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
                            Philosophy
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl italic text-sage-100 leading-tight">
                            Conscious <br /> Craft
                        </h2>
                        <div className="w-24 h-1 bg-sage" />
                    </div>
                    <div className="space-y-12 text-lg md:text-xl font-light text-ivory-200 leading-relaxed font-sans">
                        <p>
                            We believe in the power of slow fashion. Every garment is a testament
                            to time-honored techniques, reimagined for the contemporary wardrobe.
                        </p>
                        <p>
                            From the bustling looms of Telangana to the quiet precision of our
                            Hyderabad studio, Sivi represents a dialogue between heritage and
                            modernity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Marquee Divider */}
            <div className="overflow-hidden bg-bone py-4 border-b border-charcoal/10">
                <div className="animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.3em] text-charcoal-400 font-mono flex gap-8">
                    <span>Conscious Craft</span> • <span>Hyderabad Studio</span> • <span>Slow Fashion</span> •
                    <span>Conscious Craft</span> • <span>Hyderabad Studio</span> • <span>Slow Fashion</span> •
                    <span>Conscious Craft</span> • <span>Hyderabad Studio</span> • <span>Slow Fashion</span> •
                    <span>Conscious Craft</span> • <span>Hyderabad Studio</span> • <span>Slow Fashion</span>
                </div>
            </div>

            {/* Featured Collection - Asymmetrical Grid */}
            <MoodBoardGrid items={collectionItems} title="The Atelier" />

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
