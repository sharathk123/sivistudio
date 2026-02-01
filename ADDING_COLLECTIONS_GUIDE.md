# Adding Collections to Sanity Studio - Step-by-Step Guide

**Collections to Add**:
1. Handloom Sarees
2. Cotton Kurtas
3. Silk Dupattas

---

## 📸 Hero Images Generated

The following high-quality hero images have been generated and saved:

1. **Handloom Sarees**: `handloom_sarees_hero.png` - Deep emerald green saree with gold zari
2. **Cotton Kurtas**: `cotton_kurtas_hero.png` - Warm terracotta kurta with ivory accents
3. **Silk Dupattas**: `silk_dupattas_hero.png` - Deep navy blue dupatta with silver zari

---

## 🚀 Step-by-Step Instructions

### Step 1: Start Sanity Studio

```bash
cd studio
npm run dev
```

Studio will open at: `http://localhost:3333`

---

### Step 2: Create "Handloom Sarees" Collection

1. **Navigate** to Sanity Studio (`http://localhost:3333`)
2. Click **Collections** in the left sidebar
3. Click the **+ Create** button (or **Create new Collection**)
4. Fill in the fields:

#### Content Tab
- **Title**: `Handloom Sarees`
- **Slug**: Click "Generate" (will create: `handloom-sarees`)
- **Hero Image**: 
  - Click "Upload"
  - Select `handloom_sarees_hero.png` from your downloads/artifacts
  - Set hotspot to center of the saree
- **Description**: 
  ```
  Timeless elegance woven by master artisans. Each saree tells a story of heritage, crafted with precision on traditional looms across India.
  ```

#### Editorial Tab
- **Editorial Tagline**: `Threads of Tradition`
- **Long-Form Story**: (Optional for now, can add later)
  ```
  Our handloom sarees represent centuries of weaving tradition, from the geometric precision 
  of Pochampally Ikat to the lustrous drape of Uppada silk. Each piece is a collaboration 
  with master weavers who have inherited their craft through generations.
  ```

#### Settings Tab
- **Status**: `live` (to make it visible on the website)
- **Featured**: ✅ Check this box (to show on homepage)
- **Display Order**: `10`

5. Click **Publish** (green button at bottom)

---

### Step 3: Create "Cotton Kurtas" Collection

1. Click **Collections** → **+ Create**
2. Fill in the fields:

#### Content Tab
- **Title**: `Cotton Kurtas`
- **Slug**: Click "Generate" (will create: `cotton-kurtas`)
- **Hero Image**: 
  - Upload `cotton_kurtas_hero.png`
  - Set hotspot to center of the kurta
- **Description**: 
  ```
  Contemporary silhouettes meet traditional handloom. Breathable cotton kurtas designed for modern living, woven with heritage techniques.
  ```

#### Editorial Tab
- **Editorial Tagline**: `Modern Heritage`
- **Long-Form Story**: (Optional)
  ```
  Our cotton kurtas blend timeless handloom craftsmanship with contemporary tailoring. 
  Woven from 60s count cotton on traditional pit looms, each piece offers unmatched 
  breathability and a texture that softens beautifully with wear.
  ```

#### Settings Tab
- **Status**: `live`
- **Featured**: ✅ Check this box
- **Display Order**: `20`

3. Click **Publish**

---

### Step 4: Create "Silk Dupattas" Collection

1. Click **Collections** → **+ Create**
2. Fill in the fields:

#### Content Tab
- **Title**: `Silk Dupattas`
- **Slug**: Click "Generate" (will create: `silk-dupattas`)
- **Hero Image**: 
  - Upload `silk_dupattas_hero.png`
  - Set hotspot to center of the fabric
- **Description**: 
  ```
  Luxurious silk dupattas with delicate zari work. The perfect accent piece, handwoven with precision and finished with artisan care.
  ```

#### Editorial Tab
- **Editorial Tagline**: `Woven Elegance`
- **Long-Form Story**: (Optional)
  ```
  Our silk dupattas showcase the finest in Indian textile artistry. From the shimmer of 
  pure mulberry silk to the intricate zari borders crafted by skilled artisans, each 
  dupatta is designed to elevate any ensemble with quiet luxury.
  ```

#### Settings Tab
- **Status**: `live`
- **Featured**: ✅ Check this box
- **Display Order**: `30`

3. Click **Publish**

---

## ✅ Verification Steps

### Check in Sanity Studio
1. Go to **Collections** in the sidebar
2. You should see all three collections listed
3. Each should show:
   - ✅ Live status badge
   - Hero image thumbnail
   - Title

### Check on Frontend
1. Open your website: `http://localhost:3001/collections`
2. You should see all three collections displayed:
   - Handloom Sarees (first, displayOrder: 10)
   - Cotton Kurtas (second, displayOrder: 20)
   - Silk Dupattas (third, displayOrder: 30)
3. Each collection card should show:
   - Hero image
   - Title
   - Description
   - Hover effects

---

## 🎨 Optional Enhancements

### Add Craft Stories (Later)
You can link these collections to Craft Stories about:
- Pochampally Ikat weaving technique
- Heritage of Telangana handlooms
- Natural dye processes

### Add Products (Next Step)
After creating collections, you can add products:
1. Go to **Products** → **All Products** → **+ Create**
2. Fill in product details
3. In **Collections** field, select one or more collections
4. Set pricing and availability
5. Publish

---

## 📊 Display Order Reference

Collections are sorted by `displayOrder` (lower numbers appear first):
- **10** - Handloom Sarees (appears first)
- **20** - Cotton Kurtas (appears second)
- **30** - Silk Dupattas (appears third)

To reorder later, just change the numbers (e.g., 15, 25, 35 for more flexibility).

---

## 🎯 Quick Tips

1. **Image Hotspot**: Always set the hotspot to the most important part of the image (usually center)
2. **Description Length**: Keep under 300 characters for best display
3. **Status Control**: 
   - Use `upcoming` while preparing content
   - Switch to `live` when ready to publish
   - Use `archive` for seasonal collections
4. **Featured Flag**: Only feature 3-5 collections at a time for best homepage display

---

## 🐛 Troubleshooting

**Collections not showing on website?**
- Check `status` is set to `live`
- Verify you clicked **Publish** (not just Save)
- Wait 60 seconds for ISR cache to refresh

**Images not uploading?**
- Ensure images are in PNG or JPG format
- Check file size (should be under 10MB)
- Try refreshing the Studio page

**Wrong order on website?**
- Check `displayOrder` values (lower = first)
- Ensure all collections have different order numbers

---

**Next Steps**: After adding these collections, you can start adding products and linking them to these collections!

---

**Created**: February 1, 2026  
**For**: Sivi Studio CMS v1
