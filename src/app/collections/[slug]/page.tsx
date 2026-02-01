import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCollection, urlFor } from '@/lib/sanity/client';
import StickyHeader from '@/components/ui/StickyHeader';
import Footer from '@/components/ui/Footer';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function CollectionPage({ params }: PageProps) {
    const { slug } = await params;
    const collection = await getCollection(slug);

    if (!collection) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-bone">
            <StickyHeader />

            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                {collection.heroImage ? (
                    <Image
                        src={urlFor(collection.heroImage).width(1920).height(1080).url()}
                        alt={collection.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-ivory-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/70 to-charcoal/60 flex items-center justify-center">
                    <div className="text-center max-w-4xl px-4">
                        <span className="caption-editorial mb-4 block drop-shadow-2xl !text-bone">Collection</span>
                        <h1 className="title-editorial !text-bone text-7xl md:text-9xl mb-6 drop-shadow-2xl">{collection.title}</h1>
                        <div className="h-px bg-bone/50 w-full max-w-sm mx-auto mb-8" />
                        <p className="subtitle-editorial !text-bone text-2xl md:text-3xl max-w-2xl mx-auto drop-shadow-2xl font-light">
                            {collection.description}
                        </p>
                    </div>
                </div>

                {/* 2026 Metallic Edge Accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1 gradient-zari" />
            </section>

            {/* Products Grid */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-baseline mb-16">
                        <div>
                            <h2 className="subtitle-editorial text-4xl mb-2">Heritage Selection</h2>
                            <p className="caption-editorial">{collection.products?.length || 0} Artifacts</p>
                        </div>
                        <div className="hidden md:flex gap-4">
                            <span className="label-editorial text-sage">Filter by Material</span>
                            <span className="label-editorial hover:text-sage cursor-pointer transition-colors">Cotton</span>
                            <span className="label-editorial hover:text-sage cursor-pointer transition-colors">Silk</span>
                            <span className="label-editorial hover:text-sage cursor-pointer transition-colors">Linen</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
                        {collection.products?.map((product, index) => (
                            <Link
                                key={product._id}
                                href={`/products/${product.slug.current}`}
                                className="group block animate-fadeInUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="aspect-[3/4] relative overflow-hidden bg-ivory-200 shadow-card mb-6">
                                    {product.images && product.images[0] ? (
                                        <Image
                                            src={urlFor(product.images[0]).width(800).height(1067).url()}
                                            alt={product.title}
                                            fill
                                            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full gradient-loading" />
                                    )}

                                    {/* Availability Tag */}
                                    <div className="absolute top-4 left-4 glass-effect px-4 py-2">
                                        <span className="label-editorial flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                                            Authentic
                                        </span>
                                    </div>

                                    {/* Quick View Button */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="bg-charcoal text-bone text-center py-4 label-editorial hover:bg-sage transition-colors">
                                            Quick View
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="subtitle-editorial text-xl">{product.title}</h3>
                                        {product.priceDisplay === 'numeric' && product.price ? (
                                            <p className="accent-copper font-mono">₹{product.price.toLocaleString('en-IN')}</p>
                                        ) : (
                                            <p className="caption-editorial text-sage">Price on Request</p>
                                        )}
                                    </div>
                                    <p className="caption-editorial">Handwoven Tradition</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {(!collection.products || collection.products.length === 0) && (
                        <div className="text-center py-24 bg-ivory-50 rounded-lg">
                            <p className="subtitle-editorial text-ivory-300">Catalog Refresh in Progress</p>
                            <p className="caption-editorial mt-4">New arrivals joining this collection soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Pagination/CTA */}
            <section className="py-16 md:py-24 bg-charcoal text-bone relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="title-editorial text-bone mb-8">Bespoke Inquiries</h2>
                    <p className="subtitle-editorial text-ivory/80 mb-12">
                        Looking for a specific pattern or colorway within the {collection.title} tradition?
                        Our master weavers can craft custom pieces tailored to your measurements.
                    </p>
                    <Link
                        href="/custom-tailoring"
                        className="inline-block px-12 py-5 border border-ivory text-ivory hover:bg-ivory hover:text-charcoal transition-all duration-500 label-editorial"
                    >
                        Request Consultation
                    </Link>
                </div>

                {/* Decorative Pattern Background */}
                <div className="absolute inset-0 weave-pattern opacity-10" />
            </section>

            <Footer />
        </main>
    );
}
