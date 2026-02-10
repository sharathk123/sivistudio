import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
        ],
    },
    // Enable experimental features for better performance
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
}

// Wrap with bundle analyzer
const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

export default withAnalyzer(nextConfig)
