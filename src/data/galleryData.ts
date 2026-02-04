import { IMAGES } from '@/lib/images'

export type GalleryCategory = 'All' | 'Editorial' | 'Heritage' | 'Studio' | 'Details'

export interface GalleryItem {
    id: string
    src: string
    alt: string
    category: GalleryCategory
    aspectRatio: 'portrait' | 'landscape' | 'square'
    caption?: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
    // Editorial
    { id: '1', src: IMAGES.heroIkat, alt: 'Pochampally Ikat', category: 'Editorial', aspectRatio: 'portrait', caption: 'Pochampally Ikat - Hyderabad' },
    { id: '2', src: IMAGES.sareeEditorial, alt: 'Editorial Saree', category: 'Editorial', aspectRatio: 'landscape', caption: 'Editorial Series - 2026' },
    { id: '3', src: IMAGES.heroModernVibrant, alt: 'Vibrant Modern', category: 'Editorial', aspectRatio: 'portrait', caption: 'Modern Vibrant - Studio' },

    // Heritage
    { id: '4', src: IMAGES.heritagePochampally, alt: 'Heritage Pochampally', category: 'Heritage', aspectRatio: 'portrait', caption: 'Heritage Collection - Pochampally' },
    { id: '5', src: IMAGES.heritageJamdani, alt: 'Heritage Jamdani', category: 'Heritage', aspectRatio: 'portrait', caption: 'Jamdani Weaves - Bengal' },
    { id: '6', src: IMAGES.heritageSambalpuri, alt: 'Heritage Sambalpuri', category: 'Heritage', aspectRatio: 'portrait', caption: 'Sambalpuri Ikat - Odisha' },
    { id: '7', src: IMAGES.heritageKanjivaram, alt: 'Heritage Kanjivaram', category: 'Heritage', aspectRatio: 'square', caption: 'Kanjivaram Silk - Tamil Nadu' },

    // Studio
    { id: '8', src: IMAGES.contemporaryDress, alt: 'Contemporary Dress', category: 'Studio', aspectRatio: 'portrait', caption: 'Contemporary Cuts' },
    { id: '9', src: IMAGES.collectionStudio, alt: 'Studio Collection', category: 'Studio', aspectRatio: 'landscape', caption: 'Studio Session' },
    { id: '10', src: IMAGES.customIkatTunic, alt: 'Ikat Tunic', category: 'Studio', aspectRatio: 'portrait', caption: 'Custom Ikat Tunic' },

    // Details
    { id: '11', src: IMAGES.ikatFabricCloseup, alt: 'Ikat Detail', category: 'Details', aspectRatio: 'square', caption: 'Weave Detail - Macro' },
    { id: '12', src: IMAGES.modernLayeredSilk, alt: 'Layered Silk', category: 'Details', aspectRatio: 'portrait', caption: 'Layered Silk Textures' },
    { id: '13', src: IMAGES.modernIkatWrap, alt: 'Ikat Wrap', category: 'Details', aspectRatio: 'portrait', caption: 'Drape & Form' },
]
