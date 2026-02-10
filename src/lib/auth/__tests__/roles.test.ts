/**
 * Tests for Role-based Access Control Utilities
 */

import { getUserProfile, isAdmin, isUserAdmin, requireAdmin, isAdminRole } from '../roles'
import { createClient } from '@/lib/supabase/server'

// Mock the Supabase client
jest.mock('@/lib/supabase/server', () => ({
    createClient: jest.fn(),
}))

describe('Role-based Access Control', () => {
    let mockSupabase: any

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks()

        // Create mock Supabase client
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

            ; (createClient as jest.Mock).mockResolvedValue(mockSupabase)
    })

    describe('getUserProfile', () => {
        it('should return null when user is not authenticated', async () => {
            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: null },
            })

            const result = await getUserProfile()

            expect(result).toBeNull()
        })

        it('should return user profile when authenticated', async () => {
            const mockUser = { id: 'user-123' }
            const mockProfile = {
                id: 'user-123',
                email: 'test@example.com',
                full_name: 'Test User',
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

            const result = await getUserProfile()

            expect(result).toEqual(mockProfile)
            expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
        })
    })

    describe('isAdmin', () => {
        it('should return false when user is not authenticated', async () => {
            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: null },
            })

            const result = await isAdmin()

            expect(result).toBe(false)
        })

        it('should return false when user is a customer', async () => {
            const mockUser = { id: 'user-123' }
            const mockProfile = {
                id: 'user-123',
                role: 'customer',
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

            const result = await isAdmin()

            expect(result).toBe(false)
        })

        it('should return true when user is an admin', async () => {
            const mockUser = { id: 'admin-123' }
            const mockProfile = {
                id: 'admin-123',
                role: 'admin',
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

            const result = await isAdmin()

            expect(result).toBe(true)
        })
    })

    describe('isUserAdmin', () => {
        it('should return false when user is a customer', async () => {
            const mockProfile = {
                id: 'user-123',
                role: 'customer',
            }

            mockSupabase.from.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockReturnValue({
                        single: jest.fn().mockResolvedValue({
                            data: mockProfile,
                        }),
                    }),
                }),
            })

            const result = await isUserAdmin('user-123')

            expect(result).toBe(false)
        })

        it('should return true when user is an admin', async () => {
            const mockProfile = {
                id: 'admin-123',
                role: 'admin',
            }

            mockSupabase.from.mockReturnValue({
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockReturnValue({
                        single: jest.fn().mockResolvedValue({
                            data: mockProfile,
                        }),
                    }),
                }),
            })

            const result = await isUserAdmin('admin-123')

            expect(result).toBe(true)
        })
    })

    describe('requireAdmin', () => {
        it('should throw error when user is not authenticated', async () => {
            mockSupabase.auth.getUser.mockResolvedValue({
                data: { user: null },
            })

            await expect(requireAdmin()).rejects.toThrow('Unauthorized: Not authenticated')
        })

        it('should throw error when user is not an admin', async () => {
            const mockUser = { id: 'user-123' }
            const mockProfile = {
                id: 'user-123',
                role: 'customer',
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

            await expect(requireAdmin()).rejects.toThrow('Forbidden: Admin access required')
        })

        it('should return profile when user is an admin', async () => {
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

            const result = await requireAdmin()

            expect(result).toEqual(mockProfile)
        })
    })

    describe('isAdminRole', () => {
        it('should return true for admin role', () => {
            expect(isAdminRole('admin')).toBe(true)
        })

        it('should return false for customer role', () => {
            expect(isAdminRole('customer')).toBe(false)
        })

        it('should return false for null', () => {
            expect(isAdminRole(null)).toBe(false)
        })

        it('should return false for undefined', () => {
            expect(isAdminRole(undefined)).toBe(false)
        })

        it('should return false for empty string', () => {
            expect(isAdminRole('')).toBe(false)
        })
    })
})
