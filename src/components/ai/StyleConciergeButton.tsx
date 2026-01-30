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
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '32px',
                    zIndex: 50,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
            >
                <div style={{ position: 'relative' }}>
                    {/* Tooltip */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: showTooltip ? 1 : 0, x: showTooltip ? 0 : -10 }}
                        style={{
                            position: 'absolute',
                            left: 'calc(100% + 16px)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#1A1A1A',
                                color: '#FDFCFB',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                letterSpacing: '0.05em',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                position: 'relative',
                            }}
                        >
                            AI Style Concierge
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%) translateX(-100%)',
                                }}
                            >
                                <div
                                    style={{
                                        width: 0,
                                        height: 0,
                                        borderTop: '8px solid transparent',
                                        borderBottom: '8px solid transparent',
                                        borderRight: '8px solid #1A1A1A',
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Button */}
                    <motion.button
                        onClick={() => setIsDrawerOpen(true)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: '#1A1A1A',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                            transition: 'background-color 300ms',
                            cursor: 'pointer',
                            border: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#9CA770'
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#1A1A1A'
                        }}
                    >
                        {/* AI Sparkle Icon */}
                        <svg
                            style={{
                                width: '32px',
                                height: '32px',
                                color: 'white',
                                position: 'relative',
                                zIndex: 10,
                            }}
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
                    </motion.button>
                </div>
            </motion.div>

            <StyleConciergeDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    )
}
