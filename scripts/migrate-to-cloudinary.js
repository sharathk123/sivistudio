#!/usr/bin/env node

// Script to replace all local image paths with Cloudinary URLs
const fs = require('fs');
const path = require('path');

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dj3a6c22e/image/upload/f_auto,q_auto/sivi%20studio';

// Map of local paths to Cloudinary URLs
const imageMap = {
    "'/images/hero-ikat.png'": `'${CLOUDINARY_BASE}/hero-ikat'`,
    '"/images/hero-ikat.png"': `"${CLOUDINARY_BASE}/hero-ikat"`,

    "'/images/pochampally-ikat-modern.png'": `'${CLOUDINARY_BASE}/pochampally-ikat-modern'`,
    "'/images/kurta-mannequin.png'": `'${CLOUDINARY_BASE}/kurta-mannequin'`,
    "'/images/layered-outfit-mannequin.png'": `'${CLOUDINARY_BASE}/layered-outfit-mannequin'`,
    "'/images/collection-studio.png'": `'${CLOUDINARY_BASE}/collection-studio'`,
    '"/images/collection-studio.png"': `"${CLOUDINARY_BASE}/collection-studio"`,

    "'/images/saree-editorial.png'": `'${CLOUDINARY_BASE}/saree-editorial'`,
    "'/images/story-origins-workshop.png'": `'${CLOUDINARY_BASE}/story-origins-workshop'`,
    "'/images/heritage-hero-textiles.png'": `'${CLOUDINARY_BASE}/heritage-hero-textiles'`,
    '"/images/heritage-hero-textiles.png"': `"${CLOUDINARY_BASE}/heritage-hero-textiles"`,
    "'/images/custom-tailoring.png'": `'${CLOUDINARY_BASE}/custom-tailoring'`,
    '"/images/custom-tailoring.png"': `"${CLOUDINARY_BASE}/custom-tailoring"`,
    "'/images/account.png'": `'${CLOUDINARY_BASE}/account'`,
    "'/images/contact.png'": `'${CLOUDINARY_BASE}/contact'`,
    '"/images/contact.png"': `"${CLOUDINARY_BASE}/contact"`,

    "'/images/heritage-pochampally-dress.png'": `'${CLOUDINARY_BASE}/heritage-pochampally-dress'`,
    "'/images/heritage-kanjivaram-dress.png'": `'${CLOUDINARY_BASE}/heritage-kanjivaram-dress'`,
    "'/images/custom-ikat-tunic-modern.png'": `'${CLOUDINARY_BASE}/custom-ikat-tunic-modern'`,

    "'/images/story-hero-threads.png'": `'${CLOUDINARY_BASE}/story-hero-threads'`,
    '"/images/story-hero-threads.png"': `"${CLOUDINARY_BASE}/story-hero-threads"`,
    '"/images/story-origins-workshop.png"': `"${CLOUDINARY_BASE}/story-origins-workshop"`,
    '"/images/story-jamdani-dress.png"': `"${CLOUDINARY_BASE}/story-jamdani-dress"`,
    '"/images/story-kanjivaram-outfit.png"': `"${CLOUDINARY_BASE}/story-kanjivaram-outfit"`,
};

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [oldPath, newPath] of Object.entries(imageMap)) {
        if (content.includes(oldPath)) {
            content = content.replaceAll(oldPath, newPath);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${filePath}`);
        return true;
    }

    return false;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let count = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            count += processDirectory(fullPath);
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
            if (replaceInFile(fullPath)) {
                count++;
            }
        }
    }

    return count;
}

console.log('🚀 Replacing image paths with Cloudinary URLs...\n');

const srcDir = path.join(__dirname, '../src');
const count = processDirectory(srcDir);

console.log(`\n✨ Done! Updated ${count} files.`);
