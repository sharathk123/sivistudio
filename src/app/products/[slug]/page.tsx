import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, urlFor } from '@/lib/sanity/client';
import StickyHeader from '@/components/ui/StickyHeader';
import Footer from '@/components/ui/Footer';
import { PortableText } from '@portabletext/react';
import ProductActions from '@/components/cart/ProductActions';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    const availabilityLabels = {
        in_stock: 'In Stock - Ready to Ship',
        made_to_order: 'Made to Order - 2-4 Weeks',
        sold_out: 'Sold Out',
    };

    const availabilityColors = {
        in_stock: 'text-sage',
        made_to_order: 'text-copper',
        sold_out: 'text-ivory-300',
    };

    return (
        <main className="min-h-screen bg-bone">
            <StickyHeader />

            {/* Product Hero */}
            <section className="section-padding pt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            {product.images && product.images.length > 0 ? (
                                <>
                                    {/* Main Image */}
                                    <div className="aspect-[3/4] relative overflow-hidden bg-ivory-200 shadow-card">
                                        <Image
                                            src={urlFor(product.images[0]).width(1200).height(1600).url()}
                                            alt={product.images[0].alt || product.title}
                                            fill
                                            className="object-cover object-center"
                                            priority
                                        />
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {product.images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-4">
                                            {product.images.slice(1, 5).map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="aspect-square relative overflow-hidden bg-ivory-200 shadow-sm hover:shadow-card transition-shadow cursor-pointer"
                                                >
                                                    <Image
                                                        src={urlFor(image).width(400).height(400).url()}
                                                        alt={image.alt || `${product.title} - View ${index + 2}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="aspect-[3/4] bg-ivory-200 gradient-loading" />
                            )}
                        </div>

                        {/* Product Information */}
                        <div className="space-y-8 animate-fadeInUp">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 caption-editorial text-ivory-300">
                                <Link href="/" className="hover:text-sage transition-colors">Home</Link>
                                <span>/</span>
                                {product.collections && product.collections[0] && (
                                    <>
                                        <Link
                                            href={`/collections/${product.collections[0].slug.current}`}
                                            className="hover:text-sage transition-colors"
                                        >
                                            {product.collections[0].title}
                                        </Link>
                                        <span>/</span>
                                    </>
                                )}
                                <span className="text-charcoal">{product.title}</span>
                            </div>

                            {/* Title & Price */}
                            <div>
                                <h1 className="title-editorial text-5xl md:text-6xl mb-4">{product.title}</h1>
                                <div className="flex items-center gap-6">
                                    {product.priceDisplay === 'numeric' && product.price ? (
                                        <p className="text-4xl font-mono accent-copper">₹{product.price.toLocaleString('en-IN')}</p>
                                    ) : (
                                        <p className="subtitle-editorial text-2xl text-sage">Price on Request</p>
                                    )}
                                    <span className={`caption-editorial ${availabilityColors[product.availability]}`}>
                                        {availabilityLabels[product.availability]}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="border-t border-ivory-200 pt-6">
                                    <p className="subtitle-editorial text-xl leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Artisan Hours Badge */}
                            {product.artisanHours && (
                                <div className="glass-effect inline-block px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                                        <span className="label-editorial">
                                            {product.artisanHours}+ Artisan Hours
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* CTA Actions (Size + Cart) */}
                            <ProductActions product={product} />

                            {/* Collections */}
                            {product.collections && product.collections.length > 0 && (
                                <div className="border-t border-ivory-200 pt-6">
                                    <p className="caption-editorial mb-3">Part of Collections</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.collections.map((collection) => (
                                            <Link
                                                key={collection._id}
                                                href={`/collections/${collection.slug.current}`}
                                                className="px-4 py-2 border border-ivory-200 label-editorial hover:border-sage hover:text-sage transition-colors"
                                            >
                                                {collection.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Material Story */}
            {product.materialStory && product.materialStory.length > 0 && (
                <section className="section-padding bg-ivory-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="subtitle-editorial text-3xl mb-8">Material & Craft Story</h2>
                        <div className="prose prose-lg max-w-none">
                            <PortableText value={product.materialStory} />
                        </div>
                    </div>
                </section>
            )}

            {/* Technical Specifications */}
            {product.technicalSpecs && product.technicalSpecs.length > 0 && (
                <section className="section-padding">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="subtitle-editorial text-3xl mb-8">Technical Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {product.technicalSpecs.map((spec, index) => (
                                <div key={index} className="flex justify-between items-baseline border-b border-ivory-200 pb-3">
                                    <span className="caption-editorial text-ivory-300">{spec.label}</span>
                                    <span className="label-editorial">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Craft Stories */}
            {product.craftStories && product.craftStories.length > 0 && (
                <section className="section-padding bg-ivory-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="subtitle-editorial text-3xl mb-12">Related Heritage Stories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {product.craftStories.map((story) => (
                                <Link
                                    key={story._id}
                                    href={`/heritage/${story.slug.current}`}
                                    className="group block"
                                >
                                    <div className="aspect-video relative overflow-hidden bg-ivory-200 mb-4">
                                        {story.heroImage && (
                                            <Image
                                                src={urlFor(story.heroImage).width(600).height(400).url()}
                                                alt={story.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                    </div>
                                    <span className="caption-editorial text-sage mb-2 block">{story.category}</span>
                                    <h3 className="subtitle-editorial text-xl group-hover:text-sage transition-colors">
                                        {story.title}
                                    </h3>
                                    <p className="caption-editorial mt-2">{story.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Care Instructions */}
            <section className="section-padding bg-charcoal text-bone">
                <div className="max-w-4xl mx-auto">
                    <h2 className="subtitle-editorial text-bone text-3xl mb-8">Care Instructions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="label-editorial text-bone mb-3">Washing</h3>
                            <p className="caption-editorial text-ivory/80">
                                Dry clean recommended. If hand washing, use cold water with mild detergent.
                                Do not wring or twist the fabric.
                            </p>
                        </div>
                        <div>
                            <h3 className="label-editorial text-bone mb-3">Storage</h3>
                            <p className="caption-editorial text-ivory/80">
                                Store in a cool, dry place away from direct sunlight.
                                Use muslin cloth for wrapping to allow the fabric to breathe.
                            </p>
                        </div>
                        <div>
                            <h3 className="label-editorial text-bone mb-3">Ironing</h3>
                            <p className="caption-editorial text-ivory/80">
                                Iron on low to medium heat while the fabric is slightly damp.
                                Use a pressing cloth for delicate areas.
                            </p>
                        </div>
                        <div>
                            <h3 className="label-editorial text-bone mb-3">First Wear</h3>
                            <p className="caption-editorial text-ivory/80">
                                Natural handloom fabrics may have a slight stiffness initially.
                                This softens beautifully with each wear.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
