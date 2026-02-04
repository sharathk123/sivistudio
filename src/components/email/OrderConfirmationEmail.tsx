import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Hr,
    Font,
    Row,
    Column,
} from '@react-email/components'
import * as React from 'react'

interface OrderItem {
    name: string
    quantity: number
    price: number
    image?: string
}

interface OrderConfirmationEmailProps {
    orderId: string
    customerName: string
    items: OrderItem[]
    totalAmount: number
    shippingAddress: string
}

export const OrderConfirmationEmail = ({
    orderId,
    customerName,
    items,
    totalAmount,
    shippingAddress,
}: OrderConfirmationEmailProps) => {
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
            <Preview>Your Sivi Atelier order #{orderId} is confirmed.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Sivi the Couturière</Heading>

                    <Text style={heroText}>
                        Thank you for your patronage, {customerName}.
                    </Text>

                    <Text style={text}>
                        Your order has been gratefully received and is being prepared with care. We will notify you once your bespoke pieces are ready for dispatch.
                    </Text>

                    <Section style={orderInfo}>
                        <Text style={orderIdText}>Order #{orderId}</Text>
                        <Hr style={hr} />

                        {items.map((item, index) => (
                            <Row key={index} style={itemRow}>
                                <Column style={{ width: '70%' }}>
                                    <Text style={itemName}>
                                        {item.name} x {item.quantity}
                                    </Text>
                                </Column>
                                <Column style={{ width: '30%', textAlign: 'right' }}>
                                    <Text style={itemPrice}>
                                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                    </Text>
                                </Column>
                            </Row>
                        ))}

                        <Hr style={hr} />

                        <Row>
                            <Column style={{ width: '70%' }}>
                                <Text style={totalLabel}>Total</Text>
                            </Column>
                            <Column style={{ width: '30%', textAlign: 'right' }}>
                                <Text style={totalPrice}>
                                    ₹{totalAmount.toLocaleString('en-IN')}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={addressContainer}>
                        <Heading as="h3" style={h3}>Shipping To</Heading>
                        <Text style={addressText}>
                            {shippingAddress}
                        </Text>
                    </Section>

                    <Section style={btnContainer}>
                        <Link style={button} href={`https://sivithecouturier.com/account/orders/${orderId}`}>
                            View Order Details
                        </Link>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        For any inquiries, please reply to this email or contact our concierge at studio@sivithecouturier.com.
                        <br /><br />
                        Hyderabad, India
                        <br />
                        © {new Date().getFullYear()} Sivi Studio. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default OrderConfirmationEmail

// Styles
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

const h3 = {
    color: '#1A1A1A',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px',
    fontFamily: '"Inter", sans-serif',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
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

const orderInfo = {
    marginTop: '32px',
    marginBottom: '32px',
}

const orderIdText = {
    fontSize: '14px',
    color: '#9CA770',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '8px',
    fontFamily: '"Inter", sans-serif',
}

const itemRow = {
    marginBottom: '8px',
}

const itemName = {
    fontSize: '16px',
    color: '#1A1A1A',
    fontFamily: '"Inter", sans-serif',
    margin: 0,
}

const itemPrice = {
    fontSize: '16px',
    color: '#4B5563',
    fontFamily: '"Inter", sans-serif',
    margin: 0,
}

const totalLabel = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: '"Playfair Display", serif',
    margin: 0,
}

const totalPrice = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#9CA770',
    fontFamily: '"Inter", sans-serif',
    margin: 0,
}

const addressContainer = {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#F9F9F8', // Lighter Bone
    border: '1px solid #E4E4DE',
}

const addressText = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4B5563',
    fontFamily: '"Inter", sans-serif',
    margin: 0,
    whiteSpace: 'pre-line' as const,
}

const btnContainer = {
    textAlign: 'center' as const,
    marginBottom: '32px',
}

const button = {
    backgroundColor: '#9CA770', // Sage
    borderRadius: '2px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '12px 24px',
    display: 'inline-block',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
}

const hr = {
    borderColor: '#E4E4DE', // Ivory
    margin: '16px 0',
}

const footer = {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#9CA770',
    textAlign: 'center' as const,
    fontFamily: '"Inter", sans-serif',
}
