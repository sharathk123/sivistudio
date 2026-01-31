'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/ui/Footer'
import Image from 'next/image'
import { User, Package, MapPin, Heart, LogOut, Settings, ChevronRight } from 'lucide-react'
import StickyHeader from '@/components/ui/StickyHeader'

// Mock Data
const userProfile = {
    name: 'Ananya Rao',
    email: 'ananya.rao@example.com',
    memberSince: 'March 2024'
}

const recentOrders = [
    {
        id: 'ORD-2026-001',
        date: 'Jan 15, 2026',
        status: 'Delivered',
        total: '₹12,500',
        items: ['Pochampally Ikat Saree', 'Handwoven Silk Blouse']
    },
    {
        id: 'ORD-2025-089',
        date: 'Dec 20, 2025',
        status: 'Delivered',
        total: '₹8,900',
        items: ['Gadwal Silk Dupatta']
    }
]

type Tab = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings'

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview')

    return (
        <main className="bg-bone min-h-screen pt-28">
            <StickyHeader theme="light" />
            <div className="max-w-7xl mx-auto px-6 pb-24">

                {/* Header Profile Summary */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-charcoal/10 pb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full border border-sage/30 bg-ivory flex items-center justify-center text-sage">
                            <User size={40} strokeWidth={1} />
                        </div>
                        <div>
                            <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-1">Welcome Back</span>
                            <h1 className="font-serif text-4xl text-charcoal italic">{userProfile.name}</h1>
                            <p className="text-charcoal-400 font-light text-sm mt-1">{userProfile.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <nav className="space-y-2 sticky top-32">
                            <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={User} label="Overview" />
                            <NavButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={Package} label="My Orders" />
                            <NavButton active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} icon={MapPin} label="Addresses" />
                            <NavButton active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} icon={Heart} label="Wishlist" />
                            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} label="Settings" />
                            <div className="pt-8 mt-8 border-t border-charcoal/10">
                                <button className="flex items-center space-x-3 text-red-800/60 hover:text-red-800 transition-colors w-full px-4 py-3">
                                    <LogOut size={18} />
                                    <span className="uppercase tracking-widest text-xs font-bold">Sign Out</span>
                                </button>
                            </div>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'overview' && <OverviewTab />}
                                {activeTab === 'orders' && <OrdersTab />}
                                {activeTab === 'addresses' && <PlaceholderTab title="Saved Addresses" icon={MapPin} />}
                                {activeTab === 'wishlist' && <PlaceholderTab title="My Wishlist" icon={Heart} />}
                                {activeTab === 'settings' && <PlaceholderTab title="Account Settings" icon={Settings} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function NavButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-4 transition-all duration-300 group ${active ? 'bg-charcoal text-white' : 'hover:bg-ivory text-charcoal'}`}
        >
            <div className="flex items-center space-x-3">
                <Icon size={18} className={active ? 'text-sage' : 'text-charcoal-400 group-hover:text-sage'} />
                <span className={`uppercase tracking-widest text-xs font-bold ${active ? 'text-white' : 'text-charcoal'}`}>{label}</span>
            </div>
            {active && <ChevronRight size={16} className="text-sage" />}
        </button>
    )
}

function OverviewTab() {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Orders" value="12" />
                <StatCard label="Member Status" value="Gold" />
                <StatCard label="Points Balance" value="2,450" />
            </div>

            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl text-charcoal italic">Recent Orders</h2>
                </div>
                <div className="space-y-4">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="bg-white p-6 border border-charcoal/10 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-sage transition-colors cursor-pointer group">
                            <div className="space-y-1 mb-4 md:mb-0">
                                <div className="flex items-center space-x-3">
                                    <span className="font-bold text-charcoal">{order.id}</span>
                                    <span className="px-2 py-0.5 bg-sage/10 text-sage text-[10px] uppercase font-bold tracking-wider rounded-sm">{order.status}</span>
                                </div>
                                <p className="text-charcoal-400 text-sm">{order.items.join(', ')}</p>
                                <p className="text-xs text-charcoal-400/70 font-light">{order.date}</p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="font-serif text-lg">{order.total}</span>
                                <ChevronRight size={18} className="text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function OrdersTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic">My Order History</h2>
            </div>
            <div className="space-y-4">
                {recentOrders.map((order) => (
                    <div key={order.id} className="bg-white p-6 border border-charcoal/10 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-sage transition-colors cursor-pointer group">
                        <div className="space-y-1 mb-4 md:mb-0">
                            <div className="flex items-center space-x-3">
                                <span className="font-bold text-charcoal">{order.id}</span>
                                <span className="px-2 py-0.5 bg-sage/10 text-sage text-[10px] uppercase font-bold tracking-wider rounded-sm">{order.status}</span>
                            </div>
                            <p className="text-charcoal-400 text-sm">{order.items.join(', ')}</p>
                            <p className="text-xs text-charcoal-400/70 font-light">{order.date}</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="font-serif text-lg">{order.total}</span>
                            <ChevronRight size={18} className="text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
                <div className="bg-ivory-100 p-8 text-center text-charcoal-400 font-light mt-8">
                    No more past orders found.
                </div>
            </div>
        </div>
    )
}

function PlaceholderTab({ title, icon: Icon }: { title: string, icon: any }) {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-charcoal/20 rounded-sm bg-ivory/50">
            <div className="w-16 h-16 rounded-full bg-bone flex items-center justify-center mb-6">
                <Icon size={32} className="text-sage" strokeWidth={1} />
            </div>
            <h2 className="font-serif text-2xl text-charcoal italic mb-2">{title}</h2>
            <p className="text-charcoal-400 font-light">This section is coming soon.</p>
        </div>
    )
}

function StatCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white p-6 border-l-2 border-sage shadow-sm">
            <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-2">{label}</span>
            <span className="font-serif text-3xl text-charcoal">{value}</span>
        </div>
    )
}
