'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import { useEffect } from 'react';

export default function CartDrawer() {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, closeCart } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[var(--width-drawer)] bg-bone shadow-2xl z-[var(--z-drawer)] transform transition-transform duration-500 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="border-b border-ivory-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="subtitle-editorial text-2xl">Your Cart</h2>
                                <p className="caption-editorial text-ivory-300 mt-1">
                                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-10 h-10 flex items-center justify-center hover:bg-ivory-100 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-24 h-24 rounded-full bg-ivory-100 flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-ivory-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <p className="subtitle-editorial text-xl mb-2">Your cart is empty</p>
                                <p className="caption-editorial text-ivory-300 mb-8">
                                    Discover our handloom collection
                                </p>
                                <Link
                                    href="/shop"
                                    onClick={closeCart}
                                    className="px-8 py-4 bg-charcoal text-bone label-editorial hover:bg-sage transition-colors"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.variantId} className="flex gap-4 animate-fadeInUp">
                                        {/* Product Image */}
                                        <Link
                                            href={`/products/${item.product.slug.current}`}
                                            onClick={closeCart}
                                            className="relative w-24 h-32 flex-shrink-0 bg-ivory-200 overflow-hidden"
                                        >
                                            {item.product.images && item.product.images[0] && (
                                                <Image
                                                    src={urlFor(item.product.images[0]).width(200).height(267).url()}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.product.slug.current}`}
                                                onClick={closeCart}
                                                className="block"
                                            >
                                                <h3 className="subtitle-editorial text-lg mb-1 hover:text-sage transition-colors line-clamp-2" title={item.product.title}>
                                                    {item.product.title}
                                                </h3>
                                            </Link>

                                            <div className="flex items-baseline gap-2 mb-3">
                                                {item.product.priceDisplay === 'numeric' && item.product.price ? (
                                                    <p className="font-mono accent-copper">
                                                        ₹{item.product.price.toLocaleString('en-IN')}
                                                    </p>
                                                ) : (
                                                    <p className="caption-editorial text-sage">Price on Request</p>
                                                )}

                                                {item.selectedSize && (
                                                    <p className="text-xs uppercase tracking-wider text-sage border-l border-sage/30 pl-2">
                                                        Size: {item.selectedSize}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border border-ivory-300">
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                        className="w-10 h-10 flex items-center justify-center hover:bg-ivory-100 active:bg-ivory-200 active:scale-95 transition-all text-charcoal/60 hover:text-charcoal"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12H6" />
                                                        </svg>
                                                    </button>
                                                    <span className="w-10 text-center label-editorial text-charcoal">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center hover:bg-ivory-100 active:bg-ivory-200 active:scale-95 transition-all text-charcoal/60 hover:text-charcoal"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.variantId)}
                                                    className="caption-editorial text-ivory-300 hover:text-copper transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-ivory-200 p-6 space-y-4">
                            {/* Subtotal */}
                            <div className="flex justify-between items-baseline">
                                <span className="subtitle-editorial text-xl">Subtotal</span>
                                <span className="title-editorial text-2xl">
                                    ₹{totalPrice.toLocaleString('en-IN')}
                                </span>
                            </div>

                            {/* Note */}
                            <p className="caption-editorial text-ivory-300 text-center">
                                Shipping and taxes calculated at checkout
                            </p>

                            {/* Checkout Button */}
                            <button className="w-full bg-charcoal text-bone py-5 label-editorial hover:bg-sage transition-all duration-500 shadow-card">
                                Proceed to Checkout
                            </button>

                            {/* Continue Shopping */}
                            <button
                                onClick={closeCart}
                                className="w-full border border-charcoal text-charcoal py-4 label-editorial hover:bg-charcoal hover:text-bone transition-all duration-500"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
