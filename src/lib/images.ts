/**
 * Cloudinary Configuration & Image Assets
 * All images are delivered via Cloudinary CDN with automatic optimization (f_auto, q_auto).
 */

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dj3a6c22e/image/upload'
const CLOUDINARY_FOLDER = 'sivi-studio'
const CLOUDINARY_TRANSFORMS = 'f_auto,q_auto'

/**
 * Generates a full Cloudinary URL for a given image asset.
 * @param path The local path or filename of the image (e.g., '/images/hero.png' or 'hero')
 * @returns A fully qualified Cloudinary URL with transformations applied.
 */
function cloudinaryUrl(path: string): string {
    // Clean the path to get just the filename without extension
    const filename = path
        .split('/')
        .pop()?.replace(/\.[^/.]+$/, '') || path

    return `${CLOUDINARY_BASE}/${CLOUDINARY_TRANSFORMS}/${CLOUDINARY_FOLDER}/${filename}`
}

/**
 * Global Image Registry
 * Use these constants throughout the application to ensure consistent image delivery.
 */
export const IMAGES = {
    // --- Hero & Landing ---
    heroIkat: cloudinaryUrl('hero-ikat'),
    heroModernVibrant: cloudinaryUrl('hero-modern-vibrant'),
    pochampally: cloudinaryUrl('pochampally-ikat-modern'),
    kurtaMannequin: cloudinaryUrl('kurta-mannequin'),
    layeredOutfit: cloudinaryUrl('layered-outfit-mannequin'),

    // --- Heritage Collection ---
    heritagePochampally: cloudinaryUrl('heritage-pochampally-dress'),
    heritageJamdani: cloudinaryUrl('heritage-jamdani-saree'),
    heritageSambalpuri: cloudinaryUrl('heritage-sambalpuri-outfit'),
    heritageKanjivaram: cloudinaryUrl('heritage-kanjivaram-dress'),
    heritageGadwal: cloudinaryUrl('saree'),
    heritageUppada: cloudinaryUrl('heritage-uppada-jamdani-new'),
    heritageUppadaDress: cloudinaryUrl('heritage-uppada-dress'),
    heritageNarayanpet: cloudinaryUrl('heritage-narayanpet-modern'),
    heritageGollabama: cloudinaryUrl('heritage-gollabama-modern'),
    heritageHeroTextiles: cloudinaryUrl('heritage-hero-textiles'),

    // --- Story & Narrative ---
    storyHeroThreads: cloudinaryUrl('story-hero-threads'),
    storyOrigins: cloudinaryUrl('story-origins-workshop'),
    storyJamdani: cloudinaryUrl('story-jamdani-dress'),
    storyKanjivaram: cloudinaryUrl('story-kanjivaram-outfit'),

    // --- Custom Tailoring ---
    customTailoring: cloudinaryUrl('custom-tailoring'),
    customIkatTunic: cloudinaryUrl('custom-ikat-tunic-modern'),

    // --- Studio & Editorial ---
    collectionStudio: cloudinaryUrl('collection-studio'),
    contemporaryDress: cloudinaryUrl('contemporary-dress-studio'),
    sareeEditorial: cloudinaryUrl('saree-editorial'),
    ikatFabricCloseup: cloudinaryUrl('ikat-fabric-closeup'),

    // --- Functional Pages ---
    account: cloudinaryUrl('account'),
    contact: cloudinaryUrl('contact'),

    // --- Modern & Hybrid Designs ---
    modernIkatWrap: cloudinaryUrl('modern-ikat-dress-floating'),
    modernLayeredSilk: cloudinaryUrl('layered-outfit-modern-colors'),
    contemporaryMidi: cloudinaryUrl('handloom-dress-terracotta-indigo'),
    modernContemporaryMaxi: cloudinaryUrl('modern-handloom-dress-full'),
    hybridCollection: cloudinaryUrl('handloom-collection-floating'),
    banarasiDupatta: cloudinaryUrl('dupatta'),
    chanderiKurta: cloudinaryUrl('kurta'),

    // --- Regional Specifics ---
    rajasthanBandhani: cloudinaryUrl('rajasthan-bandhani-saree'),
    gujaratPatola: cloudinaryUrl('gujarat-patola-saree'),
    maharashtraPaithani: cloudinaryUrl('maharashtra-paithani-saree'),
    assamMuga: cloudinaryUrl('assam-muga-silk-saree'),
    keralaKasavu: cloudinaryUrl('kerala-kasavu-modern'),
    kashmirPashmina: cloudinaryUrl('kashmir-pashmina-shawl'),

    // --- Modern Fusion ---
    denimIkatJacket: cloudinaryUrl('denim-ikat-fusion-jacket'),
    sustainableCotton: cloudinaryUrl('sustainable-organic-cotton-dress'),

    // --- Additional State Handlooms ---
    odishaBomkai: cloudinaryUrl('odisha-bomkai-saree'),
    tamilChettinad: cloudinaryUrl('tamil-chettinad-saree'),
    bengalBaluchari: cloudinaryUrl('bengal-baluchari-saree'),
    karnatakaIlkal: cloudinaryUrl('karnataka-ilkal-saree'),
    andhraMangalagiri: cloudinaryUrl('andhra-mangalagiri-dress'),
    punjabPhulkari: cloudinaryUrl('punjab-phulkari-kurta'),
} as const

export type ImageKey = keyof typeof IMAGES
export type ImageUrl = typeof IMAGES[ImageKey]
