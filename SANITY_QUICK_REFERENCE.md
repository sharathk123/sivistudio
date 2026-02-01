# Sivi CMS Quick Reference

## 🚀 Quick Start

### Deploy Sanity Studio
```bash
cd studio
npm run build
npx sanity deploy
# Choose hostname: sivi-studio
# Access at: https://sivi-studio.sanity.studio
```

### Run Locally
```bash
# Terminal 1: Sanity Studio
cd studio && npm run dev  # http://localhost:3333

# Terminal 2: Next.js Frontend
npm run dev  # http://localhost:3000
```

---

## 📋 Content Workflows

### Creating a Collection

1. Go to **Collections** in Sanity Studio
2. Click **Create New**
3. Fill required fields:
   - **Title**: "Pochampally Ikat"
   - **Slug**: Auto-generated
   - **Hero Image**: Upload 1920x1080px
   - **Description**: Short summary (max 300 chars)
4. Set **Status**: `upcoming` → `live` when ready
5. Set **Display Order**: 10, 20, 30... (lower = first)
6. **Publish**

### Creating a Product

1. Go to **Products** → **All Products**
2. Click **Create New**
3. Fill required fields:
   - **Title**: "Indigo Ikat Kurta"
   - **Slug**: Auto-generated
   - **Collections**: Select at least one
   - **Images**: Upload product photos
4. Set pricing:
   - **Price Display**: `numeric` or `on_request`
   - **Price**: Required if numeric
5. Set **Availability**: `in_stock`, `made_to_order`, or `sold_out`
6. **Publish**

### Creating a Craft Story

1. Go to **Editorial** → **Craft Stories**
2. Click **Create New**
3. Fill required fields:
   - **Title**: "The Art of Pochampally Ikat"
   - **Category**: Choose type
   - **Hero Image**: Upload banner
   - **Excerpt**: 2-3 sentence summary
   - **Body**: Long-form content
4. Set **Published Date**
5. Link **Related Collections** and **Products**
6. **Publish**

---

## 🔍 GROQ Query Examples

### Get Live Collections
```groq
*[_type == "collection" && status == "live"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  heroImage,
  status
}
```

### Get Products in Collection
```groq
*[_type == "collection" && slug.current == "pochampally-ikat"][0] {
  title,
  "products": *[_type == "product" && references(^._id)] {
    title,
    price,
    availability
  }
}
```

### Get Craft Stories by Category
```groq
*[_type == "craftStory" && category == "weaving"] | order(publishedAt desc) {
  title,
  excerpt,
  publishedAt
}
```

---

## 🎨 Field Reference

### Collection Status
- `upcoming`: Hidden, not indexed
- `live`: Visible, indexed
- `archive`: Hidden from nav, indexed

### Product Availability
- `in_stock`: Ready to ship
- `made_to_order`: 2-4 weeks
- `sold_out`: No longer available

### Product Price Display
- `numeric`: Show ₹ price
- `on_request`: Show "Price on Request"

### Craft Story Categories
- `weaving`: Techniques
- `heritage`: Artisan stories
- `materials`: Dyes & fabrics
- `regional`: Geographic traditions
- `innovation`: Contemporary

---

## 🔗 Frontend Routes

| Route | Data Source | Status Filter |
|-------|-------------|---------------|
| `/collections` | `getCollections()` | `status == "live"` |
| `/collections/[slug]` | `getCollection(slug)` | Any status |
| `/shop` | `getProducts()` | All products |
| `/shop/[slug]` | `getProduct(slug)` | Single product |

---

## ⚙️ Environment Variables

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=n2gynp0d
NEXT_PUBLIC_SANITY_DATASET=production

# Optional (for mutations)
SANITY_API_TOKEN=your_token_here
```

---

## 🛠️ Troubleshooting

### Collections not showing
- Check `status` field is `live`
- Verify ISR cache (wait 60 seconds)

### Products not in collection
- Ensure product's `collections` field references the collection
- Check product is published

### Images not loading
- Verify Sanity project ID in `.env.local`
- Check image URL builder in `src/lib/sanity/client.ts`

### Build errors
- Run `npm run build` to check TypeScript errors
- Ensure all required fields have values

---

## 📚 Documentation

- **Full Schema Docs**: `SANITY_CMS_V1_SCHEMA.md`
- **Migration Guide**: `SANITY_MIGRATION_GUIDE.md`
- **Implementation Summary**: `SANITY_V1_IMPLEMENTATION_SUMMARY.md`

---

**Version**: 1.0  
**Last Updated**: February 1, 2026
