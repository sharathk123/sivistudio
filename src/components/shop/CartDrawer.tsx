'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity } = useCart()
    const drawerRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    // Keyboard navigation: Escape key handler
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeCart()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Focus close button when drawer opens
            setTimeout(() => {
                closeButtonRef.current?.focus()
            }, 100)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, closeCart])

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full md:w-[500px] bg-bone shadow-2xl flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-ivory-300">
                            <h2 className="font-serif text-2xl italic text-charcoal">
                                Your Bag {items.length > 0 && `(${items.length})`}
                            </h2>
                            <button
                                ref={closeButtonRef}
                                onClick={closeCart}
                                className="text-xs uppercase tracking-widest hover:text-sage transition-colors focus:outline-none focus:text-sage focus:underline"
                                aria-label="Close shopping cart"
                            >
                                Close
                            </button>
                        </div>

                        {/* Screen Reader Announcement */}
                        <div role="status" aria-live="polite" className="sr-only">
                            {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                        </div>

                        {/* Cart Items or Empty State */}
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                <p className="font-serif text-lg text-charcoal mb-2">It's a bit quiet here.</p>
                                <p className="text-sm text-charcoal-400 mb-8 max-w-xs">
                                    Explore the Atelier to find something that speaks to you.
                                </p>
                                <button
                                    onClick={closeCart}
                                    className="bg-charcoal text-bone px-8 py-3 text-xs uppercase tracking-widest hover:bg-sage transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items List */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex gap-4 pb-6 border-b border-ivory-300 last:border-0"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-24 h-32 flex-shrink-0 bg-ivory overflow-hidden">
                                                {item.image ? (
                                                    <Image
                                                        src={urlFor(item.image).width(200).height(300).url()}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="96px"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-charcoal-300 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-serif text-base text-charcoal mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="font-mono text-sm text-charcoal-600">
                                                        ₹{item.price.toLocaleString('en-IN')}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-3 border border-ivory-300 rounded">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="px-3 py-1 text-charcoal hover:text-sage transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="font-mono text-sm w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-charcoal hover:text-sage transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-xs uppercase tracking-wider text-charcoal-400 hover:text-charcoal transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer with Checkout */}
                                <div className="p-6 border-t border-ivory-300 bg-ivory/30 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-charcoal">Subtotal</span>
                                        <span className="font-mono text-lg text-charcoal">
                                            ₹{subtotal.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-charcoal-400 text-center uppercase tracking-wide">
                                        Shipping & Taxes calculated at checkout
                                    </p>
                                    <Link
                                        href="/checkout"
                                        onClick={closeCart}
                                        className="block w-full bg-charcoal text-bone text-center py-4 text-xs uppercase tracking-widest hover:bg-sage transition-colors"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
