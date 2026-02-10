'use client'

import { useEffect } from 'react'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

/**
 * Global Error Boundary
 * 
 * This component catches errors that occur in the root layout and its children.
 * It's a Next.js App Router convention for handling errors at the route level.
 */

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to console
        console.error('Global error caught:', error)
    }, [error])

    return (
        <ErrorBoundary
            fallback={
                <div className="min-h-screen bg-bone flex items-center justify-center px-6">
                    <div className="max-w-md text-center space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-serif text-4xl md:text-5xl italic text-charcoal">
                                Application Error
                            </h1>
                            <div className="w-16 h-1 bg-sage mx-auto" />
                        </div>

                        <p className="text-charcoal-400 text-sm leading-relaxed">
                            {error.message || 'An unexpected error occurred'}
                        </p>

                        {process.env.NODE_ENV === 'development' && error.digest && (
                            <p className="text-xs text-charcoal-300 font-mono">
                                Error ID: {error.digest}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={reset}
                                className="bg-charcoal text-bone px-8 py-3 text-xs uppercase tracking-widest hover:bg-sage transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="border border-charcoal text-charcoal px-8 py-3 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-colors"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
            {null}
        </ErrorBoundary>
    )
}
