/**
 * API Client for Sivi Studio
 * Handles authenticated requests to backend API
 */

import { createClient } from '@/lib/supabase/client'

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
    ): Promise<T> {
        const token = await this.getToken()

        if (!token) {
            throw new Error('Not authenticated')
        }

        const url = `${this.baseUrl}${endpoint}`
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
            const error = await response.json().catch(() => ({
                error: 'Request failed',
            }))
            throw new Error(error.error || `HTTP ${response.status}`)
        }

        return response.json()
    }

    // Profile API
    async getProfile() {
        return this.request<{ success: boolean; data: any }>('/api/profile')
    }

    async updateProfile(data: { full_name?: string; hyderabad_locality?: string }) {
        return this.request<{ success: boolean; data: any; message: string }>(
            '/api/profile',
            {
                method: 'PUT',
                body: JSON.stringify(data),
            }
        )
    }

    // Measurements API
    async getMeasurements() {
        return this.request<{ success: boolean; data: any[]; count: number }>(
            '/api/measurements'
        )
    }

    async createMeasurement(data: {
        bust_cm: number
        waist_cm: number
        hips_cm: number
        length_cm: number
        age_group?: string
    }) {
        return this.request<{ success: boolean; data: any; message: string }>(
            '/api/measurements',
            {
                method: 'POST',
                body: JSON.stringify(data),
            }
        )
    }

    // Orders API
    async getOrders() {
        return this.request<{ success: boolean; data: any[]; count: number }>(
            '/api/orders'
        )
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
        return this.request<{ success: boolean; data: any; message: string }>(
            '/api/orders',
            {
                method: 'POST',
                body: JSON.stringify(data),
            }
        )
    }
}

// Export singleton instance
export const api = new ApiClient()

// Export class for testing
export default ApiClient
