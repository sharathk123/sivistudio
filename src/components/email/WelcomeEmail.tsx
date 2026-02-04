
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
    Font,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
    userFirstname: string
    otpCode: string
}

export const WelcomeEmail = ({
    userFirstname,
    otpCode,
}: WelcomeEmailProps) => {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Playfair Display"
                    fallbackFontFamily="serif"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={600}
                    fontStyle="normal"
                />
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="sans-serif"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Welcome to Sivi Studio. Your verification code is enclosed.</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Logo Placeholder - In production use a hosted URL */}
                    {/* <Img src="https://your-hosted-logo-url.png" width="100" height="40" alt="Sivi" style={logo} /> */}
                    <Heading style={h1}>Sivi the Couturière</Heading>

                    <Text style={heroText}>
                        Welcome to the Atelier, {userFirstname}.
                    </Text>

                    <Text style={text}>
                        We are honored to have you join our community of connoisseurs. To complete your entrance, please use the following verification code:
                    </Text>

                    <Section style={codeBox}>
                        <Text style={codeText}>{otpCode}</Text>
                    </Section>

                    <Text style={text}>
                        This code will expire in 15 minutes.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        If you did not request this invitation, please disregard this correspondence.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default WelcomeEmail

const main = {
    backgroundColor: '#FDFCFB', // Bone
    fontFamily: '"Playfair Display", serif',
}

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    border: '1px solid #E4E4DE', // Ivory
}

const h1 = {
    color: '#9CA770', // Sage
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.4',
    margin: '0 0 24px',
    textAlign: 'center' as const,
    fontStyle: 'italic',
}

const heroText = {
    fontSize: '20px',
    lineHeight: '1.4',
    color: '#1A1A1A', // Charcoal
    marginBottom: '24px',
    fontWeight: '500',
}

const text = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4B5563',
    marginBottom: '24px',
    fontFamily: '"Inter", sans-serif',
}

const codeBox = {
    background: '#f4f4f0',
    borderRadius: '4px',
    margin: '24px 0',
    padding: '16px',
    textAlign: 'center' as const,
}

const codeText = {
    fontFamily: 'Times New Roman, serif',
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '8px',
    color: '#1a1a1a',
    margin: '0',
}

const hr = {
    borderColor: '#E4E4DE', // Ivory
    margin: '32px 0',
}

const footer = {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#9CA770',
    textAlign: 'center' as const,
    fontFamily: '"Inter", sans-serif',
}
