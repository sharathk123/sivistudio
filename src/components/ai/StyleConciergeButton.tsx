'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import StyleConciergeDrawer from './StyleConciergeDrawer'

/**
 * StyleConciergeButton - Floating AI stylist trigger
 * Positioned opposite to WhatsApp button for balanced UI
 */
export default function StyleConciergeButton() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <motion.div
                className="ai-concierge-container"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
            >
                <div className="relative">
                    {/* Tooltip */}
                    <div className="ai-concierge-tooltip">
                        <div className="bg-charcoal text-bone py-2 px-4 rounded-lg text-sm tracking-wide shadow-2xl relative font-sans">
                            AI Style Concierge
                            <div className="ai-concierge-tooltip-arrow" />
                        </div>
                    </div>

                    {/* AI Button */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="ai-concierge-btn"
                        aria-label="Open AI Style Concierge"
                    >
                        {/* AI Sparkle Icon */}
                        <svg
                            className="w-8 h-8 relative z-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            />
                        </svg>
                    </button>
                </div>
            </motion.div>

            <StyleConciergeDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    )
}
