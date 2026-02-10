import { getProducts, getCollections } from '@/lib/sanity/client'
import StickyHeader from '@/components/ui/StickyHeader'
import ShopDisplay from '@/components/shop/ShopDisplay'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
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
        <main id="main-content" className="min-h-screen bg-bone">
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

            {/* Bespoke CTA Section */}
            <section className="relative bg-charcoal text-bone py-28 px-6 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        currentColor 35px,
                        currentColor 36px
                    )`
                }} />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-sage text-xs font-semibold tracking-[0.3em] uppercase block mb-6">
                        Beyond the Collection
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl italic text-sage-100 leading-tight mb-8">
                        Envision Something <br className="hidden md:block" />Uniquely Yours
                    </h2>
                    <div className="w-16 h-[1px] bg-sage mx-auto mb-8" />
                    <p className="text-bone/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
                        Can't find exactly what you're looking for? Our bespoke tailoring service lets you
                        co-create a one-of-a-kind garment with our artisans — your vision, our heritage craft.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/custom-tailoring"
                            className="inline-block px-10 py-4 bg-sage text-bone text-sm uppercase tracking-widest font-medium hover:bg-sage-700 transition-all duration-300 rounded-sm"
                        >
                            Explore Bespoke
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 border border-bone/30 text-bone/80 text-sm uppercase tracking-widest font-medium hover:border-sage hover:text-sage transition-all duration-300 rounded-sm"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
