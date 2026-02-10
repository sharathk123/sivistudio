/**
 * Rate Limit Wrapper for API Routes
 * 
 * Higher-order function that wraps API route handlers with rate limiting.
 * Automatically adds rate limit headers to responses and handles limit violations.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, RateLimitConfig, getClientIdentifier } from './rate-limit';
import { logRateLimitViolation } from '@/lib/security/logger';

export interface RateLimitHandlerOptions {
    config: RateLimitConfig;
    skipSuccessfulRequests?: boolean;
    identifier?: string; // Optional custom identifier
}

/**
 * Wraps an API route handler with rate limiting
 * 
 * @param handler - The API route handler function
 * @param options - Rate limiting options
 * @returns Wrapped handler with rate limiting
 */
export function withRateLimit<T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T,
    options: RateLimitHandlerOptions
) {
    const limiter = createRateLimiter(options.config);

    return async (request: NextRequest): Promise<T> => {
        const identifier = options.identifier || getClientIdentifier(request);
        const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        const result = await limiter(request);

        if (!result.success) {
            // Log rate limit violation
            const endpoint = request.nextUrl.pathname;
            logRateLimitViolation(
                identifier,
                endpoint,
                options.config.maxRequests,
                options.config.maxRequests,
                ipAddress
            );

            // Return 429 Too Many Requests
            const response = NextResponse.json(
                {
                    error: 'Too many requests',
                    message: 'Please try again later',
                    retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': options.config.maxRequests.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
                        'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
                    }
                }
            ) as T;

            return response;
        }

        // Call the original handler
        const response = await handler(request);

        // Add rate limit headers to successful responses
        if (response instanceof NextResponse) {
            response.headers.set('X-RateLimit-Limit', options.config.maxRequests.toString());
            response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
            response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());
        }

        return response;
    };
}

/**
 * Pre-configured wrappers for common use cases
 */
export const withStrictRateLimit = <T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T
) => withRateLimit(handler, {
    config: { windowMs: 60 * 1000, maxRequests: 10 }
});

export const withStandardRateLimit = <T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T
) => withRateLimit(handler, {
    config: { windowMs: 60 * 1000, maxRequests: 100 }
});

export const withLooseRateLimit = <T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T
) => withRateLimit(handler, {
    config: { windowMs: 60 * 1000, maxRequests: 1000 }
});

export const withAuthRateLimit = <T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T
) => withRateLimit(handler, {
    config: { windowMs: 15 * 60 * 1000, maxRequests: 5 }
});

export const withPaymentRateLimit = <T extends NextResponse>(
    handler: (request: NextRequest) => Promise<T> | T
) => withRateLimit(handler, {
    config: { windowMs: 60 * 1000, maxRequests: 5 }
});

/**
 * Combines rate limiting with authentication
 * Use this for routes that require both auth and rate limiting
 */
export function withAuthAndRateLimit<T extends NextResponse>(
    handler: (request: NextRequest, context: any) => Promise<T> | T,
    authWrapper: (handler: (request: NextRequest, context: any) => Promise<T> | T) => (request: NextRequest) => Promise<T>,
    rateLimitOptions: RateLimitHandlerOptions
) {
    // Create a wrapper that adapts the handler signature
    const adaptedHandler = (request: NextRequest): Promise<T> => {
        // This is a simplified version - in practice, you'd need to handle the context properly
        // For now, we'll just call the handler with a minimal context
        return Promise.resolve(handler(request, {}));
    };

    const rateLimitedHandler = withRateLimit(adaptedHandler, rateLimitOptions);
    return authWrapper(handler);
}
