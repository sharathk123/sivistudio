# Supabase Setup Guide for Sivi Studio

This guide will help you set up the Supabase database for Sivi Studio.

## Prerequisites

- ✅ Supabase CLI installed (`brew install supabase/tap/supabase`)
- ⏳ Supabase account (create at https://supabase.com)
- ⏳ Supabase project created

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the details:
   - **Name**: `Sivi Studio`
   - **Database Password**: (generate a strong password and save it)
   - **Region**: Choose closest to Hyderabad (e.g., `ap-south-1` - Mumbai)
   - **Pricing Plan**: Free tier is fine to start

4. Wait for the project to be created (~2 minutes)

---

## Step 2: Get Your Project Credentials

Once your project is ready:

1. Go to **Project Settings** → **API**
2. Copy the following values:

   ```bash
   # Project URL
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   
   # Anon/Public Key (safe to use in frontend)
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   
   # Service Role Key (NEVER expose in frontend!)
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

3. Add these to your `.env.local` file

---

## Step 3: Link Local Project to Supabase

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# You'll be prompted for your database password
```

---

## Step 4: Apply Database Migrations

Our initial schema is already created in `supabase/migrations/20260130_initial_schema.sql`

To apply it:

```bash
# Push migrations to Supabase
supabase db push

# Or if you prefer to use the Supabase dashboard:
# 1. Go to SQL Editor in your Supabase dashboard
# 2. Copy the contents of supabase/migrations/20260130_initial_schema.sql
# 3. Paste and run the SQL
```

---

## Step 5: Verify the Schema

After applying migrations, verify in the Supabase dashboard:

1. Go to **Table Editor**
2. You should see these tables:
   - ✅ `profiles`
   - ✅ `measurements`
   - ✅ `orders`
   - ✅ `order_items`
   - ✅ `ai_consultations`
   - ✅ `otp_codes`

3. Go to **Authentication** → **Policies**
4. Verify RLS (Row Level Security) is enabled on all tables

---

## Database Schema Overview

### Tables

#### `profiles`
- Linked to `auth.users`
- Stores user identity and Hyderabad locality
- **RLS**: Users can only view/edit their own profile

#### `measurements`
- One-to-many with profiles
- Stores custom sizing (bust, waist, hips, length, age_group)
- **RLS**: Users can only manage their own measurements

#### `orders`
- Tracks order lifecycle and Razorpay integration
- Status: placed → processing → shipped → delivered
- Supports both shipping and studio pickup
- **RLS**: Users can only view their own orders

#### `order_items`
- Bridge between Supabase and Sanity products
- References Sanity product IDs
- **RLS**: Inherits from orders table

#### `ai_consultations`
- Stores Gemini AI Stylist conversation logs
- JSONB format for flexibility
- **RLS**: Users can only access their own consultations

#### `otp_codes`
- Stores temporary 6-digit verification codes
- Columns: `email`, `code`, `user_id`, `expires_at`
- **Security**: Managed via Service Role in backend; no public RLS permissions

---

## Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies ensuring:
- Users can only access their own data
- No cross-user data leakage
- Secure by default

### Authentication
- Uses Supabase Auth (built on PostgreSQL)
- Supports email/password, OAuth providers
- JWT-based session management

---

## Local Development (Optional)

To run Supabase locally:

```bash
# Start local Supabase (Docker required)
supabase start

# This will give you local URLs:
# API URL: http://localhost:54321
# Studio URL: http://localhost:54323
```

---

## Troubleshooting

### Migration Fails
- Check database password is correct
- Ensure you're linked to the right project
- Verify no syntax errors in SQL

### RLS Issues
- Make sure auth.uid() is available
- Check if user is authenticated
- Verify policies are correctly applied

### Connection Issues
- Check if project is active (not paused)
- Verify API keys are correct
- Ensure network connectivity

---

## Next Steps

After Supabase is set up:

1. ✅ Test authentication flow
2. ✅ Create a test user profile
3. ✅ Verify RLS policies work
4. ✅ Integrate with Next.js frontend

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs) or ask in the Sivi Studio team chat.
