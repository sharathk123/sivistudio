# Sivi Studio - Remaining Work Stories

**Project**: Sivi Studio Website  
**Created**: January 31, 2026  
**Status**: Planning Phase

---

## 📋 Overview

This document contains user stories for all remaining pages and features that need to be implemented for the Sivi Studio website. The Collections page is excluded as it will fetch data from Sanity CMS.

---

## 🎯 Menu Items to Implement

Based on the navigation menu, the following pages need to be created:

1. ✅ **Home** - COMPLETED
2. ⏳ **Collections** - TO BE INTEGRATED WITH SANITY (excluded from this document)
3. ✅ **The Story** - COMPLETED (Jan 31, 2026)
4. ✅ **Heritage** - COMPLETED (Jan 31, 2026) - ⚠️ Pending unique images
5. 📝 **Custom Tailoring** - TO DO
6. 📝 **Account** - TO DO
7. ✅ **Contact** - COMPLETED (Jan 31, 2026)

---

## 📖 User Stories

### Epic 1: The Story Page

**As a** visitor  
**I want to** read about Sivi's brand story and philosophy  
**So that** I can understand the brand's values and connect emotionally

#### Story 1.1: Create Story Page Layout
**Priority**: High  
**Estimate**: 3 points  
**Status**: ✅ COMPLETED (Jan 31, 2026)

**Acceptance Criteria:**
- [x] Create `/story/page.tsx` route
- [x] Implement hero section with full-width image
- [x] Add brand story narrative sections
- [x] Include founder's message or vision statement
- [x] Add timeline of brand milestones (optional)
- [x] Integrate with existing design system (sage, bone, charcoal colors)
- [x] Ensure responsive design for mobile/tablet/desktop
- [x] Add smooth scroll animations using Framer Motion

**Design Notes:**
- Use editorial layout similar to homepage
- Include unique images (no repetition across site):
  - `hero-modern-vibrant.png` for hero section
  - `story-origins-workshop.png` for origins section
  - `story-jamdani-dress.png` for craft section
  - `story-kanjivaram-outfit.png` for innovation showcase
- Typography: Mix of serif (headings) and sans-serif (body)
- Sections: Hero → Origin Story → Pull Quote → Innovation → Philosophy

**Technical Notes:**
- Reuse `EditorialHero` component
- Create new `StorySection` component for narrative blocks
- Use `ChromaticWrapper` for color transitions between sections

---

#### Story 1.2: Add Artisan/Weaver Profiles
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Create section showcasing artisan partners
- [ ] Include brief profiles or quotes from weavers
- [ ] Add images of weaving process (if available)
- [ ] Highlight different regions: Telangana, Bengal, Odisha, Tamil Nadu
- [ ] Make it visually engaging with grid or carousel layout

**Design Notes:**
- Use card-based layout
- Include location tags for each artisan/region
- Maintain quiet luxury aesthetic

---

### Epic 2: Heritage Page

**As a** visitor interested in Indian textiles  
**I want to** learn about the heritage and history of handloom weaving  
**So that** I can appreciate the cultural significance of the products

#### Story 2.1: Create Heritage Page Layout
**Priority**: High  
**Estimate**: 3 points  
**Status**: ✅ COMPLETED (Jan 31, 2026)

**Acceptance Criteria:**
- [x] Create `/heritage/page.tsx` route
- [x] Implement hero section with heritage-focused imagery
- [x] Add sections for each handloom type:
  - Pochampally Ikat (Telangana)
  - Jamdani (Bengal)
  - Sambalpuri (Odisha)
  - Kanjivaram (Tamil Nadu)
  - Gadwal Silk (Telangana)
  - Uppada Weave (Andhra Pradesh)
- [x] Include history, technique, and characteristics for each
- [x] Add visual examples of each weave pattern
- [x] Ensure responsive design
- [x] Create interactive weave explorer with button navigation
- [x] Add smooth transitions between weaves

**Design Notes:**
- Interactive button-based navigation for different weaves
- Each weave has detailed information: description, technique, characteristics
- Sections: Hero → Introduction → Interactive Explorer → Pull Quote → Preservation
- Typography: Mix of serif (headings) and sans-serif (body)
- Color transitions using ChromaticWrapper

**Images Currently Used (Temporary - Pending Unique Images):**
- Hero: `ikat-fabric-closeup.png` (placeholder)
- Pochampally: `saree-editorial.png` (temporary)
- Jamdani: `story-jamdani-dress.png` (temporary)
- Sambalpuri: `kurta-mannequin.png` (temporary)
- Kanjivaram: `story-kanjivaram-outfit.png` (temporary)
- Gadwal: `contemporary-dress-studio.png` (temporary)
- Uppada: `layered-outfit-modern-colors.png` (temporary)

