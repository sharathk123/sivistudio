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
 * 
 * @example
 * ```typescript
 * export const GET = withAuth(async (request, { user }) => {
 *   // user is guaranteed to exist here
 *   return NextResponse.json({ userId: user.id })
 * })
 * ```
 */
export function withAuth(
    handler: (
        request: NextRequest,
        context: { user: { id: string; email: string; role?: string } }
    ) => Promise<NextResponse>
) {
    return async (request: NextRequest) => {
        const auth = await verifyAuth(request)

        if (!auth.authenticated || !auth.user) {
            return NextResponse.json(
                { error: auth.error || 'Unauthorized' },
                { status: 401 }
            )
        }

        // Call the original handler with authenticated user
        return handler(request, { user: auth.user })
    }
}

/**
 * Extract and verify JWT token from Authorization header
 * Alternative method if you need manual token verification
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

    // Support both "Bearer token" and "token" formats
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader

    return token
}
