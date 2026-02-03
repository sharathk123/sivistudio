'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { Instagram, HelpCircle } from 'lucide-react'

export default function Footer() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            setStatus('error')
            setErrorMessage('Please enter a valid email address')
            return
        }

        try {
            // TODO: Replace with actual newsletter API endpoint
            // const response = await fetch('/api/newsletter', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            setStatus('success')
            setEmail('')

            // Reset success message after 3 seconds
            setTimeout(() => {
                setStatus('idle')
            }, 3000)
        } catch (error) {
            setStatus('error')
            setErrorMessage('Something went wrong. Please try again.')
        }
    }
    return (
        <footer className="bg-charcoal text-bone pt-24 pb-8 px-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Top Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 border-b border-bone/10 pb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex flex-col gap-1 antialiased">
                            <span className="text-3xl tracking-nav uppercase" style={{ fontFamily: 'var(--font-bodoni)', fontWeight: 700 }}>
                                SIVI
                            </span>
                            <span className="text-2xl" style={{ fontFamily: 'var(--font-allura)', fontWeight: 400, marginTop: '-0.25rem' }}>
                                the couturière
                            </span>
                        </div>
                        <p className="text-[13px] text-bone/70 font-light leading-relaxed max-w-xs antialiased">
                            Indian handloom textile studio specializing in contemporary dresses,
                            modern outfits, and traditional sarees from Hyderabad.
                        </p>
                        <div className="flex items-center gap-6 pt-2">
                            <a href="https://instagram.com/sivithecouturier" target="_blank" rel="noopener noreferrer" className="text-bone/70 hover:text-sage transition-colors" aria-label="Instagram">
                                <Instagram strokeWidth={1.5} size={20} />
                            </a>
                            <a href="https://in.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-bone/70 hover:text-sage transition-colors" aria-label="Pinterest">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12h5a2 2 0 0 0 0-4H8v9" />
                                </svg>
                            </a>
                            <Link href="/contact" className="text-bone/70 hover:text-sage transition-colors" aria-label="Support">
                                <HelpCircle strokeWidth={1.5} size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4 antialiased">
                        <h4 className="text-xs uppercase tracking-widest text-sage font-semibold">Shop</h4>
                        <ul className="space-y-3 text-[13px] font-normal text-bone/70">
                            <li>
                                <Link href="/collections/handloom-sarees" className="hover:text-white cursor-pointer transition-colors">
                                    Handloom Sarees
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections/cotton-kurtas" className="hover:text-white cursor-pointer transition-colors">
                                    Cotton Kurtas
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections/silk-dupattas" className="hover:text-white cursor-pointer transition-colors">
                                    Silk Dupattas
                                </Link>
                            </li>
                            <li>
                                <Link href="/custom-tailoring" className="hover:text-white cursor-pointer transition-colors">
                                    Bespoke Tailoring
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
                                    All Collections
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Studio */}
                    <div className="space-y-4 antialiased">
                        <h4 className="text-xs uppercase tracking-widest text-sage font-semibold">Studio</h4>
                        <ul className="space-y-3 text-[13px] font-normal text-bone/70">
                            <li>
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
                                    the Atelier
                                </Link>
                            </li>
                            <li>
                                <Link href="/heritage" className="hover:text-white cursor-pointer transition-colors">
                                    the Heritage
                                </Link>
                            </li>
                            <li>
                                <Link href="/story" className="hover:text-white cursor-pointer transition-colors">
                                    the Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/journal" className="hover:text-white cursor-pointer transition-colors">
                                    the Journal
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white cursor-pointer transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 antialiased">
                        <h4 className="text-xs uppercase tracking-widest text-sage font-semibold">Newsletter</h4>
                        <p className="text-[13px] text-bone/70 leading-relaxed font-normal">
                            Receive curated insights on craft, culture, and conscious living.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    disabled={status === 'loading'}
                                    className="w-full bg-transparent border-b border-bone/30 pb-2 text-sm outline-none placeholder:text-bone/40 focus:border-sage transition-colors disabled:opacity-50"
                                    aria-label="Email address for newsletter"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="absolute right-0 bottom-2 text-xs uppercase tracking-widest hover:text-sage transition-colors border-b border-transparent hover:border-sage pb-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? '...' : 'Join'}
                                </button>
                            </div>
                            {status === 'error' && (
                                <p id="newsletter-error" className="text-xs text-red-400" role="alert">
                                    {errorMessage}
                                </p>
                            )}
                            {status === 'success' && (
                                <p className="text-xs text-sage" role="status">
                                    ✓ Thank you for subscribing!
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Big Typography */}
                <div className="text-center overflow-hidden mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 0.1, y: 0 }}
                        whileHover={{
                            opacity: 0.8,
                            color: 'var(--color-sage)',
                            textShadow: '0 0 30px rgba(156, 167, 112, 0.5)',
                            scale: 1.02
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                        className="flex flex-col items-center justify-center select-none pb-8 antialiased transition-all duration-700 cursor-default"
                        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                    >
                        <span className="text-[14vw] md:text-[12vw] leading-none uppercase tracking-editorial font-bold" style={{ fontFamily: 'var(--font-bodoni)', textRendering: 'geometricPrecision' }}>
                            SIVI
                        </span>
                        <span className="text-[6vw] md:text-[5vw] leading-none -mt-[4vw]" style={{ fontFamily: 'var(--font-allura)', textRendering: 'geometricPrecision' }}>
                            the couturière
                        </span>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-bone/10 text-[10px] uppercase tracking-widest text-bone/50">
                    <span>© {new Date().getFullYear()} Sivi Studio. All Rights Reserved.</span>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-bone transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms-of-service" className="hover:text-bone transition-colors">
                            Terms
                        </Link>
                        <Link href="/shipping-policy" className="hover:text-bone transition-colors">
                            Shipping
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
