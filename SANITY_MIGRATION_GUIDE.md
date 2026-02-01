# Sanity CMS Migration Guide

**From**: Legacy schemas (`category`, `editorial`)  
**To**: v1 schemas (`collection`, `craftStory`)  
**Status**: Optional (backward compatibility maintained)

---

## Overview

This guide helps you migrate existing Sanity content from the legacy schema structure to the new v1 architecture. **Migration is optional** - the system supports both old and new schemas simultaneously.

---

## Why Migrate?

### Benefits of v1 Schemas

1. **Lifecycle Management**: Status fields (`upcoming`, `live`, `archive`) control visibility
2. **Better Organization**: Field groups make editing clearer
3. **Enhanced Storytelling**: Dedicated fields for editorial content and craft stories
4. **Pricing Flexibility**: `priceDisplay` supports both numeric prices and "Price on Request"
5. **Availability Tracking**: Product availability status (`in_stock`, `made_to_order`, `sold_out`)
6. **Bidirectional References**: CraftStories can link to Collections and Products

---

## Migration Steps

### Step 1: Audit Existing Content

**Check Categories**:
```groq
*[_type == "category"] {
  _id,
  title,
  slug,
  "productCount": count(*[_type == "product" && references(^._id)])
}
```

**Check Editorial**:
```groq
*[_type == "editorial"] {
  _id,
  title,
  slug,
  publishedAt,
  "productCount": count(featuredProducts)
}
```

### Step 2: Migrate Categories → Collections

**For each category**:

1. Create a new `collection` document
2. Copy fields:
   - `title` → `title`
   - `slug` → `slug`
   - `description` → `description`
   - `image` → `heroImage`
3. Set new fields:
   - `status`: `live` (or `upcoming` if not ready)
   - `featured`: `false` (or `true` for important collections)
   - `displayOrder`: Assign incrementally (10, 20, 30...)
4. **Do NOT delete** the old category yet

**Example**:
```
Old Category: "Pochampally Ikat"
New Collection:
  - title: "Pochampally Ikat"
  - slug: pochampally-ikat (same)
  - heroImage: [copy from old 'image' field]
  - status: "live"
  - displayOrder: 10
```

### Step 3: Update Product References

**For each product**:

1. Open the product in Sanity Studio
2. In the `collections` field, add the new Collection reference
3. **Keep** the old category reference (for backward compatibility)
4. Save

**GROQ to find products needing updates**:
```groq
*[_type == "product" && count(categories) > 0 && count(collections) == 0] {
  _id,
  title,
  "oldCategories": categories[]->title
}
```

### Step 4: Migrate Editorial → CraftStory

**For each editorial**:

1. Create a new `craftStory` document
2. Copy fields:
   - `title` → `title`
   - `slug` → `slug`
   - `mainImage` → `heroImage`
   - `excerpt` → `excerpt`
   - `body` → `body`
   - `publishedAt` → `publishedAt`
3. Set new fields:
   - `category`: Choose from `weaving`, `heritage`, `materials`, `regional`, `innovation`
   - `featured`: `false` (or `true` for important stories)
4. Map relationships:
   - `featuredProducts` → `relatedProducts`
5. **Do NOT delete** the old editorial yet

### Step 5: Verify Frontend

**Test Collections**:
- Visit `/collections` - should show all `live` collections
- Visit `/collections/[slug]` - should show products

**Test Products**:
- Verify products appear in correct collections
- Check that pricing displays correctly

**Test Craft Stories** (if implemented):
- Visit `/craft-stories` or `/journal`
- Verify related products/collections link correctly

### Step 6: Clean Up (Optional)

**Only after verifying everything works**:

1. **Remove old category references** from products:
   ```groq
   // Find products with both old and new references
   *[_type == "product" && count(categories) > 0 && count(collections) > 0]
   ```
   - Manually remove `categories` field from each product

2. **Archive old documents**:
   - Don't delete - just unpublish or mark as archived
   - Useful for rollback if needed

3. **Update frontend code** (future):
   - Remove `getCategories()` and `getCategory()` functions
   - Remove legacy type definitions

---

## Rollback Plan

If you need to revert:

1. **Frontend**: Already supports both schemas
2. **Products**: Keep both `categories` and `collections` references
3. **Content**: Old documents remain untouched

---

## Bulk Migration Script (Advanced)

**Use Sanity CLI for bulk operations**:

```javascript
// migrate-categories.js
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'n2gynp0d',
  dataset: 'production',
  token: process.env.SANITY_TOKEN, // Get from sanity.io/manage
  useCdn: false,
})

async function migrateCategories() {
  const categories = await client.fetch('*[_type == "category"]')
  
  for (const category of categories) {
    const collection = {
      _type: 'collection',
      title: category.title,
      slug: category.slug,
      description: category.description,
      heroImage: category.image,
      status: 'live',
      featured: false,
      displayOrder: 100,
    }
    
    const result = await client.create(collection)
    console.log(`Created collection: ${result.title}`)
  }
}

migrateCategories()
```

**Run**:
```bash
node migrate-categories.js
```

---

## Testing Checklist

- [ ] All collections visible at `/collections`
- [ ] Collection detail pages load correctly
- [ ] Products appear in correct collections
- [ ] Pricing displays correctly (numeric vs. "Price on Request")
- [ ] Availability badges show correctly
- [ ] Images load properly
- [ ] Craft stories link to products/collections
- [ ] SEO metadata preserved
- [ ] No broken links

---

## Timeline Recommendation

**Week 1**: Audit existing content  
**Week 2**: Migrate 1-2 collections as test  
**Week 3**: Verify frontend, gather feedback  
**Week 4**: Migrate remaining collections  
**Week 5**: Migrate editorial to craft stories  
**Week 6**: Clean up old references (optional)

---

## Support

If you encounter issues:

1. Check `SANITY_CMS_V1_SCHEMA.md` for schema details
2. Use Sanity Vision plugin to test GROQ queries
3. Verify environment variables are set correctly
4. Check browser console for errors

---

**Last Updated**: February 1, 2026  
**Schema Version**: 1.0
