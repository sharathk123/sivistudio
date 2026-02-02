'use client'

import Footer from '@/components/ui/Footer'
import StickyHeader from '@/components/ui/StickyHeader'

export default function ShippingPolicyPage() {
    return (
        <main className="bg-bone min-h-screen pt-28">
            <StickyHeader theme="light" />
            <div className="max-w-4xl mx-auto px-6 pb-24">
                <header className="mb-16 text-center">
                    <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-4">Legal</span>
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-6">Shipping & Returns</h1>
                    <p className="text-charcoal-400 text-sm">Last Updated: January 31, 2026</p>
                </header>

                <div className="prose prose-stone max-w-none text-charcoal-400 font-light">
                    <p className="mb-8">
                        At Sivi Studio, we ensure that every piece reaches you in perfect condition. Please review our shipping
                        policies below to understand how we deliver your handloom treasures.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">1. Processing Time</h3>
                    <p>
                        Since many of our items are made-to-order or finished by hand, standard processing times are 3-5 business days.
                        For <strong>Custom Tailoring</strong> orders, please allow 2-3 weeks for crafting and quality checks before dispatch.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">2. Domestic Shipping (India)</h3>
                    <p>
                        We offer free shipping on all domestic orders above ₹5,000. standard delivery typically takes 5-7 business days
                        after dispatch, depending on your location. We partner with reliable courier services to ensure safe delivery.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">3. International Shipping</h3>
                    <p>
                        We ship globally. International shipping rates are calculated at checkout based on the weight and destination
                        of the package. Delivery times for international orders vary from 10-15 business days. Please note that customs
                        duties and taxes are the responsibility of the customer.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">4. Tracking Your Order</h3>
                    <p>
                        Once your order is shipped, you will receive a confirmation email with a tracking number. You can track your
                        package directly on our courier partner's website or through your Account Dashboard.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">5. Returns & Exchanges</h3>
                    <p>
                        We accept returns for unworn, unwashed items with tags intact within 7 days of delivery. Custom-tailored items
                        are non-refundable but can be altered for fit issues. To initiate a return, please contact us at support@sivithecouturier.com.
                    </p>

                    <h3 className="font-serif text-2xl text-charcoal italic mt-12 mb-4">6. Lost or Damaged Packages</h3>
                    <p>
                        In the rare event that your package is lost or damaged during transit, please contact us immediately. We will
                        work with the courier provider to resolve the issue and ensure you receive your order or a full refund.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
