/**
 * API Client for Sivi Studio
 * Handles authenticated requests to backend API
 */

import { createClient } from '@/lib/supabase/client'

export interface ApiResponse<T = any> {
    success: boolean
    data: T
    message?: string
    count?: number
}

export interface Profile {
    id: string
    full_name: string | null
    hyderabad_locality?: string | null
}

export interface Address {
    id: string
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip_code: string
    country: string
    phone_number: string
    is_default: boolean
    type: 'home' | 'work' | 'other'
}

export interface Order {
    id: string
    created_at: string
    status: string
    total_amount: number
    order_items?: any[]
}

class ApiClient {
    private baseUrl: string

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }

    /**
     * Get the current JWT token from Supabase session
     */
    private async getToken(): Promise<string | null> {
        const supabase = createClient()
        const {
            data: { session },
        } = await supabase.auth.getSession()

        return session?.access_token || null
    }

    /**
     * Make an authenticated API request
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = await this.getToken()

        if (!token) {
            throw new Error('Not authenticated')
        }

        const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        }

        const response = await fetch(url, {
            ...options,
            headers,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                error: 'Request failed',
            }))
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
        }

        return response.json()
    }

    // Profile API
    async getProfile() {
        return this.request<Profile>('/api/profile')
    }

    async updateProfile(data: Partial<Profile>) {
        return this.request<Profile>('/api/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    // Measurements API
    async getMeasurements() {
        return this.request<any[]>('/api/measurements')
    }

    async createMeasurement(data: {
        bust_cm: number
        waist_cm: number
        hips_cm: number
        length_cm: number
        age_group?: string
    }) {
        return this.request<any>('/api/measurements', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // Orders API
    async getOrders() {
        return this.request<Order[]>('/api/orders')
    }

    async getOrder(id: string) {
        return this.request<Order>(`/api/orders/${id}`)
    }

    // Address API
    async getAddresses() {
        return this.request<Address[]>('/api/addresses')
    }

    async createAddress(data: Omit<Address, 'id'>) {
        return this.request<Address>('/api/addresses', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateAddress(id: string, data: Partial<Address>) {
        return this.request<Address>(`/api/addresses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteAddress(id: string) {
        return this.request<{ success: boolean }>(`/api/addresses/${id}`, {
            method: 'DELETE',
        })
    }

    // Wishlist API
    async getWishlist() {
        return this.request<any[]>('/api/wishlist')
    }

    async addToWishlist(product_id: string) {
        return this.request<any>('/api/wishlist', {
            method: 'POST',
            body: JSON.stringify({ product_id }),
        })
    }

    async removeFromWishlist(id: string) {
        return this.request<{ success: boolean }>(`/api/wishlist/${id}`, {
            method: 'DELETE',
        })
    }

    // Payment API
    async createPaymentOrder(data: { items: any[], shipping_address_id: string }) {
        return this.request<{
            orderId: string
            amount: number
            currency: string
            dbOrderId: string
        }>('/api/payment/create-order', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async verifyPayment(data: {
        razorpay_order_id: string
        razorpay_payment_id: string
        razorpay_signature: string
    }) {
        return this.request<{ success: boolean }>('/api/payment/verify', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async createOrder(data: {
        items: Array<{
            product_id: string
            quantity: number
            unit_price: number
        }>
        total_amount: number
        shipping_address: string
    }) {
        return this.request<Order>('/api/orders', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}

// Export singleton instance
export const api = new ApiClient()

// Export class for testing
export default ApiClient

