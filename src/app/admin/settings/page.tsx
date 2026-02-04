'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Save, Shield, Database } from 'lucide-react'

export default function AdminSettingsPage() {
    const { profile } = useAuth()

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-serif text-charcoal">System Settings</h2>
                <p className="text-charcoal-600">Configuration and preferences for Sivi Studio.</p>
            </header>

            <div className="space-y-6">
                {/* Admin Profile Section */}
                <section className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                        <Shield className="text-sage" size={24} />
                        <h3 className="text-lg font-medium text-charcoal">Admin Profile</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-400 mb-2">Full Name</label>
                            <div className="p-3 bg-ivory-50 border border-stone-200 rounded-md text-charcoal">
                                {profile?.full_name || 'Not set'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-400 mb-2">Email Address</label>
                            <div className="p-3 bg-ivory-50 border border-stone-200 rounded-md text-charcoal font-mono text-sm">
                                {profile?.email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-400 mb-2">Role</label>
                            <div className="p-3 bg-ivory-50 border border-stone-200 rounded-md text-charcoal capitalize">
                                {profile?.role}
                            </div>
                        </div>
                    </div>
                </section>

                {/* System Status Section */}
                <section className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 opacity-75">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                        <Database className="text-sage" size={24} />
                        <h3 className="text-lg font-medium text-charcoal">System Status</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-stone-100">
                            <span className="text-sm text-charcoal-600">Database Connection</span>
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">ACTIVE</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-stone-100">
                            <span className="text-sm text-charcoal-600">Storage Services</span>
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">HEALTHY</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-charcoal-600">App Version</span>
                            <span className="text-sm font-mono text-charcoal">v1.2.0 (Stable)</span>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-charcoal text-bone rounded-md hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
