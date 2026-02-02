'use client'

import { useWishlist } from '@/context/WishlistContext'
import { Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'

export default function WishlistTab() {
    const { items, isLoading, toggleWishlist } = useWishlist()

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-[3/4] bg-ivory-100 rounded-sm"></div>
                ))}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="border border-charcoal/5 bg-ivory-50/50 p-20 text-center">
                <div className="w-16 h-16 bg-ivory-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="text-charcoal-300" size={24} />
                </div>
                <h3 className="font-serif text-2xl text-charcoal italic mb-4">Your Wishlist is Empty</h3>
                <p className="text-charcoal-400 font-light mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                    Save the heritage pieces you love most to revisit them for your next celebration.
                </p>
                <Link href="/shop" className="px-8 py-4 bg-charcoal text-bone text-xs uppercase tracking-widest hover:bg-sage transition-all duration-500 inline-block">
                    Explore The Atelier
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-6">
                <h2 className="font-serif text-3xl text-charcoal italic">My Selection</h2>
                <span className="text-xs uppercase tracking-widest text-charcoal-300">
                    {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Saved
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {items.map((item) => {
                    const product = item.product
                    if (!product) return null

                    // Safeguard against missing images or data
                    const imageUrl = product.images && product.images[0]
                        ? urlFor(product.images[0]).width(800).url()
                        : null

                    return (
                        <div key={item.id} className="group flex flex-col">
                            <div className="relative aspect-[3/4] mb-5 bg-ivory-100 overflow-hidden shadow-sm group-hover:shadow-card transition-all duration-700">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={product.title || 'Product'}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-charcoal-300 bg-ivory-200">
                                        No Image
                                    </div>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleWishlist(product._id)
                                    }}
                                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm text-charcoal hover:text-red-600 transition-all rounded-full shadow-sm"
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <Link
                                    href={`/products/${product.slug.current}`}
                                    className="absolute inset-x-4 bottom-4 btn-luxury bg-white text-charcoal border-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center py-3 text-[10px]"
                                >
                                    View Product
                                </Link>
                            </div>

                            <div className="space-y-2">
                                <Link href={`/products/${product.slug.current}`} className="block">
                                    <h3 className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                </Link>
                                <div className="flex justify-between items-baseline">
                                    <p className="font-mono text-sm accent-copper truncate">
                                        {product.priceDisplay === 'numeric' && product.price
                                            ? `₹${product.price.toLocaleString('en-IN')}`
                                            : 'Price on Request'}
                                    </p>
                                    {product.collections && product.collections[0] && (
                                        <span className="text-[10px] uppercase tracking-widest text-charcoal-300">
                                            {product.collections[0].title}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
