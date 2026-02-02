import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sivithecouturier.com'

    // Define static routes
    const staticRoutes = [
        '',
        '/heritage',
        '/journal',
        '/shop',
        '/story',
        '/login',
        '/signup',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Future: Add dynamic routes for products and journal articles from Sanity
    // const productRoutes = products.map(p => ({ ... }))

    return [...staticRoutes]
}
