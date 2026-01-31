// Cloudinary Image Helper
// Generates optimized Cloudinary URLs for images

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dj3a6c22e'
const FOLDER = 'sivi-studio'

/**
 * Get Cloudinary URL for an image
 * @param imagePath - Local image path (e.g., 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi%20studio/hero-ikat')
 * @param options - Cloudinary transformation options
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(
    imagePath: string,
    options: {
        width?: number
        height?: number
        quality?: number | 'auto'
        format?: 'auto' | 'webp' | 'jpg' | 'png'
        crop?: 'fill' | 'fit' | 'scale' | 'limit'
    } = {}
): string {
    // Remove /images/ prefix and file extension
    const fileName = imagePath
        .replace('/images/', '')
        .replace(/\.[^/.]+$/, '')

    // Build transformation string
    const transformations: string[] = []

    if (options.width) transformations.push(`w_${options.width}`)
    if (options.height) transformations.push(`h_${options.height}`)
    if (options.quality) transformations.push(`q_${options.quality}`)
    if (options.format) transformations.push(`f_${options.format}`)
    if (options.crop) transformations.push(`c_${options.crop}`)

    const transformString = transformations.length > 0
        ? transformations.join(',') + '/'
        : ''

    // Encode folder name for URL
    const encodedFolder = encodeURIComponent(FOLDER)

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}${encodedFolder}/${fileName}`
}

/**
 * Get optimized Cloudinary URL with auto format and quality
 */
export function getOptimizedCloudinaryUrl(imagePath: string, width?: number): string {
    return getCloudinaryUrl(imagePath, {
        width,
        quality: 'auto',
        format: 'auto',
        crop: 'limit'
    })
}

/**
 * Get responsive Cloudinary srcset
 */
export function getCloudinarySrcSet(imagePath: string): string {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    return widths
        .map(w => `${getOptimizedCloudinaryUrl(imagePath, w)} ${w}w`)
        .join(', ')
}
