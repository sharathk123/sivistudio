import { weaves } from './heritageData'
import { IMAGES } from '@/lib/images'

export interface MarqueeItem {
    name: string
    image: string
    category: string
}

// Regional Editions (Prioritized for visibility)
const regionalEditions: MarqueeItem[] = [
    { name: 'Bandhani Saree', image: IMAGES.rajasthanBandhani, category: 'Rajasthan' },
    { name: 'Patola Silk', image: IMAGES.gujaratPatola, category: 'Gujarat' },
    { name: 'Paithani Silk', image: IMAGES.maharashtraPaithani, category: 'Maharashtra' },
    { name: 'Muga Silk', image: IMAGES.assamMuga, category: 'Assam' },
    { name: 'Pashmina Shawl', image: IMAGES.kashmirPashmina, category: 'Kashmir' },
    { name: 'Kasavu Modern', image: IMAGES.keralaKasavu, category: 'Kerala' },
    { name: 'Phulkari Kurta', image: IMAGES.punjabPhulkari, category: 'Punjab' },
    { name: 'Bomkai Saree', image: IMAGES.odishaBomkai, category: 'Odisha' },
    { name: 'Baluchari Silk', image: IMAGES.bengalBaluchari, category: 'West Bengal' },
    { name: 'Ilkal Saree', image: IMAGES.karnatakaIlkal, category: 'Karnataka' },
    { name: 'Mangalagiri Dress', image: IMAGES.andhraMangalagiri, category: 'Andhra Pradesh' },
]

// Modern & Fusion Highlight
const fusionHighlights: MarqueeItem[] = [
    { name: 'Hybrid Ikat Wrap', image: IMAGES.modernIkatWrap, category: 'Modern' },
    { name: 'Ikat Fusion Jacket', image: IMAGES.denimIkatJacket, category: 'Modern Fusion' },
    { name: 'Terracotta Midi', image: IMAGES.contemporaryMidi, category: 'Contemporary' },
    { name: 'Layered Silk', image: IMAGES.modernLayeredSilk, category: 'Neo-Trad' },
]

// Base Heritage Weaves from heritageData
const heritageWeaves: MarqueeItem[] = weaves.map(w => ({
    name: w.name,
    image: w.image,
    category: w.region
}))

// Combine with interleave-style logic for better visual variety
const rawItems: MarqueeItem[] = [
    ...regionalEditions,
    ...heritageWeaves,
    ...fusionHighlights,
    { name: 'Banarasi Zari', image: IMAGES.banarasiDupatta, category: 'Uttar Pradesh' },
    { name: 'Chanderi Silk', image: IMAGES.chanderiKurta, category: 'Madhya Pradesh' },
    { name: 'Contemporary Maxi', image: IMAGES.modernContemporaryMaxi, category: 'Hybrid' },
    { name: 'Handloom Collection', image: IMAGES.hybridCollection, category: 'Collection' },
    { name: 'Studio Collection', image: IMAGES.collectionStudio, category: 'Studio' },
    { name: 'Contemporary Dress', image: IMAGES.contemporaryDress, category: 'Editorial' },
    { name: 'Saree Editorial', image: IMAGES.sareeEditorial, category: 'Editorial' },
    { name: 'Ikat Fabric', image: IMAGES.ikatFabricCloseup, category: 'Textile' },
    { name: 'Custom Tailoring', image: IMAGES.customTailoring, category: 'Bespoke' },
    { name: 'Ikat Tunic', image: IMAGES.customIkatTunic, category: 'Custom' },
    { name: 'Hero Ikat', image: IMAGES.heroIkat, category: 'Signature' },
    { name: 'Kurta Ensemble', image: IMAGES.kurtaMannequin, category: 'Menswear' },
    { name: 'Layered Outfit', image: IMAGES.layeredOutfit, category: 'Layering' },
    { name: 'Heritage Threads', image: IMAGES.storyHeroThreads, category: 'Story' },
    { name: 'Artisan Workshop', image: IMAGES.storyOrigins, category: 'Origins' },
    { name: 'Heritage Textiles', image: IMAGES.heritageHeroTextiles, category: 'Heritage' },
]

// Final deduplicated list (safety check)
export const marqueeItems: MarqueeItem[] = rawItems.filter((item, index, self) =>
    index === self.findIndex(t => t.name === item.name)
)
