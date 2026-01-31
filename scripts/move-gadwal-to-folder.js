// Script to move the Gadwal silk image to the "sivi studio" folder
// Run with: node scripts/move-gadwal-to-folder.js

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('🔑 Cloudinary Config:');
console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET'}\n`);

const SOURCE_PUBLIC_ID = 'gadwal-silk_zikc6e';
const TARGET_FOLDER = 'sivi studio';
const TARGET_PUBLIC_ID = 'heritage-gadwal-silk';

async function moveImage() {
    try {
        console.log('🚀 Moving Gadwal silk image to "sivi studio" folder...\n');

        // Step 1: Get the original image URL
        const sourceUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1769856239/${SOURCE_PUBLIC_ID}.jpg`;
        console.log(`📥 Source URL: ${sourceUrl}`);

        // Step 2: Upload to new location (this will copy it)
        console.log(`📤 Uploading to folder: ${TARGET_FOLDER}/${TARGET_PUBLIC_ID}...\n`);

        const result = await cloudinary.uploader.upload(sourceUrl, {
            folder: TARGET_FOLDER,
            public_id: TARGET_PUBLIC_ID,
            resource_type: 'image',
            overwrite: true,
            invalidate: true
        });

        console.log('✅ Image successfully moved!');
        console.log(`   New URL: ${result.secure_url}`);
        console.log(`   Public ID: ${result.public_id}`);
        console.log(`   Format: ${result.format}`);
        console.log(`   Size: ${(result.bytes / 1024).toFixed(2)} KB\n`);

        // Step 3: Optionally delete the old image
        console.log('🗑️  Deleting old image from root...');
        try {
            await cloudinary.uploader.destroy(SOURCE_PUBLIC_ID);
            console.log('✅ Old image deleted successfully\n');
        } catch (deleteError) {
            console.log('⚠️  Could not delete old image (it may not exist or already be deleted)\n');
        }

        console.log('🎉 Migration complete!');
        console.log('\n📝 Next steps:');
        console.log('   1. Update heritageData.ts to use the new URL');
        console.log(`   2. New URL: https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi%20studio/${TARGET_PUBLIC_ID}`);

        return result;
    } catch (error) {
        console.error('❌ Error moving image:', error.message);
        if (error.http_code) {
            console.error(`   HTTP Code: ${error.http_code}`);
        }
        throw error;
    }
}

// Run the migration
moveImage().catch(console.error);
