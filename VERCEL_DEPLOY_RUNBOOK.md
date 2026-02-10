# Sivi Studio: Vercel Deployment Runbook

This document provides a comprehensive guide for deploying the **Sivi Studio** application to Vercel.

## 📋 Prerequisites
- [Vercel Account](https://vercel.com)
- GitHub repository access (`https://github.com/sharathk123/sivistudio.git`)
- Access to the following services:
  - Sanity (Project ID & Dataset)
  - Supabase (URL & API Keys)
  - Cloudinary (Cloud Name & API Keys)
  - Razorpay (Key ID & Secret)
  - Resend (API Key)

## 🚀 Deployment Steps

### 1. New Project Setup
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import the `sivistudio` repository.
4. Framework Preset: **Next.js**.
5. Root Directory: `./` (default).

### 2. Environment Variables Configuration ⚠️
You **must** configure the following variables in the Vercel Project Settings before clicking "Deploy".

| Service | Key | Value / Source |
| :--- | :--- | :--- |
| **Site** | `NEXT_PUBLIC_SITE_URL` | **⚠️ CRITICAL**: Set to your actual domain (e.g., `https://sivi.vercel.app` or `https://sivithecouturier.com`). **Do NOT use localhost.** |
| **Sanity** | `NEXT_PUBLIC_SANITY_PROJECT_ID` | From Sanity Manage |
| | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| | `SANITY_API_TOKEN` | Sanity Write Token |
| **Supabase** | `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key |
| | `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key |
| | `NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL` | `{URL}/auth/callback` |
| **Cloudinary** | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dj3a6c22e` |
| | `CLOUDINARY_CLOUD_NAME` | `dj3a6c22e` |
| | `CLOUDINARY_API_KEY` | From Cloudinary Console |
| | `CLOUDINARY_API_SECRET` | From Cloudinary Console |
| **Razorpay** | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | From Razorpay Settings (Live/Test) |
| | `RAZORPAY_KEY_SECRET` | From Razorpay Settings |
| **Resend** | `RESEND_API_KEY` | From Resend Dashboard |

### 3. Build Settings
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: `18.x` or higher (20.x recommended)

### 4. Supabase Auth Configuration
In your Supabase Dashboard:
1. Go to **Authentication** > **URL Configuration**.
2. Set **Site URL** to your Vercel URL.
3. Add `{YOUR_VERCEL_URL}/auth/v1/callback` to **Redirect URLs**.

### 5. Google OAuth Configuration (Gmail Login)
For Gmail login to work in production, you must complete these outside of Vercel:

1.  **Google Cloud Console**:
    *   Add your Vercel domain (e.g., `https://sivistudio.vercel.app`) to **Authorized JavaScript Origins**.
    *   Ensure the Supabase redirect URI is present: `https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback`.
2.  **Supabase Dashboard**:
    *   Go to **Authentication** > **Providers** > **Google**.
    *   Ensure it is **Enabled**.
    *   Client ID & Secret must match your Google Cloud Project.
    *   **Skip nonce check** should be enabled for some SSR flows if you encounter issues.

### 6. Razorpay Webhook Configuration (Optional)
If you use webhooks for payment verification:
1. URL: `https://{YOUR_VERCEL_URL}/api/payment/webhook` (if implemented).

---

## ✅ Post-Deployment Verification
After the first successful deployment, verify the following:

- [ ] **Home Page**: Check if images load from Cloudinary.
- [ ] **Auth**: Perform a test signup/login to verify Supabase.
- [ ] **Shop**: Confirm product data is fetching from Sanity.
- [ ] **Cart**: Verify items add and remain in local storage.
- [ ] **Checkout**: Trigger the Razorpay modal.
- [ ] **Responsive**: Check the new mobile nav and login icon.

## 🛠️ Common Troubleshooting

### Image Optimization Errors
If images fail to load, ensure `next.config.ts` allows `res.cloudinary.com` and `cdn.sanity.io`.

### Hydration Mismatch
We use `suppressHydrationWarning` on the `<html>` tag in `layout.tsx` for theme/font consistency. If you see persistent hydration errors, check the `SmoothScroll` component.

### Env Var Propagation
If the build fails with `undefined` errors, ensure the variables are set in the Vercel **Build** step (Environment Variables section), not just inside the application.

---
*Created: Feb 10, 2026 | Sivi Studio Production Readiness Team*
