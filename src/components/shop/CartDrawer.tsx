'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

export default function CartDrawer() {
    const { isOpen, closeCart } = useCart()

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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full md:w-[500px] bg-bone shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-ivory-300">
                            <h2 className="font-serif text-2xl italic text-charcoal">Your Bag</h2>
                            <button onClick={closeCart} className="text-xs uppercase tracking-widest hover:text-sage transition-colors">
                                Close
                            </button>
                        </div>

                        {/* Empty State (Mock) */}
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

                        {/* Footer */}
                        <div className="p-6 border-t border-ivory-300 bg-ivory/30">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-medium text-charcoal">Subtotal</span>
                                <span className="font-mono text-charcoal">₹0.00</span>
                            </div>
                            <p className="text-[10px] text-charcoal-400 text-center uppercase tracking-wide">
                                Shipping & Taxes calculated at checkout
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
