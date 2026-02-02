// Shared error parsing utilities for Supabase authentication errors

/**
 * Parses Supabase authentication errors into user-friendly messages
 */
export const parseAuthError = (error: any): string => {
    const errorMessage = error?.message || ''

    // Common authentication errors
    if (errorMessage.includes('Invalid login credentials')) {
        return 'Invalid email or password. Please check your credentials and try again.'
    }

    if (errorMessage.includes('Email not confirmed')) {
        return 'Please verify your email address before signing in. Check your inbox for the verification link.'
    }

    if (errorMessage.includes('User not found')) {
        return 'No account found with this email. Please sign up first.'
    }

    if (errorMessage.includes('User already registered')) {
        return 'An account with this email already exists. Please sign in instead.'
    }

    if (errorMessage.includes('Invalid email')) {
        return 'Please enter a valid email address.'
    }

    if (errorMessage.includes('Password should be at least')) {
        return 'Password must be at least 6 characters long.'
    }

    if (errorMessage.includes('New password should be different')) {
        return 'Please choose a different password from your current one.'
    }

    if (errorMessage.includes('Account is disabled')) {
        return 'This account has been disabled. Please contact support.'
    }

    // Rate limiting
    if (errorMessage.includes('rate limit')) {
        return 'Too many attempts. Please wait a moment and try again.'
    }

    // Network errors
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        return 'Connection error. Please check your internet and try again.'
    }

    // Session/token errors
    if (errorMessage.includes('session') || errorMessage.includes('token')) {
        return 'Your session has expired. Please try again.'
    }

    // Default fallback
    return errorMessage || 'An unexpected error occurred. Please try again.'
}

/**
 * Determines if an error is recoverable (user can retry)
 */
export const isRecoverableError = (error: any): boolean => {
    const errorMessage = error?.message || ''

    const unrecoverableErrors = [
        'Account is disabled',
        'User not found',
    ]

    return !unrecoverableErrors.some(err => errorMessage.includes(err))
}
