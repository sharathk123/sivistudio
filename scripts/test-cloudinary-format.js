#!/usr/bin/env node

// Script to test different Cloudinary URL formats
const https = require('https');

const CLOUD_NAME = 'dj3a6c22e';
const testImage = 'hero-ikat';

// Different URL formats to test
const urlFormats = [
    // Without folder
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${testImage}`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${testImage}.png`,

    // With "sivi studio" folder (URL encoded)
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/sivi%20studio/${testImage}`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/sivi%20studio/${testImage}.png`,

    // With "sivi-studio" folder
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/sivi-studio/${testImage}`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/sivi-studio/${testImage}.png`,

    // With transformations
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/sivi%20studio/${testImage}`,
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/sivi%20studio/${testImage}.png`,

    // Root level
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${testImage}`,
];

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({
                url,
                status: res.statusCode,
                ok: res.statusCode === 200
            });
        }).on('error', (err) => {
            resolve({
                url,
                status: 'ERROR',
                ok: false
            });
        });
    });
}

async function findCorrectFormat() {
    console.log('🔍 Testing different Cloudinary URL formats...\n');
    console.log(`Testing with image: ${testImage}\n`);

    for (const url of urlFormats) {
        const result = await checkUrl(url);

        if (result.ok) {
            console.log(`✅ WORKING: ${url}`);
        } else {
            console.log(`❌ ${result.status}: ${url}`);
        }
    }

    console.log('\n💡 Instructions:');
    console.log('1. Go to your Cloudinary Media Library');
    console.log('2. Click on one of your images');
    console.log('3. Copy the "Public ID" (e.g., "sivi studio/hero-ikat")');
    console.log('4. The correct URL format is:');
    console.log(`   https://res.cloudinary.com/${CLOUD_NAME}/image/upload/{public_id}`);
}

findCorrectFormat().catch(console.error);
