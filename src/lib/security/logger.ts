/**
 * Security Event Logger
 * 
 * Logs security-related events for monitoring and auditing.
 * In production, this should integrate with a proper logging service
 * like Sentry, LogRocket, or a custom security monitoring system.
 */

import { createClient } from '@/lib/supabase/server';

export interface SecurityEvent {
    event: string;
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    details: Record<string, any>;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
}

/**
 * Logs a security event to the database
 * 
 * @param event - The security event to log
 */
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
        const supabase = await createClient();

        // Log to database (requires security_events table)
        const { error } = await supabase.from('security_events').insert({
            event_type: event.event,
            user_id: event.userId || null,
            ip_address: event.ipAddress || null,
            user_agent: event.userAgent || null,
            details: event.details,
            severity: event.severity,
            created_at: event.timestamp,
        });

        if (error) {
            console.error('Failed to log security event:', error);
        }
    } catch (error) {
        console.error('Error in logSecurityEvent:', error);
    }
}

/**
 * Logs a price tampering attempt
 */
export async function logPriceTampering(
    userId: string,
    productId: string,
    cartPrice: number,
    dbPrice: number,
    ipAddress?: string
): Promise<void> {
    await logSecurityEvent({
        event: 'price_tampering_attempt',
        userId,
        ipAddress,
        details: {
            productId,
            cartPrice,
            dbPrice,
            difference: Math.abs(cartPrice - dbPrice),
        },
        severity: 'critical',
        timestamp: new Date().toISOString(),
    });
}

/**
 * Logs a rate limit violation
 */
export async function logRateLimitViolation(
    identifier: string,
    endpoint: string,
    requestCount: number,
    limit: number,
    ipAddress?: string
): Promise<void> {
    await logSecurityEvent({
        event: 'rate_limit_violation',
        ipAddress,
        details: {
            identifier,
            endpoint,
            requestCount,
            limit,
            exceededBy: requestCount - limit,
        },
        severity: 'medium',
        timestamp: new Date().toISOString(),
    });
}

/**
 * Logs an authentication failure
 */
export async function logAuthFailure(
    email: string,
    reason: string,
    ipAddress?: string
): Promise<void> {
    await logSecurityEvent({
        event: 'auth_failure',
        ipAddress,
        details: {
            email,
            reason,
        },
        severity: 'medium',
        timestamp: new Date().toISOString(),
    });
}

/**
 * Logs suspicious activity
 */
export async function logSuspiciousActivity(
    userId: string,
    activity: string,
    details: Record<string, any>,
    ipAddress?: string
): Promise<void> {
    await logSecurityEvent({
        event: 'suspicious_activity',
        userId,
        ipAddress,
        details: {
            activity,
            ...details,
        },
        severity: 'high',
        timestamp: new Date().toISOString(),
    });
}

/**
 * Gets client IP address from request
 * 
 * Security Note: This function validates IP addresses to prevent spoofing.
 * Only trusts headers from known reverse proxies when TRUST_PROXY is enabled.
 * In production, configure your reverse proxy (nginx, Cloudflare, etc.) to
 * set these headers correctly.
 */
export function getClientIP(request: Request): string {
    // Check if we're behind a trusted reverse proxy
    const trustProxy = process.env.TRUST_PROXY === 'true';

    // Cloudflare's connecting IP is set by Cloudflare and is generally trusted
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
        // Validate it's a valid IP format
        if (isValidIP(cfConnectingIP)) {
            return cfConnectingIP;
        }
    }

    // Only trust x-forwarded-for if behind a known proxy
    if (trustProxy) {
        const forwarded = request.headers.get('x-forwarded-for');
        if (forwarded) {
            // x-forwarded-for can contain multiple IPs: client, proxy1, proxy2
            // The leftmost IP is the original client
            const ips = forwarded.split(',').map(ip => ip.trim());
            for (const ip of ips) {
                if (isValidIP(ip)) {
                    return ip;
                }
            }
        }

        const realIP = request.headers.get('x-real-ip');
        if (realIP && isValidIP(realIP)) {
            return realIP;
        }
    }

    // Fallback: return unknown rather than potentially spoofed IP
    return 'unknown';
}

/**
 * Validates if a string is a valid IPv4 or IPv6 address
 */
function isValidIP(ip: string): boolean {
    if (!ip || ip === 'unknown') {
        return false;
    }

    // IPv4 regex pattern
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Pattern.test(ip)) {
        const parts = ip.split('.');
        return parts.every(part => {
            const num = parseInt(part, 10);
            return num >= 0 && num <= 255;
        });
    }

    // IPv6 regex pattern (simplified)
    const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
    if (ipv6Pattern.test(ip)) {
        return true;
    }

    return false;
}

/**
 * Gets user agent from request
 */
export function getUserAgent(request: Request): string {
    return request.headers.get('user-agent') || 'unknown';
}
