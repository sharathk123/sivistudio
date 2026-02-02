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
        <div className="space-y-3">
            <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="group w-full relative overflow-hidden bg-charcoal text-ivory disabled:bg-charcoal-400 disabled:cursor-not-allowed transition-all duration-500 py-6 px-8 rounded-sm shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
                {/* Background Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

                <div className="relative z-10 flex flex-col items-center justify-center">
                    {isProcessing ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="animate-spin text-sage-400" size={20} />
                            <span className="text-sm font-medium tracking-[0.3em] uppercase">Securing Order...</span>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="flex items-center justify-center gap-4 w-full">
                                <div className="h-[1px] flex-1 bg-ivory/20" />
                                <span className="font-serif italic text-ivory/60 text-sm tracking-widest whitespace-nowrap">Finalize Purchase</span>
                                <div className="h-[1px] flex-1 bg-ivory/20" />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-3xl font-light tracking-tight font-serif italic text-sage-300">
                                    ₹{totalAmount.toLocaleString('en-IN')}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                                    <Lock size={10} className="text-sage-500" />
                                    <span>Fully Encrypted Transaction</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Subtle Border Glow */}
                <div className="absolute inset-0 border border-ivory/5 group-hover:border-sage/30 transition-colors duration-500 rounded-sm" />
            </button>

            <div className="flex items-center justify-center gap-2 opacity-60">
                <span className="text-[10px] text-charcoal-400 uppercase tracking-[0.1em]">Payment secured by</span>
                <span className="font-bold text-[11px] tracking-tight text-blue-600/80">Razorpay</span>
            </div>
        </div>
    )
}
