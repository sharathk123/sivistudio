# Sivi Studio CMS - v1 Schema Architecture

**Version**: 1.0  
**Date**: February 1, 2026  
**Status**: Production Ready

---

## Overview

This document defines the **v1 content architecture** for Sivi Studio's Sanity CMS. The schemas are designed for **editorial storytelling** with a focus on **quiet luxury**, **craft heritage**, and **operational clarity** for non-technical editors.

---

## Core Principles

1. **Editorial-First**: Optimized for storytelling, not fast-fashion ecommerce
2. **Lifecycle Management**: Status fields control visibility and indexing
3. **Reference-Based**: No duplicated content; all relationships use Sanity references
4. **Editor-Friendly**: Clear labels, helpful descriptions, organized field groups
5. **Future-Proof**: Safe for additive changes; locked core fields

---

## Schema Types

### 1. Collection (v1)

**Purpose**: Represents a curated collection of products grouped by heritage, technique, or season.

**File**: `studio/schemaTypes/collection.ts`

#### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Collection name (e.g., "Pochampally Ikat") |
| `slug` | slug | ✅ | URL-safe identifier |
| `heroImage` | image | ✅ | Large banner image (1920x1080px recommended) |
| `description` | text | ❌ | Short description (max 300 chars) |

#### Editorial Fields

| Field | Type | Description |
|-------|------|-------------|
| `editorialTagline` | string | Optional poetic tagline |
| `longDescription` | array (blocks + images) | Rich editorial content about heritage |
| `craftStories` | array (references) | Links to related CraftStory documents |

#### Lifecycle Fields

| Field | Type | Options | Description |
|-------|------|---------|-------------|
| `status` | string | `upcoming`, `live`, `archive` | Controls visibility and indexing |
| `featured` | boolean | - | Show prominently on homepage |
| `displayOrder` | number | - | Sort order (lower = first) |

#### Status Behavior

- **`upcoming`**: Hidden from frontend, not indexed by search engines
- **`live`**: Visible on site, indexed, appears in navigation
- **`archive`**: Hidden from main navigation, but still indexed (for SEO/historical access)

#### Field Groups

- **Content**: Essential fields (title, slug, image, description)
- **Editorial**: Storytelling content (tagline, long description, craft stories)
- **Settings**: Lifecycle and display controls

---

### 2. Product (v1)

**Purpose**: Individual handloom products with craft details and availability status.

**File**: `studio/schemaTypes/product.ts`

#### Essential Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Product name |
| `slug` | slug | ✅ | URL-safe identifier |
| `description` | text | ❌ | Short description (max 300 chars) |
| `collections` | array (references) | ✅ | Assigned collections (min 1) |
| `images` | array (images) | ✅ | Product photos (first = thumbnail) |

#### Pricing & Availability

| Field | Type | Options | Description |
|-------|------|---------|-------------|
| `priceDisplay` | string | `numeric`, `on_request` | How to show pricing |
| `price` | number | - | Required if `priceDisplay` = `numeric` |
| `availability` | string | `in_stock`, `made_to_order`, `sold_out` | Stock status |

**Validation Logic**: If `priceDisplay` is `numeric`, `price` field becomes required.

#### Craft Story Fields

| Field | Type | Description |
|-------|------|-------------|
| `materialStory` | array (blocks + images) | Rich content about fabric and technique |
| `technicalSpecs` | array (objects) | Key-value pairs (e.g., "Fabric: 60s Count Cotton") |
| `artisanHours` | number | Approximate handwork hours |
| `craftStories` | array (references) | Links to related CraftStory documents |

#### Settings

| Field | Type | Description |
|-------|------|-------------|
| `featured` | boolean | Highlight on homepage/collections |
| `displayOrder` | number | Sort order within collections |

#### Field Groups

- **Essential**: Core product info
- **Pricing & Availability**: Price display and stock status
- **Craft Story**: Heritage and material details
- **Media**: Product images
- **Settings**: Display controls

---

### 3. CraftStory (v1)

