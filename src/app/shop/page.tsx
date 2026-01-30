import { getProducts } from '@/lib/sanity/client'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ShopPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-bone">
            {/* Header */}
            <div className="pt-32 pb-16 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic mb-6">
                    The Atelier
                </h1>
                <p className="max-w-2xl mx-auto text-charcoal-400 text-lg tracking-wide font-light">
                    Explore our curated collection of handcrafted garments, designed in Hyderabad with conscious luxury in mind.
                </p>
            </div>

            {/* Filter Placeholder */}
            <div className="border-t border-b border-ivory-300 py-4 mb-16">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm tracking-widest text-charcoal-300 uppercase">
                    <div>
                        <span>All Items ({products.length})</span>
                    </div>
                    <div className="flex gap-6">
                        <button className="hover:text-sage transition-colors">Filter</button>
                        <button className="hover:text-sage transition-colors">Sort</button>
                    </div>
                </div>
            </div>

            {/* Product Grid - Asymmetrical "Anti-Grid" */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 auto-rows-auto">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                className={`
                                    ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                                    ${index % 5 === 2 ? 'lg:col-span-2' : ''}
                                `}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 space-y-6">
                        <p className="font-serif text-2xl text-charcoal-300 italic">
                            The new collection is on the loom.
                        </p>
                        <p className="text-charcoal-400">
                            Our artisans are crafting the next drop. Check back soon.
                        </p>
                        <Link
                            href="/"
                            className="inline-block border-b border-sage text-sage hover:text-sage-700 transition-colors pb-1"
                        >
                            Return Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
