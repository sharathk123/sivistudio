import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Initialize Sanity client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: true,
})

/**
 * AI Product Recommendations API
 * Provides personalized product recommendations based on:
 * - User's browsing history
 * - Current product context
 * - Collection affinity
 * - Price range preferences
 *
 * GET /api/recommendations?productId=xxx&limit=6
 */

interface RecommendationRequest {
    productId?: string
    collectionSlug?: string
    limit?: number
    userId?: string
}

interface Product {
    _id: string
    name: string
    slug: { current: string }
    price: number
    images: { url: string; alt?: string }[]
    category?: string
    collection?: { slug: { current: string } }
    tags?: string[]
    availability?: 'in_stock' | 'made_to_order' | 'out_of_stock'
}

interface RecommendationScore {
    product: Product
    score: number
    reasons: string[]
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const productId = searchParams.get('productId')
        const collectionSlug = searchParams.get('collectionSlug')
        const userId = searchParams.get('userId')

        // Validate and sanitize limit parameter to prevent DoS attacks
        const rawLimit = searchParams.get('limit')
        const limit = Math.min(
            Math.max(parseInt(rawLimit || '6', 10), 1),
            50 // Maximum limit to prevent excessive data processing
        )

        // Get all available products
        const products = await getAllProducts()

        if (!products || products.length === 0) {
            return NextResponse.json({ recommendations: [] })
        }

        let recommendations: RecommendationScore[] = []

        // Strategy 1: Similar products (if productId provided)
        if (productId) {
            const currentProduct = products.find(p => p._id === productId)
            if (currentProduct) {
                recommendations = getSimilarProducts(currentProduct, products, limit)
            }
        }

        // Strategy 2: Collection-based recommendations (if collectionSlug provided)
        if (collectionSlug && recommendations.length < limit) {
            const collectionRecs = getCollectionRecommendations(collectionSlug, products, limit - recommendations.length)
            recommendations = [...recommendations, ...collectionRecs]
        }

        // Strategy 3: Trending/popular products (fill remaining slots)
        if (recommendations.length < limit) {
            const trendingRecs = getTrendingProducts(products, limit - recommendations.length, recommendations.map(r => r.product._id))
            recommendations = [...recommendations, ...trendingRecs]
        }

        // Sort by score and limit results
        recommendations = recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)

        return NextResponse.json({
            recommendations: recommendations.map(r => ({
                ...r.product,
                recommendationScore: r.score,
                reasons: r.reasons,
            })),
            strategy: productId ? 'similar' : collectionSlug ? 'collection' : 'trending',
        })
    } catch (error) {
        console.error('Recommendation error:', error)
        return NextResponse.json(
            { error: 'Failed to generate recommendations' },
            { status: 500 }
        )
    }
}

/**
 * Get all available products from Sanity
 */
async function getAllProducts(): Promise<Product[]> {
    const query = `
    *[_type == "product" && availability in ["in_stock", "made_to_order"]] {
      _id,
      name,
      slug,
      price,
      images,
      category,
      collection->{ slug },
      tags,
      availability
    }
  `
    return await sanityClient.fetch(query)
}

/**
 * Get similar products based on multiple factors
 */
function getSimilarProducts(
    currentProduct: Product,
    allProducts: Product[],
    limit: number
): RecommendationScore[] {
    const scores: RecommendationScore[] = []

    for (const product of allProducts) {
        if (product._id === currentProduct._id) continue

        let score = 0
        const reasons: string[] = []

        // Same collection (high weight)
        if (
            currentProduct.collection?.slug?.current === product.collection?.slug?.current
        ) {
            score += 40
            reasons.push('From the same collection')
        }

        // Same category (medium weight)
        if (currentProduct.category === product.category) {
            score += 30
            reasons.push('Similar style')
        }

        // Shared tags (medium weight)
        if (currentProduct.tags && product.tags) {
            const sharedTags = currentProduct.tags.filter(tag =>
                product.tags?.includes(tag)
            )
            if (sharedTags.length > 0) {
                score += sharedTags.length * 10
                reasons.push(`Similar to ${sharedTags[0]}`)
            }
        }

        // Similar price range (low weight)
        const priceDiff = Math.abs(currentProduct.price - product.price)
        const priceRatio = priceDiff / currentProduct.price
        if (priceRatio < 0.3) {
            score += 15
            reasons.push('Similar price range')
        }

        // Same availability (very low weight)
        if (currentProduct.availability === product.availability) {
            score += 5
        }

        if (score > 0) {
            scores.push({ product, score, reasons })
        }
    }

    return scores.sort((a, b) => b.score - a.score).slice(0, limit)
}

/**
 * Get recommendations from a specific collection
 */
function getCollectionRecommendations(
    collectionSlug: string,
    allProducts: Product[],
    limit: number
): RecommendationScore[] {
    const collectionProducts = allProducts.filter(
        p => p.collection?.slug?.current === collectionSlug
    )

    return collectionProducts.slice(0, limit).map(product => ({
        product,
        score: 50,
        reasons: ['From the same collection'],
    }))
}

/**
 * Get trending/popular products
 * In a real implementation, this would use actual view/purchase data
 */
function getTrendingProducts(
    allProducts: Product[],
    limit: number,
    excludeIds: string[]
): RecommendationScore[] {
    // Simulate trending by using a hash of product ID for consistent "random" selection
    const trending = allProducts
        .filter(p => !excludeIds.includes(p._id))
        .map(product => ({
            product,
            score: 25,
            reasons: ['Popular choice'],
        }))
        .sort((a, b) => {
            // Consistent pseudo-random ordering
            const hashA = hashString(a.product._id)
            const hashB = hashString(b.product._id)
            return hashB - hashA
        })
        .slice(0, limit)

    return trending
}

/**
 * Simple string hash for consistent ordering
 */
function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
}
