/**
 * CartContext Tests
 * 
 * Unit tests for the CartContext functionality
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import { Product } from '@/lib/sanity/client'

// Mock product
const mockProduct: Product = {
    _id: 'test-product-1',
    title: 'Test Saree',
    slug: { current: 'test-saree', _type: 'slug' },
    price: 5000,
    priceDisplay: 'numeric',
    images: [],
    availability: 'in-stock',
}

describe('CartContext', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear()
        jest.clearAllMocks()
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider>{children}</CartProvider>
    )

    describe('addToCart', () => {
        it('should add a new item to the cart', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            expect(result.current.items).toHaveLength(1)
            expect(result.current.items[0].product._id).toBe(mockProduct._id)
            expect(result.current.items[0].quantity).toBe(1)
            expect(result.current.totalItems).toBe(1)
            expect(result.current.totalPrice).toBe(5000)
        })

        it('should increase quantity when adding existing item', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            act(() => {
                result.current.addToCart(mockProduct, 2)
            })

            expect(result.current.items).toHaveLength(1)
            expect(result.current.items[0].quantity).toBe(3)
            expect(result.current.totalItems).toBe(3)
            expect(result.current.totalPrice).toBe(15000)
        })

        it('should handle items with different sizes separately', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1, 'M')
            })

            act(() => {
                result.current.addToCart(mockProduct, 1, 'L')
            })

            expect(result.current.items).toHaveLength(2)
            expect(result.current.items[0].selectedSize).toBe('M')
            expect(result.current.items[1].selectedSize).toBe('L')
        })

        it('should open cart when adding item', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            expect(result.current.isCartOpen).toBe(false)

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            expect(result.current.isCartOpen).toBe(true)
        })
    })

    describe('removeFromCart', () => {
        it('should remove item from cart', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            expect(result.current.items).toHaveLength(1)

            act(() => {
                result.current.removeFromCart(mockProduct._id)
            })

            expect(result.current.items).toHaveLength(0)
            expect(result.current.totalItems).toBe(0)
            expect(result.current.totalPrice).toBe(0)
        })

        it('should remove correct item when multiple items exist', () => {
            const mockProduct2: Product = {
                ...mockProduct,
                _id: 'test-product-2',
                title: 'Test Saree 2',
                slug: { current: 'test-saree-2', _type: 'slug' },
                price: 3000,
            }

            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
                result.current.addToCart(mockProduct2, 1)
            })

            expect(result.current.items).toHaveLength(2)

            act(() => {
                result.current.removeFromCart(mockProduct._id)
            })

            expect(result.current.items).toHaveLength(1)
            expect(result.current.items[0].product._id).toBe(mockProduct2._id)
        })
    })

    describe('updateQuantity', () => {
        it('should update item quantity', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            act(() => {
                result.current.updateQuantity(mockProduct._id, 3)
            })

            expect(result.current.items[0].quantity).toBe(3)
            expect(result.current.totalItems).toBe(3)
            expect(result.current.totalPrice).toBe(15000)
        })

        it('should remove item when quantity is set to 0', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            act(() => {
                result.current.updateQuantity(mockProduct._id, 0)
            })

            expect(result.current.items).toHaveLength(0)
        })

        it('should remove item when quantity is negative', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            act(() => {
                result.current.updateQuantity(mockProduct._id, -1)
            })

            expect(result.current.items).toHaveLength(0)
        })
    })

    describe('clearCart', () => {
        it('should clear all items from cart', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
                result.current.addToCart({ ...mockProduct, _id: 'test-2' }, 1)
            })

            expect(result.current.items).toHaveLength(2)

            act(() => {
                result.current.clearCart()
            })

            expect(result.current.items).toHaveLength(0)
            expect(result.current.totalItems).toBe(0)
            expect(result.current.totalPrice).toBe(0)
        })
    })

    describe('cart open/close', () => {
        it('should open cart', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.openCart()
            })

            expect(result.current.isCartOpen).toBe(true)
        })

        it('should close cart', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.openCart()
            })

            act(() => {
                result.current.closeCart()
            })

            expect(result.current.isCartOpen).toBe(false)
        })
    })

    describe('localStorage persistence', () => {
        it('should save cart to localStorage', () => {
            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(mockProduct, 1)
            })

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'sivi-cart',
                expect.stringContaining(mockProduct._id)
            )
        })

        it('should load cart from localStorage on mount', () => {
            const savedCart = JSON.stringify([
                {
                    product: {
                        _id: mockProduct._id,
                        title: mockProduct.title,
                        slug: mockProduct.slug,
                        price: mockProduct.price,
                        priceDisplay: mockProduct.priceDisplay,
                        images: mockProduct.images,
                        availability: mockProduct.availability,
                    },
                    quantity: 2,
                    variantId: mockProduct._id,
                },
            ])

            localStorage.getItem = jest.fn(() => savedCart)

            const { result } = renderHook(() => useCart(), { wrapper })

            waitFor(() => {
                expect(result.current.items).toHaveLength(1)
                expect(result.current.items[0].quantity).toBe(2)
            })
        })
    })

    describe('price on request items', () => {
        it('should handle price on request items correctly', () => {
            const priceOnRequestProduct: Product = {
                ...mockProduct,
                _id: 'test-por',
                priceDisplay: 'on-request',
                price: null,
            }

            const { result } = renderHook(() => useCart(), { wrapper })

            act(() => {
                result.current.addToCart(priceOnRequestProduct, 1)
            })

            expect(result.current.items).toHaveLength(1)
            expect(result.current.totalPrice).toBe(0) // Price on request items don't contribute to total
        })
    })
})
