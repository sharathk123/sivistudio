'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';

interface WishlistButtonProps {
    productId: string;
    className?: string;
    iconSize?: number;
    showLabel?: boolean;
}

export default function WishlistButton({
    productId,
    className = "",
    iconSize = 20,
    showLabel = false
}: WishlistButtonProps) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(productId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(productId);
            }}
            className={`group flex items-center justify-center gap-2 transition-all duration-300 ${className}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
            >
                <Heart
                    size={iconSize}
                    className={`transition-colors duration-300 ${isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-charcoal group-hover:text-red-500"
                        }`}
                />
            </motion.div>
            {showLabel && (
                <span className="text-xs uppercase tracking-widest font-medium">
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </span>
            )}
        </button>
    );
}
