import { MessageSquare, CheckCircle, Ruler, Scissors, Truck } from 'lucide-react'
import { IMAGES } from '@/lib/images'

export const processSteps = [
    {
        title: 'Consultation',
        description: 'Discuss your vision, preferences, and occasion with our lead stylist.',
        icon: MessageSquare,
        delay: 0.1
    },
    {
        title: 'Fabric Selection',
        description: 'Choose from our curated collection of authentic handloom textiles.',
        icon: CheckCircle,
        delay: 0.2
    },
    {
        title: 'Design & Measure',
        description: 'We finalize the silhouette and take precise measurements for a perfect fit.',
        icon: Ruler,
        delay: 0.3
    },
    {
        title: 'Handcrafting',
        description: 'Our master tailors and artisans bring your garment to life.',
        icon: Scissors,
        delay: 0.4
    },
    {
        title: 'Delivery',
        description: 'Your bespoke outfit is delivered to your doorstep, ready to wear.',
        icon: Truck,
        delay: 0.5
    }
]

export const galleryImages = [
    {
        src: IMAGES.heritagePochampally,
        alt: 'Custom Pochampally Dress',
        label: 'Ikat Evening Gown'
    },
    {
        src: IMAGES.heritageKanjivaram,
        alt: 'Bespoke Kanjivaram',
        label: 'Silk Wedding Ensemble'
    },
    {
        src: IMAGES.customIkatTunic,
        alt: 'Contemporary Ikat',
        label: 'Modern Ikat Tunic'
    }
]
