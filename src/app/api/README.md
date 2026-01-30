# Sivi Studio API

All API routes are secured with JWT authentication from Supabase.

## Quick Start

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

## Available Endpoints

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Measurements
- `GET /api/measurements` - List all measurements
- `POST /api/measurements` - Create new measurement

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order

## Authentication

All routes require a valid JWT token from Supabase. The API client automatically handles token management.

For manual requests:

```typescript
const token = 'your-jwt-token'

const response = await fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## Documentation

See [API_AUTHENTICATION.md](../../docs/API_AUTHENTICATION.md) for complete documentation.
