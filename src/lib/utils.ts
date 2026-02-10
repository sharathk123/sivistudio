/**
 * Utility Functions
 * 
 * Common utility functions used throughout the application
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Format date in a readable format
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(d)
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sleep function for async operations
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if code is running on client side
 */
export function isClient(): boolean {
    return typeof window !== 'undefined'
}

/**
 * Check if code is running on server side
 */
export function isServer(): boolean {
    return typeof window === 'undefined'
}

/**
 * Get scroll position
 */
export function getScrollPosition(): { x: number; y: number } {
    if (!isClient()) return { x: 0, y: 0 }
    return {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset,
    }
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
    elementId: string,
    offset: number = 0
): void {
    if (!isClient()) return

    const element = document.getElementById(elementId)
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        })
    }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (!isClient()) return false

    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        return false
    }
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Parse query string from URL
 */
export function parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString)
    const result: Record<string, string> = {}

    params.forEach((value, key) => {
        result[key] = value
    })

    return result
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
        }
    })

    return searchParams.toString()
}
