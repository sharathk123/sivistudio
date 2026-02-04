
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
    Row,
    Column,
} from '@react-email/components'
import * as React from 'react'

interface ContactFormEmailProps {
    name: string
    email: string
    subject: string
    message: string
}

export const ContactFormEmail = ({
    name,
    email,
    subject,
    message,
}: ContactFormEmailProps) => {
    return (
        <Html>
            <Head>
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
            <Preview>New Inquiry from Sivi Studio Contact Form</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Inquiry Received</Heading>

                    <Text style={text}>
                        You have received a new message from the contact form.
                    </Text>

                    <Section style={infoContainer}>
                        <Row style={row}>
                            <Column style={labelCol}>From:</Column>
                            <Column style={valueCol}>
                                <Text style={value}>{name}</Text>
                                <Text style={subValue}>{email}</Text>
                            </Column>
                        </Row>
                        <Hr style={hr} />
                        <Row style={row}>
                            <Column style={labelCol}>Subject:</Column>
                            <Column style={valueCol}>
                                <Text style={value}>{subject}</Text>
                            </Column>
                        </Row>
                        <Hr style={hr} />
                        <Row style={row}>
                            <Column style={labelCol}>Message:</Column>
                        </Row>
                        <Text style={messageText}>
                            {message}
                        </Text>
                    </Section>

                    <Text style={footer}>
                        Sent from Sivi Studio Website
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default ContactFormEmail

const main = {
    backgroundColor: '#F5F5F5',
    fontFamily: '"Inter", sans-serif',
}

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    border: '1px solid #E4E4DE',
}

const h1 = {
    color: '#1A1A1A',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 24px',
}

const text = {
    fontSize: '16px',
    color: '#4B5563',
    marginBottom: '24px',
}

const infoContainer = {
    padding: '24px',
    backgroundColor: '#F9F9F8',
    borderRadius: '4px',
}

const row = {
    marginBottom: '12px',
}

const labelCol = {
    width: '30%',
    verticalAlign: 'top',
    color: '#9CA770', // Sage
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
}

const valueCol = {
    width: '70%',
}

const value = {
    fontSize: '16px',
    color: '#1A1A1A',
    margin: 0,
    fontWeight: '500',
}

const subValue = {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
}

const messageText = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#1A1A1A',
    whiteSpace: 'pre-wrap' as const,
    marginTop: '12px',
}

const hr = {
    borderColor: '#E4E4DE',
    margin: '12px 0',
}

const footer = {
    fontSize: '12px',
    color: '#9CA770',
    marginTop: '24px',
    textAlign: 'center' as const,
}
