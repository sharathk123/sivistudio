export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
    alt?: string
}

// === COLLECTION (v1) ===
export interface Collection {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    heroImage?: SanityImage
    editorialTagline?: string
    longDescription?: any[]
    status: 'upcoming' | 'live' | 'archive'
    featured: boolean
    displayOrder: number
    craftStories?: CraftStory[]
}

// === PRODUCT (v1) ===
export interface Product {
    _id: string
    title: string
    slug: { current: string }
    description: string
    images?: SanityImage[]
    priceDisplay: 'numeric' | 'on_request'
    price?: number
    availability: 'in_stock' | 'made_to_order' | 'sold_out'
    collections?: Collection[]
    materialStory?: any[]
    technicalSpecs?: { label: string; value: string }[]
    artisanHours?: number
    craftStories?: CraftStory[]
    featured: boolean
    displayOrder: number
}

// === CRAFT STORY (v1) ===
export interface CraftStory {
    _id: string
    title: string
    slug: { current: string }
    category: 'weaving' | 'heritage' | 'materials' | 'regional' | 'innovation'
    heroImage?: SanityImage
    excerpt: string
    body?: any[]
    publishedAt: string
    featured: boolean
    relatedCollections?: Collection[]
    relatedProducts?: Product[]
}

// === LEGACY: Editorial (Deprecated - use CraftStory) ===
export interface Editorial {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    mainImage?: SanityImage
    excerpt: string
    body?: any[]
}

// === DEPRECATED: Category (use Collection instead) ===
export interface Category {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    image?: SanityImage
}
