'use client'

import { useState, useRef } from 'react'
import { api } from '@/lib/api/client'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

// Define the global Razorpay interface
declare global {
    interface Window {
        Razorpay: any
    }
}

interface PaymentButtonProps {
    items: any[]
    shippingAddressId: string | null
    totalAmount: number
    onSuccess?: (orderId: string) => void
    onError?: (error: string) => void
}

export default function PaymentButton({
    items,
    shippingAddressId,
    totalAmount,
    onSuccess,
    onError
}: PaymentButtonProps) {
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()

    const handlePayment = async () => {
        if (!shippingAddressId) {
            onError?.('Please select a shipping address')
            return
        }

        setIsProcessing(true)

        try {
            // 1. Create Order on Backend
            const orderResponse = await api.createPaymentOrder({
                items,
                shipping_address_id: shippingAddressId
            })

            if (!orderResponse.success) {
                throw new Error('Failed to initiate payment')
            }

            const { orderId, amount, currency, dbOrderId } = orderResponse

            // 2. Initialize Razorpay Checkout
            if (!window.Razorpay) {
                throw new Error('Payment gateway not loaded')
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: currency,
                name: 'Sivi Studio',
                description: 'Order Payment',
                image: '/logo-square.png', // Fallback or use a specific logo URL
                order_id: orderId, // This is the order_id created in the backend

                // Handler for successful payment
                handler: async function (response: any) {
                    try {
                        const verificationResponse = await api.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })

                        if (verificationResponse.success) {
                            onSuccess?.(dbOrderId)
                        } else {
                            throw new Error('Payment verification failed')
                        }
                    } catch (error: any) {
                        console.error('Verification Error:', error)
                        onError?.('Payment verification failed. Please contact support.')
                    }
                },

                // Styling to match Sivi Brand (Sage/Charcoal)
                theme: {
                    color: '#849279' // Sage color
                },

                // Pre-fill user details if available (can accept these as props later)
                // prefill: {
                //     name: "Gaurav Kumar",
                //     email: "gaurav.kumar@example.com",
                //     contact: "9000090000"
                // }
            }

            const rzp1 = new window.Razorpay(options)

            rzp1.on('payment.failed', function (response: any) {
                console.error('Payment Failed:', response.error)
                onError?.(`Payment failed: ${response.error.description}`)
            })

            rzp1.open()

        } catch (error: any) {
            console.error('Payment Error:', error)
            onError?.(error.message || 'Something went wrong')
            setIsProcessing(false) // Only reset if we didn't open modal successfully (though modal handling is async)
        }

        // Note: isProcessing stays true while modal is open to prevent double clicks. 
        // Razorpay modal doesn't give a "close" event easily without custom handling, 
        // so usually we rely on the page redirecting or the user refreshing if they cancel.
        // For better UX, we could use a timeout or specific modal events if needed.
    }

    return (
        <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="group w-full relative overflow-hidden bg-charcoal text-ivory hover:bg-charcoal-600 disabled:bg-charcoal-400 disabled:cursor-not-allowed transition-all duration-300 py-4 px-6 shadow-md hover:shadow-lg"
        >
            <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                {isProcessing ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin text-sage" size={18} />
                        <span className="text-sm font-bold tracking-[0.2em] uppercase">Processing</span>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <span className="font-serif italic text-lg opacity-80">Pay safely with</span>
                            {/* Razorpay Logo SVG */}
                            <svg viewBox="0 0 249 53" className="h-5 w-auto fill-current text-blue-400 brightness-125" aria-label="Razorpay">
                                <path d="M216.5 28.9c0-9.6-6.6-17.7-16-19.6V8.6h-5.6v2.1c-2.4-1.4-5.2-2.3-8.2-2.3-9.1 0-16.5 7.4-16.5 16.5s7.4 16.5 16.5 16.5c3 0 5.8-0.9 8.2-2.3v1.3h5.6v-10c7.8 0 11.5 5 11.5 11.5v7h6v-8.4c0-4.6-0.6-7.8-1.5-10zm-24.8 6.4c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zM110.1 8.5v31.9h5.6V26.4c0-7.8 4.5-11.8 12.3-11.8v-6.2c-2.1 0-4.3 0.6-6.2 1.8V8.6h-11.7v-0.1zM81.7 8.5l-6.7 18.2-6.5-18.2H61.8l9.6 24.2v7.7h6v-7.3l9.8-24.6h-6.5v0.1zM50.4 24.2c0-8.9-7.3-16-16.4-16S17.6 15.3 17.6 24.2s7.3 16 16.4 16 16.3-7.1 16.4-16zm-5.6 0c0 5.8-4.8 10.6-10.8 10.6S23.2 30 23.2 24.2 28 13.6 34 13.6s10.8 4.8 10.8 10.6zM6 8.5v11.2h7.3c4 0 6.6-2 6.6-5.4 0-3.6-2.5-5.7-6.8-5.7H6z m0 31.9h5.6V24.3h-0.2c2.1 0.3 3.4 1.7 4.3 4.8l2.6 11.3h6l-3-12.3c-1-4.1-3.3-6.6-6.8-7.5 3.3-1.4 5.3-4.3 5.3-8 0-6.1-4.6-9.6-11.5-9.6H0.4v31.9H6zM157.8 8.4h-5.6v31.9h17.1v-5.2h-11.5V8.4zM228 35.1c-10.4 0-16.6-7.1-16.6-16.5S217.6 2 228 2s16.6 7.1 16.6 16.5S238.4 35.1 228 35.1z m0-27.9c-7.3 0-11 5-11 11.3s3.7 11.3 11 11.3 11-5 11-11.3-3.7-11.3-11-11.3z" transform="translate(0 7)" />
                                <path d="M239.5 4.4l-3.9 6.8-4-6.8h-4.6l6.3 10.1-6.7 10.5h4.6l4.2-7.1 4.2 7.1h4.6L237.5 14.5 244 4.4h-4.5z" fill="#3395FF" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-px w-8 bg-current opacity-30"></div>
                            <span className="font-bold tracking-widest text-lg">₹{totalAmount.toLocaleString()}</span>
                            <div className="h-px w-8 bg-current opacity-30"></div>
                        </div>
                    </>
                )}
            </div>

            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-600 to-charcoal opacity-50 pointer-events-none" />
        </button>
    )
}
