import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id: string
        email: string
        role?: string
    }
}

/**
 * Middleware to verify JWT token from Supabase
 * Extracts user information and attaches it to the request
 */
export async function verifyAuth(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Get the session from Supabase (handles JWT verification internally)
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (error || !user) {
            return {
                authenticated: false,
                error: 'Unauthorized - Invalid or missing token',
                user: null,
            }
        }

        return {
            authenticated: true,
            error: null,
            user: {
                id: user.id,
                email: user.email!,
                role: user.role,
            },
        }
    } catch (error) {
        return {
            authenticated: false,
            error: 'Authentication failed',
            user: null,
        }
    }
}

/**
 * Higher-order function to protect API routes
 * Wraps your API handler with JWT authentication
 */
export function withAuth<T = any>(
    handler: (
        request: NextRequest,
        context: T & { user: { id: string; email: string; role?: string } }
    ) => Promise<NextResponse>
) {
    return async (request: NextRequest, context: T) => {
        const auth = await verifyAuth(request)

        if (!auth.authenticated || !auth.user) {
            return NextResponse.json(
                { error: auth.error || 'Unauthorized' },
                { status: 401 }
            )
        }

        // Safely merge user into context. 
        // We use Object.create to preserve the original context (including its params Promise/Proxy)
        // while adding the authenticated user info.
        const authenticatedContext = Object.create(context as object)
        authenticatedContext.user = auth.user

        return handler(request, authenticatedContext)
    }
}

/**
 * Extract and verify JWT token from Authorization header
 */
export async function verifyJWT(token: string) {
    try {
        const supabase = await createClient()

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token)

        if (error || !user) {
            return { valid: false, user: null, error: error?.message }
        }

        return {
            valid: true,
            user: {
                id: user.id,
                email: user.email!,
                role: user.role,
            },
            error: null,
        }
    } catch (error: any) {
        return {
            valid: false,
            user: null,
            error: error.message || 'Token verification failed',
        }
    }
}

/**
 * Get authorization token from request headers
 */
export function getAuthToken(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
        return null
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader

    return token
}
