# Sivi Studio

> **Premium Editorial Commerce Platform**  
> Quiet Luxury • Conscious Craft • Custom Tailoring

---

## 🎯 Project Overview

Sivi Studio is a headless e-commerce platform combining high-end fashion storytelling with intelligent commerce capabilities. Built for Sivi the Couturier, a Hyderabad-based fashion studio.

### Tech Stack

- **Frontend**: Next.js 15+ (App Router) with Tailwind CSS v4 & Framer Motion
- **CMS**: Sanity.io (Project ID: `n2gynp0d`)
- **Database**: Supabase
- **AI**: Google Gemini 1.5 Pro
- **Payments**: Razorpay
- **Logistics**: Shiprocket

---

## 📁 Project Structure

```
sivi/
├── docs/
│   └── products/              # Product technical specs
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (editorial)/       # Magazine-style content
│   │   ├── (shop)/            # E-commerce pages
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Design system components
│   │   ├── editorial/         # Editorial layouts
│   │   └── ai/                # Gemini Stylist UI
│   └── lib/
│       ├── sanity/            # CMS client
│       ├── supabase/          # Database client
│       └── gemini/            # AI integration
├── studio/                    # Sanity Studio (CMS)
│   ├── schemaTypes/           # Content schemas
│   └── sanity.config.ts
└── supabase/
    └── migrations/            # Database migrations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Sanity account (configured)
- Supabase account (pending)
- Google Gemini API key (pending)

### Environment Setup

1. **Copy environment template**:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in credentials**:
   - ✅ Sanity (configured)
   - ⏳ Supabase (pending)
   - ⏳ Gemini API (pending)
   - ⏳ Razorpay (pending)

### Development

```bash
# Install dependencies
npm install

# Run Next.js dev server
npm run dev

# Run Sanity Studio (in separate terminal)
cd studio && npm run dev
```

---

## 🎨 Design System

Sivi Studio uses a **comprehensive design system** with CSS variables and utility classes for consistent, maintainable styling.

### Quick Reference

**Colors**: Sage Green (`#9CA770`), Ethereal Ivory (`#E4E4DE`), Midnight Charcoal (`#1A1A1A`), Unbleached Bone (`#FDFCFB`)

**Typography**: Playfair Display (Serif) for headings, Inter (Sans-Serif) for body text

**Architecture**: All design tokens (colors, spacing, typography, animations, shadows) are centralized in `globals.css` using CSS variables and utility classes.

### Complete Documentation

📖 **See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** for:
- All CSS variables and their usage
- Utility classes for typography, layout, and effects
- Spacing scales and animation tokens
- Implementation examples and best practices

### Key Features

✅ **Single Source of Truth** - All design values in one place  
✅ **No Hardcoding** - Components use CSS variables and utility classes  
✅ **Easy Updates** - Change once, applies everywhere  
✅ **Type Safety** - Utility classes provide autocomplete  
✅ **Performance** - CSS variables are more efficient than inline styles

---

## 📋 Current Status

### ✅ Completed
- [x] Project structure initialized
- [x] Git repository connected
- [x] Global manifest documented
- [x] Sanity Studio configured
- [x] Sanity API token generated

### ⏳ In Progress
- [ ] Supabase database setup
- [ ] Next.js application scaffold
- [ ] Custom Sanity schemas
- [ ] Gemini AI integration

### 📝 Pending
- [ ] Product catalog implementation
- [ ] Editorial content system
- [ ] AI Stylist interface
- [ ] Payment integration
- [ ] Logistics setup

---

## 📚 Documentation

- **Project Context**: See [SIVI_PROJECT_CONTEXT.md](./SIVI_PROJECT_CONTEXT.md)
- **Sanity Studio**: `http://localhost:3333` (when running)
- **Next.js App**: `http://localhost:3000` (when running)

---

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Rotate API tokens regularly
- Use environment-specific datasets (dev/staging/production)

---

**Built with ❤️ for Sivi the Couturier**
