# Dropics Production Deployment Guide

## Overview

This guide covers deploying the Dropics backend to production using Vercel, Supabase, and external payment providers.

## Prerequisites

- Vercel account
- Supabase project (production)
- Stripe account (live mode)
- Solana wallet for payments
- Domain name (optional)
- Email service (Resend/SendGrid)

## Pre-Deployment Checklist

### Code Preparation
- [ ] All tests passing
- [ ] TypeScript type checking clean
- [ ] ESLint issues resolved
- [ ] Production build successful
- [ ] Security audit passed
- [ ] Environment variables documented

### Database Setup
- [ ] Production Supabase project created
- [ ] Database schema migrated
- [ ] Row Level Security (RLS) policies configured
- [ ] Backup strategy implemented
- [ ] Connection limits configured

### Third-Party Services
- [ ] Stripe live mode configured
- [ ] Solana mainnet setup
- [ ] Email service configured
- [ ] Monitoring services setup
- [ ] CDN configured for assets

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file (never commit to git):

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Stripe Live
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Solana Mainnet
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_MERCHANT_WALLET=your_mainnet_wallet_address

# Email Service
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@yourdomain.com

# Security
NEXTAUTH_SECRET=your_secure_random_secret
NEXTAUTH_URL=https://yourdomain.com

# Monitoring
SENTRY_DSN=https://...
VERCEL_ENV=production
```

### Vercel Environment Variables

Set these in the Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add all production environment variables
3. Set appropriate scopes (Production, Preview, Development)
4. Sensitive variables should be encrypted

## Database Deployment

### Supabase Production Setup

1. **Create Production Project**
   ```bash
   # Link to production project
   supabase link --project-ref your-production-ref
   ```

2. **Deploy Schema**
   ```bash
   # Push schema to production
   supabase db push --linked
   ```

3. **Configure RLS Policies**
   ```sql
   -- Apply policies from database/rls-policies.sql
   \i database/rls-policies.sql
   ```

4. **Set Up Backups**
   - Enable automatic backups in Supabase dashboard
   - Configure retention period
   - Test restore procedure

### Database Optimization

1. **Indexing Strategy**
   ```sql
   -- Add production-specific indexes
   CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders(created_at DESC);
   CREATE INDEX CONCURRENTLY idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));
   ```

2. **Connection Pooling**
   - Configure connection limits in Supabase
   - Use connection pooling for high traffic

3. **Monitoring**
   - Set up query performance monitoring
   - Configure alerts for slow queries
   - Monitor connection usage

## Application Deployment

### Vercel Deployment

1. **Initial Setup**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Build Configuration**
   
   Create `vercel.json`:
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "installCommand": "npm install",
     "regions": ["iad1", "sfo1"],
     "functions": {
       "app/api/**": {
         "maxDuration": 30
       }
     },
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "/api/:path*"
       }
     ],
     "headers": [
       {
         "source": "/api/(.*)",
         "headers": [
           {
             "key": "Access-Control-Allow-Origin",
             "value": "https://yourdomain.com"
           },
           {
             "key": "Access-Control-Allow-Methods",
             "value": "GET, POST, PUT, DELETE, OPTIONS"
           },
           {
             "key": "Access-Control-Allow-Headers",
             "value": "Content-Type, Authorization"
           }
         ]
       }
     ]
   }
   ```

3. **Custom Domains**
   - Configure custom domain in Vercel
   - Set up SSL certificates
   - Configure DNS records

### Rust Solana Module

1. **Build for Production**
   ```bash
   cd rust-solana
   cargo build --release
   ```

2. **Cross-compilation** (if needed)
   ```bash
   # For different architectures
   cargo build --release --target x86_64-unknown-linux-musl
   ```

## Payment Gateway Setup

### Stripe Production

1. **Live Mode Configuration**
   - Activate live mode in Stripe dashboard
   - Update API keys in environment variables
   - Configure webhook endpoints

2. **Webhook Configuration**
   - Endpoint URL: `https://yourdomain.com/api/payments/stripe/webhook`
   - Events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `invoice.payment_succeeded`

3. **Testing Live Payments**
   - Use test cards in live mode (if available)
   - Verify webhook delivery
   - Test payment flows end-to-end

### Solana Mainnet

1. **Wallet Setup**
   - Create production wallet
   - Fund with sufficient SOL for transactions
   - Secure private key storage

2. **RPC Configuration**
   - Use reliable RPC provider (QuickNode, Alchemy)
   - Configure fallback providers
   - Monitor rate limits

## Security Hardening

### API Security

1. **Rate Limiting**
   ```typescript
   // Add to middleware.ts
   import { Ratelimit } from "@upstash/ratelimit"
   import { Redis } from "@upstash/redis"

   const ratelimit = new Ratelimit({
     redis: Redis.fromEnv(),
     limiter: Ratelimit.slidingWindow(100, "1 m"),
   })
   ```

2. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database operations
   - Use schema validation (Zod)

3. **Error Handling**
   - Don't expose internal errors
   - Log security events
   - Implement proper error boundaries

### Infrastructure Security

