'use client'

import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * ErrorBoundary - Catches React errors and displays a graceful fallback UI
 * Prevents the entire app from crashing when a component error occurs
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo)
        }

        // In production, you could log to an error reporting service
        // Example: logErrorToService(error, errorInfo)
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
                                <pre className="overflow-auto text-charcoal-400 font-mono">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-charcoal text-bone px-8 py-3 text-xs uppercase tracking-widest hover:bg-sage transition-colors"
                            >
                                Return Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
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
