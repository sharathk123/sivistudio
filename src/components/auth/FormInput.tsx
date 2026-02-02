import React from 'react'

interface FormInputProps {
    id: string
    name: string
    type: 'text' | 'email' | 'password'
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
    error?: string
    warning?: string
    success?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    autoComplete?: string
    extraLabel?: React.ReactNode
}

export const FormInput: React.FC<FormInputProps> = ({
    id,
    name,
    type,
    label,
    value,
    onChange,
    onBlur,
    error,
    warning,
    success,
    placeholder,
    required = false,
    disabled = false,
    autoComplete,
    extraLabel,
}) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor={id} className="block text-sm font-medium text-charcoal-200">
                    {label}
                </label>
                {extraLabel}
            </div>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autoComplete}
                className={`input-boutique ${error ? 'border-madder focus:border-madder' : ''
                    }`}
                placeholder={placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : warning ? `${id}-warning` : success ? `${id}-success` : undefined}
            />

            {/* Error Message */}
            {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-madder flex items-start gap-1.5">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </p>
            )}

            {/* Warning Message */}
            {!error && warning && (
                <p id={`${id}-warning`} className="mt-2 text-sm text-turmeric flex items-start gap-1.5">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{warning}</span>
                </p>
            )}

            {/* Success Message */}
            {!error && !warning && success && (
                <p id={`${id}-success`} className="mt-2 text-sm text-sage-700 flex items-start gap-1.5">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{success}</span>
                </p>
            )}
        </div>
    )
}
