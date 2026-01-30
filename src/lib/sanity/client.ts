import { createClient } from 'next-sanity'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

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

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}

// --- Type Definitions (Basic) ---

export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
}

export interface Product {
    _id: string
    title: string
    slug: { current: string }
    price: number
    description: string
    images?: SanityImage[]
    categories?: { title: string; slug: { current: string } }[]
    materialStory?: any[]
    technicalSpecs?: { label: string; value: string }[]
}

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

export const productsQuery = groq`*[_type == "product"] {
  _id,
  title,
  slug,
  price,
  description,
  images,
  "categories": categories[]->{title, slug},
  materialStory,
  technicalSpecs
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  price,
  description,
  images,
  "categories": categories[]->{title, slug},
  materialStory,
  technicalSpecs
}`

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

export async function getProducts(): Promise<Product[]> {
    return client.fetch(productsQuery)
}

export async function getProduct(slug: string): Promise<Product | null> {
    return client.fetch(productBySlugQuery, { slug })
}

export async function getEditorials(): Promise<Editorial[]> {
    return client.fetch(editorialsQuery)
}

export async function getEditorial(slug: string): Promise<Editorial | null> {
    return client.fetch(editorialBySlugQuery, { slug })
}
