'use client'

import { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import StatCard from './StatCard'
import { api } from '@/lib/api/client'
import { formatDate } from '@/lib/utils/dateUtils'

export default function OverviewTab() {
    const [orders, setOrders] = useState<any[]>([])
    const [stats, setStats] = useState({
        totalOrders: 0,
        memberStatus: 'Member',
        points: 0
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Orders
                const ordersResponse = await api.getOrders()
                if (ordersResponse.success && ordersResponse.data) {
                    const allOrders = ordersResponse.data

                    // Update stats
                    setStats({
                        totalOrders: allOrders.length,
                        memberStatus: allOrders.length > 5 ? 'Gold' : 'Member',
                        points: allOrders.length * 100 // Mock points logic
                    })

                    // Map recent orders (take 3)
                    const recent = allOrders.slice(0, 3).map((order: any) => ({
                        id: order.id.slice(0, 8).toUpperCase(),
                        date: formatDate(order.created_at),
                        status: order.status || 'Pending',
                        total: `₹${order.total_amount?.toLocaleString() || '0'}`,
                        items: order.order_items?.map((item: any) => `Product ${item.sanity_product_id?.slice(0, 5)}...`) || [`${order.order_items?.length || 0} Items`]
                    }))
                    setOrders(recent)
                }
            } catch (err) {
                console.error('Failed to fetch overview data:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <div className="animate-pulse h-64 bg-gray-100 rounded-sm" />
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Orders" value={stats.totalOrders.toString()} />
                <StatCard label="Member Status" value={stats.memberStatus} />
                <StatCard label="Points Balance" value={stats.points.toString()} />
            </div>

            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl text-charcoal italic">Recent Orders</h2>
                </div>
                <div className="space-y-4">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <p className="text-charcoal-400 font-light italic">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
