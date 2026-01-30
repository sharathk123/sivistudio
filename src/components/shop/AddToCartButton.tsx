'use client'

import { Product } from '@/lib/sanity/client'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface AddToCartButtonProps {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart()
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)

        // Add to cart
        addItem({
            id: product._id,
            title: product.title,
            price: product.price,
            image: product.images?.[0],
            quantity: 1
        })

        // Visual feedback
        setTimeout(() => {
            setIsAdding(false)
        }, 1000)
    }

    return (
        <motion.button
            onClick={handleAddToCart}
            disabled={isAdding}
            whileTap={{ scale: 0.98 }}
            className={`
                w-full text-lg py-4 px-8 uppercase tracking-widest font-medium
                transition-all duration-300
                ${isAdding
                    ? 'bg-sage-600 text-white cursor-wait'
                    : 'bg-sage text-white hover:bg-sage-600'
                }
            `}
        >
            {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                </span>
            ) : (
                'Add to Cart'
            )}
        </motion.button>
    )
}
