'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/sanity/client';
import { useHaptic } from '@/hooks/useHaptic';

interface AddToCartButtonProps {
    product: Product;
    selectedSize?: string;
    disabled?: boolean;
}

export default function AddToCartButton({ product, selectedSize, disabled = false }: AddToCartButtonProps) {
    const { addToCart, isCartOpen } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const haptic = useHaptic();

    const handleAddToCart = () => {
        haptic('success');
        setIsAdding(true);
        addToCart(product, 1, selectedSize);

        // Show adding feedback briefly
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    if (product.availability === 'sold_out') {
        return (
            <button
                disabled
                className="w-full bg-ivory-300 text-bone py-5 px-8 label-editorial cursor-not-allowed"
            >
                Sold Out
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding || disabled}
            className={`w-full py-5 px-8 label-editorial transition-all duration-500 shadow-card hover:shadow-lg active:scale-[0.98] relative overflow-hidden group ${isAdding || disabled
                ? 'bg-sage-600 text-bone'
                : 'bg-sage text-bone hover:bg-sage-600'
                }`}
        >
            <span className={`relative z-10 flex items-center justify-center gap-2 ${isAdding ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                {product.availability === 'made_to_order' ? 'Order Now' : 'Add to Bag'}
            </span>

            {/* Success State */}
            <span className={`absolute inset-0 z-10 flex items-center justify-center gap-2 ${isAdding ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'} transition-all duration-300`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Bag
            </span>
        </button>
    );
}
