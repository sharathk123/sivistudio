import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import * as Queries from './queries'
import * as Types from './types'

// Re-export types for backward compatibility or ease of use
export * from './types'
export * from './queries'

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
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// --- Fetch Helper Functions ---

// === COLLECTIONS ===
export async function getCollections(): Promise<Types.Collection[]> {
  return client.fetch(Queries.collectionsQuery)
}

export async function getCollection(slug: string): Promise<(Types.Collection & { products: Types.Product[] }) | null> {
  return client.fetch(Queries.collectionBySlugQuery, { slug })
}

// === PRODUCTS ===
export async function getProducts(): Promise<Types.Product[]> {
  return client.fetch(Queries.productsQuery)
}

export async function getProduct(slug: string): Promise<Types.Product | null> {
  return client.fetch(Queries.productBySlugQuery, { slug })
}

// === CRAFT STORIES ===
export async function getCraftStories(): Promise<Types.CraftStory[]> {
  return client.fetch(Queries.craftStoriesQuery)
}

export async function getCraftStory(slug: string): Promise<Types.CraftStory | null> {
  return client.fetch(Queries.craftStoryBySlugQuery, { slug })
}

// === DEPRECATED: Category ===
export async function getCategories(): Promise<Types.Category[]> {
  return client.fetch(Queries.categoriesQuery)
}

export async function getCategory(slug: string): Promise<(Types.Category & { products: Types.Product[] }) | null> {
  return client.fetch(Queries.categoryBySlugQuery, { slug })
}
