'use client'

import { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { api } from '@/lib/api/client'
import { formatDate } from '@/lib/utils/dateUtils'

interface Order {
    id: string
    date: string
    status: string
    total: string
    items: string[]
}

export default function OrdersTab() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.getOrders()
                if (response.success && response.data) {
                    const mappedOrders = response.data.map((order: any) => ({
                        id: order.id.slice(0, 8).toUpperCase(), // Shortened ID for display
                        rawId: order.id,
                        date: formatDate(order.created_at),
                        status: order.status || 'Pending',
                        total: `₹${order.total_amount?.toLocaleString() || '0'}`,
                        items: order.order_items?.map((item: any) => `Product ${item.product_id?.slice(0, 5)}...`) || [`${order.order_items?.length || 0} Items`]
                    }))
                    setOrders(mappedOrders)
                }
            } catch (err) {
                console.error('Failed to fetch orders:', err)
                setError('Failed to load orders. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-sm w-full" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 bg-red-50 p-4 rounded-sm border border-red-100">
                {error}
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic">My Order History</h2>
            </div>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                ) : (
                    <div className="bg-ivory-100 p-12 text-center">
                        <p className="text-charcoal-400 font-light mb-4">You haven't placed any orders yet.</p>
                        <a href="/shop" className="text-sage font-bold uppercase tracking-widest text-xs border-b border-sage pb-1">Start Shopping</a>
                    </div>
                )}
            </div>
        </div>
    )
}
