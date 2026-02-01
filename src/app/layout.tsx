import type { Metadata } from 'next'
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
  title: 'Sivi the Couturière | Handloom Heritage & Custom Tailoring',
  description: 'Premium Hyderabad-based couturier specializing in handloom heritage, conscious craft, and bespoke tailoring. Discover authentic Indian textiles.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sivi the Couturier',
    description: 'Handloom Heritage & Custom Tailoring',
    images: ['https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi-studio/hero-ikat'],
  },
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
      <body className="font-sans antialiased bg-bone text-charcoal" suppressHydrationWarning>
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
