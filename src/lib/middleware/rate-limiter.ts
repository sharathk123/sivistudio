/**
 * Rate Limiter Middleware
 * 
 * Provides rate limiting functionality for API endpoints to prevent abuse.
 * Uses in-memory storage for simplicity. For production, consider using Redis
 * or a distributed cache for multi-instance deployments.
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitOptions {
    /** Maximum number of requests allowed */
    limit: number
    /** Time window in milliseconds */
    windowMs: number
    /** Unique identifier for the rate limit (e.g., 'payment-create-order') */
    identifier: string
}

interface RateLimitEntry {
    count: number
    resetTime: number
}

// In-memory storage for rate limits
// Note: This resets on server restart. For production, use Redis or similar.
const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Cleans up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
    const now = Date.now()
    const entries = Array.from(rateLimitStore.entries())
    for (const [key, entry] of entries) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key)
        }
    }
}

/**
 * Gets a unique key for rate limiting based on user ID and identifier
 */
function getRateLimitKey(userId: string, identifier: string): string {
    return `${identifier}:${userId}`
}

/**
 * Rate limiter middleware function
 * 
 * @param request - The Next.js request object
 * @param userId - The user ID to rate limit by
 * @param options - Rate limiting options
 * @returns NextResponse if rate limit exceeded, null otherwise
 */
export async function rateLimit(
    request: NextRequest,
    userId: string,
    options: RateLimitOptions
): Promise<NextResponse | null> {
    const { limit, windowMs, identifier } = options

    // Clean up expired entries periodically
    if (Math.random() < 0.1) {
        cleanupExpiredEntries()
    }

    const key = getRateLimitKey(userId, identifier)
    const now = Date.now()

    // Get or create rate limit entry
    let entry = rateLimitStore.get(key)

    if (!entry || now > entry.resetTime) {
        // Create new entry
        entry = {
            count: 1,
            resetTime: now + windowMs,
        }
        rateLimitStore.set(key, entry)
        return null
    }

    // Increment count
    entry.count++

    // Check if limit exceeded
    if (entry.count > limit) {
        const resetTimeSeconds = Math.ceil((entry.resetTime - now) / 1000)

        return NextResponse.json(
            {
                error: 'Rate limit exceeded',
                message: `Too many requests. Please try again in ${resetTimeSeconds} seconds.`,
                retryAfter: resetTimeSeconds,
            },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': entry.resetTime.toString(),
                    'Retry-After': resetTimeSeconds.toString(),
                },
            }
        )
    }

    // Update entry
    rateLimitStore.set(key, entry)

    // Add rate limit headers to response
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', (limit - entry.count).toString())
    response.headers.set('X-RateLimit-Reset', entry.resetTime.toString())

    return null
}

/**
 * Higher-order function to wrap route handlers with rate limiting
 * 
 * @param handler - The route handler function
 * @param options - Rate limiting options
 * @returns Wrapped handler with rate limiting
 */
export function withRateLimit<T extends any[]>(
    handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
    options: RateLimitOptions
) {
    return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
        // Extract user ID from request (assuming it's passed in args)
        // This is a simplified version - adjust based on your auth implementation
        const userId = (args[0] as any)?.user?.id || 'anonymous'

        const rateLimitResponse = await rateLimit(request, userId, options)

        if (rateLimitResponse) {
            return rateLimitResponse
        }

        return handler(request, ...args)
    }
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
    /** 5 requests per minute - for sensitive operations like payment */
    strict: {
        limit: 5,
        windowMs: 60 * 1000, // 1 minute
        identifier: 'strict',
    },
    /** 10 requests per minute - for general API endpoints */
    moderate: {
        limit: 10,
        windowMs: 60 * 1000, // 1 minute
        identifier: 'moderate',
    },
    /** 100 requests per minute - for public endpoints */
    lenient: {
        limit: 100,
        windowMs: 60 * 1000, // 1 minute
        identifier: 'lenient',
    },
    /** 1000 requests per hour - for very permissive endpoints */
    permissive: {
        limit: 1000,
        windowMs: 60 * 60 * 1000, // 1 hour
        identifier: 'permissive',
    },
}
