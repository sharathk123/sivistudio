'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * BoutiqueButton - Floating WhatsApp concierge button
 * Persistent "Consult with Sivi" access point
 */
export default function BoutiqueButton() {
    const [showTooltip, setShowTooltip] = useState(false)

    // TODO: Replace with actual WhatsApp business number
    const whatsappNumber = '919876543210'
    const message = encodeURIComponent('Hello Sivi! I would like to consult about your collection.')
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    return (
        <motion.div
            style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                zIndex: 50,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        >
            <div style={{ position: 'relative' }}>
                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: showTooltip ? 1 : 0, x: showTooltip ? 0 : 10 }}
                    style={{
                        position: 'absolute',
                        right: 'calc(100% + 16px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'var(--color-charcoal)',
                            color: 'var(--color-bone)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontFamily: 'var(--font-inter), Inter, sans-serif',
                            letterSpacing: '0.05em',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                            position: 'relative',
                        }}
                    >
                        Consult with Sivi
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%) translateX(100%)',
                            }}
                        >
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '8px solid transparent',
                                    borderBottom: '8px solid transparent',
                                    borderLeft: '8px solid var(--color-charcoal)',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* WhatsApp Button */}
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                        backgroundColor: 'var(--color-whatsapp)',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        transition: 'background-color 300ms',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-sage)'
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-whatsapp)'
                    }}
                >
                    {/* WhatsApp Icon */}
                    <svg
                        style={{
                            width: '32px',
                            height: '32px',
                            color: 'white',
                        }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </motion.a>
            </div>
        </motion.div>
    )
}
