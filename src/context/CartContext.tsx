'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [itemCount, setItemCount] = useState(0) // Mock count for now

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    return (
        <CartContext.Provider value={{ isOpen, openCart, closeCart, itemCount }}>
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
