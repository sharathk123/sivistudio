'use client';

import { useState } from 'react';
import { Product } from '@/lib/sanity/types';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link';

export default function ProductActions({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<string | undefined>();

    // Check if product has sizes
    const hasSizes = product.sizes && product.sizes.length > 0;

    return (
        <div className="space-y-6">
            {/* Size Selector */}
            {hasSizes && (
                <div>
                    <div className="flex justify-between items-baseline mb-3">
                        <p className="caption-editorial">Select Size</p>
                        <Link href="/size-guide" className="text-xs underline text-ivory-300 hover:text-charcoal transition-colors">
                            Size Guide
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes!.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[48px] h-12 px-4 flex items-center justify-center border label-editorial transition-all active:scale-95 ${selectedSize === size
                                        ? 'border-charcoal bg-charcoal text-bone'
                                        : 'border-ivory-300 hover:border-charcoal text-charcoal'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    {!selectedSize && (
                        <p className="text-xs text-copper mt-2 animate-pulse">
                            Please select a size
                        </p>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-ivory-100">
                <div className="flex-1">
                    <AddToCartButton
                        product={product}
                        selectedSize={selectedSize}
                        disabled={hasSizes && !selectedSize}
                    />
                </div>
                <Link
                    href="/custom-tailoring"
                    className="flex-1 border border-charcoal text-charcoal py-5 px-8 label-editorial hover:bg-charcoal hover:text-bone transition-all duration-500 text-center"
                >
                    Schedule Consultation
                </Link>
            </div>
        </div>
    );
}
