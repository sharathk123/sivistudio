import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Sivi the Couturier | Handloom Heritage & Custom Tailoring',
  description: 'Premium Hyderabad-based couturier specializing in handloom heritage, conscious craft, and bespoke tailoring. Discover authentic Indian textiles.',
  icons: {
    icon: 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi-studio/hero-ikat',
    apple: 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi-studio/hero-ikat',
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
import CartDrawer from '@/components/shop/CartDrawer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-bone text-charcoal" suppressHydrationWarning>
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
