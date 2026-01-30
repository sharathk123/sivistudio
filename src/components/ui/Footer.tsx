'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-charcoal text-bone pt-24 pb-8 px-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Top Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 border-b border-bone/10 pb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <span className="font-serif italic text-2xl">Sivi Studio</span>
                        <p className="text-sm text-bone/60 font-light leading-relaxed max-w-xs">
                            Quiet luxury born from the heritage of Hyderabad.
                            Conscious craft for the modern aesthete.
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
                                <Link href="/shop" className="hover:text-white cursor-pointer transition-colors">
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
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-transparent border-b border-bone/30 pb-2 text-sm outline-none placeholder:text-bone/40 focus:border-sage transition-colors"
                            />
                            <button
                                type="submit"
                                className="self-start text-xs uppercase tracking-widest hover:text-sage transition-colors border-b border-transparent hover:border-sage pb-1"
                            >
                                Subscribe
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
                        <Link href="/privacy" className="hover:text-bone transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-bone transition-colors">
                            Terms
                        </Link>
                        <Link href="/shipping" className="hover:text-bone transition-colors">
                            Shipping
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
