'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, FormEvent } from 'react'

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
                        <span className="font-serif italic text-2xl">Sivi Studio</span>
                        <p className="text-sm text-bone/60 font-light leading-relaxed max-w-xs">
                            Indian handloom cloth brand specializing in contemporary dresses,
                            modern outfits, and traditional sarees from Hyderabad.
                        </p>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Shop</h4>
                        <ul className="space-y-3 text-sm font-light text-bone/70">
                            <li>
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
                                    Handloom Sarees
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
                                    Cotton Kurtas
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
                                    Silk Dupattas
                                </Link>
                            </li>
                            <li>
                                <Link href="/custom-tailoring" className="hover:text-white cursor-pointer transition-colors">
                                    Bespoke Tailoring
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Studio */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Studio</h4>
                        <ul className="space-y-3 text-sm font-light text-bone/70">
                            <li>
                                <Link href="/story" className="hover:text-white cursor-pointer transition-colors">
                                    Our Philosophy
                                </Link>
                            </li>
                            <li>
                                <Link href="/journal" className="hover:text-white cursor-pointer transition-colors">
                                    The Journal
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white cursor-pointer transition-colors">
                                    Visit Us (Jubilee Hills)
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
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Newsletter</h4>
                        <p className="text-xs text-bone/60 leading-relaxed">
                            Receive curated insights on craft, culture, and conscious living.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    disabled={status === 'loading'}
                                    className="w-full bg-transparent border-b border-bone/30 pb-2 text-sm outline-none placeholder:text-bone/40 focus:border-sage transition-colors disabled:opacity-50"
                                    aria-label="Email address for newsletter"
                                    aria-invalid={status === 'error'}
                                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                                />
                                {status === 'error' && (
                                    <p id="newsletter-error" className="text-xs text-red-400 mt-2" role="alert">
                                        {errorMessage}
                                    </p>
                                )}
                                {status === 'success' && (
                                    <p className="text-xs text-sage mt-2" role="status">
                                        ✓ Thank you for subscribing!
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="self-start text-xs uppercase tracking-widest hover:text-sage transition-colors border-b border-transparent hover:border-sage pb-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Big Typography */}
                <div className="text-center overflow-hidden mb-12">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                        className="text-[14vw] md:text-[12vw] font-serif leading-none opacity-10 hover:opacity-30 transition-opacity duration-700 select-none"
                    >
                        SIVI STUDIO
                    </motion.h1>
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
