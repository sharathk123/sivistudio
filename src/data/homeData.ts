import { IMAGES } from '@/lib/images'

export const collectionItems = [
    {
        id: '1',
        src: IMAGES.pochampally,
        alt: 'Pochampally Ikat Saree - Editorial',
        aspectRatio: 'portrait' as const,
        label: 'Pochampally Ikat Saree'
    },
    {
        id: '2',
        src: IMAGES.kurtaMannequin,
        alt: 'Contemporary Handwoven Cotton Kurta',
        aspectRatio: 'square' as const,
        label: 'Handwoven Cotton Kurta',
        colSpan: 1 as const
    },
    {
        id: '3',
        src: IMAGES.layeredOutfit,
        alt: 'Modern Layered Handloom Outfit',
        aspectRatio: 'landscape' as const,
        label: 'Layered Handloom Ensemble',
        colSpan: 2 as const
    },
    {
        id: '4',
        src: IMAGES.heroIkat,
        alt: 'Asymmetric Ikat Wrap Dress',
        aspectRatio: 'portrait' as const,
        label: 'Contemporary Ikat Dress'
    }
]
