import React from 'react'
import Link from 'next/link'

interface AuthLayoutProps {
    title: string
    subtitle?: string
    children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bone px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="font-serif text-5xl font-bold text-charcoal italic hover:text-sage transition-colors">
                            Sivi Studio
                        </h1>
                    </Link>
                    <p className="mt-4 text-lg text-charcoal-300 tracking-wide-luxury">
                        {title}
                    </p>
                    {subtitle && (
                        <p className="mt-2 text-sm text-charcoal-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="mt-8 space-y-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
