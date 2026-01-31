# Image Cleanup Summary

## ✅ Cleanup Completed - January 31, 2026

### What Was Done
Moved 11 unused images from `/public/images/` to `/public/images/unused/` to organize the project.

---

## 📂 Current Active Images (27 files)

### **Heritage Section** (9 images)
- `heritage-pochampally-dress.png`
- `heritage-jamdani-saree.png`
- `heritage-sambalpuri-outfit.png`
- `heritage-kanjivaram-dress.png`
- `heritage-gadwal-ensemble.png` ⚠️ *Being replaced with Cloudinary version*
- `heritage-uppada-jamdani-new.png`
- `heritage-uppada-dress.png`
- `heritage-narayanpet-modern.png`
- `heritage-gollabama-modern.png`
- `heritage-hero-textiles.png`

### **Hero & Landing Section** (5 images)
- `hero-ikat.png`
- `hero-modern-vibrant.png`
- `pochampally-ikat-modern.png`
- `kurta-mannequin.png`
- `layered-outfit-mannequin.png`

### **Story/Editorial Section** (4 images)
- `story-hero-threads.png`
- `story-origins-workshop.png`
- `story-jamdani-dress.png`
- `story-kanjivaram-outfit.png`

### **Custom Tailoring Section** (2 images)
- `custom-tailoring.png`
- `custom-ikat-tunic-modern.png`

### **Collection/Studio Section** (3 images)
- `collection-studio.png`
- `contemporary-dress-studio.png`
- `saree-editorial.png`

### **Page Headers Section** (2 images)
- `account.png`
- `contact.png`

### **Fabric Details Section** (1 image)
- `ikat-fabric-closeup.png`

---

## 🗑️ Moved to `/public/images/unused/` (11 files)

These images are not referenced in any code:
1. `dupatta.png` (905 KB)
2. `gadwal-silk.png` (1.1 MB)
3. `handloom-collection-floating.png` (636 KB)
4. `handloom-dress-terracotta-indigo.png` (683 KB)
5. `kurta.png` (746 KB)
6. `layered-handloom-floating.png` (651 KB)
7. `layered-outfit-modern-colors.png` (603 KB)
8. `modern-handloom-dress-full.png` (683 KB)
9. `modern-handloom-dress.png` (633 KB)
10. `modern-ikat-dress-floating.png` (646 KB)
11. `saree.png` (818 KB)

**Total space in unused folder**: ~8.5 MB

---

## 🎯 Next Steps

### Option 1: Delete Unused Images
If you're confident these won't be needed:
```bash
rm -rf public/images/unused
```

### Option 2: Keep as Archive
Keep the folder for potential future use.

### Option 3: Cloudinary Migration
Continue migrating active images to Cloudinary by section:
1. **Heritage Section** (Priority 1) - 1/10 migrated
2. **Hero & Landing Section** (Priority 2)
3. **Collection/Studio Section** (Priority 3)

---

## 📊 Storage Impact

- **Before cleanup**: 38 files in `/public/images/`
- **After cleanup**: 27 active files + 11 archived files
- **Space freed from main folder**: ~8.5 MB

---

## 🔗 Related Files
- Migration guide: `CLOUDINARY_MIGRATION.md`
- Image constants: `src/lib/images.ts`
- Heritage data: `src/data/heritageData.ts`