**Purpose**: Long-form editorial content about weaving techniques, artisan heritage, or textile traditions.

**File**: `studio/schemaTypes/craftStory.ts`

#### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Story title |
| `slug` | slug | ✅ | URL-safe identifier |
| `category` | string | ✅ | Story type (see categories below) |
| `heroImage` | image | ✅ | Large banner image |
| `excerpt` | text | ✅ | Short summary (max 300 chars) |
| `body` | array (blocks + images) | ✅ | Long-form content |

#### Categories

- `weaving`: Weaving techniques
- `heritage`: Artisan heritage
- `materials`: Natural dyes & materials
- `regional`: Regional crafts
- `innovation`: Contemporary innovation

#### Relationships

| Field | Type | Description |
|-------|------|-------------|
| `relatedCollections` | array (references) | Collections featuring this craft |
| `relatedProducts` | array (references) | Products exemplifying this craft |

#### Settings

| Field | Type | Description |
|-------|------|-------------|
| `publishedAt` | datetime | Publication date |
| `featured` | boolean | Highlight on homepage/journal |
| `seo` | object | Optional custom meta title/description |

---

## Relationships & Data Flow

### Bidirectional References

```
Collection ←→ Product
   ↓              ↓
CraftStory ←→ CraftStory
```

- **Collections** reference **Products** (via `products` field in GROQ query)
- **Products** reference **Collections** (via `collections` field)
- **CraftStories** can reference both **Collections** and **Products**
- **Collections** and **Products** can reference **CraftStories**

### GROQ Query Strategy

**Collections Overview** (Frontend: `/collections`):
```groq
*[_type == "collection" && status == "live"] | order(displayOrder asc)
```
- Only fetches `live` collections
- Sorted by `displayOrder`

**Collection Detail** (Frontend: `/collections/[slug]`):
```groq
*[_type == "collection" && slug.current == $slug][0] {
  ...,
  "products": *[_type == "product" && references(^._id)] | order(displayOrder asc)
}
```
- Fetches collection data
- Deep-fetches all products that reference this collection

---

## Sanity Studio Structure

**File**: `studio/structure/index.ts`

### Organization

```
Sivi Studio CMS
├── Collections
│   └── All Collections (sorted by displayOrder)
├── Products
│   ├── All Products
│   ├── ─────────────
│   ├── In Stock
│   ├── Made to Order
│   └── Sold Out
└── Editorial
    ├── Craft Stories
    ├── ─────────────
    ├── Weaving Techniques
    ├── Artisan Heritage
    ├── Natural Dyes & Materials
    ├── Regional Crafts
    ├── Contemporary Innovation
    └── Legacy Editorial (Deprecated)
```

### Benefits

- **Clear Sections**: Collections, Products, Editorial
- **Filtered Views**: Products by availability, Craft Stories by category
- **Sorted Lists**: Default sorting by `displayOrder` or `publishedAt`
- **Document Previews**: Title + hero image + status/availability badges

---

## Migration & Backward Compatibility

### Deprecated Schemas

1. **`category.ts`** → Replaced by `collection.ts`
   - Kept in schema for backward compatibility
   - Hidden from Studio UI
   - Frontend still supports legacy `getCategories()` function

2. **`editorial.ts`** → Replaced by `craftStory.ts`
   - Kept in schema for existing content
   - Visible in Studio under "Legacy Editorial (Deprecated)"
   - New content should use `craftStory`

### Migration Path

**Phase 1** (Current):
- v1 schemas deployed
- Legacy schemas remain functional
- Frontend supports both old and new data models

**Phase 2** (Future):
- Migrate existing `category` documents to `collection`
- Migrate existing `editorial` documents to `craftStory`
- Update all product references

**Phase 3** (Future):
- Remove legacy schemas
- Clean up deprecated frontend code

---

## Safe to Extend vs. Locked Fields

### ✅ Safe to Extend (Additive Changes)

**Collections**:
- Add new field groups
- Add optional fields (e.g., `seasonalTheme`, `colorPalette`)
- Add new status options (e.g., `coming_soon`)

