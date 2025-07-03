# Dropics Backend API Documentation

## Overview

Dropics is a modern e-commerce platform for edible glitter and food decoration products, built with Next.js, Supabase, and featuring Web3 payment integration through Solana.

## Architecture

```
Frontend (Next.js/React) ↔ API Routes (Next.js) ↔ Database (Supabase PostgreSQL)
                                    ↕
                            Payment Providers (Stripe, Solana)
                                    ↕
                            External Services (Email, etc.)
```

## Technology Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe, Solana (Web3)
- **Email**: Resend
- **Deployment**: Vercel
- **Blockchain**: Rust + Solana SDK

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <supabase_jwt_token>
```

## API Endpoints

### Authentication & Users

#### `GET /api/auth/user`
Get current user profile
- **Auth**: Required
- **Response**: User profile object

#### `PUT /api/auth/user`
Update user profile
- **Auth**: Required
- **Body**: `{ full_name?, phone?, avatar_url? }`
- **Response**: Updated user profile

#### `DELETE /api/auth/user`
Delete user account and all associated data
- **Auth**: Required
- **Response**: Success message

### Products

#### `GET /api/products`
List products with filtering and pagination
- **Query Params**:
  - `page` (default: 1)
  - `limit` (default: 20)
  - `category` (liquid|spray)
  - `featured` (true|false)
  - `search` (text search)
  - `sort` (name|price|rating|created_at)
  - `order` (asc|desc)
- **Response**: Paginated product list

#### `POST /api/products`
Create new product (Admin only)
- **Auth**: Required (Admin)
- **Body**: Product creation object
- **Response**: Created product

#### `GET /api/products/[id]`
Get single product with reviews
- **Response**: Product details with reviews

#### `PUT /api/products/[id]`
Update product (Admin only)
- **Auth**: Required (Admin)
- **Body**: Product update object
- **Response**: Updated product

#### `DELETE /api/products/[id]`
Soft delete product (Admin only)
- **Auth**: Required (Admin)
- **Response**: Success message

### Shopping Cart

#### `GET /api/cart`
Get user's cart items
- **Auth**: Required
- **Response**: Cart items with totals

#### `POST /api/cart`
Add item to cart
- **Auth**: Required
- **Body**: `{ product_id: string, quantity: number }`
- **Response**: Updated cart item

#### `DELETE /api/cart`
Clear entire cart
- **Auth**: Required
- **Response**: Success message

#### `PUT /api/cart/[id]`
Update cart item quantity
- **Auth**: Required
- **Body**: `{ quantity: number }`
- **Response**: Updated cart item

#### `DELETE /api/cart/[id]`
Remove item from cart
- **Auth**: Required
- **Response**: Success message

### Orders

#### `GET /api/orders`
Get user's order history
- **Auth**: Required
- **Query Params**: `page`, `limit`, `status`
- **Response**: Paginated orders list

#### `POST /api/orders`
Create new order
- **Auth**: Required
- **Body**: Order creation object with items and addresses
- **Response**: Created order

#### `GET /api/orders/[id]`
Get single order details
- **Auth**: Required
- **Response**: Order details with items

### Payments

#### `POST /api/payments/stripe`
Create Stripe payment intent
- **Auth**: Required
- **Body**: `{ order_id: string, return_url?: string }`
- **Response**: Payment intent with client_secret

#### `PUT /api/payments/stripe`
Update payment status after Stripe confirmation
- **Auth**: Required
- **Body**: `{ payment_intent_id: string, status: string }`
- **Response**: Updated order status

#### `POST /api/payments/stripe/webhook`
Stripe webhook endpoint for payment events
- **Headers**: `stripe-signature`
- **Body**: Stripe event payload
- **Response**: Acknowledgment

#### `POST /api/payments/crypto`
Create cryptocurrency payment
- **Auth**: Required
- **Body**: `{ order_id: string, currency: string }`
- **Response**: Payment details with address and QR code

#### `PUT /api/payments/crypto`
Confirm cryptocurrency payment
- **Auth**: Required
- **Body**: `{ payment_id: string, transaction_hash: string }`
- **Response**: Payment confirmation

#### `GET /api/payments/crypto`
Check cryptocurrency payment status
- **Auth**: Required
- **Query**: `payment_id`
- **Response**: Payment status

#### `POST /api/payments/solana`
Create Solana payment transaction
- **Auth**: Required
- **Body**: `{ order_id: string, payer_wallet: string }`
- **Response**: Transaction data for signing

#### `PUT /api/payments/solana`
Confirm Solana payment
- **Auth**: Required
- **Body**: `{ payment_id: string, signature: string }`
- **Response**: Payment confirmation

#### `GET /api/payments/solana`
Check Solana transaction status
- **Query**: `signature`
- **Response**: Transaction status

### Wishlist

#### `GET /api/wishlist`
Get user's wishlist
- **Auth**: Required
- **Response**: Wishlist items

#### `POST /api/wishlist`
Add item to wishlist
- **Auth**: Required
- **Body**: `{ product_id: string }`
- **Response**: Added wishlist item

#### `DELETE /api/wishlist`
Remove item from wishlist
- **Auth**: Required
- **Query**: `product_id`
- **Response**: Success message

### User Addresses

#### `GET /api/account/addresses`
Get user's saved addresses
- **Auth**: Required
- **Response**: Address list

#### `POST /api/account/addresses`
Add new address
- **Auth**: Required
- **Body**: Address object
- **Response**: Created address

#### `PUT /api/account/addresses/[id]`
Update address
- **Auth**: Required
- **Body**: Address update object
- **Response**: Updated address

#### `DELETE /api/account/addresses/[id]`
Delete address
- **Auth**: Required
- **Response**: Success message

### Blog

#### `GET /api/blog`
List blog posts
- **Query Params**: `page`, `limit`, `category`, `featured`, `search`
- **Response**: Paginated blog posts

#### `POST /api/blog`
Create blog post (Admin only)
- **Auth**: Required (Admin)
- **Body**: Blog post object
- **Response**: Created post

#### `GET /api/blog/[slug]`
Get single blog post
- **Response**: Blog post with author details

#### `PUT /api/blog/[slug]`
Update blog post (Admin only)
- **Auth**: Required (Admin)
- **Body**: Blog post update object
- **Response**: Updated post

#### `DELETE /api/blog/[slug]`
Delete blog post (Admin only)
- **Auth**: Required (Admin)
- **Response**: Success message

### Reviews

#### `GET /api/reviews`
Get product reviews
- **Query**: `product_id`, `page`, `limit`
- **Response**: Reviews with ratings summary

#### `POST /api/reviews`
Create product review
- **Auth**: Required
- **Body**: `{ product_id: string, rating: number, title?: string, comment?: string }`
- **Response**: Created review

### Contact & Newsletter

#### `POST /api/contact`
Submit contact form
- **Body**: `{ name: string, email: string, subject?: string, message: string }`
- **Response**: Success message

#### `GET /api/contact`
Get contact messages (Admin only)
- **Auth**: Required (Admin)
- **Query**: `page`, `limit`, `status`
- **Response**: Paginated messages

#### `POST /api/newsletter`
Subscribe to newsletter
- **Body**: `{ email: string }`
- **Response**: Success message

#### `DELETE /api/newsletter`
Unsubscribe from newsletter
- **Query**: `email`, `token?`
- **Response**: Success message

#### `GET /api/newsletter`
Get newsletter subscribers (Admin only)
- **Auth**: Required (Admin)
- **Query**: `page`, `limit`, `subscribed`
- **Response**: Paginated subscribers

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE", // Optional
  "details": {} // Optional additional details
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- General endpoints: 100 requests per minute
- Authentication endpoints: 10 requests per minute
- Payment endpoints: 20 requests per minute

## Data Models

### Product
```typescript
interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: 'liquid' | 'spray'
  colors: string[]
  images: string[]
  featured: boolean
  active: boolean
  stock_quantity: number
  rating: number
  review_count: number
  for_use: string[]
  created_at: string
  updated_at: string
}
```

### Order
```typescript
interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  currency: string
  payment_method: 'stripe' | 'crypto'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: Address
  billing_address?: Address
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
  order_items: OrderItem[]
}
```

### Address
```typescript
interface Address {
  first_name: string
  last_name: string
  company?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
}
```

## Environment Variables

Required environment variables for backend operation:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=
SOLANA_RPC_URL=
SOLANA_MERCHANT_WALLET=

# Email
RESEND_API_KEY=
FROM_EMAIL=

# Other
NODE_ENV=
APP_URL=
NEXTAUTH_SECRET=
```

## Security

- All sensitive endpoints require authentication
- Input validation and sanitization on all endpoints
- Rate limiting to prevent abuse
- CORS configuration for API access
- Environment variables for all secrets
- SQL injection prevention through parameterized queries
- XSS protection through input sanitization
