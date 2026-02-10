'use client'

import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
    resetKeys?: Array<string | number>
    resetOnPropsChange?: boolean
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: React.ErrorInfo | null
}

/**
 * ErrorBoundary - Catches React errors and displays a graceful fallback UI
 * Prevents the entire app from crashing when a component error occurs
 *
 * Features:
 * - Custom fallback UI support
 * - Error callback for logging/reporting
 * - Reset on props change support
 * - Development mode error details
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    private lastResetKeys: Array<string | number> = []

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
        this.lastResetKeys = props.resetKeys || []
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Update state with error info
        this.setState({ errorInfo })

        // Log error to console
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }

        // Log to error tracking service in production
        if (process.env.NODE_ENV === 'production') {
            this.logErrorToService(error, errorInfo)
        }
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        const { resetKeys, resetOnPropsChange } = this.props

        // Reset error boundary when resetKeys change
        if (resetOnPropsChange && resetKeys) {
            const keysChanged = resetKeys.some((key, index) => key !== this.lastResetKeys[index])

            if (keysChanged) {
                this.resetError()
                this.lastResetKeys = [...resetKeys]
            }
        }
    }

    private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
        // In production, send to error tracking service
        // Example: Sentry, LogRocket, or custom service
        try {
            // Prepare error data
            const errorData = {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
                url: typeof window !== 'undefined' ? window.location.href : 'unknown',
            }

            // Send to error tracking service
            // Example: Sentry.captureException(error, { extra: errorInfo })
            console.log('Error logged to service:', errorData)
        } catch (loggingError) {
            console.error('Failed to log error to service:', loggingError)
        }
    }

    private resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        })
    }

    private handleReload = () => {
        window.location.reload()
    }

    private handleGoHome = () => {
        window.location.href = '/'
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI or use provided fallback
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default fallback UI
            return (
                <div className="min-h-screen bg-bone flex items-center justify-center px-6">
                    <div className="max-w-md text-center space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-serif text-4xl md:text-5xl italic text-charcoal">
                                Something went wrong
                            </h1>
                            <div className="w-16 h-1 bg-sage mx-auto" />
                        </div>

                        <p className="text-charcoal-400 text-sm leading-relaxed">
                            We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="text-left bg-ivory p-4 rounded text-xs">
                                <summary className="cursor-pointer font-mono text-charcoal-600 mb-2">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="overflow-auto text-charcoal-400 font-mono whitespace-pre-wrap">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && (
                                        <>
                                            {'\n\nComponent Stack:\n'}
                                            {this.state.errorInfo.componentStack}
                                        </>
                                    )}
                                </pre>
                            </details>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={this.handleGoHome}
                                className="bg-charcoal text-bone px-8 py-3 text-xs uppercase tracking-widest hover:bg-sage transition-colors"
                            >
                                Return Home
                            </button>
                            <button
                                onClick={this.handleReload}
                                className="border border-charcoal text-charcoal px-8 py-3 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
