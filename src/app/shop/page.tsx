import { getProducts } from '@/lib/sanity/client'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import StickyHeader from '@/components/ui/StickyHeader'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ShopPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-bone">
            <StickyHeader theme="light" />
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
                    <div className="flex gap-4">
                        <button className="btn-pill">Filter</button>
                        <button className="btn-pill">Sort</button>
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
                    <div className="text-center py-32 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-ivory-100 flex items-center justify-center mb-8">
                            <span className="font-serif text-4xl text-sage italic">S</span>
                        </div>
                        <h2 className="font-serif text-4xl text-charcoal italic mb-4">
                            The new collection is on the loom.
                        </h2>
                        <p className="text-charcoal-400 font-light max-w-lg mx-auto mb-8">
                            Our artisans are crafting the next drop. The atelier will be replenished soon.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 bg-charcoal text-bone text-xs uppercase tracking-widest hover:bg-sage transition-all duration-300 shadow-lg"
                        >
                            Return Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
