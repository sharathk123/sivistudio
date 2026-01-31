'use client'

import Footer from '@/components/ui/Footer'
import StickyHeader from '@/components/ui/StickyHeader'

export default function TermsOfServicePage() {
    return (
        <main className="bg-bone min-h-screen pt-28">
            <StickyHeader theme="light" />
            <div className="max-w-4xl mx-auto px-6 pb-24">
                <header className="mb-16 text-center">
                    <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-4">Legal</span>
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-6">Terms of Service</h1>
                    <p className="text-charcoal-400 text-sm">Last Updated: January 31, 2026</p>
                </header>

                <div className="prose prose-stone max-w-none text-charcoal-400 font-light">
                    <p className="mb-8">
                        Welcome to Sivi Studio. By accessing or using our website, you agree to be bound by these Terms of Service.
                        Please read them carefully before making a purchase.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">1. General Conditions</h3>
                    <p>
                        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content
                        (not including credit card information) may be transferred unencrypted and involve transmissions over various networks.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">2. Handloom Disclaimer</h3>
                    <p>
                        All our products are handcrafted by traditional artisans. Due to the handmade nature of our products,
                        minor variations in weave, texture, and color may occur. These are not defects but rather the signature of
                        authenticity that distinguishes a handloom product from a machine-made one.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">3. Accuracy of Information</h3>
                    <p>
                        We strive to display as accurately as possible the colors and images of our products. However, we cannot
                        guarantee that your computer monitor's display of any color will be accurate. We reserve the right to correct
                        any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">4. Pricing and Payment</h3>
                    <p>
                        Prices for our products are subject to change without notice. We reserve the right at any time to modify or
                        discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable
                        to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">5. Intellectual Property</h3>
                    <p>
                        All content included on this site, such as text, graphics, logos, images, and software, is the property of
                        Sivi Studio or its content suppliers and protected by international copyright laws.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">6. Governing Law</h3>
                    <p>
                        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and
                        construed in accordance with the laws of India.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
