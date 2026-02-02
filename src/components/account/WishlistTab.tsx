'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api/client'
import { Trash2, ShoppingBag, Loader2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface WishlistItem {
    id: string // Wishlist ID
    product_id: string
    created_at: string
    product: {
        _id: string
        name: string
        slug: { current: string }
        price: number
        mainImage: string
        categorySlug: string
    } | null
}

export default function WishlistTab() {
    const [items, setItems] = useState<WishlistItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchWishlist = async () => {
        try {
            const response = await api.getWishlist()
            if (response.success && response.data) {
                setItems(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    const handleRemove = async (id: string) => {
        // Optimistic UI update
        const previousItems = [...items]
        setItems(items.filter(item => item.id !== id))

        try {
            await api.removeFromWishlist(id)
        } catch (error) {
            console.error('Failed to remove item:', error)
            setItems(previousItems) // Revert if failed
        }
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-[3/4] bg-gray-100 rounded-sm"></div>
                ))}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="border border-dashed border-charcoal/20 bg-ivory-50 p-24 text-center">
                <h3 className="font-serif text-2xl text-charcoal italic mb-4">Your Wishlist is Empty</h3>
                <p className="text-charcoal-400 font-light mb-8">Save items you love to revisit them later.</p>
                <Link href="/shop" className="btn-luxury inline-flex">
                    Explore Collection
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic">My Wishlist</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {items.map((item) => {
                    const product = item.product
                    if (!product) return null

                    return (
                        <div key={item.id} className="group relative">
                            <div className="relative aspect-[3/4] mb-4 bg-ivory overflow-hidden">
                                {product.mainImage && (
                                    <Image
                                        src={product.mainImage}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                )}

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleRemove(item.id)
                                    }}
                                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm text-charcoal hover:text-red-600 transition-colors rounded-full opacity-0 group-hover:opacity-100"
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <Link
                                        href={`/shop/${product.categorySlug}/${product.slug.current}`}
                                        className="btn-secondary bg-white text-charcoal border-none hover:bg-sage hover:text-white w-full text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            <Link href={`/shop/${product.categorySlug}/${product.slug.current}`} className="block">
                                <h3 className="font-serif text-lg text-charcoal truncate">{product.name}</h3>
                                <p className="text-charcoal-400 text-sm mt-1">₹{product.price.toLocaleString()}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
