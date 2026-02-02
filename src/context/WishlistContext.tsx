'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import { useAuth } from './AuthContext';

interface WishlistItem {
    id: string; // Wishlist entry ID in DB
    product_id: string; // Sanity product ID
    created_at: string;
    product: any; // Full product data from Sanity
}

interface WishlistContextType {
    items: WishlistItem[];
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (productId: string) => Promise<void>;
    isLoading: boolean;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const fetchWishlist = async () => {
        if (!user) {
            setItems([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.getWishlist();
            if (response.success && response.data) {
                setItems(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    const isInWishlist = (productId: string) => {
        return items.some(item => item.product_id === productId);
    };

    const toggleWishlist = async (productId: string) => {
        if (!user) {
            // Optional: Redirect to login or show message
            window.location.href = '/login';
            return;
        }

        const existingItem = items.find(item => item.product_id === productId);

        if (existingItem) {
            // Remove from wishlist
            const previousItems = [...items];
            setItems(items.filter(item => item.product_id !== productId));

            try {
                await api.removeFromWishlist(existingItem.id);
            } catch (error) {
                console.error('Failed to remove from wishlist:', error);
                setItems(previousItems);
            }
        } else {
            // Add to wishlist
            // Optimistic UI might be tricky here because we don't have the 
            // product details readily available in the same format, 
            // but we can at least add the ID.
            try {
                const response = await api.addToWishlist(productId);
                if (response.success) {
                    await fetchWishlist(); // Refresh to get full product data
                }
            } catch (error) {
                console.error('Failed to add to wishlist:', error);
            }
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                isInWishlist,
                toggleWishlist,
                isLoading,
                refreshWishlist: fetchWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
