'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[var(--width-drawer)] bg-bone shadow-2xl z-[var(--z-drawer)] flex flex-col"
                    >
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
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-center"
                                >
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
                                </motion.div>
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence initial={false}>
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.variantId}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex gap-4 overflow-hidden"
                                            >
                                                {/* Product Image */}
                                                <Link
                                                    href={`/products/${item.product.slug.current}`}
                                                    onClick={closeCart}
                                                    className="relative w-24 h-32 flex-shrink-0 bg-ivory-200 overflow-hidden group"
                                                >
                                                    {item.product.images && item.product.images[0] && (
                                                        <Image
                                                            src={urlFor(item.product.images[0]).width(200).height(267).url()}
                                                            alt={item.product.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-ivory-100 active:bg-ivory-200 transition-colors text-charcoal/60 hover:text-charcoal"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12H6" />
                                                                </svg>
                                                            </button>
                                                            <motion.span
                                                                key={item.quantity}
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="w-8 text-center label-editorial text-charcoal text-xs"
                                                            >
                                                                {item.quantity}
                                                            </motion.span>
                                                            <button
                                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-ivory-100 active:bg-ivory-200 transition-colors text-charcoal/60 hover:text-charcoal"
                                                                aria-label="Increase quantity"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.variantId)}
                                                            className="text-xs uppercase tracking-wider text-ivory-300 hover:text-copper transition-colors"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <motion.div
                                layout
                                className="border-t border-ivory-200 p-6 space-y-4 bg-bone"
                            >
                                {/* Subtotal */}
                                <div className="flex justify-between items-center py-2 border-b border-ivory-200/50 mb-2">
                                    <span className="subtitle-editorial text-lg opacity-60 uppercase tracking-widest">Subtotal</span>
                                    <motion.span
                                        key={totalPrice}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-serif italic text-3xl accent-charcoal"
                                    >
                                        ₹{totalPrice.toLocaleString('en-IN')}
                                    </motion.span>
                                </div>

                                {/* Note */}
                                <p className="caption-editorial text-ivory-300 text-center text-xs">
                                    Shipping and taxes calculated at checkout
                                </p>

                                {/* Checkout Button */}
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="w-full bg-charcoal text-bone py-4 label-editorial hover:bg-sage transition-all duration-500 shadow-lg text-center block group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Proceed to Checkout
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </span>
                                </Link>

                                {/* Continue Shopping */}
                                <button
                                    onClick={closeCart}
                                    className="w-full text-charcoal py-2 label-editorial text-xs hover:text-sage transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
