// Script to upload all images from /public/images to Cloudinary
// Run with: node scripts/upload-to-cloudinary.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
// You'll need to set these environment variables or replace with your values
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
    api_key: process.env.CLOUDINARY_API_KEY || 'YOUR_API_KEY',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'YOUR_API_SECRET'
});

const IMAGES_DIR = path.join(__dirname, '../public/images');
const CLOUDINARY_FOLDER = 'sivi-studio'; // Your folder name in Cloudinary

async function uploadImage(filePath, fileName) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: CLOUDINARY_FOLDER,
            public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove file extension
            resource_type: 'image',
            overwrite: true,
            invalidate: true
        });

        console.log(`✅ Uploaded: ${fileName}`);
        console.log(`   URL: ${result.secure_url}`);
        return result;
    } catch (error) {
        console.error(`❌ Failed to upload ${fileName}:`, error.message);
        return null;
    }
}

async function uploadAllImages() {
    console.log('🚀 Starting Cloudinary upload...\n');
    console.log(`📁 Source: ${IMAGES_DIR}`);
    console.log(`☁️  Destination: ${CLOUDINARY_FOLDER}\n`);

    // Read all files from images directory
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file =>
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to upload\n`);

    let successCount = 0;
    let failCount = 0;

    // Upload each image
    for (const file of imageFiles) {
        const filePath = path.join(IMAGES_DIR, file);
        const result = await uploadImage(filePath, file);

        if (result) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📦 Total: ${imageFiles.length}`);
}

// Run the upload
uploadAllImages().catch(console.error);
