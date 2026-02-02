# API Authentication with JWT

All backend API routes in Sivi Studio are secured using JWT (JSON Web Tokens) provided by Supabase.

## Overview

Every API request must include a valid JWT token in the Authorization header. The token is automatically generated when a user signs in through Supabase authentication.

## Authentication Flow

1. User signs in via `/login` or `/signup`
2. Supabase generates a JWT token
3. Token is stored in cookies (handled by Supabase client)
4. Client includes token in API requests
5. Server verifies token before processing request

## Making Authenticated API Requests

### From Client Components

```typescript
import { createClient } from '@/lib/supabase/client'

async function fetchProfile() {
  const supabase = createClient()
  
  // Get the current session (includes JWT token)
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('Not authenticated')
  }

  // Make API request with token
  const response = await fetch('/api/profile', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
```

### From Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

async function getProfile() {
  const supabase = await createClient()
  
  // Server-side: Token is automatically included
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single()
  
  return data
}
```

## Creating Protected API Routes

### Using `withAuth` Wrapper (Recommended)

The `withAuth` higher-order function automatically handles JWT verification:

```typescript
import { withAuth } from '@/lib/auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withAuth(async (request: NextRequest, { user }) => {
  // user is guaranteed to exist and be authenticated
  console.log('Authenticated user:', user.id, user.email)
  
  return NextResponse.json({
    message: 'Protected data',
    userId: user.id,
  })
})
```

### Manual JWT Verification

For more control, use the `verifyAuth` function:

```typescript
import { verifyAuth } from '@/lib/auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request)
  
  if (!auth.authenticated || !auth.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Process request with auth.user
  return NextResponse.json({ userId: auth.user.id })
}
```

## Available API Endpoints

### Profile API

**GET /api/profile**
- Get authenticated user's profile
- Returns: Profile object

**PUT /api/profile**
- Update authenticated user's profile
- Body: `{ full_name, hyderabad_locality }`
- Returns: Updated profile

### Measurements API

**GET /api/measurements**
- Get all measurements for authenticated user
- Returns: Array of measurements

**POST /api/measurements**
- Create new measurement
- Body: `{ bust_cm, waist_cm, hips_cm, length_cm, age_group }`
- Returns: Created measurement

### Orders API

**GET /api/orders**
- Get all orders for authenticated user
- Returns: Array of orders with items

**POST /api/orders**
- Create new order
- Body: `{ items[], total_amount, shipping_address }`
- Returns: Created order

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized - Invalid or missing token"
}
```

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process request"
}
```

## JWT Token Structure

The Supabase JWT token contains:

```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "role": "authenticated",
  "iat": 1234567890,
  "exp": 1234571490
}
```

## Security Best Practices

### 1. Always Use HTTPS in Production
```bash
NEXT_PUBLIC_SITE_URL=https://sivithecouturier.com
```

### 2. Token Expiration
- Tokens expire after 1 hour by default
- Supabase automatically refreshes tokens
- Handle token refresh in your client

### 3. Validate User Permissions
```typescript
export const DELETE = withAuth(async (request, { user }) => {
  // Check if user has permission
  if (user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }
  
  // Process delete request
})
```

### 4. Rate Limiting
Consider implementing rate limiting for API routes:

```typescript
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export const POST = withAuth(async (request, { user }) => {
  const { success } = await ratelimit.limit(user.id)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  // Process request
})
```

### 5. Input Validation
Always validate and sanitize input:

```typescript
import { z } from 'zod'

const measurementSchema = z.object({
  bust_cm: z.number().min(50).max(200),
  waist_cm: z.number().min(40).max(180),
  hips_cm: z.number().min(50).max(200),
  length_cm: z.number().min(80).max(200),
})

export const POST = withAuth(async (request, { user }) => {
  const body = await request.json()
  
  // Validate input
  const result = measurementSchema.safeParse(body)
  
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error },
      { status: 400 }
    )
  }
  
  // Process validated data
})
```

## Testing Protected Routes

### Using cURL

```bash
# Get JWT token from Supabase session
TOKEN="your-jwt-token-here"

# Make authenticated request
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### Using Postman

1. Set request method (GET, POST, etc.)
2. Add header: `Authorization: Bearer <your-token>`
3. Add header: `Content-Type: application/json`
4. Send request

### Using JavaScript/TypeScript

```typescript
const token = 'your-jwt-token'

const response = await fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

const data = await response.json()
console.log(data)
```

## Troubleshooting

### "Unauthorized - Invalid or missing token"
- Check if user is logged in
- Verify token is included in Authorization header
- Check token hasn't expired

### "Failed to fetch profile"
- Verify user profile exists in database
- Check database RLS policies
- Review Supabase logs

### CORS Issues
- Ensure proper CORS headers in `next.config.ts`
- Check allowed origins match your domain

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [JWT.io](https://jwt.io/) - Decode and verify JWT tokens