**⚠️ TODO - Generate Unique Images (When Quota Resets):**
- [x] `heritage-hero-textiles.png` - Fabric samples showcasing all 6 weaves
- [x] `heritage-pochampally-dress.png` - Forest green geometric Ikat dress
- [x] `heritage-jamdani-saree.png` - Cream Jamdani saree in traditional drape
- [x] `heritage-sambalpuri-outfit.png` - Brick red Sambalpuri kurta with tribal motifs
- [x] `heritage-kanjivaram-dress.png` - Royal purple Kanjivaram silk dress
- [x] `heritage-gadwal-ensemble.png` - Silk-cotton blend outfit
- [x] `heritage-uppada-dress.png` - Lightweight Uppada silk dress

**Technical Notes:**
- Interactive state management for weave selection
- Dynamic content rendering based on active weave
- Smooth animations with Framer Motion
- Responsive grid layout for weave explorer
- ChromaticWrapper for color transitions

---

#### Story 2.2: Add Interactive Weave Pattern Explorer
**Priority**: Low  
**Estimate**: 5 points

**Acceptance Criteria:**
- [ ] Create interactive element to explore different patterns
- [ ] Allow users to zoom into fabric textures
- [ ] Show before/after of raw material to finished fabric
- [ ] Add educational tooltips

**Design Notes:**
- Use lightbox or modal for zoomed views
- Maintain minimalist aesthetic

---

### Epic 3: Custom Tailoring Page

**As a** potential customer  
**I want to** learn about custom tailoring services  
**So that** I can get a personalized handloom outfit

#### Story 3.1: Create Custom Tailoring Page
**Priority**: High  
**Estimate**: 4 points

**Acceptance Criteria:**
- [ ] Create `/custom-tailoring/page.tsx` route
- [ ] Implement hero section explaining custom service
- [ ] Add "How It Works" section with step-by-step process:
  1. Consultation
  2. Fabric Selection
  3. Design Customization
  4. Measurements
  5. Crafting
  6. Delivery
- [ ] Include pricing information or "Contact for Quote"
- [ ] Add gallery of past custom work (use generated images)
- [ ] Include CTA to book consultation or contact
- [ ] Ensure responsive design

**Design Notes:**
- Use `custom-tailoring.png` image (already generated)
- Create numbered step cards with icons
- Use sage color for CTAs
- Include testimonials section (optional)

**Technical Notes:**
- Create `ProcessStep` component for reusability
- Add contact form or link to contact page
- Use `MoodBoardGrid` for gallery of custom work

---

#### Story 3.2: Add Measurement Guide
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Create downloadable measurement guide PDF
- [ ] Add visual diagram showing how to take measurements
- [ ] Include size chart
- [ ] Add FAQ section for common questions

**Design Notes:**
- Use illustrations or simple diagrams
- Make it printable-friendly

---

### Epic 4: Account Page

**As a** registered user  
**I want to** manage my account and view my orders  
**So that** I can track purchases and update my information

#### Story 4.1: Create Account Dashboard
**Priority**: High  
**Estimate**: 5 points

**Acceptance Criteria:**
- [ ] Create `/account/page.tsx` route
- [ ] Implement authentication check (redirect to login if not authenticated)
- [ ] Add dashboard sections:
  - Profile Information
  - Order History
  - Saved Addresses
  - Wishlist (optional)
  - Preferences
- [ ] Allow editing of profile information
- [ ] Display order status and tracking
- [ ] Ensure responsive design

**Design Notes:**
- Use `account.png` image (already generated)
- Create sidebar navigation for different sections
- Use card-based layout for orders
- Maintain consistent design system

**Technical Notes:**
- Integrate with Supabase Auth for authentication
- Create protected route wrapper
- Use React Hook Form for profile editing
- Fetch user data from Supabase database

---

#### Story 4.2: Implement Order Details View
**Priority**: Medium  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Create order details page `/account/orders/[id]`
- [ ] Display order items, quantities, prices
- [ ] Show order status timeline
- [ ] Include shipping information
- [ ] Add download invoice option
- [ ] Show estimated delivery date

**Design Notes:**
- Use timeline component for order status
- Include product images from order

---

