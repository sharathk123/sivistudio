# Sivi Studio - Coding Standards & Best Practices

This document outlines the engineering standards, design patterns, and performance guidelines for the Sivi Studio codebase.

## 1. Architecture & Data Flow

### Repository Pattern (Sanity CMS)
We use a loose **Repository Pattern** to decouple data fetching from UI components.
- **Queries**: All GROQ queries must be defined in `src/lib/sanity/queries.ts`.
- **Types**: all TypeScript interfaces must be in `src/lib/sanity/types.ts`.
- **Fetchers**: Helper functions (e.g., `getProducts`, `getCollection`) live in `src/lib/sanity/client.ts`.
- **Rule**: Components should **never** define raw GROQ queries. Always import a helper function.

### State Management
- **React Context**: Use for global UI state (Cart, Auth, Theme).
- **LocalStorage**:
  - **Optimization**: Never store full raw objects from Sanity (which may contain huge rich text blocks).
  - **Standard**: Always define a `Compact` type (e.g., `CompactProduct`) containing only the fields needed for display/logic before persistence.
  - **Hydration**: Always use a `isLoaded` flag to prevent overwriting LocalStorage on initial mount race conditions.

## 2. Styling & Design System

### Global Variables vs. Hardcoding
- **Rule**: Do **NOT** use arbitrary Tailwind values (e.g., `w-[480px]`, `tracking-[0.2em]`) for repeated design elements.
- **Implementation**:
  1. Define the value as a CSS variable in `src/app/globals.css` (e.g., `--width-drawer`, `--tracking-nav`).
  2. Use the variable in Tailwind: `w-[var(--width-drawer)]`.
  3. Or create a utility class in `@layer utilities`: `.tracking-nav`.

### Typography & Fonts
- **Performance**: Never use CSS `@import` for fonts (e.g., Google Fonts URL). This is render-blocking.
- **Standard**: Use `next/font/google` in `src/app/layout.tsx`.
- **Usage**: Inject font variables into the `<html>` tag and reference them in CSS variables (e.g., `--font-bodoni`).

### "Editorial" Aesthetic
- **Colors**: Use the defined palette: `sage`, `bone`, `charcoal`, `copper`. Avoid generic `black` or `white`.
- **Spacing**: Generous usage of whitespace.
- **Typography**: Mix `serif` (Playfair/Bodoni) for headings with `sans` (Inter) for body and `mono` for technical details.

## 3. UI/UX & Accessibility

### Interaction Design
- **Touch Targets**: Interactive elements must be at least **40px** (`w-10 h-10`). Avoid `w-8 h-8` for primary actions.
- **Tactile Feedback**: Primary buttons should have an active state (e.g., `active:scale-[0.98]`) to feel responsive.
- **Content Visibility**: For product titles, avoid `truncate` (one line). Use `line-clamp-2` or `line-clamp-3` to ensure users can read full details of premium items.

### Accessibility
- **Semantic HTML**: Use `<button>` for actions and `<Link>` for navigation.
- **Alt Text**: All images must have meaningful `alt` text.
- **Focus Management**: (Future) Ensure drawers and modals trap focus.

## 4. File Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/              # Generic shared components (Buttons, Header, Footer)
│   ├── cart/            # Feature-specific components
│   ├── editorial/       # Narrative components
│   └── shop/            # Product components
├── context/             # React Context Providers
├── lib/
│   ├── sanity/          # CMS logic (client, queries, types)
│   └── utils.ts         # Helper functions
└── styles/              # (Deprecated - use globals.css)
```

## 5. Performance Checklist

- [ ] **Images**: Use `next/image` with `sizes` prop.
- [ ] **Fonts**: Self-hosted via `next/font`.
- [ ] **Bundle Size**: Avoid large dependencies (e.g., Moment.js, heavy Lodash imports).
- [ ] **Vulnerabilities**: Run `npm audit` regularly. Use `npm audit fix` for non-breaking changes.
