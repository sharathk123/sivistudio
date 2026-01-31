# Sivi Studio Design System Documentation

> **Version 2.1** — Updated January 31, 2026  
> Complete reference for the Sivi Studio editorial design system

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Animation & Motion](#animation--motion)
7. [Effects & Enhancements](#effects--enhancements)
8. [Utility Classes](#utility-classes)
9. [Component Patterns](#component-patterns)
10. [Branding Assets](#branding-assets)
11. [Best Practices](#best-practices)

---

## Overview

The Sivi Studio design system is a **comprehensive, token-based architecture** that centralizes all design values in `src/app/globals.css` using CSS variables and utility classes. This ensures consistency, maintainability, and scalability across the entire application.

### Core Principles

✅ **Single Source of Truth** — All design tokens defined once  
✅ **No Hardcoding** — Components use CSS variables and utility classes  
✅ **Responsive by Default** — Mobile-first with automatic breakpoints  
✅ **Performance Optimized** — GPU-accelerated animations and transforms  
✅ **Type Safety** — Utility classes provide IDE autocomplete  
✅ **Semantic Naming** — Descriptive class names like `.title-editorial`

---

## Architecture

### File Structure

```
src/app/globals.css
├── @theme                    # CSS variable definitions
│   ├── Color Palette
│   ├── Typography
│   ├── Spacing Scale
│   ├── Animation Tokens
│   ├── Transforms
│   └── Shadows & Effects
└── @layer utilities          # Utility class definitions
    ├── Typography Utilities
    ├── Layout Utilities
    ├── Animation Keyframes
    ├── Gradient Utilities
    ├── Hover Effects
    └── 2026 Enhancements
```

### Design Token Flow

```
CSS Variables (@theme)
    ↓
Utility Classes (@layer utilities)
    ↓
Component Implementation
```

---

## Color System

### Base Palette

**Primary Brand Colors**
```css
--color-sage: #9CA770           /* Primary brand identity */
--color-sage-600: #8A9560       /* Darker sage variant */
--color-sage-700: #788450       /* Darkest sage variant */
```

**Neutral Tones**
```css
--color-ivory: #E4E4DE          /* Sophisticated background */
--color-ivory-50: #F9F9F7       /* Lightest ivory */
--color-ivory-200: #D8D8D2      /* Medium ivory */
--color-ivory-300: #CCCCC6      /* Darker ivory */
--color-bone: #FDFCFB           /* Global soft-white background */
```

**Text Colors**
```css
--color-charcoal: #1A1A1A       /* Primary text */
--color-charcoal-400: #666666   /* Secondary text */
--color-charcoal-600: #4D4D4D   /* Tertiary text */
```

### 2026 Metallic Accents (Zari-Inspired)

**Copper Tones**
```css
--color-copper: #B87333         /* Primary metallic accent */
--color-copper-light: #D4A574   /* Light copper variant */
```

**Gold Tones**
```css
--color-gold: #D4AF37           /* Luxury gold accent */
--color-gold-light: #F0D98E     /* Light gold variant */
```

**Silver Tones**
```css
--color-silver: #C0C0C0         /* Silver accent */
--color-silver-light: #E8E8E8   /* Light silver variant */
```

### Natural Dye Palette

**Indigo (Traditional Blue)**
```css
--color-indigo: #1E3A5F         /* Deep indigo */
--color-indigo-light: #4A6FA5   /* Light indigo */
```

**Madder (Traditional Red)**
```css
--color-madder: #8B3A3A         /* Deep madder red */
--color-madder-light: #C17171   /* Light madder */
```

**Turmeric (Traditional Yellow)**
```css
--color-turmeric: #E6A817       /* Deep turmeric */
--color-turmeric-light: #F4C542 /* Light turmeric */
```

### Color Utility Classes

```css
/* Metallic Accents */
.accent-copper      /* Copper text color */
.accent-gold        /* Gold text color */
.accent-silver      /* Silver text color */
.text-metallic      /* Gradient metallic text */

/* Natural Dyes */
.bg-indigo, .text-indigo
.bg-madder, .text-madder
.bg-turmeric, .text-turmeric

/* Gradients */
.gradient-zari              /* Copper to gold gradient */
.gradient-zari-subtle       /* Light metallic gradient */
.gradient-natural-dye       /* Multi-color natural dye gradient */
```

---

## Typography

### Font Families

```css
--font-family-serif: 'Playfair Display', serif    /* Headings */
--font-family-sans: 'Inter', sans-serif           /* Body text */
--font-family-mono: 'Courier New', monospace      /* Labels */
```

**Special Fonts** (for logo/branding):
- **Bodoni Moda** — Serif brand typography
- **Allura** — Script brand typography

### Typography Scale

```css
/* Titles */
--text-title-sm: 3.75rem        /* 60px - Mobile titles */
--text-title-lg: 6rem           /* 96px - Desktop titles */

/* Subtitles */
--text-subtitle: 2rem           /* 32px - Mobile subtitles */
--text-subtitle-md: 2.25rem     /* 36px - Desktop subtitles */

/* Body & Labels */
--text-caption: 0.75rem         /* 12px - Captions */
--text-body-sm: 0.875rem        /* 14px - Small body text */
--text-label: 0.875rem          /* 14px - Labels */
```

### Letter Spacing

```css
--tracking-ultra-wide: 0.3em    /* Maximum spacing */
--tracking-wide: 0.15em         /* Editorial spacing */
--tracking-wider: 0.1em         /* Luxury spacing */
```

### Typography Utility Classes

```css
/* Editorial Typography */
.title-editorial        /* Large serif italic titles (responsive) */
.subtitle-editorial     /* Medium serif subtitles (responsive) */
.caption-editorial      /* Small mono uppercase captions */
.label-editorial        /* Small mono uppercase labels */

/* Letter Spacing */
.tracking-ultra-wide    /* 0.3em spacing */
.tracking-editorial     /* 0.15em spacing */
.tracking-wide-luxury   /* 0.1em spacing */

/* 2026: Vertical Typography */
.text-vertical          /* Vertical text orientation */
.text-vertical-upright  /* Vertical upright orientation */
.label-vertical         /* Vertical editorial label with styling */
```

---

## Spacing & Layout

### Spacing Scale

```css
/* Section Spacing */
--spacing-section-y: 8rem       /* 128px - Vertical section padding */
--spacing-section-x: 3rem       /* 48px - Horizontal section padding */

/* Grid Spacing */
--spacing-grid-gap: 4rem        /* 64px - Mobile grid gap */
--spacing-grid-gap-md: 6rem     /* 96px - Desktop grid gap */

/* Card Spacing */
--spacing-card-gap: 4rem        /* 64px - Mobile card gap */
--spacing-card-gap-md: 8rem     /* 128px - Desktop card gap */

/* Title Spacing */
--spacing-title-mb: 8rem        /* 128px - Title margin bottom */
--spacing-caption-mt: 2rem      /* 32px - Caption margin top */
--spacing-decorative: 1.5rem    /* 24px - Decorative element spacing */
```

### Layout Utility Classes

```css
/* Section Padding */
.section-padding        /* Responsive section padding (mobile: 1rem, desktop: 3rem) */

/* Grid Layouts */
.grid-editorial         /* 2-column responsive grid (mobile: 1 col, desktop: 2 cols) */

/* Aspect Ratios */
.aspect-portrait        /* 3:4 aspect ratio */
.aspect-landscape       /* 16:9 aspect ratio */
.aspect-square          /* 1:1 aspect ratio */
```

### Dimensions

```css
/* Icons */
--icon-size-sm: 1.25rem         /* 20px - Small icons */
--icon-size-md: 2.5rem          /* 40px - Medium icons */

/* Decorative Elements */
--line-height-sm: 0.0625rem     /* 1px - Thin lines */
--line-height-md: 0.25rem       /* 4px - Medium lines */
--decorative-width: 4rem        /* 64px - Decorative line width */
--decorative-height: 6rem       /* 96px - Decorative line height */
```

---

## Animation & Motion

### Duration Tokens

```css
--duration-fast: 300ms          /* Quick interactions */
--duration-normal: 500ms        /* Standard transitions */
--duration-slow: 700ms          /* Deliberate animations */
--duration-slower: 900ms        /* Cinematic effects */
```

### Delay Tokens

```css
--delay-xs: 100ms               /* Minimal delay */
--delay-sm: 150ms               /* Small delay */
--delay-md: 200ms               /* Medium delay */
--delay-lg: 400ms               /* Large delay */
--delay-xl: 500ms               /* Extra large delay */
```

### Transform Values

```css
--scale-hover: 1.08             /* Image zoom on hover */
--scale-subtle: 1.05            /* Subtle scale effect */
--translate-hover: 4px          /* Hover translation */
--parallax-slow: -80px          /* Slow parallax movement */
--parallax-fast: -180px         /* Fast parallax movement */
```

### Animation Keyframes

```css
@keyframes marquee              /* Horizontal scrolling text */
@keyframes fadeInUp             /* Fade in with upward motion */
@keyframes scaleIn              /* Scale in animation */
@keyframes slideInX             /* Horizontal slide in */
@keyframes pulse                /* Pulsing effect */
```

### Animation Utility Classes

```css
.animate-marquee                /* Marquee scrolling animation */
.hover-scale                    /* Smooth scale transition on hover */
.hover-shadow                   /* Shadow elevation on hover */
```

---

## Effects & Enhancements

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-card-hover: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
--shadow-metallic: 0 4px 12px rgba(184, 115, 51, 0.15)
```

### Opacity Levels

```css
--opacity-overlay: 0.8          /* Dark overlay */
--opacity-overlay-light: 0.2    /* Light overlay */
--opacity-subtle: 0.3           /* Subtle opacity */
--opacity-medium: 0.4           /* Medium opacity */
```

### Border Radius

```css
--radius-sm: 0.125rem           /* 2px - Small radius */
--radius-full: 9999px           /* Full circle */
```

### 2026: Blur Levels (Depth Mapping)

```css
--blur-sm: 4px                  /* Subtle blur */
--blur-md: 8px                  /* Medium blur */
--blur-lg: 16px                 /* Strong blur */
--blur-xl: 24px                 /* Maximum blur */
```

### Gradient Utilities

```css
/* Image Overlays */
.gradient-overlay-dark          /* Dark gradient overlay for images */

/* Decorative Gradients */
.gradient-decorative            /* Vertical sage gradient */
.gradient-decorative-horizontal /* Horizontal sage gradient */

/* Loading States */
.gradient-loading               /* Loading state gradient */
```

### 2026: Advanced Effects

```css
/* Blur Parallax */
.blur-parallax-sm               /* Small blur effect */
.blur-parallax-md               /* Medium blur effect */
.blur-parallax-lg               /* Large blur effect */
.blur-parallax-none             /* No blur */
.blur-on-scroll                 /* Blur changes on scroll */

/* Texture Overlays */
.macro-texture-overlay          /* Fine line texture */
.weave-pattern                  /* Cross-hatch weave simulation */

/* Glass Morphism */
.glass-effect                   /* Frosted glass with backdrop blur */

/* Haptic Visuals */
.touchable-texture              /* Lift effect on hover */

/* Cursor Effects */
.cursor-lens-image              /* Crosshair cursor with lens effect */
```

---

## Utility Classes

### Decorative Elements

```css
.decorative-line                /* 4rem horizontal sage line */
.decorative-line-vertical       /* 6rem vertical sage line */
.decorative-divider             /* 2rem horizontal divider */
```

### Icon Utilities

```css
.icon-sm                        /* 1.25rem icon size */
.icon-md                        /* 2.5rem icon size */
```

### 2026: Sustainability & Provenance

```css
/* Badges */
.sustainability-badge           /* Pill-shaped sustainability badge */
.artisan-hours                  /* Craftsmanship time indicator */
.provenance-stamp               /* Wax seal-inspired authenticity marker */
```

### Shadow Utilities

```css
.shadow-metallic                /* Metallic shadow effect */
```

---

## Component Patterns

### Editorial Hero Section

```tsx
<section className="section-padding bg-ivory-50">
  <h1 className="title-editorial">The Atelier</h1>
  <p className="caption-editorial tracking-ultra-wide">
    Handcrafted Collection
  </p>
</section>
```

### MoodBoard Grid

```tsx
<section className="section-padding weave-pattern">
  <div className="grid-editorial">
    {/* Grid items */}
  </div>
</section>
```

### Product Card with 2026 Enhancements

```tsx
<article className="group macro-texture-overlay">
  <div className="aspect-portrait hover-shadow">
    {/* Image with blur parallax */}
    <motion.img style={{ filter: `blur(${blur}px)` }} />
    
    {/* Provenance stamp */}
    <div className="provenance-stamp">Authentic</div>
    
    {/* Metallic CTA */}
    <div className="gradient-zari shadow-metallic">
      View Details
    </div>
  </div>
  
  {/* Artisan hours badge */}
  <div className="artisan-hours">
    120+ Artisan Hours
  </div>
</article>
```

### Sticky Header with Glassmorphism

```tsx
<motion.header 
  style={{ 
    backgroundColor: scrollBg,
    backdropFilter: scrollBlur 
  }}
  className="fixed top-0 z-40"
>
  {/* Header content */}
</motion.header>
```

---

## Branding Assets

### Favicon & Icons
The site uses custom branded iconography generated to match the premium "Couturier" identity.

- **Primary Logo Icon**: A stylized serif 'S' with a needle silhouette in gold.
- **Favicon**: Multi-size icons (`32x32`, `16x16`) for cross-browser compatibility.
- **Apple Touch Icon**: `180x180` high-resolution icon for mobile bookmarks.
- **Assets Location**: `public/` directory (`favicon.ico`, `logo-icon.png`, etc.)

### Branding Metadata
Metadata is centralized in `src/app/layout.tsx` using the Next.js Metadata API.

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
```

---

## Best Practices

### ✅ DO

1. **Always use CSS variables** for colors, spacing, and effects
2. **Use utility classes** for typography and layout
3. **Leverage responsive utilities** (they handle breakpoints automatically)
4. **Use semantic class names** (`.title-editorial` not `.text-6xl`)
5. **Combine utilities** for complex effects (`.hover-scale hover-shadow`)
6. **Use Framer Motion** for complex animations with CSS variable integration
7. **Test on mobile first** then enhance for desktop

### ❌ DON'T

1. **Never hardcode colors** — Use CSS variables or utility classes
2. **Avoid inline styles** for static values — Use utility classes
3. **Don't duplicate spacing values** — Use spacing scale variables
4. **Never skip responsive design** — All components must be mobile-friendly
5. **Don't create one-off utilities** — Extend the design system instead
6. **Avoid mixing units** — Stick to rem for consistency

### Performance Optimization

```tsx
// ✅ Good: Use CSS variables with Framer Motion
<motion.div style={{ scale: isHovered ? 'var(--scale-hover)' : 1 }} />

// ✅ Good: Use will-change for animated properties
<div className="blur-on-scroll" /> // Already has will-change: filter

// ✅ Good: Use GPU-accelerated properties
transform, opacity, filter // These are hardware-accelerated

// ❌ Avoid: Animating layout properties
width, height, margin, padding // These trigger layout recalculation
```

### Accessibility

```tsx
// ✅ Ensure sufficient color contrast
// All text colors meet WCAG AA standards

// ✅ Use semantic HTML with utility classes
<h1 className="title-editorial">...</h1>

// ✅ Provide alt text for images
<img alt="Handwoven Pochampally Saree" />

// ✅ Ensure interactive elements are keyboard accessible
<button className="hover-scale">...</button>
```

---

## Updating the Design System

### Adding New Variables

1. **Define in `@theme` block** in `globals.css`
```css
@theme {
  --color-new-accent: #HEXCODE;
}
```

2. **Create utility class** in `@layer utilities`
```css
@layer utilities {
  .accent-new {
    color: var(--color-new-accent);
  }
}
```

3. **Document in this file** with usage examples

### Modifying Existing Values

1. **Update in `globals.css`** under `@theme`
2. **Changes apply automatically** to all components using that token
3. **No component files need modification**

### Testing Changes

```bash
# Run dev server
npm run dev

# Check all pages for visual consistency
# Verify responsive behavior
# Test animations and interactions
```

---

## Quick Reference

### Most Used Utilities

```css
/* Typography */
.title-editorial, .subtitle-editorial, .caption-editorial, .label-editorial

/* Layout */
.section-padding, .grid-editorial, .aspect-portrait

/* Effects */
.hover-scale, .hover-shadow, .gradient-overlay-dark

/* 2026 Enhancements */
.gradient-zari, .text-metallic, .weave-pattern, .sustainability-badge
```

### Common Patterns

```tsx
// Section with padding
<section className="section-padding">

// Editorial title
<h2 className="title-editorial">

// Responsive grid
<div className="grid-editorial">

// Hover effect card
<div className="hover-scale hover-shadow">

// Metallic accent
<span className="accent-copper">

// Sustainability badge
<div className="sustainability-badge">
```

---

## Resources

- **Implementation**: `src/app/globals.css`
- **Components**: `src/components/editorial/`, `src/components/ui/`
- **Project Context**: `SIVI_PROJECT_CONTEXT.md`
- **2026 Enhancements**: `2026_ENHANCEMENTS.md`

---

**Last Updated**: January 31, 2026  
**Version**: 2.0  
**Maintained by**: Sivi Studio Development Team
