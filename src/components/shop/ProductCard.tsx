'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Product } from '@/lib/sanity/client'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/shop/${product.slug.current}`} className="group block">
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory-100">
                    {product.images && product.images[0] ? (
                        <Image
                            src={urlFor(product.images[0]).width(600).height(800).url()}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-charcoal-300">
                            No Image
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                </div>

                {/* Details */}
                <div className="text-center space-y-1">
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300">
                        {product.title}
                    </h3>
                    {product.categories && product.categories.length > 0 && (
                        <p className="text-xs text-charcoal-300 uppercase tracking-widest">
                            {product.categories[0].title}
                        </p>
                    )}
                    <p className="font-medium text-sage-700">
                        ₹{product.price.toLocaleString('en-IN')}
                    </p>
                </div>
            </motion.div>
        </Link>
    )
}
