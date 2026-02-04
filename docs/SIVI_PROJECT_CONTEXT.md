# Sivi Studio - Project Context

> **Global Manifest & Technical Specification**  
> *Last Updated: 2026-02-04 13:40*

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

### Design System Architecture

**All design values are centralized in `src/app/globals.css` using CSS variables and utility classes.**

#### CSS Variables Structure

```css
@theme {
  /* Colors with variations */
  --color-sage: #9CA770
  --color-sage-600, --color-sage-700
  --color-ivory-50, --color-ivory-200, --color-ivory-300
  --color-charcoal, --color-charcoal-400, --color-charcoal-600
  
  /* Typography scales */
  --text-title-sm, --text-title-lg
  --text-subtitle, --text-subtitle-md
  --text-caption, --text-label
  
  /* Spacing scales */
  --spacing-section-y, --spacing-section-x
  --spacing-grid-gap, --spacing-card-gap
  
  /* Animation tokens */
  --duration-fast, --duration-normal, --duration-slow
  --delay-xs, --delay-sm, --delay-md
  
  /* Transform values */
  --scale-hover: 1.08
  --parallax-slow, --parallax-fast
  
  /* Shadows, opacity, dimensions */
  --shadow-card, --shadow-card-hover
  --opacity-overlay, --icon-size-md
  --aspect-portrait, --aspect-landscape
}
```

#### Utility Classes

```css
/* Typography */
.title-editorial       /* Responsive serif titles */
.subtitle-editorial    /* Responsive serif subtitles */
.caption-editorial     /* Mono uppercase captions */
.label-editorial       /* Mono uppercase labels */

/* Layout */
.section-padding       /* Responsive section spacing */
.grid-editorial        /* 2-column responsive grid */
.aspect-portrait       /* 3:4 aspect ratio */

/* Effects */
.gradient-overlay-dark /* Dark image overlay */
.hover-scale          /* Smooth scale transition */
.hover-shadow         /* Shadow elevation */

/* Decorative */
.decorative-line      /* Horizontal accent line */
.decorative-divider   /* Small divider */
```

#### Implementation Rules

1. **No Hardcoding**: All components must use CSS variables or utility classes
2. **Semantic Classes**: Use descriptive class names like `.title-editorial` instead of `.text-6xl`
3. **Responsive Design**: Utility classes handle mobile/desktop breakpoints automatically
4. **Consistency**: Design tokens ensure visual consistency across all components

📖 **Complete documentation**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 2. Technical Architecture (Headless)

### Core Stack

| Layer | Technology | Purpose | Status |
|-------|------------|---------|--------|
| **Frontend** | Next.js 15.5+ (App Router) | React framework with Tailwind CSS v4 and Framer Motion | ✅ Configured |
| **CMS** | Sanity.io | Source of truth for editorial content, fabric stories, and product details | ✅ Studio Ready |
| **Database** | Supabase PostgreSQL 17 | Transactional data, user profiles, and custom measurement logs | ✅ Deployed |
| **Authentication** | Supabase Auth + JWT | User authentication with email/password and Google OAuth | ✅ Implemented |
| **AI Engine** | Gemini 1.5 Pro | Powers "Digital Couturier" Stylist and fabric intelligence modules | [/] UI Ready |
| **Payments** | Razorpay | UPI, Cards, Netbanking | ✅ Implemented |
- **Logistics**: Shiprocket with logic for Hyderabad Studio Pickup - ⏳ Pending
- **Support**: WhatsApp Business for "Boutique Concierge" bridge - ⏳ Pending

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
- updated_at (timestamp)
```

**RLS Policies**: ✅ Enabled - Users can only access their own profile

#### `measurements`
One-to-many link to profiles. Stores custom sizing data.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles.id)
- bust_cm (numeric)
- waist_cm (numeric)
- hips_cm (numeric)
- length_cm (numeric)
- age_group (text) -- e.g., '18-25', '25-35', '35-45', '45+'
- created_at (timestamp)
- updated_at (timestamp)
```

**RLS Policies**: ✅ Enabled - Users can only access their own measurements

