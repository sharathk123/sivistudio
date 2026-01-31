# Production Deployment Checklist for Sivi Studio

## ✅ Image Hosting
**Status: READY**
- All images are in `/public/images/` and will be automatically hosted by Vercel
- Next.js Image component is used throughout for optimization
- Images will be served from Vercel's CDN with automatic optimization

## 🔧 Environment Variables to Set in Vercel

### Required for Production:
1. **Sanity CMS**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = n2gynp0d
   - `NEXT_PUBLIC_SANITY_DATASET` = production
   - `SANITY_API_TOKEN` = [Your token - keep secret]

2. **Supabase (Auth & Database)**
   - `NEXT_PUBLIC_SUPABASE_URL` = https://zumktgkradrhwrojbbji.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Your anon key]
   - `SUPABASE_SERVICE_ROLE_KEY` = [Your service role key - keep secret]
   - `NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL` = https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback

3. **Application URL**
   - `NEXT_PUBLIC_SITE_URL` = https://your-domain.vercel.app (or custom domain)

4. **Google Gemini (Optional - for AI features)**
   - `GEMINI_API_KEY` = [Your API key if using AI features]

## 📋 Pre-Deployment Steps

### 1. Update Supabase Auth Settings
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add your Vercel domain to "Site URL"
- Add `https://your-domain.vercel.app/**` to "Redirect URLs"

### 2. Test Production Build Locally
```bash
npm run build
npm run start
```

### 3. Verify All Pages Load
- [ ] Homepage (/)
- [ ] Shop (/shop)
- [ ] Product Pages (/shop/[slug])
- [ ] Heritage (/heritage)
- [ ] Story (/story)
- [ ] Account (/account)
- [ ] Custom Tailoring (/custom-tailoring)
- [ ] Contact (/contact)
- [ ] Journal (/journal)
- [ ] Legal Pages (/privacy-policy, /terms-of-service, /shipping-policy)

### 4. Performance Optimizations
- [x] Next.js Image component used everywhere
- [x] Responsive images with proper sizes attribute
- [x] Lazy loading enabled by default
- [x] Smooth scroll with Lenis
- [x] Code splitting via Next.js App Router

### 5. SEO Optimizations
- [x] Metadata in layout.tsx
- [x] Semantic HTML structure
- [x] Proper heading hierarchy
- [x] Alt text on all images
- [x] OpenGraph tags

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables from above
4. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 📊 Post-Deployment Checklist

### Immediate Checks:
- [ ] Site loads without errors
- [ ] Images display correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Cart functionality works
- [ ] Authentication works (if enabled)

### Performance Checks:
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on mobile devices
- [ ] Check loading speed
- [ ] Verify responsive design

### Analytics Setup (Optional):
- [ ] Add Vercel Analytics
- [ ] Add Google Analytics
- [ ] Set up error tracking (Sentry)

## 🔒 Security Notes

### Secrets to NEVER commit:
- ✅ `.env.local` is in `.gitignore`
- ✅ API keys are environment variables
- ✅ Service role keys are server-side only

### Production Security:
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up CSP headers if needed
- [ ] Configure CORS properly
- [ ] Review Supabase RLS policies

## 🎨 Custom Domain Setup (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable
5. Update Supabase redirect URLs

## 📝 Notes

- **Image Hosting**: All images in `/public` are automatically optimized and served by Vercel's CDN
- **Build Time**: First build may take 2-3 minutes
- **Caching**: Static pages are cached, revalidation set to 60 seconds for shop pages
- **Edge Functions**: None currently used, but available if needed

## 🐛 Common Issues & Solutions

### Issue: Images not loading
- **Solution**: Check that images are in `/public/images/` not `/images/`

### Issue: Environment variables not working
- **Solution**: Redeploy after adding env vars in Vercel dashboard

### Issue: 404 on refresh
- **Solution**: Vercel handles this automatically with Next.js App Router

### Issue: Slow initial load
- **Solution**: Enable Vercel Analytics to identify bottlenecks

## ✨ Production Ready Status: YES

Your application is production-ready! All images will be hosted on Vercel's CDN automatically.
