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

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const FOLDER_NAME = 'sivi-studio';

async function uploadImages() {
    console.log('🚀 Starting Cloudinary migration...');
    console.log(`📂 Scanning directory: ${IMAGES_DIR}`);

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error('❌ Images directory not found!');
        return;
    }

    const files = fs.readdirSync(IMAGES_DIR).filter(file =>
        /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)
    );

    console.log(`📸 Found ${files.length} images to upload.`);

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const publicId = path.parse(file).name;

        try {
            console.log(`📤 Uploading ${file}...`);
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
                folder: FOLDER_NAME,
                overwrite: true,
                resource_type: 'auto'
            });
            console.log(`✅ Success: ${result.secure_url}`);
        } catch (error) {
            console.error(`❌ Failed to upload ${file}:`, error.message);
        }
    }

    console.log('\n✨ Migration complete!');
}

uploadImages().catch(err => {
    console.error('💥 Fatal error during migration:', err);
});
