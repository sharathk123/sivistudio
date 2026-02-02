import { useState, useCallback } from 'react'

export interface FieldError {
    field: string
    message: string
    isWarning?: boolean
}

export interface UseFormValidationOptions {
    validators: Record<string, (value: any, allValues?: any) => { isValid: boolean; error: string | null; isWarning?: boolean }>
}

export const useFormValidation = (options: UseFormValidationOptions) => {
    const [fieldErrors, setFieldErrors] = useState<FieldError[]>([])
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const validateField = useCallback((field: string, value: any, allValues?: any) => {
        const validator = options.validators[field]
        if (!validator) return true

        const result = validator(value, allValues)

        setFieldErrors(prev => {
            const filtered = prev.filter(e => e.field !== field)
            if (result.error && touched[field]) {
                return [...filtered, {
                    field,
                    message: result.error,
                    isWarning: result.isWarning || false
                }]
            }
            return filtered
        })

        return result.isValid
    }, [options.validators, touched])

    const validateAllFields = useCallback((values: Record<string, any>) => {
        const errors: FieldError[] = []
        let allValid = true

        Object.keys(options.validators).forEach(field => {
            const validator = options.validators[field]
            const result = validator(values[field], values)

            if (result.error && !result.isWarning) {
                errors.push({
                    field,
                    message: result.error,
                    isWarning: false
                })
                allValid = false
            }
        })

        setFieldErrors(errors)
        return allValid
    }, [options.validators])

    const markFieldTouched = useCallback((field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }, [])

    const markAllFieldsTouched = useCallback((fields: string[]) => {
        const newTouched: Record<string, boolean> = {}
        fields.forEach(field => {
            newTouched[field] = true
        })
        setTouched(newTouched)
    }, [])

    const getFieldError = useCallback((field: string): string | undefined => {
        const error = fieldErrors.find(e => e.field === field && !e.isWarning)
        return error?.message
    }, [fieldErrors])

    const getFieldWarning = useCallback((field: string): string | undefined => {
        const warning = fieldErrors.find(e => e.field === field && e.isWarning)
        return warning?.message
    }, [fieldErrors])

    const clearErrors = useCallback(() => {
        setFieldErrors([])
        setTouched({})
    }, [])

    return {
        fieldErrors,
        touched,
        validateField,
        validateAllFields,
        markFieldTouched,
        markAllFieldsTouched,
        getFieldError,
        getFieldWarning,
        clearErrors,
    }
}
