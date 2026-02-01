'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product } from '@/lib/sanity/client';

// Define a leaner product type for storage to avoid localStorage quota limits
export type CompactProduct = Pick<
    Product,
    '_id' | 'title' | 'slug' | 'price' | 'priceDisplay' | 'images' | 'availability'
>;

export interface CartItem {
    product: CompactProduct;
    quantity: number;
    selectedSize?: string;
    variantId: string; // Unique identifier: productId + size
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string) => void;
    removeFromCart: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sivi-cart');
        if (savedCart) {
            try {
                const parsedItems: CartItem[] = JSON.parse(savedCart);
                // Migration: Ensure all items have a variantId
                const migratedItems = parsedItems.map(item => ({
                    ...item,
                    variantId: item.variantId || (item.selectedSize
                        ? `${item.product._id}-${item.selectedSize}`
                        : item.product._id)
                }));
                setItems(migratedItems);
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes, BUT only after initial load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('sivi-cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (product: Product, quantity: number = 1, size?: string) => {
        // Strip heavy fields (description, stories) before storing
        const compactProduct: CompactProduct = {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            priceDisplay: product.priceDisplay,
            images: product.images,
            availability: product.availability,
        };

        const variantId = size ? `${product._id}-${size}` : product._id;

        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.variantId === variantId);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.variantId === variantId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, {
                product: compactProduct,
                quantity,
                selectedSize: size,
                variantId
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (variantId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.variantId !== variantId));
    };

    const updateQuantity = (variantId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(variantId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.variantId === variantId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Alias totalItems as itemCount for backward compatibility
    const itemCount = totalItems;

    const totalPrice = items.reduce((sum, item) => {
        const price = item.product.priceDisplay === 'numeric' && item.product.price
            ? item.product.price
            : 0;
        return sum + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                openCart,
                closeCart,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