#### Story 4.3: Add Wishlist Functionality
**Priority**: Low  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Create wishlist page `/account/wishlist`
- [ ] Allow adding/removing items from wishlist
- [ ] Display wishlist items in grid
- [ ] Add "Move to Cart" functionality
- [ ] Show stock status for wishlist items

**Technical Notes:**
- Store wishlist in Supabase database
- Create wishlist context for global state

---

### Epic 5: Contact Page

**As a** visitor  
**I want to** contact Sivi Studio  
**So that** I can ask questions or request information

#### Story 5.1: Create Contact Page
**Priority**: High  
**Estimate**: 3 points  
**Status**: ✅ COMPLETED (Jan 31, 2026)

**Acceptance Criteria:**
- [x] Create `/contact/page.tsx` route
- [x] Implement hero section
- [x] Add contact form with fields:
  - Name (required)
  - Email (required)
  - Subject (required)
  - Message (required)
- [x] Include studio address and contact information
- [x] Show business hours
- [x] Add FAQ section
- [x] Ensure responsive design
- [x] Use `contact.png` image for hero layout
- [x] Implement smooth animations with Framer Motion
- [x] Use split layout for large screens

**Design Notes:**
- Use `contact.png` image (already generated)
- Split layout: Form on left, info on right (desktop)
- Use sage color for submit button
- Add subtle animations on form interactions

**Technical Notes:**
- Use React Hook Form for form handling
- Implement email sending via API route (Resend or similar)
- Add CAPTCHA to prevent spam (optional)
- Store inquiries in Supabase database

---

#### Story 5.2: Add FAQ Section
**Priority**: Medium  
**Estimate**: 2 points  
**Status**: ✅ COMPLETED (Jan 31, 2026) -> Merged into Contact Page

**Acceptance Criteria:**
- [x] Create FAQ accordion on contact page
- [x] Include common questions:
  - Shipping & Delivery
  - Care Instructions
  - Custom Tailoring
  - Returns Policy
- [x] Make it interactive (expand/collapse)

---

## 🔧 Technical Stories

### Story T1: Set up Sanity CMS Integration
**Priority**: High  
**Estimate**: 5 points

**Acceptance Criteria:**
- [ ] Set up Sanity project
- [ ] Define schemas for:
  - Products
  - Collections
  - Blog Posts (optional)
  - Pages (for dynamic content)
- [ ] Create Sanity client in Next.js
- [ ] Implement data fetching utilities
- [ ] Add environment variables for Sanity config

**Technical Notes:**
- Use `@sanity/client` and `next-sanity`
- Implement ISR (Incremental Static Regeneration) for product pages
- Add image optimization with Sanity Image URLs

---

### Story T2: Implement SEO Optimization
**Priority**: High  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Add metadata to all pages
- [ ] Implement Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (JSON-LD) for products
- [ ] Add canonical URLs

**Technical Notes:**
- Use Next.js 15 Metadata API
- Generate dynamic metadata for product pages

---

### Story T3: Add Analytics and Tracking
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Integrate Google Analytics 4
- [ ] Add event tracking for:
  - Product views
  - Add to cart
  - Checkout initiation
  - Form submissions
- [ ] Implement Facebook Pixel (optional)
- [ ] Add cookie consent banner

**Technical Notes:**
- Use `next/script` for analytics scripts
- Create analytics utility functions

---

### Story T4: Performance Optimization
**Priority**: Medium  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Optimize all images (already using Next.js Image)
- [ ] Implement code splitting
- [ ] Add loading states for async operations
- [ ] Optimize font loading
- [ ] Minimize JavaScript bundle size
- [ ] Achieve Lighthouse score > 90 for all metrics

**Technical Notes:**
- Use dynamic imports for heavy components
- Implement skeleton loaders
- Use `next/font` for font optimization

---

### Story T5: Implement Error Handling
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Create custom 404 page
- [ ] Create custom 500 error page
- [ ] Add error boundaries (already have ErrorBoundary component)
- [ ] Implement graceful error messages
- [ ] Add error logging (Sentry or similar)

**Technical Notes:**
- Use Next.js error handling conventions
- Style error pages to match brand

---

## 🎨 Design Stories

### Story D1: Create Additional Images
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Generate images for missing sections:
  - Artisan portraits (if needed)
  - Weaving process images
  - Custom tailoring process images
  - Additional product lifestyle images
- [ ] Ensure all images follow brand guidelines (no people, mannequins only)
- [ ] Maintain consistent studio aesthetic

---

### Story D2: Design System Documentation
**Priority**: Low  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Document all design tokens
- [ ] Create component library documentation
- [ ] Add usage examples for each component
- [ ] Include accessibility guidelines

