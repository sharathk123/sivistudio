import React from 'react'

interface AlertMessageProps {
    type: 'error' | 'success' | 'info'
    message: string
    className?: string
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, className = '' }) => {
    const styles = {
        error: 'bg-madder-light/10 text-madder border-madder/20',
        success: 'bg-sage/10 text-sage-700 border-sage/20',
        info: 'bg-indigo-light/10 text-indigo border-indigo/20',
    }

    const icons = {
        error: (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        ),
        success: (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        ),
    }

    return (
        <div
            className={`p-4 rounded-sm border ${styles[type]} flex items-start gap-3 ${className}`}
            role="alert"
        >
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
        </div>
    )
}
