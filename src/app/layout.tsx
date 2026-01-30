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
  title: 'Sivi Studio | Quiet Luxury & Conscious Craft',
  description: 'Premium Hyderabad-based fashion studio focused on Quiet Luxury, conscious craft, and custom tailoring for all age groups.',
}

import SmoothScroll from '@/components/ui/SmoothScroll'
import Loader from '@/components/ui/Loader'

import StickyHeader from '@/components/ui/StickyHeader'
import BoutiqueButton from '@/components/ui/BoutiqueButton'
import StyleConciergeButton from '@/components/ai/StyleConciergeButton'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/shop/CartDrawer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-bone text-charcoal" suppressHydrationWarning>
        <CartProvider>
          <StickyHeader />
          <CartDrawer />
          <BoutiqueButton />
          <StyleConciergeButton />
          <Loader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  )
}
