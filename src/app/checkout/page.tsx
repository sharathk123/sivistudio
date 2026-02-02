'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api/client'
import PaymentButton from '@/components/checkout/PaymentButton'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { Loader2, Plus, MapPin, Lock as LockIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

// Re-use logic from AddressesTab for fetching addresses
interface Address {
    id: string
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip_code: string
    country: string
    phone_number: string
    is_default: boolean
    type: 'home' | 'work' | 'other'
}

export default function CheckoutPage() {
    const { items, totalPrice, clearCart, totalItems } = useCart()
    const { user, isLoading: isAuthLoading } = useAuth()
    const router = useRouter()

    const [addresses, setAddresses] = useState<Address[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)

    // Redirect if empty cart or not logged in
    useEffect(() => {
        if (!isAuthLoading) {
            if (!user) {
                router.push('/login?next=/checkout')
            } else if (items.length === 0) {
                router.push('/shop')
            }
        }
    }, [user, isAuthLoading, items, router])

    // Fetch Addresses
    useEffect(() => {
        let isMounted = true;

        if (user) {
            const fetchAddresses = async () => {
                try {
                    const response = await api.getAddresses()
                    if (isMounted && response.success && response.data) {
                        setAddresses(response.data)
                        // Select default address if available
                        const defaultAddr = response.data.find((a: Address) => a.is_default)
                        if (defaultAddr) setSelectedAddressId(defaultAddr.id)
                        else if (response.data.length > 0) setSelectedAddressId(response.data[0].id)
                    }
                } catch (error) {
                    console.error('Failed to fetch addresses:', error)
                } finally {
                    if (isMounted) setIsLoadingAddresses(false)
                }
            }
            fetchAddresses()
        } else if (!isAuthLoading) {
            // If not loading and no user, stop loading addresses (handled by redirect)
            if (isMounted) setIsLoadingAddresses(false)
        }

        return () => { isMounted = false }
    }, [user, isAuthLoading])

    const handleSuccess = (orderId: string) => {
        clearCart()
        router.push(`/checkout/success?order_id=${orderId}`)
    }

    const handleError = (error: string) => {
        console.error("Checkout Error:", error)
        alert(error)
    }

    if (isAuthLoading || (user && items.length > 0 && isLoadingAddresses)) {
        return (
            <main className="min-h-screen bg-bone pt-28">
                <StickyHeader theme="light" />
                <div className="flex items-center justify-center h-[50vh]">
                    <Loader2 className="animate-spin text-sage" size={32} />
                </div>
            </main>
        )
    }

    if (!user || items.length === 0) return null

    return (
        <main className="min-h-screen bg-bone pt-28 pb-24">
            <StickyHeader theme="light" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Shipping & Review */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Header */}
                    <div>
                        <h1 className="font-serif text-4xl text-charcoal italic mb-2">Checkout</h1>
                        <p className="text-charcoal-400">Review your order and select a shipping address.</p>
                    </div>

                    {/* Address Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-6 border-b border-charcoal/10 pb-4">
                            <h2 className="font-serif text-2xl text-charcoal">Shipping Address</h2>
                            <Link href="/account" className="text-xs font-bold uppercase tracking-widest text-sage hover:text-sage-700 flex items-center space-x-2">
                                <Plus size={16} />
                                <span>Add New</span>
                            </Link>
                        </div>

                        {addresses.length === 0 ? (
                            <div className="border border-dashed border-charcoal/20 bg-ivory p-8 text-center rounded-sm">
                                <p className="text-charcoal-400 mb-4">No saved addresses found.</p>
                                <Link href="/account" className="btn-secondary">Add an Address to Continue</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddressId(addr.id)}
                                        className={`cursor-pointer border p-6 transition-all ${selectedAddressId === addr.id
                                            ? 'border-sage bg-ivory shadow-md'
                                            : 'border-charcoal/10 bg-white hover:border-charcoal/30'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${selectedAddressId === addr.id ? 'bg-sage text-white' : 'bg-gray-100 text-charcoal-400'
                                                }`}>
                                                {addr.type}
                                            </span>
                                            {selectedAddressId === addr.id && <div className="w-3 h-3 bg-sage rounded-full" />}
                                        </div>
                                        <h3 className="font-bold text-charcoal mb-1">{addr.full_name}</h3>
                                        <p className="text-sm text-charcoal-400 leading-relaxed">
                                            {addr.address_line1}, {addr.address_line2} <br />
                                            {addr.city}, {addr.state} - {addr.zip_code} <br />
                                            Phone: {addr.phone_number}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order Review */}
                    <div>
                        <h2 className="font-serif text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Order Items ({totalItems})</h2>
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.variantId} className="flex gap-6">
                                    <div className="relative w-20 h-28 bg-gray-100 flex-shrink-0">
                                        {item.product.images && item.product.images[0] && (
                                            <Image
                                                src={urlFor(item.product.images[0]).width(100).url()}
                                                alt={item.product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-serif text-lg text-charcoal">{item.product.title}</h3>
                                            <p className="font-bold text-charcoal">₹{((item.product.price || 0) * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <p className="text-sm text-charcoal-400 mt-1">Size: {item.selectedSize || 'Standard'}</p>
                                        <p className="text-sm text-charcoal-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 bg-white border border-charcoal/10 p-8 shadow-sm">
                        <h2 className="font-serif text-2xl text-charcoal mb-6 text-center">Payment Details</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-charcoal-400">
                                <span>Subtotal</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-charcoal-400">
                                <span>Shipping</span>
                                <span className="text-sage font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-charcoal-400">
                                <span>Tax (18% included)</span>
                                <span>₹{(totalPrice * 0.18).toLocaleString()}</span>
                            </div>
                            <div className="border-t border-charcoal/10 pt-4 flex justify-between items-center text-xl font-bold text-charcoal">
                                <span>Total</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        <PaymentButton
                            items={items.map(i => ({
                                id: i.product._id,
                                quantity: i.quantity,
                                price: i.product.price || 0
                            }))}
                            shippingAddressId={selectedAddressId}
                            totalAmount={totalPrice}
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />

                        <p className="text-center text-xs text-charcoal-300 mt-4 flex items-center justify-center gap-1">
                            <LockIcon size={12} />
                            Secure Payment via Razorpay
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
