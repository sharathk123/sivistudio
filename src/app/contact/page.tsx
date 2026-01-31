'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import ChromaticWrapper from '@/components/ui/ChromaticWrapper'
import Footer from '@/components/ui/Footer'
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react'

export default function ContactPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

    // Form State
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setSubmitStatus('success')
        setIsSubmitting(false)
        setFormState({ name: '', email: '', subject: '', message: '' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <main className="bg-bone">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/contact.png"
                        alt="Sivi Studio Interior"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="block text-sage text-xs uppercase tracking-[0.3em] mb-8"
                    >
                        We'd Love to Hear From You
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] text-bone italic"
                    >
                        Get in <span className="text-sage-100">Touch</span>
                    </motion.h1>
                </div>
            </section>

            {/* Contact Section */}
            <ChromaticWrapper startColor="#1A1A1A" endColor="#FDFCFB">
                <section className="py-24 md:py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                            {/* Contact Info (Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="font-serif text-4xl md:text-5xl text-charcoal italic mb-8">
                                        Visit the Atelier
                                    </h2>
                                    <div className="w-24 h-1 bg-sage mb-8" />
                                    <p className="text-charcoal-400 text-lg leading-relaxed font-light mb-12">
                                        Experience our collections in person. Feel the texture of handspun cotton,
                                        witness the luster of pure silk, and let our stylists guide you to your perfect fit.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-start space-x-6">
                                        <div className="p-3 bg-ivory-100 rounded-sm text-sage">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-charcoal italic mb-2">Address</h3>
                                            <p className="text-charcoal-400 leading-relaxed font-light">
                                                Plot 45, Jubilee Hills, Road No. 10<br />
                                                Hyderabad, Telangana 500033<br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6">
                                        <div className="p-3 bg-ivory-100 rounded-sm text-sage">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-charcoal italic mb-2">Hours</h3>
                                            <p className="text-charcoal-400 leading-relaxed font-light">
                                                Monday – Saturday: 10:30 AM – 7:30 PM<br />
                                                Sunday: By Appointment Only
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6">
                                        <div className="p-3 bg-ivory-100 rounded-sm text-sage">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-charcoal italic mb-2">Contact</h3>
                                            <p className="text-charcoal-400 leading-relaxed font-light">
                                                +91 98765 43210<br />
                                                hello@sivistudio.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form (Right) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-ivory-200"
                            >
                                <h3 className="font-serif text-3xl text-charcoal italic mb-8">
                                    Send a Message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs uppercase tracking-widest text-charcoal-400">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formState.name}
                                                onChange={handleChange}
                                                className="w-full bg-ivory-100 border-none p-4 text-charcoal focus:ring-1 focus:ring-sage placeholder:text-gray-400 font-light"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal-400">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full bg-ivory-100 border-none p-4 text-charcoal focus:ring-1 focus:ring-sage placeholder:text-gray-400 font-light"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-xs uppercase tracking-widest text-charcoal-400">Subject</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formState.subject}
                                            onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                                            className="w-full bg-ivory-100 border-none p-4 text-charcoal focus:ring-1 focus:ring-sage font-light cursor-pointer"
                                        >
                                            <option value="" disabled>Select a topic</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Custom Tailoring">Custom Tailoring</option>
                                            <option value="Order Status">Order Status</option>
                                            <option value="Collaboration">Collaboration</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs uppercase tracking-widest text-charcoal-400">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={handleChange}
                                            className="w-full bg-ivory-100 border-none p-4 text-charcoal focus:ring-1 focus:ring-sage placeholder:text-gray-400 font-light resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || submitStatus === 'success'}
                                        className={`w-full py-4 px-8 flex items-center justify-center space-x-3 transition-all duration-300 ${submitStatus === 'success'
                                                ? 'bg-sage text-white cursor-default'
                                                : 'bg-charcoal text-white hover:bg-sage'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="animate-pulse">Sending...</span>
                                        ) : submitStatus === 'success' ? (
                                            <span>Message Sent Successfully</span>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </ChromaticWrapper>

            {/* FAQ Section */}
            <section className="bg-bone pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">
                            Common Questions
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal italic mt-4">
                            Frequently Asked
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <FAQItem
                            question="Do you ship internationally?"
                            answer="Yes, we ship worldwide. International shipping typically takes 7-14 business days depending on the destination. Shipping costs are calculated at checkout."
                        />
                        <FAQItem
                            question="How do I care for my handloom garments?"
                            answer="Most of our handloom pieces, especially silk and Jamdani, should be dry cleaned only to maintain their texture and longevity. Cotton handlooms can be gently hand-washed in cold water with mild detergent."
                        />
                        <FAQItem
                            question="Can I customize the fit of a dress?"
                            answer="Absolutely. We offer custom tailoring services. You can select 'Custom Size' on the product page or visit our Custom Tailoring page to book a consultation."
                        />
                        <FAQItem
                            question="What is your return policy?"
                            answer="We accept returns for unworn items with tags attached within 14 days of delivery. Custom-made items are final sale but we offer alteration services if the fit isn't perfect."
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-charcoal/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="font-serif text-xl text-charcoal group-hover:text-sage transition-colors duration-300">
                    {question}
                </span>
                <span className={`transform transition-transform duration-300 text-sage ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-charcoal-400 font-light leading-relaxed">
                    {answer}
                </p>
            </motion.div>
        </div>
    )
}
