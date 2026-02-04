'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MoreHorizontal, Search, User } from 'lucide-react'

interface Customer {
    id: string
    full_name: string | null
    email: string | null
    role: string
    created_at: string
}

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const supabase = createClient()

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error
                setCustomers(data as Customer[])
            } catch (error) {
                console.error('Error fetching customers:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCustomers()
    }, [])

    const filteredCustomers = customers.filter(customer =>
        (customer.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif text-charcoal">Customers</h2>
                    <p className="text-charcoal-600">View and manage registered users.</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-md text-sm outline-none focus:border-sage w-64"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
                </div>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-ivory-100 border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Joined</th>
                            <th className="px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-charcoal-400">Loading customers...</td>
                            </tr>
                        ) : filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-charcoal-400">No customers found.</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                                                <User size={14} />
                                            </div>
                                            <span className="font-medium text-charcoal text-sm">
                                                {customer.full_name || 'Guest User'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal-600 font-mono text-xs">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${customer.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {customer.role || 'Customer'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal-600">
                                        {new Date(customer.created_at).toLocaleDateString()}
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
