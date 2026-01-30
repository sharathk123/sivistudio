'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SanityImage } from '@/lib/sanity/client'

export interface CartItem {
    id: string
    title: string
    price: number
    quantity: number
    image?: SanityImage
}

interface CartContextType {
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    itemCount: number
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState<CartItem[]>([])

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id)
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                )
            }
            return [...prevItems, { ...item, quantity: item.quantity || 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const itemCount = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            isOpen,
            openCart,
            closeCart,
            itemCount,
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
