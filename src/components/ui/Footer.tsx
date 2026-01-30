'use client'

import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="bg-charcoal text-bone pt-24 pb-8 px-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Top Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 border-b border-bone/10 pb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <span className="font-serif italic text-2xl">Sivi Studio</span>
                        <p className="text-sm text-ivory-700 font-light leading-relaxed max-w-xs">
                            Quiet luxury born from the heritage of Hyderabad.
                            Conscious craft for the modern aesthete.
                        </p>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Shop</h4>
                        <ul className="space-y-2 text-sm font-light text-ivory-200">
                            <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
                            <li className="hover:text-white cursor-pointer transition-colors">The Linen Edit</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Handloom Sarees</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Bespoke Services</li>
                        </ul>
                    </div>

                    {/* Studio */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Studio</h4>
                        <ul className="space-y-2 text-sm font-light text-ivory-200">
                            <li className="hover:text-white cursor-pointer transition-colors">Our Philosophy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">The Journal</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Visit Us (Jubilee Hills)</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-sage">Newsletter</h4>
                        <div className="flex border-b border-bone/30 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-ivory-800"
                            />
                            <button className="text-xs uppercase hover:text-sage transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Big Typography */}
                <div className="text-center overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                        className="text-[14vw] font-serif leading-none opacity-20 hover:opacity-100 transition-opacity duration-700 select-none"
                    >
                        SIVI STUDIO
                    </motion.h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-center mt-8 text-[10px] uppercase tracking-widest text-ivory-800">
                    <span>© 2024 Sivi Studio. All Rights Reserved.</span>
                    <div className="flex gap-4">
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
