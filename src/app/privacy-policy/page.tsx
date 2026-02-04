'use client'

import Footer from '@/components/ui/Footer'
import StickyHeader from '@/components/ui/StickyHeader'

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-bone min-h-screen pt-28">
            <StickyHeader theme="light" />
            <div className="max-w-4xl mx-auto px-6 pb-24">
                <header className="mb-16 text-center">
                    <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-4">Legal</span>
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-6">Privacy Policy</h1>
                    <p className="text-charcoal-400 text-sm">Last Updated: January 31, 2026</p>
                </header>

                <div className="prose prose-stone max-w-none text-charcoal-400 font-light">
                    <p className="mb-8">
                        At Sivi Studio, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy outlines how we collect, use, disclosure, and safeguard your data when you visit our website
                        or purchase our handloom products.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">1. Information We Collect</h3>
                    <p>
                        We collect information that you strictly provide to us directly, such as when you create an account, make a purchase,
                        sign up for our newsletter, or contact our customer support. This may include your name, email address,
                        shipping address, payment information, and phone number.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">2. How We Use Your Information</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>To process and fulfill your orders, including sending order confirmations and shipping updates.</li>
                        <li>To communicate with you about your account, new collections, and exclusive offers (if you've opted in).</li>
                        <li>To improve our website functionality and customer service experience.</li>
                        <li>To detect and prevent potential fraud or unauthorized transactions.</li>
                    </ul>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">3. Sharing of Information</h3>
                    <p>
                        We respect your privacy and do not sell your personal information to third parties. We may share your data with
                        trusted third-party service providers who assist us in operating our website, conducting our business, or
                        servicing you (e.g., payment processors, shipping partners), so long as those parties agree to keep this
                        information confidential.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">4. Data Security</h3>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information. Your personal
                        information is contained behind secured networks and is only accessible by a limited number of persons who have
                        special access rights to such systems.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">5. Cookies</h3>
                    <p>
                        Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                        You can choose to turn off all cookies via your browser settings, though some features of our site may not
                        function properly.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">6. Contact Us</h3>
                    <p>
                        If you have any questions regarding this privacy policy, you may contact us at <a href="mailto:sivihandloom@gmail.com" className="text-sage hover:underline">sivihandloom@gmail.com</a>.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
