import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, Inter, Bodoni_Moda, Allura } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
})

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sivithecouturier.com'),
  title: {
    default: 'Sivi the Couturière | Handloom Heritage & Custom Tailoring',
    template: '%s | Sivi the Couturier'
  },
  description: 'Premium Hyderabad-based couturier specializing in handloom heritage, conscious craft, and bespoke tailoring. Discover authentic Indian textiles transformed into contemporary silhouettes.',
  keywords: ['Handloom', 'Ikat', 'Indian Fashion', 'Custom Tailoring', 'Hyderabad Couturier', 'Sustainable Fashion', 'Pochampally', 'Bespoke Saree'],
  authors: [{ name: 'Sivi the Couturier' }],
  creator: 'Sivi the Couturier',
  publisher: 'Sivi the Couturier',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sivithecouturier.com',
    siteName: 'Sivi the Couturier',
    title: 'Sivi the Couturière | Handloom Heritage & Custom Tailoring',
    description: 'Bespoke tailoring and authentic Indian handlooms reimagined for the modern conscious woman.',
    images: [
      {
        url: 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi-studio/hero-ikat',
        width: 1200,
        height: 630,
        alt: 'Sivi the Couturier Handloom Heritage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sivi the Couturière',
    description: 'Handloom Heritage & Custom Tailoring',
    images: ['https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi-studio/hero-ikat'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Organization Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sivi the Couturier',
  url: 'https://sivithecouturier.com',
  logo: 'https://sivithecouturier.com/logo.png',
  description: 'Premium Hyderabad-based couturier specializing in handloom heritage and bespoke tailoring.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'India'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX',
    contactType: 'customer service'
  },
  sameAs: [
    'https://instagram.com/sivithecouturier',
    'https://facebook.com/sivithecouturier'
  ]
}

import SmoothScroll from '@/components/ui/SmoothScroll'
import Loader from '@/components/ui/Loader'

import BoutiqueButton from '@/components/ui/BoutiqueButton'
import StyleConciergeButton from '@/components/ai/StyleConciergeButton'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import CartDrawer from '@/components/cart/CartDrawer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${bodoni.variable} ${allura.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-bone text-charcoal" suppressHydrationWarning>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        {/* Skip to main content link for keyboard users */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        <AuthProvider>
          <CartProvider>
            <CartDrawer />
            <BoutiqueButton />
            <StyleConciergeButton />
            <Loader />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
