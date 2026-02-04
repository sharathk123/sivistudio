# Cloudinary Image Upload Guide

## Step 1: Get Your Cloudinary Credentials

1. Go to your Cloudinary Console: https://console.cloudinary.com/settings/c-b5a3380d510cf177554d7cecd0602d/account
2. Find these values:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Show" to reveal)

## Step 2: Configure Environment Variables

Open `.env.local` and replace the placeholders:

```bash
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
```

## Step 3: Upload All Images

Run the upload script:

```bash
node scripts/upload-to-cloudinary.js
```

This will:
- ✅ Upload all 38 images from `/public/images/`
- ✅ Organize them in the `sivi-studio` folder on Cloudinary
- ✅ Show progress and URLs for each uploaded image
- ✅ Provide a summary at the end

## Step 4: Update Next.js Config

After uploading, update `next.config.ts` to allow Cloudinary images:

```typescript
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            // ... existing patterns
        ],
    },
}
```

## Step 5: Create Cloudinary Helper

Create `src/lib/cloudinary.ts`:

```typescript
export function getCloudinaryUrl(imagePath: string, options = {}) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const folder = 'sivi-studio'
    
    // Remove /images/ prefix and file extension
    const fileName = imagePath
        .replace('/images/', '')
        .replace(/\.[^/.]+$/, '')
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${fileName}`
}
```

## Step 6: Update Image References (Optional)

You can either:

**Option A: Keep using local paths** (Recommended for now)
- Images work from `/public/images/`
- Cloudinary serves as backup/CDN

**Option B: Switch to Cloudinary URLs**
- Replace all `/images/...` with Cloudinary URLs
- Better performance and CDN delivery

## Folder Structure on Cloudinary

Your images will be organized as:
```
sivi-studio/
  ├── account.png
  ├── collection-studio.png
  ├── contact.png
  ├── custom-tailoring.png
  ├── hero-ikat.png
  ├── heritage-pochampally-dress.png
  └── ... (all 38 images)
```

## Troubleshooting

### Error: "Invalid credentials"
- Double-check your API Key and Secret
- Make sure there are no extra spaces

### Error: "Folder not found"
- The script will create the folder automatically
- You can change the folder name in the script

### Images not uploading
- Check your internet connection
- Verify file permissions on `/public/images/`
- Check Cloudinary quota (free tier: 25GB)

## Next Steps

After successful upload:
1. ✅ Verify images in Cloudinary console
2. ✅ Test image URLs in browser
3. ✅ Update production environment variables in Vercel
4. ✅ Consider using Cloudinary transformations for optimization
