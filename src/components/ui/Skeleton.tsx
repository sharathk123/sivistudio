/**
 * Skeleton Component
 * 
 * Loading placeholder component for content that is being loaded
 */

import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'text' | 'circular' | 'rectangular'
    animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
    className,
    variant = 'default',
    animation = 'pulse',
    ...props
}: SkeletonProps) {
    const variantStyles = {
        default: 'rounded-md',
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-sm',
    }

    const animationStyles = {
        pulse: 'animate-pulse',
        wave: 'animate-shimmer',
        none: '',
    }

    return (
        <div
            className={cn(
                'bg-ivory-200',
                variantStyles[variant],
                animationStyles[animation],
                className
            )}
            {...props}
        />
    )
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            {/* Image skeleton */}
            <Skeleton className="aspect-[3/4] w-full" variant="rectangular" />

            {/* Title skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" variant="text" />
                <Skeleton className="h-4 w-1/2" variant="text" />
            </div>

            {/* Price skeleton */}
            <Skeleton className="h-5 w-1/3" variant="text" />
        </div>
    )
}

/**
 * Cart Item Skeleton
 */
export function CartItemSkeleton() {
    return (
        <div className="flex gap-4">
            {/* Image skeleton */}
            <Skeleton className="w-24 h-32 flex-shrink-0" variant="rectangular" />

            {/* Details skeleton */}
            <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" variant="text" />
                <Skeleton className="h-4 w-1/2" variant="text" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" variant="circular" />
                    <Skeleton className="h-8 w-8" variant="circular" />
                </div>
            </div>
        </div>
    )
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
    return (
        <div className="relative h-screen w-full bg-charcoal">
            {/* Background skeleton */}
            <Skeleton className="absolute inset-0" variant="rectangular" animation="none" />

            {/* Content skeleton */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 space-y-6">
                <Skeleton className="h-6 w-48" variant="text" />
                <div className="space-y-2">
                    <Skeleton className="h-20 w-96" variant="text" />
                    <Skeleton className="h-20 w-80" variant="text" />
                </div>
                <Skeleton className="h-5 w-64" variant="text" />
            </div>
        </div>
    )
}

/**
 * Collection Grid Skeleton
 */
export function CollectionGridSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[4/3] w-full" variant="rectangular" />
                    <Skeleton className="h-6 w-3/4" variant="text" />
                    <Skeleton className="h-4 w-1/2" variant="text" />
                </div>
            ))}
        </div>
    )
}

/**
 * Form Skeleton
 */
export function FormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/4" variant="text" />
                <Skeleton className="h-12 w-full" variant="rectangular" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/4" variant="text" />
                <Skeleton className="h-12 w-full" variant="rectangular" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/4" variant="text" />
                <Skeleton className="h-32 w-full" variant="rectangular" />
            </div>
            <Skeleton className="h-12 w-1/3" variant="rectangular" />
        </div>
    )
}

/**
 * Table Skeleton
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex gap-4 pb-4 border-b border-ivory-200">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-6 flex-1" variant="text" />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton key={colIndex} className="h-10 flex-1" variant="text" />
                    ))}
                </div>
            ))}
        </div>
    )
}

/**
 * Loading State Component
 */
export function LoadingState({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-ivory-200 border-t-sage rounded-full animate-spin" />
            </div>
            <p className="text-charcoal-400 text-sm">{message}</p>
        </div>
    )
}

/**
 * Page Loading Skeleton
 */
export function PageLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-bone">
            <div className="h-20 border-b border-ivory-200">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Skeleton className="h-8 w-32" variant="text" />
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-8" variant="circular" />
                        <Skeleton className="h-8 w-8" variant="circular" />
                        <Skeleton className="h-8 w-8" variant="circular" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    <Skeleton className="h-16 w-1/2" variant="text" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                </div>
            </div>
        </div>
    )
}
