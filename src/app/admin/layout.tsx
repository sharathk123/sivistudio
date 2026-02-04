'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { BarChart3, Package, Users, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, isLoading, signOut } = useAuth()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login')
            } else if (profile?.role !== 'admin') {
                router.push('/')
            }
        }
    }, [user, profile, isLoading, router])

    if (isLoading || !profile || profile.role !== 'admin') {
        return (
            <div className="flex h-screen items-center justify-center bg-bone">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1.5 md:gap-3 opacity-0 animate-fadeInUp">
                        <span className="text-xl tracking-nav uppercase whitespace-nowrap font-bodoni font-bold text-charcoal/50">
                            SIVI
                        </span>
                        <span className="text-xl whitespace-nowrap font-allura text-charcoal/50">
                            admin
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-ivory-100 font-sans">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-charcoal text-bone hidden md:flex flex-col transition-all duration-300 ease-in-out relative",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className={cn(
                    "p-6 border-b border-bone/10 flex items-center",
                    isCollapsed ? "justify-center px-2" : "justify-between"
                )}>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-2xl font-serif whitespace-nowrap">SIVI Admin</h1>
                            <p className="text-xs text-bone/50 tracking-widest uppercase mt-1">Dashboard</p>
                        </div>
                    )}
                    {isCollapsed && (
                        <span className="font-bodoni font-bold text-xl">S</span>
                    )}
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-8 bg-sage text-charcoal rounded-full p-1 shadow-md hover:bg-sage-300 transition-colors z-50 border border-charcoal"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLink href="/admin" icon={<BarChart3 size={20} />} label="Overview" isCollapsed={isCollapsed} />
                    <NavLink href="/admin/orders" icon={<Package size={20} />} label="Manage Orders" isCollapsed={isCollapsed} />
                    <NavLink href="/admin/customers" icon={<Users size={20} />} label="Customer Base" isCollapsed={isCollapsed} />
                    <NavLink href="/admin/settings" icon={<Settings size={20} />} label="System Settings" isCollapsed={isCollapsed} />
                </nav>

                <div className="p-4 border-t border-bone/10 overflow-hidden">
                    <button
                        onClick={() => signOut()}
                        className={cn(
                            "flex items-center gap-3 w-full p-3 text-sm text-bone/70 hover:text-bone hover:bg-white/5 rounded-md transition-colors",
                            isCollapsed && "justify-center"
                        )}
                        title={isCollapsed ? "Logout" : undefined}
                    >
                        <LogOut size={20} />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                    {!isCollapsed && (
                        <div className="mt-4 px-3 text-xs text-bone/30 truncate">
                            Logged in as {profile.full_name || user?.email}
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

function NavLink({ href, icon, label, isCollapsed }: { href: string, icon: React.ReactNode, label: string, isCollapsed: boolean }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            title={isCollapsed ? label : undefined}
            className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors relative",
                isCollapsed && "justify-center px-2",
                isActive
                    ? "text-sage bg-white/5 border-l-4 border-sage"
                    : "text-bone/70 hover:text-bone hover:bg-white/5 border-l-4 border-transparent"
            )}
        >
            {icon}
            {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
        </Link>
    )
}