#### `orders`
Tracks order lifecycle and payment integration.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles.id)
- status (text) -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
- razorpay_order_id (text, nullable)
- razorpay_payment_id (text, nullable)
- total_amount (numeric)
- shipping_address (text)
- created_at (timestamp)
- updated_at (timestamp)
```

**RLS Policies**: ✅ Enabled - Users can only access their own orders

#### `order_items`
Bridge between Supabase and Sanity product catalog.

```sql
- id (uuid, PK)
- order_id (uuid, FK to orders.id)
- product_id (text) -- Reference to Sanity document
- quantity (integer)
- unit_price (numeric)
- subtotal (numeric)
- created_at (timestamp)
```

**RLS Policies**: ✅ Enabled - Users can only access items from their own orders

#### `ai_consultations`
Stores JSONB logs of Gemini Stylist interactions for long-term personalization.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles.id)
- conversation_log (jsonb)
- recommendations (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

**RLS Policies**: ✅ Enabled - Users can only access their own consultations

---

## 4. Authentication & Security

### Authentication Methods

| Method | Status | Description |
|--------|--------|-------------|
| **6-Digit OTP** | ✅ Implemented | Primary signup & verification flow |
| **Email/Password** | ✅ Implemented | Traditional login after verification |
| **Google OAuth** | ✅ Implemented | One-click sign-in with Google |
| **Magic Link** | ⏳ Removed | Replaced by OTP for better reliability |

### JWT Security

**All backend API routes are secured with JWT tokens from Supabase.**

- ✅ Automatic token verification on every request
- ✅ User context injection into protected handlers
- ✅ 401 Unauthorized for invalid/missing tokens
- ✅ Token refresh handled automatically by Supabase

### Protected API Endpoints

| Endpoint | Methods | Description | Status |
|----------|---------|-------------|--------|
| `/api/profile` | GET, PUT | User profile management | ✅ Implemented |
| `/api/measurements` | GET, POST | Custom sizing data | ✅ Implemented |
| `/api/orders` | GET, POST | Order management | ✅ Implemented |
| `/api/ai-consultation` | POST | Gemini AI stylist | ⏳ Pending |

### Security Features

- ✅ Row Level Security (RLS) on all database tables
- ✅ JWT verification on all API routes
- ✅ User-scoped data access
- ✅ Secure cookie-based session management
- ✅ OAuth callback URL in environment variables
- ✅ HTTPS-only in production

---

## 5. Key Implementation Rules

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

### 🔒 API Security
All backend API routes **MUST** use the `withAuth()` wrapper to ensure JWT authentication.

```typescript
import { withAuth } from '@/lib/auth/jwt'

