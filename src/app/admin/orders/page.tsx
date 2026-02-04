'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MoreHorizontal, Search, Filter } from 'lucide-react'

interface Order {
    id: string
    created_at: string
    status: string
    total_amount: number
    profile_id: string
    payment_status: string
    profiles?: { full_name: string; email: string }
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const supabase = createClient()

    useEffect(() => {
        async function fetchOrders() {
            try {
                // Fetch orders with user details using the profile_id foreign key
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, profiles:profile_id(full_name, email)')
                    .order('created_at', { ascending: false })

                if (error) throw error
                // The select query returns nested data, casting for TS safety in this simplified view
                setOrders(data as unknown as Order[])
            } catch (error) {
                console.error('Error fetching orders:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif text-charcoal">Orders</h2>
                    <p className="text-charcoal-600">Manage customer orders and shipments.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-md text-sm hover:bg-stone-50 transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-md text-sm outline-none focus:border-sage w-64"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
                    </div>
                </div>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-ivory-100 border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-charcoal-400">Loading orders...</td>
                            </tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-charcoal-400">No orders found.</td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-charcoal-600">#{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-medium text-charcoal">{order.profiles?.full_name || 'Guest'}</div>
                                        <div className="text-xs text-charcoal-400">{order.profiles?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal-600">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                                        ₹{order.total_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-charcoal-400 hover:text-charcoal transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
