#!/usr/bin/env node

// Script to verify all Cloudinary image URLs are accessible
const https = require('https');

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi%20studio';

// All images that should be on Cloudinary
const images = [
    'hero-ikat',
    'hero-modern-vibrant',
    'pochampally-ikat-modern',
    'kurta-mannequin',
    'layered-outfit-mannequin',
    'heritage-pochampally-dress',
    'heritage-jamdani-saree',
    'heritage-sambalpuri-outfit',
    'heritage-kanjivaram-dress',
    'heritage-gadwal-ensemble',
    'heritage-uppada-jamdani-new',
    'heritage-uppada-dress',
    'heritage-narayanpet-modern',
    'heritage-gollabama-modern',
    'heritage-hero-textiles',
    'story-hero-threads',
    'story-origins-workshop',
    'story-jamdani-dress',
    'story-kanjivaram-outfit',
    'custom-tailoring',
    'custom-ikat-tunic-modern',
    'collection-studio',
    'contemporary-dress-studio',
    'ikat-fabric-closeup',
    'saree-editorial',
    'account',
    'contact',
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
                ok: false,
                error: err.message
            });
        });
    });
}

async function verifyAllImages() {
    console.log('🔍 Verifying Cloudinary Image URLs...\n');
    console.log(`📦 Total images to check: ${images.length}\n`);

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (const imageName of images) {
        const url = `${CLOUDINARY_BASE}/${imageName}`;
        const result = await checkUrl(url);
        results.push(result);

        if (result.ok) {
            console.log(`✅ ${imageName}`);
            console.log(`   ${url}`);
            successCount++;
        } else {
            console.log(`❌ ${imageName} - Status: ${result.status}`);
            console.log(`   ${url}`);
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            }
            failCount++;
        }
        console.log('');
    }

    console.log('\n📊 Verification Summary:');
    console.log(`   ✅ Accessible: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📦 Total: ${images.length}`);

    if (failCount === 0) {
        console.log('\n🎉 All images are accessible on Cloudinary!');
    } else {
        console.log('\n⚠️  Some images failed to load. Please check the URLs above.');
    }

    // Export URLs to a file
    const fs = require('fs');
    const urlList = results.map(r => `${r.ok ? '✅' : '❌'} ${r.url}`).join('\n');
    fs.writeFileSync('cloudinary-urls.txt', urlList);
    console.log('\n📝 URL list saved to: cloudinary-urls.txt');
}

verifyAllImages().catch(console.error);
