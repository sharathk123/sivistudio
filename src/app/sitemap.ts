import { MetadataRoute } from 'next'
import { getProducts, getCollections, getCraftStories } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sivithecouturier.com'

    // Fetch dynamic data
    const [products, collections, stories] = await Promise.all([
        getProducts(),
        getCollections(),
        getCraftStories(),
    ])

    // Define static routes
    const staticRoutes = [
        '',
        '/heritage',
        '/journal',
        '/shop',
        '/story',
        '/login',
        '/signup',
        '/contact',
        '/custom-tailoring',
        '/privacy-policy',
        '/shipping-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Product routes
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug.current}`,
        lastModified: new Date(product._updatedAt || new Date()),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }))

    // Collection routes
    const collectionRoutes = collections.map((collection) => ({
        url: `${baseUrl}/collections/${collection.slug.current}`,
        lastModified: new Date(collection._updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Heritage Story routes
    const storyRoutes = stories.map((story) => ({
        url: `${baseUrl}/heritage/${story.slug.current}`,
        lastModified: new Date(story._updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // TODO: Add Journal routes when journal data fetching is ready
    // const journalRoutes = ...

    return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...storyRoutes]
}
