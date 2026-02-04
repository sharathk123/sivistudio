
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not defined in environment variables. Email sending will fail.')
}

export const resend = new Resend(resendApiKey)

// Default Sender Identity
// Use 'onboarding@resend.dev' for testing if domain is not verified
// Once verified, switch to 'Sivi Studio <atelier@sivithecouturier.com>'
export const DEFAULT_SENDER = 'Sivi Studio <onboarding@resend.dev>'