**Products**:
- Add new technical spec types
- Add optional fields (e.g., `careInstructions`, `dimensions`)
- Add new availability options (e.g., `pre_order`)

**CraftStories**:
- Add new categories
- Add optional fields (e.g., `videoUrl`, `audioNarration`)

### 🔒 Locked Fields (Breaking Changes)

**Do NOT change**:
- Field names (e.g., renaming `heroImage` to `coverImage`)
- Field types (e.g., changing `price` from `number` to `string`)
- Required validation (e.g., making `description` required)
- Slug generation source

**Why**: These changes break existing GROQ queries and frontend code.

---

## Deployment Guide

### Local Development

1. **Start Sanity Studio**:
   ```bash
   cd studio
   npm run dev
   ```
   Studio runs at `http://localhost:3333`

2. **Start Next.js Frontend**:
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:3000`

### Cloud Deployment

#### Deploy Sanity Studio to Hosted Mode

1. **Build Studio**:
   ```bash
   cd studio
   npm run build
   ```

2. **Deploy to Sanity**:
   ```bash
   npx sanity deploy
   ```
   - Choose a unique studio hostname (e.g., `sivi-studio`)
   - Studio will be available at `https://sivi-studio.sanity.studio`

3. **Update CORS Origins**:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Add your production domain to CORS origins

#### Environment Variables

**Required for Frontend**:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=n2gynp0d
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Content Guidelines for Editors

### Collections

1. **Status Workflow**:
   - Create new collection with `status: upcoming`
   - Add products and editorial content
   - Change to `status: live` when ready to publish
   - Use `status: archive` for seasonal/past collections

2. **Display Order**:
   - Use increments of 10 (10, 20, 30...) for easy reordering
   - Lower numbers appear first

3. **Images**:
   - Hero images should be high-resolution (1920x1080px)
   - Use hotspot to control focal point on mobile

### Products

1. **Pricing**:
   - Use `numeric` for standard products
   - Use `on_request` for bespoke/high-value pieces

2. **Availability**:
   - `in_stock`: Ready to ship immediately
   - `made_to_order`: 2-4 weeks lead time
   - `sold_out`: No longer available

3. **Images**:
   - First image is the primary thumbnail
   - Upload 3-5 images minimum
   - Include detail shots of weave/fabric

### Craft Stories

1. **Categories**:
   - `weaving`: Focus on technique (e.g., "The Art of Pochampally Ikat")
   - `heritage`: Focus on artisans/history
   - `materials`: Focus on dyes/fabrics
   - `regional`: Focus on geographic traditions
   - `innovation`: Focus on contemporary interpretations

2. **Publishing**:
   - Set `publishedAt` to control chronological order
   - Use `featured` to highlight on homepage

---

## Technical Notes

### TypeScript Types

All schema types are exported from `src/lib/sanity/client.ts`:
- `Collection`
- `Product`
- `CraftStory`
- `SanityImage`

### ISR (Incremental Static Regeneration)

All collection and product pages use ISR with 60-second revalidation:
```typescript
export const revalidate = 60;
```

This ensures:
- Fast page loads (static generation)
- Fresh content (revalidates every 60 seconds)
- No build required for content updates

---

## Troubleshooting

### Common Issues

**Q: Collections not showing on frontend**  
**A**: Check `status` field - only `live` collections are fetched.

**Q: Products not appearing in collection**  
**A**: Ensure product's `collections` field references the collection.

**Q: Images not loading**  
**A**: Verify Sanity project ID and dataset in environment variables.

**Q: TypeScript errors in Studio**  
**A**: Run `npm run build` in studio directory to regenerate types.

---

## Support & Resources

- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **GROQ Cheat Sheet**: [sanity.io/docs/query-cheat-sheet](https://www.sanity.io/docs/query-cheat-sheet)
- **Sanity Vision**: Use the Vision plugin in Studio to test GROQ queries

---

**Last Updated**: February 1, 2026  
**Schema Version**: 1.0  
**Maintained By**: Sivi Studio Development Team
