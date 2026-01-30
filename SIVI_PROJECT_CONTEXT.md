# Sivi Studio - Project Context

> **Global Manifest & Technical Specification**  
> *Last Updated: 2026-01-30*

---

## 1. Brand Identity & Design System

### Brand Persona
**Sivi the Couturier** is a premium, Hyderabad-based fashion studio focused on **Quiet Luxury**, conscious craft, and custom tailoring for all age groups.

### Design Philosophy
**Ultra-modern Editorial** — Move away from standard e-commerce grids toward asymmetrical, magazine-style layouts and **"scrollytelling"**.

### Core Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Sage Green** | `#9CA770` | Primary brand identity, icons, and action accents |
| **Ethereal Ivory** | `#E4E4DE` | Sophisticated background for primary editorial sections |
| **Midnight Charcoal** | `#1A1A1A` | High-contrast drama for evening wear and material deep-dives |
| **Unbleached Bone** | `#FDFCFB` | Global soft-white site background |

### Typography

- **Headings**: Serif (**Playfair Display**)  
  → Bold, oversized, and often italicized
  
- **Body**: Sans-Serif (**Inter**)  
  → Minimalist, wide letter-spacing, and modern

---

## 2. Technical Architecture (Headless)

### Core Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15+ (App Router) | React framework with Tailwind CSS v4 and Framer Motion |
| **CMS** | Sanity.io | Source of truth for editorial content, fabric stories, and product details |
| **Database** | Supabase | Transactional data, user profiles, and custom measurement logs |
| **AI Engine** | Gemini 1.5 Pro | Powers "Digital Couturier" Stylist and fabric intelligence modules |

### Integrations

- **Payments**: Razorpay (UPI, Cards, Netbanking)
- **Logistics**: Shiprocket with logic for Hyderabad Studio Pickup
- **Support**: WhatsApp Business for "Boutique Concierge" bridge

---

## 3. Database Schema (Supabase)

### Tables Overview

#### `profiles`
Linked to `auth.users`. Tracks user identity and location.

```sql
- id (uuid, FK to auth.users)
- full_name (text)
- email (text)
- hyderabad_locality (text, nullable)
- created_at (timestamp)
```

#### `measurements`
One-to-many link to profiles. Stores custom sizing data.

```sql
- id (uuid, PK)
- profile_id (uuid, FK to profiles)
- bust (numeric)
- waist (numeric)
- hips (numeric)
- length (numeric)
- age_group (text) -- e.g., 'adult', 'teen', 'child'
- created_at (timestamp)
```

#### `orders`
Tracks order lifecycle and payment integration.

```sql
- id (uuid, PK)
- profile_id (uuid, FK to profiles)
- status (text) -- 'placed', 'processing', 'shipped', 'delivered'
- razorpay_order_id (text)
- total_amount (numeric)
- created_at (timestamp)
```

#### `order_items`
Bridge between Supabase and Sanity product catalog.

```sql
- id (uuid, PK)
- order_id (uuid, FK to orders)
- sanity_product_id (text) -- Reference to Sanity document
- selected_size (text)
- quantity (integer)
- price (numeric)
```

#### `ai_consultations`
Stores JSONB logs of Gemini Stylist interactions for long-term personalization.

```sql
- id (uuid, PK)
- profile_id (uuid, FK to profiles)
- conversation_log (jsonb)
- recommendations (jsonb)
- created_at (timestamp)
```

---

## 4. Key Implementation Rules

### 🎨 Chromatic Pacing
Background colors **MUST** transition (e.g., Ivory → Charcoal) between homepage sections to signal narrative shifts.

### 📖 The "Material Story"
Every product page must include a block explaining technical specs like:
- 40D foam structure
- 60s count cotton density
- Fabric origin and craft heritage

### 🤖 AI Persona
The Gemini API Stylist must maintain a **"Sophisticated, Premium, and Helpful"** tone, prioritizing Sivi's fabric heritage.

### 📍 Local Logistics
Users in Hyderabad should automatically see **"Studio Pickup"** options based on their `profile.hyderabad_locality`.

---

## 5. Directory Reference

### Documentation
```
docs/products/*.md
```
Product technical specs and material stories

### Frontend Components
```
src/components/
├── ui/          # Reusable design system components
├── editorial/   # Magazine-style layout components
└── ai/          # Gemini Stylist interface components
```

### Database Migrations
```
supabase/migrations/
```
SQL migration files for schema evolution

### Library Helpers
```
src/lib/
├── sanity/      # CMS client and query helpers
├── supabase/    # Database client and auth
└── gemini/      # AI integration and prompt engineering
```

---

## 6. Development Workflow

### Environment Setup
1. Copy `.env.local` and populate all API keys
2. Run Supabase migrations: `supabase db push`
3. Configure Sanity Studio: `sanity init`
4. Start dev server: `npm run dev`

### Deployment Checklist
- [ ] All environment variables configured in Vercel
- [ ] Sanity production dataset deployed
- [ ] Supabase RLS policies enabled
- [ ] Razorpay webhook endpoints configured
- [ ] WhatsApp Business API connected

---

## 7. Brand Voice Guidelines

### Tone
- **Sophisticated** yet approachable
- **Premium** without pretension
- **Helpful** and educational about craft

### Messaging Pillars
1. **Quiet Luxury** — Understated elegance over loud branding
2. **Conscious Craft** — Transparency in materials and making
3. **Custom Tailoring** — Personalization for every body and age
4. **Hyderabad Heritage** — Local roots, global aesthetic

---

*This document serves as the single source of truth for all Sivi Studio development decisions.*
