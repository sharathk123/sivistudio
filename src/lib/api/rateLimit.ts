import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate Limiter Configuration
 */
interface RateLimitConfig {
    /** Maximum number of requests allowed in the time window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
    /** Custom message when rate limit is exceeded */
    message?: string;
}

/**
 * In-memory store for rate limiting
 * In production, use Redis or similar distributed cache
 */
class RateLimitStore {
    private store: Map<string, { count: number; resetTime: number }> = new Map();

    /**
     * Check if request is allowed and increment counter
     */
    check(key: string, maxRequests: number, windowMs: number): {
        allowed: boolean;
        remaining: number;
        resetTime: number;
    } {
        const now = Date.now();
        const record = this.store.get(key);

        // No record or window expired - create new record
        if (!record || now > record.resetTime) {
            const resetTime = now + windowMs;
            this.store.set(key, { count: 1, resetTime });
            return { allowed: true, remaining: maxRequests - 1, resetTime };
        }

        // Increment counter
        record.count++;
        this.store.set(key, record);

        // Check if limit exceeded
        const allowed = record.count <= maxRequests;
        const remaining = Math.max(0, maxRequests - record.count);

        return { allowed, remaining, resetTime: record.resetTime };
    }

    /**
     * Clean up expired entries (run periodically)
     */
    cleanup() {
        const now = Date.now();
        for (const [key, record] of this.store.entries()) {
            if (now > record.resetTime) {
                this.store.delete(key);
            }
        }
    }
}

// Global rate limit store
const rateLimitStore = new RateLimitStore();

// Cleanup expired entries every 5 minutes
if (typeof window === 'undefined') {
    setInterval(() => rateLimitStore.cleanup(), 5 * 60 * 1000);
}

/**
 * Get client identifier for rate limiting
 * Uses IP address or fallback to a combination of headers
 */
function getClientIdentifier(request: NextRequest): string {
    // Try to get real IP from headers (for proxied requests)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

    const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';

    // In development, use a combination of IP and user agent for better testing
    if (process.env.NODE_ENV === 'development') {
        const userAgent = request.headers.get('user-agent') || 'unknown';
        return `${ip}-${userAgent.slice(0, 20)}`;
    }

    return ip;
}

/**
 * Rate limit middleware for API routes
 * 
 * @example
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit(request, {
 *     maxRequests: 10,
 *     windowMs: 60000 // 1 minute
 *   });
 * 
 *   if (!rateLimitResult.allowed) {
 *     return rateLimitResult.response;
 *   }
 * 
 *   // Your API logic here
 * }
 * ```
 */
export async function rateLimit(
    request: NextRequest,
    config: RateLimitConfig
): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    response?: NextResponse;
}> {
    const { maxRequests, windowMs, message } = config;

    // Get client identifier
    const clientId = getClientIdentifier(request);
    const key = `${request.nextUrl.pathname}:${clientId}`;

    // Check rate limit
    const result = rateLimitStore.check(key, maxRequests, windowMs);

    // If rate limit exceeded, return error response
    if (!result.allowed) {
        const resetDate = new Date(result.resetTime);
        const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);

        const response = NextResponse.json(
            {
                error: 'Too Many Requests',
                message:
                    message ||
                    `Rate limit exceeded. Please try again after ${retryAfter} seconds.`,
                retryAfter,
                resetTime: resetDate.toISOString(),
            },
            { status: 429 }
        );

        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', '0');
        response.headers.set('X-RateLimit-Reset', resetDate.toISOString());
        response.headers.set('Retry-After', retryAfter.toString());

        return {
            allowed: false,
            remaining: 0,
            resetTime: result.resetTime,
            response,
        };
    }

    // Rate limit not exceeded
    return {
        allowed: true,
        remaining: result.remaining,
        resetTime: result.resetTime,
    };
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
    /** Strict: 5 requests per minute */
    STRICT: { maxRequests: 5, windowMs: 60000 },

    /** Standard: 30 requests per minute */
    STANDARD: { maxRequests: 30, windowMs: 60000 },

    /** Relaxed: 100 requests per minute */
    RELAXED: { maxRequests: 100, windowMs: 60000 },

    /** Auth: 5 login attempts per 15 minutes */
    AUTH: { maxRequests: 5, windowMs: 15 * 60000 },

    /** Payment: 3 payment attempts per hour */
    PAYMENT: { maxRequests: 3, windowMs: 60 * 60000 },

    /** AI: 10 AI requests per hour */
    AI: { maxRequests: 10, windowMs: 60 * 60000 },
} as const;

/**
 * Helper function to add rate limit headers to successful responses
 */
export function addRateLimitHeaders(
    response: NextResponse,
    remaining: number,
    resetTime: number,
    maxRequests: number
): NextResponse {
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString());
    return response;
}