---

## 📱 Mobile Stories

### Story M1: Mobile Navigation Enhancement
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Ensure mobile menu works smoothly on all pages
- [ ] Add swipe gestures for navigation (optional)
- [ ] Optimize touch targets for mobile
- [ ] Test on various mobile devices

---

### Story M2: Mobile-Specific Optimizations
**Priority**: Medium  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Optimize images for mobile viewport
- [ ] Ensure forms are mobile-friendly
- [ ] Add mobile-specific layouts where needed
- [ ] Test checkout flow on mobile

---

## 🧪 Testing Stories

### Story Test1: E2E Testing Setup
**Priority**: Medium  
**Estimate**: 5 points

**Acceptance Criteria:**
- [ ] Set up Playwright or Cypress
- [ ] Write E2E tests for critical user flows:
  - Homepage navigation
  - Product browsing
  - Add to cart
  - Checkout process
  - Contact form submission
- [ ] Set up CI/CD pipeline for tests

---

### Story Test2: Accessibility Testing
**Priority**: High  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Run axe-core accessibility audit
- [ ] Fix all critical accessibility issues
- [ ] Test with screen readers
- [ ] Ensure keyboard navigation works on all pages
- [ ] Achieve WCAG 2.1 AA compliance

---

## 📦 Deployment Stories

### Story Deploy1: Production Deployment
**Priority**: High  
**Estimate**: 3 points

**Acceptance Criteria:**
- [ ] Set up production environment on Vercel
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up CDN for images
- [ ] Test production build

---

### Story Deploy2: Monitoring and Logging
**Priority**: Medium  
**Estimate**: 2 points

**Acceptance Criteria:**
- [ ] Set up error monitoring (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Create alerting for critical issues

---

## 📊 Priority Matrix

### Must Have (P0)
1. The Story Page (Story 1.1)
2. Heritage Page (Story 2.1)
3. Custom Tailoring Page (Story 3.1)
4. Account Dashboard (Story 4.1)
5. Contact Page (Story 5.1)
6. Sanity CMS Integration (Story T1)
7. SEO Optimization (Story T2)
8. Accessibility Testing (Story Test2)
9. Production Deployment (Story Deploy1)

### Should Have (P1)
1. Artisan Profiles (Story 1.2)
2. Measurement Guide (Story 3.2)
3. Order Details View (Story 4.2)
4. FAQ Section (Story 5.2)
5. Analytics (Story T3)
6. Performance Optimization (Story T4)
7. Error Handling (Story T5)
8. Mobile Navigation (Story M1)

### Nice to Have (P2)
1. Interactive Weave Explorer (Story 2.2)
2. Wishlist (Story 4.3)
3. Additional Images (Story D1)
4. Design System Docs (Story D2)
5. Mobile Optimizations (Story M2)
6. E2E Testing (Story Test1)
7. Monitoring (Story Deploy2)

---

## 🗓️ Suggested Sprint Plan

### Sprint 1: Core Pages (2 weeks)
- The Story Page
- Heritage Page
- Contact Page
- SEO Optimization

### Sprint 2: Services & Account (2 weeks)
- Custom Tailoring Page
- Account Dashboard
- Order Details View
- Error Handling

### Sprint 3: Integration & Testing (2 weeks)
- Sanity CMS Integration
- Analytics
- Accessibility Testing
- Performance Optimization

### Sprint 4: Polish & Deploy (1 week)
- Mobile Optimizations
- FAQ Sections
- Production Deployment
- Monitoring Setup

---

## 📝 Notes

- All pages should follow the established design system (sage, bone, charcoal colors)
- Maintain quiet luxury aesthetic throughout
- Ensure all images follow brand guidelines (mannequins, no people)
- **🎨 IMAGE UNIQUENESS RULE**: Each page section must use unique images - do NOT repeat the same image across different pages (except hero images for brand consistency). Generate new images for each section to maintain visual diversity and prevent repetition.
- Use existing components where possible for consistency
- Prioritize accessibility and performance
- Test on multiple devices and browsers

---

**Total Estimated Points**: ~70 points  
**Completed Points**: 11 points (Story 1.1 + 2.1 + 5.1 + 5.2)  
**Remaining Points**: ~59 points  
**Estimated Timeline**: 6-7 weeks (with 1 developer)

---

**Last Updated**: January 31, 2026 14:40 IST  
**Status**: In Progress - Core Pages (Story, Heritage, Contact) Completed. Routing updated. Placeholders created for Account/Custom Tailoring. Heritage images generated.



