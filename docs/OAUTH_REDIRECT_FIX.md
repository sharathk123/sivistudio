# OAuth Redirect Fix for Production

## 🐛 Problem
After deploying to Vercel, Google OAuth login was redirecting users back to `localhost:3000` instead of the production URL.

## ✅ Solution Applied

### Code Changes
Updated both login and signup pages to use `NEXT_PUBLIC_SITE_URL` environment variable instead of `window.location.origin`:

**Files Modified:**
- `src/app/signup/page.tsx` (line 109)
- `src/app/login/page.tsx` (line 113)

**Before:**
```typescript
redirectTo: `${window.location.origin}/auth/callback`
```

**After:**
```typescript
const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
redirectTo: `${redirectUrl}/auth/callback`
```

## 🔧 Required Vercel Configuration

### 1. Set Environment Variable in Vercel

Go to your Vercel project settings and add:

**Variable Name:** `NEXT_PUBLIC_SITE_URL`  
**Value:** Your production URL (e.g., `https://sivistudio.vercel.app` or `https://yourdomain.com`)

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **Sivi Studio** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://your-production-url.vercel.app`
   - **Environment**: Production (and Preview if needed)
5. Click **Save**
6. **Redeploy** your application

### 2. Update Google Cloud Console

Make sure your Google OAuth credentials include the production callback URL:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, ensure you have:
   ```
   https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback
   ```
5. Under **Authorized JavaScript origins**, add:
   ```
   https://your-production-url.vercel.app
   ```

### 3. Update Supabase Settings

In your Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `https://your-production-url.vercel.app`
3. Add to **Redirect URLs**:
   ```
   https://your-production-url.vercel.app/auth/callback
   https://your-production-url.vercel.app/**
   ```

## 🧪 Testing

### Local Development
- OAuth will use `http://localhost:3000` (from `.env.local`)
- ✅ Works as before

### Production
- OAuth will use your Vercel URL (from Vercel env vars)
- ✅ No more localhost redirects!

## 📝 Verification Checklist

After deploying:

- [ ] `NEXT_PUBLIC_SITE_URL` is set in Vercel to production URL
- [ ] Google OAuth redirect URIs include Supabase callback
- [ ] Google OAuth origins include your Vercel domain
- [ ] Supabase Site URL matches your Vercel domain
- [ ] Supabase Redirect URLs include your callback route
- [ ] Test Google login on production
- [ ] Verify redirect goes to production URL, not localhost

## 🚨 Common Issues

### Still redirecting to localhost?
1. Clear browser cache and cookies
2. Verify Vercel env var is set correctly
3. Ensure you redeployed after setting the env var
4. Check browser console for the actual redirect URL being used

### Google OAuth error?
1. Verify all URLs in Google Cloud Console
2. Check Supabase auth logs for errors
3. Ensure OAuth is enabled in Supabase for Google provider

---

**Fixed**: Feb 10, 2026  
**Affected Files**: `signup/page.tsx`, `login/page.tsx`
