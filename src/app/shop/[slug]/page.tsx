import { getProduct } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import PortableTextContent from '@/components/ui/PortableTextContent'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
                            <button className="w-full bg-sage text-white text-lg py-4 px-8 hover:bg-sage-600 transition-colors uppercase tracking-widest font-medium">
                                Add to Cart
                            </button>
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

            {/* Material Story (Deep Dive) */}
            {product.materialStory && (
                <div className="bg-ivory py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <span className="block text-center text-sage font-serif italic text-2xl mb-4">
                            The Craft
                        </span>
                        <h2 className="text-center font-serif text-4xl lg:text-5xl text-charcoal mb-16">
                            Material Story
                        </h2>
                        <div className="prose prose-lg prose-slate mx-auto">
                            <PortableTextContent value={product.materialStory} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
