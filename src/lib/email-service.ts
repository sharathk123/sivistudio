
import { resend, DEFAULT_SENDER } from './email-client'
import { WelcomeEmail } from '@/components/email/WelcomeEmail'
import { OrderConfirmationEmail } from '@/components/email/OrderConfirmationEmail'
import { ContactFormEmail } from '@/components/email/ContactFormEmail'

// Types
export interface EmailResult {
    success: boolean
    data?: any
    error?: any
}

export type OrderItem = {
    name: string
    quantity: number
    price: number
    image?: string
}

export class EmailService {
    /**
     * Sends a welcome email with verification link
     */
    static async sendWelcomeEmail(
        email: string,
        fullName: string,
        otpCode: string
    ): Promise<EmailResult> {
        return this.sendWithLogging('Welcome Email', {
            from: DEFAULT_SENDER,
            to: email,
            subject: 'Your Sivi Verification Code',
            react: WelcomeEmail({
                userFirstname: fullName.split(' ')[0],
                otpCode,
            }),
        })
    }

    /**
     * Sends an order confirmation email
     */
    static async sendOrderConfirmation(
        email: string,
        orderId: string,
        customerName: string,
        items: OrderItem[],
        totalAmount: number,
        shippingAddress: string
    ): Promise<EmailResult> {
        return this.sendWithLogging('Order Confirmation', {
            from: DEFAULT_SENDER,
            to: email,
            subject: `Order Confirmed: #${orderId} - Sivi Studio`,
            react: OrderConfirmationEmail({
                orderId,
                customerName,
                items,
                totalAmount,
                shippingAddress,
            }),
        })
    }

    /**
     * Sends a contact form notification to the admin
     */
    static async sendContactFormNotification(
        name: string,
        email: string,
        subject: string,
        message: string
    ): Promise<EmailResult> {
        // In production, this should go to the studio admin email
        // For now, in Resend Sandbox, it must go to the registered email
        const adminEmail = 'sivihandloom@gmail.com'

        return this.sendWithLogging('Contact Notification', {
            from: DEFAULT_SENDER,
            to: adminEmail,
            subject: `New Inquiry: ${subject} - ${name}`,
            react: ContactFormEmail({
                name,
                email,
                subject,
                message,
            }),
            replyTo: email, // Allow replying directly to the user
        })
    }

    /**
     * Internal helper to handle logging
     */
    private static async sendWithLogging(context: string, payload: any): Promise<EmailResult> {
        console.log(`[EmailService] Sending ${context} to: ${payload.to}`)

        try {
            const result = await resend.emails.send(payload)

            if (result.error) {
                console.error(`[EmailService] Failed to send ${context}:`, result.error)
                return { success: false, error: result.error }
            }

            console.log(`[EmailService] Successfully sent ${context}. ID: ${result.data?.id}`)
            return { success: true, data: result.data }

        } catch (error) {
            console.error(`[EmailService] Exception sending ${context}:`, error)
            return { success: false, error }
        }
    }
}
