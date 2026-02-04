import { getProducts, getCollections } from '@/lib/sanity/client'
import StickyHeader from '@/components/ui/StickyHeader'
import ShopDisplay from '@/components/shop/ShopDisplay'
import Script from 'next/script'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ collection?: string; sort?: string }>
}) {
    const params = await searchParams
    const collectionSlug = params.collection
    const sortBy = params.sort

    const [allProducts = [], collections = []] = await Promise.all([
        getProducts().catch(() => []),
        getCollections().catch(() => [])
    ])

    // Server-side filtering
    let products = Array.isArray(allProducts) ? [...allProducts] : []
    if (collectionSlug && collectionSlug !== 'all') {
        products = products.filter(p =>
            p.collections?.some(c => c.slug?.current === collectionSlug)
        )
    }

    // Server-side sorting
    const sortMethods: Record<string, (a: any, b: any) => number> = {
        'price-low': (a, b) => (a.price || 0) - (b.price || 0),
        'price-high': (a, b) => (b.price || 0) - (a.price || 0),
        'title-az': (a, b) => (a.title || '').localeCompare(b.title || ''),
        'newest': () => 0, // Default order
    }

    if (sortBy && sortMethods[sortBy]) {
        products.sort(sortMethods[sortBy])
    }

    // JSON-LD ItemList Schema for Shop SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'the Atelier | Sivi the Couturier',
        description: 'Curated collection of handcrafted handloom garments.',
        itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: product.title || 'Product',
                url: `https://sivithecouturier.com/products/${product.slug?.current || 'id'}`,
                description: product.description || '',
                offers: {
                    '@type': 'Offer',
                    price: product.price || 0,
                    priceCurrency: 'INR',
                    availability: product.availability === 'in_stock'
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/PreOrder'
                }
            }
        }))
    }

    return (
        <div className="min-h-screen bg-bone">
            <Script
                id="shop-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <StickyHeader theme="light" />

            {/* Header */}
            <div className="pt-40 pb-12 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-8xl text-charcoal italic mb-8">
                    the Atelier
                </h1>
                <p className="max-w-xl mx-auto text-charcoal-400 text-lg tracking-wide font-light leading-relaxed">
                    Explore our curated collection of handcrafted garments, designed in Hyderabad with conscious luxury in mind.
                </p>
            </div>

            {/* Main Shop Interface */}
            <ShopDisplay products={products} collections={collections} />
        </div>
    )
}
