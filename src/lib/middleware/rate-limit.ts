/**
 * Rate Limiting Middleware
 * 
 * Provides in-memory rate limiting for API routes to prevent abuse.
 * In production, consider using Redis or a dedicated rate limiting service
 * for distributed systems and persistence across server restarts.
 */

import { NextRequest } from 'next/server';

export interface RateLimitEntry {
    count: number;
    resetTime: number;
}

export interface RateLimitStore {
    [key: string]: RateLimitEntry;
}

export interface RateLimitConfig {
    windowMs: number;      // Time window in milliseconds
    maxRequests: number;   // Max requests per window
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: number;
}

// In-memory store (for production, use Redis or similar)
const rateLimitStore: RateLimitStore = {};

/**
 * Clean up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
    const now = Date.now();
    Object.keys(rateLimitStore).forEach(key => {
        if (rateLimitStore[key].resetTime < now) {
            delete rateLimitStore[key];
        }
    });
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: NextRequest): string {
    // Try various headers for IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (forwarded) {
        // x-forwarded-for can contain multiple IPs, take the first one
        const ip = forwarded.split(',')[0].trim();
        return `${ip}:${userAgent}`;
    }

    if (realIP) {
        return `${realIP}:${userAgent}`;
    }

    if (cfConnectingIP) {
        return `${cfConnectingIP}:${userAgent}`;
    }

    // Fallback to a unique identifier
    return `unknown:${userAgent}`;
}

/**
 * Create a rate limiter with the specified configuration
 */
export function createRateLimiter(config: RateLimitConfig) {
    return async (request: NextRequest): Promise<RateLimitResult> => {
        // Clean up old entries periodically
        if (Math.random() < 0.01) { // 1% chance to clean up
            cleanupExpiredEntries();
        }

        const identifier = getClientIdentifier(request);
        const now = Date.now();

        // Get or create entry
        const entry = rateLimitStore[identifier] || { count: 0, resetTime: now + config.windowMs };

        // Reset if window expired
        if (entry.resetTime < now) {
            entry.count = 0;
            entry.resetTime = now + config.windowMs;
        }

        // Check limit
        if (entry.count >= config.maxRequests) {
            return {
                success: false,
                remaining: 0,
                resetTime: entry.resetTime,
            };
        }

        // Increment count
        entry.count++;
        rateLimitStore[identifier] = entry;

        return {
            success: true,
            remaining: config.maxRequests - entry.count,
            resetTime: entry.resetTime,
        };
    };
}

/**
 * Pre-configured rate limiters for different use cases
 */
export const strictLimiter = createRateLimiter({
    windowMs: 60 * 1000,    // 1 minute
    maxRequests: 10         // 10 requests per minute
});

export const standardLimiter = createRateLimiter({
    windowMs: 60 * 1000,    // 1 minute
    maxRequests: 100        // 100 requests per minute
});

export const looseLimiter = createRateLimiter({
    windowMs: 60 * 1000,    // 1 minute
    maxRequests: 1000       // 1000 requests per minute
});

export const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    maxRequests: 5             // 5 requests per 15 minutes (for login/signup)
});

export const paymentLimiter = createRateLimiter({
    windowMs: 60 * 1000,    // 1 minute
    maxRequests: 5          // 5 payment attempts per minute
});

/**
 * Get current rate limit status for a client
 */
export function getRateLimitStatus(request: NextRequest): {
    count: number;
    remaining: number;
    resetTime: number;
} | null {
    const identifier = getClientIdentifier(request);
    const entry = rateLimitStore[identifier];

    if (!entry) {
        return null;
    }

    return {
        count: entry.count,
        remaining: 0,
        resetTime: entry.resetTime,
    };
}

/**
 * Reset rate limit for a client (admin function)
 */
export function resetRateLimit(request: NextRequest): void {
    const identifier = getClientIdentifier(request);
    delete rateLimitStore[identifier];
}

/**
 * Get all rate limit entries (admin function)
 */
export function getAllRateLimits(): RateLimitStore {
    return { ...rateLimitStore };
}

/**
 * Clear all rate limit entries (admin function)
 */
export function clearAllRateLimits(): void {
    Object.keys(rateLimitStore).forEach(key => {
        delete rateLimitStore[key];
    });
}
