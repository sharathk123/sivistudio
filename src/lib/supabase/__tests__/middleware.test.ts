/**
 * Integration tests for admin middleware protection
 */

import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Mock Next.js server
jest.mock('next/server', () => ({
    NextRequest: jest.fn(),
    NextResponse: {
        next: jest.fn(),
        redirect: jest.fn(),
    },
}))

// Mock Supabase SSR
jest.mock('@supabase/ssr', () => ({
    createServerClient: jest.fn(),
}))

describe('Admin Middleware Protection', () => {
    let mockRequest: any
    let mockSupabase: any

    beforeEach(() => {
        jest.clearAllMocks()

        mockRequest = {
            nextUrl: {
                pathname: '/',
                clone: jest.fn(() => ({
                    pathname: '/',
                    searchParams: {
                        set: jest.fn(),
                    },
                })),
            },
            cookies: {
                getAll: jest.fn(() => []),
                set: jest.fn(),
            },
        }

        mockSupabase = {
            auth: {
                getUser: jest.fn(),
            },
            from: jest.fn(() => ({
                select: jest.fn(() => ({
                    eq: jest.fn(() => ({
                        single: jest.fn(),
                    })),
                })),
            })),
        }

        const { createServerClient } = require('@supabase/ssr')
        createServerClient.mockReturnValue(mockSupabase)

        NextResponse.next = jest.fn(() => ({
            cookies: {
                set: jest.fn(),
                getAll: jest.fn(() => []),
                setAll: jest.fn(),
            },
        }))

        NextResponse.redirect = jest.fn((url) => ({
            url,
            cookies: {
                set: jest.fn(),
                getAll: jest.fn(() => []),
            },
        }))
    })

    describe('Admin route protection', () => {
        it('should allow admin users to access /admin routes', async () => {
            mockRequest.nextUrl.pathname = '/admin'

            const mockUser = { id: 'admin-123' }
            const mockProfile = { role: 'admin' }

            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: mockUser },
            })

            mockSupabase.from.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockReturnValue({
                        single: jest.fn().mockResolvedValue({
                            data: mockProfile,
                        }),
                    }),
                }),
            })

            await updateSession(mockRequest)

            expect(NextResponse.redirect).not.toHaveBeenCalled()
            expect(NextResponse.next).toHaveBeenCalled()
        })

        it('should redirect non-admin users from /admin routes', async () => {
            mockRequest.nextUrl.pathname = '/admin'

            const mockUser = { id: 'user-123' }
            const mockProfile = { role: 'customer' }

            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: mockUser },
            })

            mockSupabase.from.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockReturnValue({
                        single: jest.fn().mockResolvedValue({
                            data: mockProfile,
                        }),
                    }),
                }),
            })

            await updateSession(mockRequest)

            expect(NextResponse.redirect).toHaveBeenCalled()
        })

        it('should redirect unauthenticated users from /admin routes to login', async () => {
            mockRequest.nextUrl.pathname = '/admin'

            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: null },
            })

            await updateSession(mockRequest)

            expect(NextResponse.redirect).toHaveBeenCalled()
        })

        it('should allow access to public routes without authentication', async () => {
            mockRequest.nextUrl.pathname = '/'

            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: null },
            })

            await updateSession(mockRequest)

            expect(NextResponse.redirect).not.toHaveBeenCalled()
            expect(NextResponse.next).toHaveBeenCalled()
        })
    })
})
