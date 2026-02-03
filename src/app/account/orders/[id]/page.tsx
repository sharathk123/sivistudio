'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api/client'
import { formatDate } from '@/lib/utils/dateUtils'
import StickyHeader from '@/components/ui/StickyHeader'
import Footer from '@/components/ui/Footer'
import { LogoLoader } from '@/components/ui'
import { ArrowLeft, Package, MapPin, CreditCard, Download } from 'lucide-react'
import Link from 'next/link'

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [order, setOrder] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (!id) {
                    setError('Order ID is missing.')
                    setIsLoading(false)
                    return
                }
                const response = await api.getOrder(id)
                if (response.success && response.data) {
                    setOrder(response.data)
                } else {
                    setError('Order not found')
                }
            } catch (err) {
                console.error('Failed to fetch order:', err)
                setError('Failed to load order details.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrder()
    }, [id])

    if (isLoading) {
        return (
            <main className="bg-bone min-h-screen pt-28">
                <StickyHeader theme="light" />
                <div className="flex items-center justify-center h-[50vh]">
                    <LogoLoader variant="inline" />
                </div>
            </main>
        )
    }

    if (error || !order) {
        return (
            <main className="bg-bone min-h-screen pt-28">
                <StickyHeader theme="light" />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                    <h1 className="font-serif text-3xl text-charcoal italic mb-4">Order Not Found</h1>
                    <p className="text-charcoal-400 mb-8">{error || 'The requested order could not be found.'}</p>
                    <Link href="/account" className="btn-luxury">Back to Account</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-bone min-h-screen pt-28">
            <StickyHeader theme="light" />
            <div className="max-w-4xl mx-auto px-6 pb-24">

                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/account" className="flex items-center space-x-2 text-charcoal-400 hover:text-sage transition-colors text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} />
                        <span>Back to Orders</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-charcoal/10 pb-8">
                    <div>
                        <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-2">Order Details</span>
                        <h1 className="font-serif text-3xl md:text-5xl text-charcoal italic">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
                        <p className="text-charcoal-400 mt-2">Placed on {formatDate(order.created_at)}</p>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-4">
                        <span className="px-4 py-2 bg-sage/10 text-sage text-xs uppercase font-bold tracking-wider rounded-sm flex items-center">
                            <Package size={14} className="mr-2" />
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Main Content: Items */}
                    <div className="md:col-span-2 space-y-8">
                        <h2 className="font-serif text-2xl text-charcoal italic border-b border-charcoal/10 pb-4">Items</h2>
                        <div className="space-y-6">
                            {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-charcoal mb-1">Product {item.sanity_product_id ? item.sanity_product_id.slice(0, 8) : 'Unknown'}</p>
                                        {item.selected_size && (
                                            <p className="text-xs text-sage uppercase tracking-wider mb-1">Size: {item.selected_size}</p>
                                        )}
                                        <p className="text-sm text-charcoal-400">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-serif text-lg">₹{(Number(item.price || 0) * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="border-t-2 border-charcoal/10 pt-6 space-y-3">
                            <div className="flex justify-between text-charcoal-400 text-sm">
                                <span>Subtotal</span>
                                <span>₹{Number(order.total_amount || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-charcoal-400 text-sm">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-charcoal font-bold text-xl pt-4 border-t border-charcoal/5">
                                <span>Total</span>
                                <span>₹{Number(order.total_amount || 0).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Details */}
                    <div className="space-y-8">
                        <div className="bg-ivory p-6 border border-charcoal/5">
                            <h3 className="font-bold text-charcoal uppercase tracking-widest text-xs mb-4 flex items-center">
                                <MapPin size={14} className="mr-2" /> Shipping Address
                            </h3>
                            <div className="text-charcoal-400 text-sm leading-relaxed">
                                {typeof order.shipping_address === 'object' ? (
                                    <>
                                        <p className="font-bold text-charcoal mb-1">{order.shipping_address.full_name}</p>
                                        <p>{order.shipping_address.address_line1}</p>
                                        {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
                                        <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.zip_code}</p>
                                        <p>{order.shipping_address.phone_number}</p>
                                    </>
                                ) : (
                                    <p>{order.shipping_address}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-ivory p-6 border border-charcoal/5">
                            <h3 className="font-bold text-charcoal uppercase tracking-widest text-xs mb-4 flex items-center">
                                <CreditCard size={14} className="mr-2" /> Payment Method
                            </h3>
                            <p className="text-charcoal-400 text-sm">
                                {order.razorpay_payment_id ? 'Paid via Razorpay' : 'Pay on Delivery'}
                            </p>
                        </div>

                        <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                            <Download size={16} />
                            <span>Download Invoice</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
