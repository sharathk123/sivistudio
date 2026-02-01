'use client';

import { useCart } from '@/context/CartContext';

export default function CartButton() {
    const { totalItems, openCart } = useCart();

    return (
        <button
            onClick={openCart}
            className="relative group text-current"
            aria-label="Open cart"
        >
            <svg
                className="w-6 h-6 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
            </svg>

            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-copper text-bone text-xs font-mono flex items-center justify-center rounded-full animate-fadeInUp">
                    {totalItems > 9 ? '9+' : totalItems}
                </span>
            )}
        </button>
    );
}
