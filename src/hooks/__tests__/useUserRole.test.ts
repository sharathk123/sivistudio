/**
 * Tests for useUserRole hook
 */

import { renderHook, waitFor } from '@testing-library/react'
import { useUserRole } from '../useUserRole'
import { createClient } from '@/lib/supabase/client'

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
    createClient: jest.fn(),
}))

describe('useUserRole', () => {
    let mockSupabase: any

    beforeEach(() => {
        jest.clearAllMocks()

        mockSupabase = {
            auth: {
                getUser: jest.fn(),
                onAuthStateChange: jest.fn(() => ({
                    data: {
                        subscription: {
                            unsubscribe: jest.fn(),
                        },
                    },
                })),
            },
            from: jest.fn(() => ({
                select: jest.fn(() => ({
                    eq: jest.fn(() => ({
                        single: jest.fn(),
                    })),
                })),
            })),
        }

            ; (createClient as jest.Mock).mockReturnValue(mockSupabase)
    })

    it('should return null profile when user is not authenticated', async () => {
        mockSupabase.auth.getUser.mockResolvedValue({
            data: { user: null },
        })

        const { result } = renderHook(() => useUserRole())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.profile).toBeNull()
        expect(result.current.isAdmin).toBe(false)
        expect(result.current.isCustomer).toBe(false)
        expect(result.current.role).toBeNull()
    })

    it('should return customer profile for regular users', async () => {
        const mockUser = { id: 'user-123' }
        const mockProfile = {
            id: 'user-123',
            email: 'customer@example.com',
            full_name: 'Customer User',
            role: 'customer',
            hyderabad_locality: null,
            created_at: '2026-02-10T00:00:00Z',
            updated_at: '2026-02-10T00:00:00Z',
        }

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

        const { result } = renderHook(() => useUserRole())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.profile).toEqual(mockProfile)
        expect(result.current.isAdmin).toBe(false)
        expect(result.current.isCustomer).toBe(true)
        expect(result.current.role).toBe('customer')
    })

    it('should return admin profile for admin users', async () => {
        const mockUser = { id: 'admin-123' }
        const mockProfile = {
            id: 'admin-123',
            email: 'admin@example.com',
            full_name: 'Admin User',
            role: 'admin',
            hyderabad_locality: null,
            created_at: '2026-02-10T00:00:00Z',
            updated_at: '2026-02-10T00:00:00Z',
        }

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

        const { result } = renderHook(() => useUserRole())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.profile).toEqual(mockProfile)
        expect(result.current.isAdmin).toBe(true)
        expect(result.current.isCustomer).toBe(false)
        expect(result.current.role).toBe('admin')
    })

    it('should handle errors gracefully', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

        mockSupabase.auth.getUser.mockRejectedValue(new Error('Auth error'))

        const { result } = renderHook(() => useUserRole())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.profile).toBeNull()
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error loading user profile:',
            expect.any(Error)
        )

        consoleErrorSpy.mockRestore()
    })

    it('should set up auth state change listener', () => {
        mockSupabase.auth.getUser.mockResolvedValue({
            data: { user: null },
        })

        renderHook(() => useUserRole())

        expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled()
    })

    it('should clean up subscription on unmount', () => {
        const unsubscribeMock = jest.fn()
        mockSupabase.auth.onAuthStateChange.mockReturnValue({
            data: {
                subscription: {
                    unsubscribe: unsubscribeMock,
                },
            },
        })

        mockSupabase.auth.getUser.mockResolvedValue({
            data: { user: null },
        })

        const { unmount } = renderHook(() => useUserRole())

        unmount()

        expect(unsubscribeMock).toHaveBeenCalled()
    })
})
