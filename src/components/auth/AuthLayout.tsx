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
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                        <div className="flex flex-col items-center gap-1 antialiased">
                            <span className="text-3xl tracking-nav uppercase text-charcoal" style={{ fontFamily: 'var(--font-bodoni)', fontWeight: 700 }}>
                                SIVI
                            </span>
                            <span className="text-2xl text-charcoal" style={{ fontFamily: 'var(--font-allura)', fontWeight: 400, marginTop: '-0.25rem' }}>
                                the couturière
                            </span>
                        </div>
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
