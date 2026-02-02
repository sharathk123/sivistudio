'use client'

import { useState } from 'react'
import { Product, Collection } from '@/lib/sanity/client'
import ProductCard from './ProductCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

interface ShopDisplayProps {
    products: Product[]
    collections: Collection[]
}

type SortOption = 'price-low' | 'price-high' | 'newest' | 'title-az'

export default function ShopDisplay({ products, collections }: ShopDisplayProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectedCollection = searchParams.get('collection') || 'all'
    const sortBy = (searchParams.get('sort') as SortOption) || 'newest'

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all' || (key === 'sort' && value === 'newest')) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        router.push(`/shop?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Action Bar - Redesigned without borders */}
            <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-4 mb-8">
                <div className="text-sm tracking-widest text-charcoal-300 uppercase">
                    <span>{products.length} Items</span>
                </div>

                <div className="flex gap-3 relative">
                    {/* Collection Filter */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsFilterOpen(!isFilterOpen)
                                setIsSortOpen(false)
                            }}
                            className={`btn-pill ${selectedCollection !== 'all' ? 'bg-sage text-bone border-sage' : ''}`}
                        >
                            Filter {selectedCollection !== 'all' ? `(${collections.find(c => c.slug.current === selectedCollection)?.title || selectedCollection})` : ''}
                        </button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white border border-ivory-200 shadow-xl z-50 py-2 rounded-sm"
                                >
                                    <button
                                        onClick={() => { updateParams('collection', 'all'); setIsFilterOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-ivory-50 ${selectedCollection === 'all' ? 'text-sage font-medium' : 'text-charcoal'}`}
                                    >
                                        All Collections
                                    </button>
                                    {collections.map(c => (
                                        <button
                                            key={c._id}
                                            onClick={() => { updateParams('collection', c.slug.current); setIsFilterOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-ivory-50 ${selectedCollection === c.slug.current ? 'text-sage font-medium' : 'text-charcoal'}`}
                                        >
                                            {c.title}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsSortOpen(!isSortOpen)
                                setIsFilterOpen(false)
                            }}
                            className="btn-pill"
                        >
                            Sort
                        </button>

                        <AnimatePresence>
                            {isSortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white border border-ivory-200 shadow-xl z-50 py-2 rounded-sm"
                                >
                                    {[
                                        { id: 'newest', label: 'Recommended' },
                                        { id: 'price-low', label: 'Price: Low to High' },
                                        { id: 'price-high', label: 'Price: High to Low' },
                                        { id: 'title-az', label: 'Name: A to Z' }
                                    ].map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => { updateParams('sort', option.id); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-ivory-50 ${sortBy === option.id ? 'text-sage font-medium' : 'text-charcoal'}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="pb-24">
                <AnimatePresence mode="popLayout">
                    {products.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 auto-rows-auto"
                        >
                            {products.map((product, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={product._id}
                                    className={`
                                        ${index % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                                        ${index % 7 === 3 ? 'lg:col-span-2' : ''}
                                    `}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32 flex flex-col items-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-ivory-100 flex items-center justify-center mb-8">
                                <span className="font-serif text-4xl text-sage italic">S</span>
                            </div>
                            <h2 className="font-serif text-4xl text-charcoal italic mb-4">
                                No items found.
                            </h2>
                            <p className="text-charcoal-400 font-light max-w-lg mx-auto mb-8">
                                We couldn't find any items matching your selected criteria.
                            </p>
                            <button
                                onClick={() => router.push('/shop')}
                                className="inline-block px-8 py-3 bg-charcoal text-bone text-xs uppercase tracking-widest hover:bg-sage transition-all duration-300 shadow-lg"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
