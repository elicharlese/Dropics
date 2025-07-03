# Dropics Backend Development Guide

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Rust 1.70+ (for Solana integration)
- Supabase CLI
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/elicharlese/Dropics.git
   cd Dropics
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd rust-solana && cargo build
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Database setup**
   ```bash
   # Start Supabase locally
   supabase start
   
   # Apply migrations
   supabase db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
/project/workspace/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   ├── cart/          # Shopping cart
│   │   ├── orders/        # Order management
│   │   ├── payments/      # Payment processing
│   │   ├── wishlist/      # User wishlist
│   │   ├── account/       # User account management
│   │   ├── blog/          # Blog/CMS
│   │   ├── reviews/       # Product reviews
│   │   ├── contact/       # Contact form
│   │   └── newsletter/    # Newsletter subscription
│   ├── (auth)/           # Auth pages
│   ├── (checkout)/       # Checkout flow
│   └── [other-pages]/    # Public pages
├── components/            # React components
├── lib/                  # Utilities and configs
│   ├── supabase.ts       # Supabase client
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── auth-middleware.ts # Auth helpers
├── database/             # Database schema and migrations
├── rust-solana/          # Solana blockchain integration
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD pipelines
└── tests/               # Test suites
```

## Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- `profiles` - User profiles extending Supabase auth
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `cart_items` - Shopping cart
- `wishlist_items` - User wishlists
- `reviews` - Product reviews
- `blog_posts` - Blog content
- `contact_messages` - Contact form submissions
- `newsletter_subscribers` - Email subscribers
- `crypto_payments` - Cryptocurrency payment tracking
- `user_addresses` - Saved customer addresses

See `database/schema.sql` for complete schema definition.

## API Development

### Creating New Endpoints

1. Create route file in `app/api/[endpoint]/route.ts`
2. Implement HTTP methods (GET, POST, PUT, DELETE)
3. Add authentication if required using `withAuth` middleware
4. Validate input data
5. Add error handling
6. Update API documentation

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult
    
    // Your logic here
    
    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Authentication Middleware

Use the `withAuth` helper for protected endpoints:

```typescript
import { withAuth } from '@/lib/auth-middleware'

export async function POST(request: NextRequest) {
  const authResult = await withAuth(request)
  if (authResult instanceof NextResponse) return authResult
  
  const { user } = authResult
  // user is authenticated, proceed with logic
}
```

### Error Handling

Always return consistent error responses:

```typescript
return NextResponse.json(
  { error: 'Descriptive error message' },
  { status: 400 }
)
```

## Payment Integration

### Stripe Integration

1. Payment Intent Creation:
   ```typescript
   const paymentIntent = await stripe.paymentIntents.create({
     amount: Math.round(order.total_amount * 100),
     currency: 'usd',
     metadata: { order_id: order.id }
   })
   ```

2. Webhook Handling:
   - Verify webhook signature
   - Handle payment events
   - Update order status

### Cryptocurrency Payments

1. **Solana Integration**: Uses Rust library for blockchain operations
2. **Payment Flow**:
   - Generate payment address
   - Create payment record
   - Monitor blockchain for confirmation
   - Update order status

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Rust Tests
```bash
npm run rust:test
```

## Deployment

### Vercel Deployment

1. **Automatic Deployment**: 
   - Push to `main` branch triggers production deployment
   - Pull requests create preview deployments

2. **Environment Variables**: Set in Vercel dashboard
   - Production secrets
   - Database URLs
   - API keys

### Database Migrations

```bash
# Apply migrations to production
supabase db push --linked

# Reset database (development only)
supabase db reset
```

## Security Best Practices

1. **Authentication**: All protected endpoints use JWT tokens
2. **Input Validation**: Validate all user inputs
3. **SQL Injection**: Use parameterized queries
4. **Rate Limiting**: Implement on all endpoints
5. **CORS**: Configure appropriately
6. **Environment Variables**: Never commit secrets
7. **Error Messages**: Don't expose sensitive information

## Performance Optimization

1. **Database Indexing**: Proper indexes on frequently queried columns
2. **Caching**: Use Redis or Vercel Edge Cache for API responses
3. **Image Optimization**: Compress and serve optimized images
4. **Code Splitting**: Lazy load components
5. **Bundle Analysis**: Monitor bundle size

## Monitoring and Logging

1. **Error Tracking**: Use Sentry or similar service
2. **Application Monitoring**: Monitor API response times
3. **Database Monitoring**: Track query performance
4. **User Analytics**: Track user behavior and conversions

## Contributing

1. **Branch Naming**: `feature/description` or `fix/description`
2. **Commit Messages**: Follow conventional commits
3. **Pull Requests**: Include description and test results
4. **Code Review**: Required before merging
5. **Documentation**: Update docs for new features

## Troubleshooting

### Common Issues

1. **Supabase Connection**: Check environment variables
2. **TypeScript Errors**: Run `npm run type-check`
3. **Build Failures**: Check logs for missing dependencies
4. **Payment Issues**: Verify webhook configurations

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm run dev
```

### Database Issues

```bash
# Check connection
supabase status

# View logs
supabase logs

# Reset local database
supabase db reset --local
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Solana Documentation](https://docs.solana.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

- Create GitHub issues for bugs
- Use discussions for questions
- Check existing documentation first
- Follow the issue templates
