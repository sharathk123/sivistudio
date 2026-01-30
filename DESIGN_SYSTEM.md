# Design System Documentation

## Overview
All UI values are now centralized in `globals.css` using CSS variables and utility classes. This ensures consistency and makes updates easy.

## CSS Variables

### Colors
- `--color-sage`: Primary brand color (#9CA770)
- `--color-sage-600`, `--color-sage-700`: Sage variations
- `--color-ivory-50`, `--color-ivory-200`, `--color-ivory-300`: Background tones
- `--color-charcoal`, `--color-charcoal-400`, `--color-charcoal-600`: Text colors
- `--color-bone`: Accent color

### Typography
- `--font-family-serif`: Playfair Display (headings)
- `--font-family-sans`: Inter (body text)
- `--font-family-mono`: Courier New (labels)

### Spacing Scale
- `--spacing-section-y`: 8rem (vertical section padding)
- `--spacing-section-x`: 3rem (horizontal section padding)
- `--spacing-grid-gap`: 4rem (mobile grid gap)
- `--spacing-grid-gap-md`: 6rem (desktop grid gap)
- `--spacing-card-gap`: 4rem/8rem (card spacing)
- `--spacing-title-mb`: 8rem (title margin bottom)

### Typography Scale
- `--text-title-sm`: 3.75rem (mobile titles)
- `--text-title-lg`: 6rem (desktop titles)
- `--text-subtitle`: 2rem (mobile subtitles)
- `--text-subtitle-md`: 2.25rem (desktop subtitles)
- `--text-caption`: 0.75rem (captions)
- `--text-label`: 0.875rem (labels)

### Letter Spacing
- `--tracking-ultra-wide`: 0.3em
- `--tracking-wide`: 0.15em
- `--tracking-wider`: 0.1em

### Animation
- `--duration-fast`: 300ms
- `--duration-normal`: 500ms
- `--duration-slow`: 700ms
- `--duration-slower`: 900ms
- `--delay-xs` to `--delay-xl`: 100ms to 500ms

### Transforms
- `--scale-hover`: 1.08 (image zoom on hover)
- `--scale-subtle`: 1.05 (subtle scale)
- `--translate-hover`: 4px
- `--parallax-slow`: -80px
- `--parallax-fast`: -180px

### Shadows
- `--shadow-sm`: Small shadow
- `--shadow-card`: Default card shadow
- `--shadow-card-hover`: Elevated hover shadow

### Other
- `--opacity-overlay`: 0.8
- `--opacity-overlay-light`: 0.2
- `--icon-size-sm`: 1.25rem
- `--icon-size-md`: 2.5rem
- `--aspect-portrait`: 3/4
- `--aspect-landscape`: 16/9
- `--aspect-square`: 1/1

## Utility Classes

### Typography
- `.title-editorial`: Large serif italic titles (responsive)
- `.subtitle-editorial`: Medium serif subtitles (responsive)
- `.caption-editorial`: Small mono uppercase captions
- `.label-editorial`: Small mono uppercase labels
- `.tracking-ultra-wide`: 0.3em letter spacing
- `.tracking-editorial`: 0.15em letter spacing
- `.tracking-wide-luxury`: 0.1em letter spacing

### Layout
- `.section-padding`: Responsive section padding
- `.grid-editorial`: 2-column responsive grid
- `.aspect-portrait`: 3:4 aspect ratio
- `.aspect-landscape`: 16:9 aspect ratio
- `.aspect-square`: 1:1 aspect ratio

### Gradients
- `.gradient-overlay-dark`: Dark overlay for images
- `.gradient-decorative`: Vertical sage gradient
- `.gradient-decorative-horizontal`: Horizontal sage gradient
- `.gradient-loading`: Loading state gradient

### Hover Effects
- `.hover-scale`: Smooth scale transition
- `.hover-shadow`: Shadow elevation on hover

### Decorative Elements
- `.decorative-line`: 4rem horizontal line
- `.decorative-line-vertical`: 6rem vertical line
- `.decorative-divider`: 2rem horizontal divider

### Icons
- `.icon-sm`: 1.25rem icon size
- `.icon-md`: 2.5rem icon size

## Usage Examples

### Using Utility Classes
```tsx
<h2 className="title-editorial">The Atelier</h2>
<p className="caption-editorial">Handcrafted Collection</p>
<div className="section-padding">...</div>
<div className="grid-editorial">...</div>
```

### Using CSS Variables in Inline Styles
```tsx
<motion.div
  animate={{ scale: isHovered ? 'var(--scale-hover)' : 1 }}
  style={{ scale: isHovered ? 'var(--scale-hover)' : 1 }}
/>
```

### Using CSS Variables in JavaScript
```tsx
const parallaxValue = parseInt(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--parallax-slow') || '-80'
)
```

## Benefits

1. **Single Source of Truth**: All design tokens in one place
2. **Easy Updates**: Change a value once, updates everywhere
3. **Consistency**: Ensures design consistency across components
4. **Maintainability**: Easier to maintain and scale
5. **Type Safety**: Utility classes provide autocomplete in editors
6. **Performance**: CSS variables are more performant than inline styles

## Updating the Design System

To modify the design:
1. Update values in `globals.css` under `@theme` or `@layer utilities`
2. Changes automatically apply to all components using those tokens
3. No need to touch component files for design tweaks
