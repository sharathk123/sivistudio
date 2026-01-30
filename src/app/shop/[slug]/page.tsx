import { getProduct } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import PortableTextContent from '@/components/ui/PortableTextContent'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AddToCartButton from '@/components/shop/AddToCartButton'

export const revalidate = 60

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="bg-bone min-h-screen">
            {/* Top Section: Split Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Visuals (Left/Top) */}
                <div className="w-full lg:w-1/2 bg-ivory-100 relative h-[50vh] lg:h-auto">
                    {product.images && product.images[0] ? (
                        <Image
                            src={urlFor(product.images[0]).url()}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-charcoal-300">
                            No Image Available
                        </div>
                    )}
                </div>

                {/* Details (Right/Bottom) */}
                <div className="w-full lg:w-1/2 px-6 py-12 lg:p-24 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-charcoal-400 space-x-2">
                            <Link href="/shop" className="hover:text-sage transition-colors">The Atelier</Link>
                            <span>/</span>
                            <span className="text-charcoal">{product.title}</span>
                        </div>

                        {/* Title & Price */}
                        <div>
                            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-4 italic leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-2xl text-sage-700 font-medium">
                                ₹{product.price.toLocaleString('en-IN')}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-charcoal-400 leading-relaxed font-light text-lg">
                            {product.description}
                        </p>

                        {/* Actions */}
                        <div className="pt-8 border-t border-ivory-300 space-y-4">
                            <AddToCartButton product={product} />
                            <p className="text-xs text-charcoal-300 text-center tracking-wide">
                                Ships within 7-10 business days for standard orders.
                            </p>
                        </div>

                        {/* Key Specs (Mini) */}
                        {product.technicalSpecs && (
                            <div className="grid grid-cols-2 gap-4 pt-8">
                                {product.technicalSpecs.slice(0, 4).map((spec, idx) => (
                                    <div key={idx} className="border border-ivory-300 p-4">
                                        <p className="text-xs text-charcoal-300 uppercase tracking-wider mb-1">
                                            {spec.label}
                                        </p>
                                        <p className="font-serif text-lg text-charcoal italic">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Material Science Deep Dive */}
            <section className="bg-charcoal py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                            The Science
                        </span>
                        <h2 className="font-serif text-4xl lg:text-6xl text-bone italic mt-4 mb-8">
                            Material Mastery
                        </h2>
                        <div className="w-24 h-1 bg-sage mx-auto" />
                    </div>

                    {/* Technical Callouts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* 40D Foam Structure */}
                        <div className="bg-charcoal-200 p-8 rounded-sm border border-sage/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-sage-100 italic mb-3">40D Foam Structure</h3>
                                    <p className="text-ivory-300 leading-relaxed">
                                        High-density foam padding that maintains shape and support season after season.
                                        Breathable, resilient, and designed to age gracefully.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 60s Count Cotton */}
                        <div className="bg-charcoal-200 p-8 rounded-sm border border-sage/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-sage-100 italic mb-3">60s Count Cotton</h3>
                                    <p className="text-ivory-300 leading-relaxed">
                                        Fine, tightly-woven cotton with superior thread density. Soft against skin,
                                        naturally breathable, and becomes softer with every wash.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fabric Origin Story */}
                    {product.materialStory && (
                        <div className="prose prose-lg prose-invert mx-auto">
                            <PortableTextContent value={product.materialStory} />
                        </div>
                    )}

                    {!product.materialStory && (
                        <div className="text-center space-y-6">
                            <p className="text-ivory-200 text-lg leading-relaxed max-w-3xl mx-auto">
                                Every piece begins on the traditional looms of Telangana. Our artisans work with
                                heritage techniques passed down through generations, ensuring each garment carries
                                the soul of its maker.
                            </p>
                            <p className="text-ivory-300 leading-relaxed max-w-3xl mx-auto">
                                From Pochampally Ikat's tie-dye precision to Gadwal silk's distinctive zari borders,
                                we collaborate directly with master weavers to honor their craft while creating
                                contemporary silhouettes.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Products or CTA */}
            <section className="bg-ivory py-24 px-6 text-center">
                <Link
                    href="/shop"
                    className="inline-block border border-charcoal text-charcoal px-12 py-6 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-colors duration-500"
                >
                    Continue Shopping
                </Link>
            </section>
        </div>
    )
}
