'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Footer from '@/components/ui/Footer'
import { User, Package, MapPin, Heart, LogOut, Settings } from 'lucide-react'
import StickyHeader from '@/components/ui/StickyHeader'
import NavButton from '@/components/account/NavButton'
import OverviewTab from '@/components/account/OverviewTab'
import OrdersTab from '@/components/account/OrdersTab'
import PlaceholderTab from '@/components/account/PlaceholderTab'
import { useAuth } from '@/context/AuthContext'

type Tab = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings'

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview')
    const { user, profile, isLoading, signOut } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

    if (isLoading || !user) {
        return (
            <main className="bg-bone min-h-screen pt-28 flex items-center justify-center">
                <StickyHeader theme="light" />
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </main>
        )
    }

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
                            <h1 className="font-serif text-4xl text-charcoal italic">{profile?.full_name || 'Valued Customer'}</h1>
                            <p className="text-charcoal-400 font-light text-sm mt-1">{user.email}</p>
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
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center space-x-3 text-red-800/60 hover:text-red-800 transition-colors w-full px-4 py-3"
                                >
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
