# Admin Access Testing Guide

## ✅ Admin Account Setup Complete

**Admin Email**: `sivihandloom@gmail.com`  
**Role**: `admin`

## 🧪 How to Test Admin Access

### 1. Login as Admin
1. Navigate to `/login`
2. Sign in with `sivihandloom@gmail.com`
3. You should see a "Dashboard" link in the navigation menu

### 2. Access Admin Dashboard
- **Direct URL**: `http://localhost:3000/admin`
- **Via Navigation**: Click the hamburger menu → "Dashboard"

### 3. What Admins Can See
- ✅ **Admin Dashboard** (`/admin`) - Overview with stats
- ✅ **Orders Management** (`/admin/orders`) - View all orders
- ✅ **Customers** (`/admin/customers`) - View all customers
- ✅ **Settings** (`/admin/settings`) - Admin settings

### 4. Test Non-Admin Access
1. Sign out
2. Create a new customer account (any email)
3. Try to access `/admin`
4. **Expected**: Redirect to home with error message "Admin access required"

## 🔒 Security Checks

### Middleware Protection
The middleware (`src/lib/supabase/middleware.ts`) now:
- ✅ Checks if user is authenticated
- ✅ Verifies `profile.role === 'admin'` for `/admin/*` routes
- ✅ Redirects non-admins to home page
- ✅ Redirects unauthenticated users to login

### Navigation
- ✅ "Dashboard" link only shows for admin users
- ✅ Regular customers don't see admin links

## 🐛 Troubleshooting

### "Admin access required" error
- Check database: `SELECT role FROM profiles WHERE email = 'sivihandloom@gmail.com'`
- Should return `'admin'`

### Can't see Dashboard link
- Clear browser cache
- Sign out and sign in again
- Check browser console for errors

### Middleware not working
- Restart dev server: `npm run dev`
- Check `.env.local` has correct Supabase credentials

## 📝 Quick SQL Queries

### Check admin status
```sql
SELECT id, email, role FROM public.profiles WHERE email = 'sivihandloom@gmail.com';
```

### Make another user admin
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'another@example.com';
```

### Remove admin access
```sql
UPDATE public.profiles SET role = 'customer' WHERE email = 'user@example.com';
```

---
**Last Updated**: Feb 10, 2026
