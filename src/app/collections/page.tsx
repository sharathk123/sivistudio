import Link from 'next/link';
import Image from 'next/image';
import { getCollections, urlFor } from '@/lib/sanity/client';
import StickyHeader from '@/components/ui/StickyHeader';
import Footer from '@/components/ui/Footer';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CollectionsPage() {
    // Only fetch 'live' collections (filtered in GROQ query)
    const collections = await getCollections();

    return (
        <main className="min-h-screen bg-bone">
            <StickyHeader />

            <section className="section-padding pt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center">
                        <span className="caption-editorial mb-4 block animate-fadeInUp">Exquisite Curation</span>
                        <h1 className="title-editorial mb-6 animate-fadeInUp animate-delay-xs">The Collections</h1>
                        <div className="h-px bg-sage max-w-xs mx-auto gradient-zari animate-scaleIn animate-delay-md" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {collections.map((collection, index) => (
                            <Link
                                key={collection._id}
                                href={`/collections/${collection.slug.current}`}
                                className="group relative block overflow-hidden animate-fadeInUp"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="aspect-portrait relative overflow-hidden bg-ivory-200 shadow-card group-hover:shadow-card-hover transition-all duration-700">
                                    {collection.heroImage ? (
                                        <Image
                                            src={urlFor(collection.heroImage).width(800).url()}
                                            alt={collection.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full gradient-loading" />
                                    )}
                                    <div className="absolute inset-0 bg-charcoal-transparent group-hover:bg-charcoal/20 transition-colors duration-500" />

                                    {/* Editorial Overlay */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="glass-effect p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="caption-editorial text-charcoal mb-2">Explore</p>
                                            <h3 className="subtitle-editorial text-charcoal">{collection.title}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between items-end">
                                    <div>
                                        <h2 className="subtitle-editorial text-2xl group-hover:text-sage transition-colors">{collection.title}</h2>
                                        {collection.description && (
                                            <p className="text-charcoal-400 font-sans text-sm mt-1 line-clamp-2 max-w-xs">
                                                {collection.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="label-editorial text-sage group-hover:translate-x-2 transition-transform duration-500">
                                        View &rarr;
                                    </span>
                                </div>

                                {/* 2026 Metallic Border Accent */}
                                <div className="absolute top-0 right-0 w-24 h-px gradient-zari scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                                <div className="absolute bottom-0 left-0 w-px h-24 gradient-zari scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
                            </Link>
                        ))}
                    </div>

                    {collections.length === 0 && (
                        <div className="text-center py-40">
                            <h2 className="subtitle-editorial text-ivory-300">New Collections Coming Soon</h2>
                            <p className="caption-editorial mt-4">Curating our next selection of heritage weaves.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
