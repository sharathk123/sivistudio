'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Product } from '@/lib/sanity/client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import WishlistButton from '@/components/ui/WishlistButton'
import { Eye, ShoppingBag } from 'lucide-react'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Use second image as macro shot if available, otherwise use first image
    const lifestyleImage = product.images?.[0]
    const macroImage = product.images?.[1] || product.images?.[0]

    return (
        <Link href={`/products/${product.slug.current}`} className="group block">
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container with Crossfade */}
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory-100">
                    {lifestyleImage && (
                        <>
                            {/* Lifestyle Image */}
                            <motion.div
                                animate={{ opacity: isHovered ? 0 : 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={urlFor(lifestyleImage).width(600).height(800).url()}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </motion.div>

                            {/* Macro/Detail Image */}
                            {macroImage && (
                                <motion.div
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={urlFor(macroImage).width(600).height(800).url()}
                                        alt={`${product.title} - Detail`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </motion.div>
                            )}
                        </>
                    )}

                    {!lifestyleImage && (
                        <div className="flex h-full items-center justify-center text-charcoal-300">
                            No Image
                        </div>
                    )}

                    {/* Subtle Overlay & Quick Actions */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <button
                                className="bg-bone text-charcoal p-3 rounded-full shadow-card hover:bg-sage hover:text-bone transition-colors"
                                aria-label="Quick View"
                            >
                                <Eye size={20} />
                            </button>
                            <button
                                className="bg-bone text-charcoal p-3 rounded-full shadow-card hover:bg-sage hover:text-bone transition-colors"
                                aria-label="Add to Cart"
                            >
                                <ShoppingBag size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Wishlist Button Overlay */}
                    <div className="absolute top-4 right-4 z-20">
                        <WishlistButton
                            productId={product._id}
                            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-all transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="text-center space-y-1">
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300">
                        {product.title}
                    </h3>
                    {product.collections && product.collections.length > 0 && (
                        <p className="text-xs text-charcoal-300 uppercase tracking-widest">
                            {product.collections[0].title}
                        </p>
                    )}
                    {product.priceDisplay === 'numeric' && product.price ? (
                        <p className="font-mono accent-copper">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                    ) : (
                        <p className="caption-editorial text-sage">
                            Price on Request
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    )
}
