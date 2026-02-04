'use client'

import React, { useEffect, useState } from 'react'
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        avgOrderValue: 0
    })
    const [revenueData, setRevenueData] = useState<{ date: string; amount: number }[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const supabase = createClient()

                // Fetch Orders
                const { data: orders, error: ordersError } = await supabase
                    .from('orders')
                    .select('created_at, total_amount, status')
                    .order('created_at', { ascending: true })

                if (ordersError) throw ordersError

                // Fetch Customers
                const { count: customerCount, error: customersError } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'customer')

                if (customersError) throw customersError

                const totalOrders = orders?.length || 0
                const totalRevenue = orders?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0
                const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

                setStats({
                    totalRevenue,
                    totalOrders,
                    totalCustomers: customerCount || 0,
                    avgOrderValue
                })

                // Process Data for Charts
                const dailyRevenue: Record<string, number> = {}
                orders?.forEach(order => {
                    const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    dailyRevenue[date] = (dailyRevenue[date] || 0) + (Number(order.total_amount) || 0)
                })

                // Convert to array and take last 7 days (or all if less)
                const chartData = Object.entries(dailyRevenue).map(([date, amount]) => ({
                    date,
                    amount
                }))

                // If dataset is small, show all, otherwise slice? For now show all unique days sorted.
                // Since the original query was sorted, the map iteration order 'might' be preserved but Object.entries is irrelevant of order sometimes.
                // Let's rely on the processed order. Actually, keys insertion order is preserved for strings in modern JS if not integers.
                // Better to just map roughly.

                setRevenueData(chartData)

            } catch (error) {
                console.error('Error fetching dashboard stats:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <div className="p-8">
            <header className="mb-8">
                <h2 className="text-3xl font-serif text-charcoal">Overview</h2>
                <p className="text-charcoal-600">Welcome back, here's what's happening at Sivi today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Revenue"
                    value={isLoading ? "..." : `₹${stats.totalRevenue.toLocaleString()}`}
                    change=""
                    icon={<DollarSign size={24} />}
                />
                <StatCard
                    title="Total Orders"
                    value={isLoading ? "..." : stats.totalOrders.toString()}
                    change=""
                    icon={<ShoppingBag size={24} />}
                />
                <StatCard
                    title="Total Customers"
                    value={isLoading ? "..." : stats.totalCustomers.toString()}
                    change=""
                    icon={<Users size={24} />}
                />
                <StatCard
                    title="Avg. Order Value"
                    value={isLoading ? "..." : `₹${stats.avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    change=""
                    icon={<TrendingUp size={24} />}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                    <h3 className="text-xl font-serif text-charcoal mb-6">Revenue Overview</h3>
                    <div className="h-[300px] w-full">
                        {isLoading ? (
                            <div className="h-full w-full flex items-center justify-center text-charcoal-400">Loading chart...</div>
                        ) : revenueData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#666', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#666', fontSize: 12 }}
                                        tickFormatter={(value) => `₹${value / 1000}k`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f5f5f4' }}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e7e5e4',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}
                                        formatter={(value: any) => [`₹${(Number(value) || 0).toLocaleString()}`, 'Revenue']}
                                    />
                                    <Bar
                                        dataKey="amount"
                                        fill="#9CA770" // Sage
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-charcoal-400 bg-ivory-50 rounded-lg">
                                No sales data available yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Second Chart Placeholder or Orders Trend */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                    <h3 className="text-xl font-serif text-charcoal mb-6">Recent Activity</h3>
                    {/* For now, let's keep it simple or duplicates the revenue as a line if requested, but let's just make a simple list of recent orders as a 'Chart' replacement for activity */}
                    <div className="h-[300px] w-full flex flex-col justify-center items-center text-charcoal-400 bg-ivory-50 rounded-lg">
                        <p className="italic font-serif">Visitor Stats coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-sage/10 text-sage rounded-md">
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-1">{value}</h3>
            <p className="text-sm text-charcoal-500">{title}</p>
        </div>
    )
}