export const GET = withAuth(async (request, { user }) => {
  // user is guaranteed to exist and be authenticated
  return NextResponse.json({ userId: user.id })
})
```

---

## 6. Directory Reference

### Documentation
```
docs/
├── products/*.md              # Product technical specs and material stories
├── API_AUTHENTICATION.md      # Complete API authentication guide
└── GOOGLE_OAUTH_SETUP.md      # Google OAuth configuration guide
```

### Frontend Components
```
src/components/
├── ui/          # Reusable design system components
├── editorial/   # Magazine-style layout components
└── ai/          # Gemini Stylist interface components
```

### API Routes
```
src/app/api/
├── README.md                  # API quick reference
├── auth/
│   └── callback/route.ts      # OAuth callback handler
├── profile/route.ts           # User profile endpoints
├── measurements/route.ts      # Measurements endpoints
└── orders/route.ts            # Orders endpoints
```

### Database Migrations
```
supabase/migrations/
└── 20260130_initial_schema.sql
```

### Library Helpers
```
src/lib/
├── sanity/      # CMS client and query helpers
├── supabase/    # Database client and auth
│   ├── client.ts      # Browser client
│   ├── server.ts      # Server client
│   └── middleware.ts  # Session management
├── auth/        # JWT authentication utilities
│   └── jwt.ts         # withAuth() wrapper and verification
├── api/         # API client for frontend
│   └── client.ts      # Type-safe API client
└── gemini/      # AI integration and prompt engineering
```

---

## 7. Development Workflow

### Environment Setup

1. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables**
   ```bash
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=n2gynp0d
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://zumktgkradrhwrojbbji.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_key
   NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL=https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback

   # Application
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Google Gemini
   GEMINI_API_KEY=your_key
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Database Migrations

Migrations are managed through Supabase MCP server:

```bash
# List migrations
supabase migrations list

# Apply migration
supabase migrations apply
```

### Deployment Checklist

- [ ] All environment variables configured in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Sanity production dataset deployed
- [ ] Supabase RLS policies enabled and tested
- [ ] Google OAuth authorized origins updated
- [ ] Razorpay webhook endpoints configured
- [ ] WhatsApp Business API connected
- [ ] SSL/HTTPS enabled
- [ ] API rate limiting configured

---

## 8. API Usage

### Using the API Client

```typescript
import { api } from '@/lib/api/client'

// Get user profile
const { data: profile } = await api.getProfile()

// Update profile
await api.updateProfile({
  full_name: 'Jane Doe',
  hyderabad_locality: 'Banjara Hills'
})

// Get measurements
const { data: measurements } = await api.getMeasurements()

// Create measurement
await api.createMeasurement({
  bust_cm: 90,
  waist_cm: 70,
  hips_cm: 95,
  length_cm: 140,
  age_group: '25-35'
})

// Get orders
const { data: orders } = await api.getOrders()

// Create order
await api.createOrder({
  items: [
    {
      product_id: 'prod_123',
      quantity: 2,
      unit_price: 2500
    }
  ],
  total_amount: 5000,
  shipping_address: '123 Main St, Hyderabad'
})
```

### Manual API Requests

```typescript
const token = 'your-jwt-token'

const response = await fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

---

## 9. Brand Voice Guidelines

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

## 10. Current Implementation Status

### ✅ Completed Features

- [x] Next.js 15 project setup with App Router
- [x] Tailwind CSS v4 configuration
- [x] Google Fonts integration (Playfair Display + Inter)
- [x] Supabase project creation and configuration
- [x] Database schema with 5 tables and RLS policies
- [x] Email/password authentication
- [x] Google OAuth authentication
- [x] Protected API routes with JWT verification
- [x] API client for frontend
- [x] Profile management endpoints
- [x] Measurements management endpoints
- [x] Orders management endpoints
- [x] OAuth callback handling
- [x] Environment variable configuration
- [x] Comprehensive documentation
- [x] Sanity CMS schemas (product, category, editorial)
- [x] Product catalog pages (Listing & Detail) - Wiring complete
- [x] Sanity Client & GROQ Queries
- [x] **Comprehensive Design System** with CSS variables and utility classes
- [x] **Editorial Components** (MoodBoardGrid, Hero, etc.) with no hardcoded values
- [x] **Design System Documentation** (DESIGN_SYSTEM.md)
- [x] **Journal Section** including listing and dynamic article pages
- [x] **Branded Favicon & Site Metadata** with professional custom iconography
- [x] **Shopping Cart & Checkout Flow** (Razorpay integrated)
- [x] **Accessibility & UI Audit** (A+ Score, WCAG 2.1 AA)
- [x] **Micro-Animations** (Cart Drawer, Success Page, Hover Effects)
- [x] **Refined Typography** (Footer, Navigation, Buttons)
- [x] **Brand Iconography** (Optimized Adiyogi SVG paths & Motion Graphics)
- [x] **6-Digit OTP Authentication Flow** (Stable Signup & Verification)
- [x] **Core Stability** (Resolved Next.js 16/Turbopack "aborted signal" issues)
- [x] **Knowledge Base** (Centralized and cleaned project documentation in `/docs`)

### ⏳ Pending Features

- [ ] Sanity Studio deployment & Content population
- [/] Gemini AI stylist integration (UI implemented, awaiting backend wiring)
- [ ] Shiprocket logistics integration
- [ ] WhatsApp Business integration
- [ ] Email notifications SMTP setup
- [ ] Admin dashboard
- [ ] Analytics integration

---

## 11. Project Information

### Repository
- **GitHub**: https://github.com/sharathk123/sivistudio
- **Branch**: main

### Supabase Project
- **Project ID**: zumktgkradrhwrojbbji
- **Region**: ap-southeast-2 (Sydney)
- **Database**: PostgreSQL 17.6.1
- **Status**: ACTIVE_HEALTHY

### Sanity Project
- **Project ID**: n2gynp0d
- **Dataset**: production
- **Status**: Studio Ready

---

*This document serves as the single source of truth for all Sivi Studio development decisions.*
