const https = require('https');

const CLOUD_NAME = 'dj3a6c22e';
const FOLDER = 'sivi-studio';
const testImages = ['hero-ikat', 'heritage-pochampally-dress', 'gadwal-silk'];

async function checkUrl(url) {
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

async function runTests() {
    console.log('🧪 Testing Cloudinary Access...');
    console.log(`Cloud Name: ${CLOUD_NAME}`);
    console.log(`Folder: ${FOLDER}\n`);

    for (const img of testImages) {
        const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${FOLDER}/${img}`;
        console.log(`🔍 Testing: ${img}...`);
        const result = await checkUrl(url);

        if (result.ok) {
            console.log(`✅ SUCCESS: ${url}`);
        } else {
            console.log(`❌ FAILED (${result.status}): ${url}`);
        }
    }

    console.log('\n✨ Test complete!');
}

runTests().catch(console.error);
