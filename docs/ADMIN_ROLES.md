# Admin & User Role System

## Overview

Sivi Studio uses a role-based access control (RBAC) system to differentiate between **admin users** (site owners/managers) and **regular customers** (site visitors who shop).

## Database Schema

### `profiles.role` Column
- **Type**: `text`
- **Default**: `'customer'`
- **Allowed Values**: 
  - `'admin'` - Site administrators with full access
  - `'customer'` - Regular shoppers (default)

## Current Admin Account

**Email**: `sivihandloom@gmail.com`  
**Role**: `admin`

## How to Identify Admins vs Customers

### 1. Server-Side (API Routes, Server Components)

```typescript
import { requireAdmin, isAdmin, getUserProfile } from '@/lib/auth/roles'

// Protect an entire API route
export async function GET(request: Request) {
    await requireAdmin() // Throws error if not admin
    
    // Admin-only logic here
    return Response.json({ data: 'admin data' })
}

// Check admin status
export async function POST(request: Request) {
    const isUserAdmin = await isAdmin()
    
    if (isUserAdmin) {
        // Show admin features
    } else {
        // Show customer features
    }
}

// Get full profile with role
const profile = await getUserProfile()
if (profile?.role === 'admin') {
    // Admin logic
}
```

### 2. Client-Side (React Components)

```typescript
'use client'

import { useUserRole } from '@/hooks/useUserRole'

export function MyComponent() {
    const { isAdmin, isCustomer, role, loading } = useUserRole()
    
    if (loading) return <div>Loading...</div>
    
    return (
        <div>
            {isAdmin && (
                <button>Admin Dashboard</button>
            )}
            
            {isCustomer && (
                <button>My Orders</button>
            )}
        </div>
    )
}
```

### 3. Middleware (Route Protection)

```typescript
// middleware.ts
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()
        
        if (profile?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    
    return NextResponse.next()
}
```

## How to Make a User an Admin

### Via SQL (Supabase Dashboard)

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'user@example.com';
```

### Via API (Admin-Only Endpoint)

```typescript
// src/app/api/admin/users/[userId]/role/route.ts
import { requireAdmin } from '@/lib/auth/roles'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(
    request: Request,
    { params }: { params: { userId: string } }
) {
    // Only admins can change roles
    await requireAdmin()
    
    const { role } = await request.json()
    const supabase = createAdminClient()
    
    const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', params.userId)
    
    if (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
    
    return Response.json({ success: true })
}
```

## Security Best Practices

### ✅ DO:
- Always verify admin status on the **server side** for sensitive operations
- Use `requireAdmin()` to protect admin-only API routes
- Check roles in middleware for route-level protection
- Use client-side hooks (`useUserRole`) only for UI rendering

### ❌ DON'T:
- Never trust client-side role checks for security decisions
- Don't expose admin-only data in API responses without server-side verification
- Don't allow role changes without proper authentication

## Common Use Cases

### 1. Admin Dashboard Access
```typescript
// src/app/admin/page.tsx
import { requireAdmin } from '@/lib/auth/roles'

export default async function AdminDashboard() {
    await requireAdmin() // Redirect if not admin
    
    return <div>Admin Dashboard</div>
}
```

### 2. Conditional Navigation
```typescript
'use client'

import { useUserRole } from '@/hooks/useUserRole'

export function Navigation() {
    const { isAdmin } = useUserRole()
    
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            {isAdmin && <Link href="/admin">Admin</Link>}
        </nav>
    )
}
```

### 3. Order Management
```typescript
// Customers can only see their own orders
// Admins can see all orders

export async function GET(request: Request) {
    const profile = await getUserProfile()
    const supabase = await createClient()
    
    let query = supabase.from('orders').select('*')
    
    if (profile?.role === 'customer') {
        // Customers see only their orders
        query = query.eq('profile_id', profile.id)
    }
    // Admins see all orders (no filter)
    
    const { data } = await query
    return Response.json(data)
}
```

## Future Enhancements

Consider adding:
- **Staff role**: For employees with limited admin access
- **Permissions system**: Granular permissions (e.g., `can_manage_orders`, `can_view_analytics`)
- **Role hierarchy**: Define which roles can manage which other roles
- **Audit logging**: Track when admins perform sensitive actions

---

**Created**: Feb 10, 2026  
**Last Updated**: Feb 10, 2026
