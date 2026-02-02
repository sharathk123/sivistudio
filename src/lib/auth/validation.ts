// Shared validation functions for authentication forms

export interface ValidationResult {
    isValid: boolean
    error: string | null
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, error: 'Email is required' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' }
    }

    return { isValid: true, error: null }
}

/**
 * Validates password with multi-level feedback
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' }
    }

    if (password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters' }
    }

    // Warning for weak but acceptable passwords
    if (password.length < 8) {
        return { isValid: true, error: 'For better security, use at least 8 characters' }
    }

    // Suggestions for stronger passwords
    if (!/[A-Z]/.test(password)) {
        return { isValid: true, error: 'Consider adding an uppercase letter for stronger security' }
    }

    if (!/[0-9]/.test(password)) {
        return { isValid: true, error: 'Consider adding a number for stronger security' }
    }

    return { isValid: true, error: null }
}

/**
 * Validates password confirmation matches
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
        return { isValid: false, error: 'Please confirm your password' }
    }

    if (confirmPassword !== password) {
        return { isValid: false, error: 'Passwords do not match' }
    }

    return { isValid: true, error: null }
}

/**
 * Validates full name
 */
export const validateFullName = (name: string): ValidationResult => {
    if (!name) {
        return { isValid: false, error: 'Full name is required' }
    }

    if (name.trim().length < 2) {
        return { isValid: false, error: 'Please enter your full name' }
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return { isValid: false, error: 'Name should only contain letters' }
    }

    return { isValid: true, error: null }
}

/**
 * Determines if a validation error is a hard error (blocks submission) or a warning
 */
export const isHardError = (error: string | null): boolean => {
    if (!error) return false

    const warnings = [
        'For better security, use at least 8 characters',
        'Consider adding an uppercase letter for stronger security',
        'Consider adding a number for stronger security',
    ]

    return !warnings.includes(error)
}
