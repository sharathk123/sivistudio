'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function CartButton() {
    const { totalItems, openCart } = useCart();

    return (
        <button
            onClick={openCart}
            className="relative group text-current hover:text-sage transition-colors duration-300"
            aria-label="Open cart"
        >
            <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />

            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-copper text-bone text-[10px] font-mono flex items-center justify-center rounded-full shadow-sm animate-fadeInUp">
                    {totalItems > 9 ? '9+' : totalItems}
                </span>
            )}
        </button>
    );
}
