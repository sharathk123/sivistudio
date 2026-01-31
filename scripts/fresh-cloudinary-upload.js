// Fresh Cloudinary Upload Script
// Uploads all active images from /public/images to Cloudinary root
// Run with: node scripts/fresh-cloudinary-upload.js

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('🔑 Cloudinary Config:');
console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET'}\n`);

const IMAGES_DIR = path.join(__dirname, '../public/images');

// List of active images to upload (excluding unused folder)
const ACTIVE_IMAGES = [
    // Heritage Section
    'heritage-pochampally-dress.png',
    'heritage-jamdani-saree.png',
    'heritage-sambalpuri-outfit.png',
    'heritage-kanjivaram-dress.png',
    'heritage-gadwal-ensemble.png',
    'heritage-uppada-jamdani-new.png',
    'heritage-uppada-dress.png',
    'heritage-narayanpet-modern.png',
    'heritage-gollabama-modern.png',
    'heritage-hero-textiles.png',

    // Hero & Landing
    'hero-ikat.png',
    'hero-modern-vibrant.png',
    'pochampally-ikat-modern.png',
    'kurta-mannequin.png',
    'layered-outfit-mannequin.png',

    // Story/Editorial
    'story-hero-threads.png',
    'story-origins-workshop.png',
    'story-jamdani-dress.png',
    'story-kanjivaram-outfit.png',

    // Custom Tailoring
    'custom-tailoring.png',
    'custom-ikat-tunic-modern.png',

    // Collection/Studio
    'collection-studio.png',
    'contemporary-dress-studio.png',
    'saree-editorial.png',
    'saree.png',

    // Page Headers
    'account.png',
    'contact.png',

    // Fabric Details
    'ikat-fabric-closeup.png',

    // Modern & Hybrid Designs
    'modern-ikat-dress-floating.png',
    'layered-outfit-modern-colors.png',
    'handloom-dress-terracotta-indigo.png',
    'modern-handloom-dress-full.png',
    'handloom-collection-floating.png',
    'dupatta.png',
    'kurta.png',

    // Regional Editions
    'rajasthan-bandhani-saree.png',
    'gujarat-patola-saree.png',
    'maharashtra-paithani-saree.png',
    'assam-muga-silk-saree.png',
    'kerala-kasavu-modern.png',
    'kashmir-pashmina-shawl.png',

    // Modern Fusion
    'denim-ikat-fusion-jacket.png',
    'sustainable-organic-cotton-dress.png',

    // New State Handlooms - Modern Colors & Styles
    'odisha-bomkai-saree.png',
    'tamil-chettinad-saree.png',
    'bengal-baluchari-saree.png',
    'karnataka-ilkal-saree.png',
    'andhra-mangalagiri-dress.png',
    'punjab-phulkari-kurta.png',

    // Additional images
    'gadwal-silk.png',
    'layered-handloom-floating.png',
    'modern-handloom-dress.png'
];

async function uploadImage(fileName) {
    const filePath = path.join(IMAGES_DIR, fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipped: ${fileName} (file not found)`);
        return null;
    }

    try {
        const publicId = fileName.replace(/\.[^/.]+$/, ''); // Remove extension

        const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            resource_type: 'image',
            overwrite: true,
            invalidate: true,
            folder: 'sivi-studio'
        });

        console.log(`✅ ${fileName}`);
        console.log(`   → ${result.secure_url}`);
        return result;
    } catch (error) {
        console.error(`❌ Failed: ${fileName}`);
        console.error(`   Error: ${error.message}`);
        return null;
    }
}

async function uploadAll() {
    console.log('🚀 Starting Fresh Cloudinary Upload...\n');
    console.log(`📁 Source: ${IMAGES_DIR}`);
    console.log(`📦 Images to upload: ${ACTIVE_IMAGES.length}\n`);

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (const fileName of ACTIVE_IMAGES) {
        const result = await uploadImage(fileName);

        if (result) {
            successCount++;
        } else if (fs.existsSync(path.join(IMAGES_DIR, fileName))) {
            failCount++;
        } else {
            skippedCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   ⚠️  Skipped: ${skippedCount}`);
    console.log(`   📦 Total: ${ACTIVE_IMAGES.length}`);

    console.log('\n🎉 Upload complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update image references in code to use new Cloudinary URLs');
    console.log('   2. Format: https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/{public_id}');
    console.log('   3. Example: https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/hero-ikat');
}

// Run the upload
uploadAll().catch(console.error);
