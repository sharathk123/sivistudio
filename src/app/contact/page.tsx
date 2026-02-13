'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import ChromaticWrapper from '@/components/ui/ChromaticWrapper'
import Footer from '@/components/ui/Footer'
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react'
import StickyHeader from '@/components/ui/StickyHeader'
import { IMAGES } from '@/lib/images'
import { faqItems } from '@/data/contactData'
import { SubmitButton } from '@/components/auth'
import { toast } from 'sonner'

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
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const validateField = (name: string, value: string) => {
        let error = ''
        if (name === 'email') {
            if (!value) error = 'Email is required'
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address'
        } else {
            if (!value) error = 'This field is required'
        }
        return error
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        const error = validateField(name, value)
        setErrors(prev => ({ ...prev, [name]: error }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user modifies field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const newErrors: Record<string, string> = {}
        Object.keys(formState).forEach(key => {
            const error = validateField(key, formState[key as keyof typeof formState])
            if (error) newErrors[key] = error
        })

        setErrors(newErrors)
        setTouched({
            name: true,
            email: true,
            subject: true,
            message: true
        })

        if (Object.keys(newErrors).length > 0) {
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setSubmitStatus('success')
            toast.success("Message sent! We'll get back to you shortly.")
            setFormState({ name: '', email: '', subject: '', message: '' })
            setTouched({})
            setErrors({})
        } catch (error) {
            console.error('Submission error:', error)
            setSubmitStatus('error')
            toast.error("Failed to send message. Please try again or email us directly.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="bg-bone">
            <StickyHeader />
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={IMAGES.contact}
                        alt="Sivi Studio Interior"
                        fill
                        priority
                        className="object-cover opacity-50"
                        sizes="100vw"
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
            <ChromaticWrapper startColor="var(--color-charcoal)" endColor="var(--color-bone)">
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
                                                Dilsukhnagar, Hyderabad - 500060<br />
                                                Telangana, India
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
                                                +91 91210 04481<br />
                                                sivihandloom@gmail.com
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

                                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs uppercase tracking-widest text-charcoal-400">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`input-boutique ${errors.name ? 'border-madder focus:border-madder' : ''}`}
                                                placeholder="Your name"
                                            />
                                            {errors.name && <FormError message={errors.name} />}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal-400">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`input-boutique ${errors.email ? 'border-madder focus:border-madder' : ''}`}
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && <FormError message={errors.email} />}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-xs uppercase tracking-widest text-charcoal-400">Subject</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formState.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`input-boutique cursor-pointer ${errors.subject ? 'border-madder focus:border-madder' : ''}`}
                                        >
                                            <option value="" disabled>Select a topic</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Custom Tailoring">Custom Tailoring</option>
                                            <option value="Order Status">Order Status</option>
                                            <option value="Collaboration">Collaboration</option>
                                        </select>
                                        {errors.subject && <FormError message={errors.subject} />}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs uppercase tracking-widest text-charcoal-400">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            value={formState.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`input-boutique ${errors.message ? 'border-madder focus:border-madder' : ''}`}
                                            placeholder="How can we help you?"
                                        />
                                        {errors.message && <FormError message={errors.message} />}
                                    </div>

                                    <SubmitButton
                                        loading={isSubmitting}
                                        loadingText="Sending..."
                                        disabled={submitStatus === 'success'}
                                        className={submitStatus === 'success' ? 'cursor-default opacity-80' : ''}
                                    >
                                        {submitStatus === 'success' ? (
                                            <span>Message Sent Successfully</span>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <Send size={18} />
                                                <span>Send Message</span>
                                            </div>
                                        )}
                                    </SubmitButton>
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
                        {faqItems.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function FormError({ message }: { message: string }) {
    return (
        <p className="mt-2 text-sm text-madder flex items-start gap-1.5">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{message}</span>
        </p>
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