1. **Environment Variables**
   - Use Vercel's encrypted storage
   - Rotate secrets regularly
   - Implement secret scanning

2. **CORS Configuration**
   ```typescript
   // Restrict origins in production
   const allowedOrigins = ['https://yourdomain.com']
   ```

3. **Security Headers**
   ```typescript
   // Add security headers
   const securityHeaders = {
     'X-DNS-Prefetch-Control': 'on',
     'X-XSS-Protection': '1; mode=block',
     'X-Frame-Options': 'SAMEORIGIN',
     'X-Content-Type-Options': 'nosniff',
     'Referrer-Policy': 'origin-when-cross-origin',
   }
   ```

## Monitoring and Alerting

### Application Monitoring

1. **Error Tracking (Sentry)**
   ```bash
   npm install @sentry/nextjs
   ```

   Configure in `sentry.client.config.js`:
   ```javascript
   import * as Sentry from "@sentry/nextjs"

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   })
   ```

2. **Performance Monitoring**
   - Track API response times
   - Monitor database query performance
   - Set up alerting thresholds

3. **Uptime Monitoring**
   - Use services like Pingdom or UptimeRobot
   - Monitor critical endpoints
   - Set up SMS/email alerts

### Log Management

1. **Structured Logging**
   ```typescript
   import winston from 'winston'

   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.Console(),
       new winston.transports.File({ filename: 'app.log' })
     ]
   })
   ```

2. **Log Aggregation**
   - Use Vercel's built-in logging
   - Consider external services (DataDog, LogRocket)
   - Set up log retention policies

## Performance Optimization

### Caching Strategy

1. **API Response Caching**
   ```typescript
   // Use Vercel Edge Cache
   export const revalidate = 3600 // 1 hour
   ```

2. **Database Query Optimization**
   - Use proper indexes
   - Implement query result caching
   - Optimize N+1 queries

3. **Asset Optimization**
   - Use Next.js Image optimization
   - Implement CDN for static assets
   - Compress images and videos

### Database Performance

1. **Connection Pooling**
   - Configure appropriate pool sizes
   - Monitor connection usage
   - Use read replicas for heavy queries

2. **Query Optimization**
   - Analyze slow query logs
   - Optimize frequently used queries
   - Use database query profiling

## Backup and Recovery

### Database Backups

1. **Automated Backups**
   - Supabase automatic backups
   - Custom backup scripts
   - Cross-region backup storage

2. **Backup Testing**
   ```bash
   # Test backup restoration
   supabase db dump --data-only > backup.sql
   ```

3. **Recovery Procedures**
   - Document recovery steps
   - Test recovery procedures
   - Maintain recovery time objectives

### Application Backups

1. **Code Repository**
   - Git repository backups
   - Tag production releases
   - Maintain deployment artifacts

2. **Configuration Backups**
   - Environment variable backups
   - Infrastructure as code
   - Deployment configuration

## Go-Live Checklist

### Pre-Launch
- [ ] All tests passing in production environment
- [ ] Database migrations applied
- [ ] SSL certificates configured
- [ ] Custom domain configured
- [ ] Payment gateways tested
- [ ] Email notifications working
- [ ] Monitoring and alerting configured
- [ ] Backup procedures tested
- [ ] Security scan completed
- [ ] Performance testing completed

### Launch Day
- [ ] Final deployment executed
- [ ] Smoke tests passed
- [ ] Monitoring dashboards active
- [ ] Support team notified
- [ ] Rollback plan ready
- [ ] Traffic monitoring active

### Post-Launch
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify payment processing
- [ ] Monitor user feedback
- [ ] Review security logs
- [ ] Update documentation

## Rollback Procedures

### Quick Rollback
```bash
# Rollback to previous deployment
vercel --prod --force

# Or rollback to specific deployment
vercel rollback [deployment-url] --prod
```

### Database Rollback
```bash
# Rollback database migration
supabase db reset --linked
supabase db push --linked [previous-migration]
```

### Communication Plan
1. Notify stakeholders of issues
2. Provide status updates
3. Document lessons learned
4. Update procedures based on learnings

## Maintenance

### Regular Tasks
- Monitor performance metrics
- Review security logs
- Update dependencies
- Rotate secrets
- Review and optimize queries
- Test backup procedures

### Scheduled Maintenance
- Database maintenance windows
- Certificate renewals
- Security updates
- Performance optimization
- Capacity planning

## Support and Troubleshooting

### Common Production Issues

1. **High API Response Times**
   - Check database performance
   - Review slow query logs
   - Monitor third-party service status

2. **Payment Processing Errors**
   - Verify webhook configurations
   - Check API key validity
   - Monitor provider status pages

3. **Database Connection Issues**
   - Check connection pool limits
   - Monitor database resource usage
   - Verify network connectivity

### Support Escalation
1. Level 1: Application monitoring alerts
2. Level 2: Critical system failures
3. Level 3: Data integrity issues
4. Level 4: Security incidents

### Contact Information
- Database: Supabase support
- Hosting: Vercel support
- Payments: Stripe/Solana support
- Domain: Domain registrar support
