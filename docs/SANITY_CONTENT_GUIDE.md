# Sanity Content Management Guide

This guide explains how to manage content for Sivi Studio using Sanity CMS.

## Quick Start

1. Start the Sanity Studio:
   ```bash
   npm run studio
   ```
   This will start the studio at `http://localhost:3333`.

2. Log in with your Sanity credentials (or the project owner's).

## Content Types

### 1. Products

Use this to add items to the "Atelier" catalog.

**Key Fields:**
- **Title**: Name of the garment.
- **Slug**: URL identifier (click "Generate" to create from title).
- **Images**: Upload high-quality editorial shots. The first image is the cover.
- **Price**: In INR.
- **Categories**: Reference to a Category.
- **Material Story**: This is unique to Sivi. Add rich text (headings, paragraphs) about the fabric origin, weave, and craft.
- **Technical Specifications**: Add key-value pairs (e.g., "Fabric" -> "40D Cotton", "Fit" -> "Relaxed", "Care" -> "Dry Clean").

### 2. Categories

Group products (e.g., "Evening Wear", "Casual", "Accessories").

**Key Fields:**
- **Title**: Display name.
- **Cover Image**: Representative image for the collection.

### 3. Editorial Stories

Create blog posts or visual stories ("Scrollytelling").

**Key Fields:**
- **Main Image**: Hero image for the story.
- **Body**: The content. You can insert images between text blocks.
- **Featured Products**: Link specific products mentioned in the story.

## Best Practices

- **Images**: Use WebP or high-quality JPEGs. Vertical orientation (3:4 aspect ratio) works best for fashion.
- **Material Story**: Use "H2" or "H3" for section breaks inside the text. Use "Blockquote" for artisan quotes.
- **Slug**: Always generate unique slugs. If you change a slug, the URL changes (SEO impact).

## Resolving Deployments

Any changes you "Publish" in the Studio are immediately available on the website (if using live API) or after a revalidate period (60 seconds default).
