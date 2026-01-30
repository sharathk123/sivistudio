# Google OAuth Setup Guide

This guide will help you configure Google OAuth for Sivi Studio.

## Prerequisites

- Supabase project created
- Google Cloud Console access

## Step 1: Get Your Supabase Callback URL

Your Supabase OAuth callback URL is:
```
https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback
```

This URL is also available in your `.env.local` file as `NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL`.

## Step 2: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **Sivi Studio**
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed

## Step 3: Configure OAuth Client

1. Application type: **Web application**
2. Name: **Sivi Studio**
3. **Authorized JavaScript origins**:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
4. **Authorized redirect URIs**:
   ```
   https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback
   ```
5. Click **Create**
6. Copy the **Client ID** and **Client Secret**

## Step 4: Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/zumktgkradrhwrojbbji/auth/providers)
2. Find **Google** in the providers list
3. Toggle **Enable Sign in with Google** to ON
4. Paste your **Client ID** (Web application)
5. Paste your **Client Secret**
6. Click **Save**

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click **"Continue with Google"**

4. Select your Google account

5. Grant permissions

6. You should be redirected back to the app and logged in!

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console exactly matches:
  ```
  https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback
  ```

### Error: "Access blocked: This app's request is invalid"
- Configure the OAuth consent screen in Google Cloud Console
- Add your email as a test user

### Profile not created
- Check Supabase logs in the dashboard
- Verify the callback route is working: `/auth/callback`

## Production Deployment

When deploying to production:

1. Update **Authorized JavaScript origins** in Google Cloud Console:
   ```
   https://your-production-domain.com
   ```

2. The Supabase callback URL remains the same:
   ```
   https://zumktgkradrhwrojbbji.supabase.co/auth/v1/callback
   ```

3. Update your `.env.local` (or environment variables):
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
   ```

## Security Notes

- Never commit `.env.local` to version control
- Keep your Client Secret secure
- Use environment variables for all sensitive data
- Regularly rotate your OAuth credentials

## Support

For more information:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
