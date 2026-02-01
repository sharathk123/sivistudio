import { createClient } from 'next-sanity'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2024-01-30'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

// --- Type Definitions ---

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

// --- GROQ Queries ---

// === COLLECTIONS ===
export const collectionsQuery = groq`*[_type == "collection" && status == "live"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  description,
  heroImage,
  editorialTagline,
  status,
  featured,
  displayOrder
}`

export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  heroImage,
  editorialTagline,
  longDescription,
  status,
  featured,
  "craftStories": craftStories[]->{
    _id,
    title,
    slug,
    category,
    excerpt,
    heroImage
  },
  "products": *[_type == "product" && references(^._id)] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    images,
    priceDisplay,
    price,
    availability,
    artisanHours
  }
}`

// === PRODUCTS ===
export const productsQuery = groq`*[_type == "product"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  description,
  images,
  priceDisplay,
  price,
  availability,
  "collections": collections[]->{title, slug},
  technicalSpecs,
  artisanHours,
  featured,
  displayOrder
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images,
  priceDisplay,
  price,
  availability,
  "collections": collections[]->{
    _id,
    title,
    slug,
    heroImage
  },
  materialStory,
  technicalSpecs,
  artisanHours,
  "craftStories": craftStories[]->{
    _id,
    title,
    slug,
    category,
    excerpt,
    heroImage
  }
}`

// === CRAFT STORIES ===
export const craftStoriesQuery = groq`*[_type == "craftStory"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  heroImage,
  excerpt,
  publishedAt,
  featured
}`

export const craftStoryBySlugQuery = groq`*[_type == "craftStory" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  heroImage,
  excerpt,
  body,
  publishedAt,
  "relatedCollections": relatedCollections[]->{
    _id,
    title,
    slug,
    heroImage
  },
  "relatedProducts": relatedProducts[]->{
    _id,
    title,
    slug,
    images,
    priceDisplay,
    price,
    availability
  }
}`

// === LEGACY: Editorial ===
export const editorialsQuery = groq`*[_type == "editorial"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt
}`

export const editorialBySlugQuery = groq`*[_type == "editorial" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    body,
    "featuredProducts": featuredProducts[]->{
        _id,
        title,
        slug,
        price,
        images
    }
}`

// --- Fetch Helper Functions ---

// === COLLECTIONS ===
export async function getCollections(): Promise<Collection[]> {
    return client.fetch(collectionsQuery)
}

export async function getCollection(slug: string): Promise<(Collection & { products: Product[] }) | null> {
    return client.fetch(collectionBySlugQuery, { slug })
}

// === PRODUCTS ===
export async function getProducts(): Promise<Product[]> {
    return client.fetch(productsQuery)
}

export async function getProduct(slug: string): Promise<Product | null> {
    return client.fetch(productBySlugQuery, { slug })
}

// === CRAFT STORIES ===
export async function getCraftStories(): Promise<CraftStory[]> {
    return client.fetch(craftStoriesQuery)
}

export async function getCraftStory(slug: string): Promise<CraftStory | null> {
    return client.fetch(craftStoryBySlugQuery, { slug })
}

// === LEGACY: Editorial ===
export async function getEditorials(): Promise<Editorial[]> {
    return client.fetch(editorialsQuery)
}

export async function getEditorial(slug: string): Promise<Editorial | null> {
    return client.fetch(editorialBySlugQuery, { slug })
}

// === DEPRECATED: Category (use Collection instead) ===
// Keeping for backward compatibility
export interface Category {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    image?: SanityImage
}

export const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title,
  slug,
  description,
  image
}`

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  "products": *[_type == "product" && references(^._id)] {
    _id,
    title,
    slug,
    price,
    images
  }
}`

export async function getCategories(): Promise<Category[]> {
    return client.fetch(categoriesQuery)
}

export async function getCategory(slug: string): Promise<(Category & { products: Product[] }) | null> {
    return client.fetch(categoryBySlugQuery, { slug })
}
