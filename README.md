# Dropics - E-commerce Platform Backend

![Dropics Logo](./public/placeholder-logo.png)

A modern, full-stack e-commerce platform specializing in edible glitter and food decoration products. Built with Next.js, Supabase, and featuring Web3 payment integration through Solana.

## 🚀 Features

### Core E-commerce
- **Product Catalog** - Comprehensive product management with categories, colors, and variants
- **Shopping Cart** - Persistent cart with real-time updates
- **Order Management** - Complete order lifecycle from creation to fulfillment
- **User Accounts** - Profile management, addresses, order history
- **Wishlist** - Save products for later purchase

### Payments
- **Stripe Integration** - Credit/debit card payments with webhooks
- **Cryptocurrency** - Bitcoin, Ethereum, USDT, USDC support
- **Solana Pay** - Native Solana blockchain integration with Rust
- **Payment Tracking** - Real-time payment status and confirmations

### Content Management
- **Blog System** - Dynamic blog with categories and featured posts
- **Product Reviews** - Customer reviews and ratings
- **Newsletter** - Email subscription management
- **Contact System** - Customer support and inquiry handling

### Advanced Features
- **Authentication** - Supabase Auth with JWT tokens
- **Real-time Updates** - Live cart and order status updates
- **Search & Filtering** - Advanced product search and filtering
- **Mobile Responsive** - Optimized for all device sizes
- **SEO Optimized** - Server-side rendering and meta optimization

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Framer Motion** - Smooth animations

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database with real-time features
- **Supabase Auth** - Authentication and user management
- **Stripe** - Payment processing
- **Resend** - Transactional email service

### Blockchain
- **Rust** - High-performance Solana integration
- **Solana SDK** - Blockchain payment processing
- **Web3.js** - Frontend blockchain interactions

### DevOps
- **Vercel** - Deployment and hosting
- **GitHub Actions** - CI/CD pipelines
- **Sentry** - Error tracking and monitoring
- **TypeScript** - End-to-end type safety

## 📁 Project Structure

```
dropics/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── products/       # Product management
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order processing
│   │   ├── payments/       # Payment gateways
│   │   ├── wishlist/       # User wishlist
│   │   ├── account/        # Account management
│   │   ├── blog/           # Blog & CMS
│   │   └── contact/        # Contact & support
│   ├── (auth)/             # Authentication pages
│   ├── (checkout)/         # Checkout flow
│   ├── products/           # Product pages
│   ├── account/            # User account
│   └── [other-pages]/      # Public pages
├── components/              # React components
│   ├── ui/                 # Base UI components
│   └── [feature-components]/ # Feature-specific components
├── lib/                    # Utilities and configurations
│   ├── supabase.ts         # Database client
│   ├── types.ts            # TypeScript definitions
│   ├── utils.ts            # Helper functions
│   └── auth-middleware.ts  # Authentication helpers
├── database/               # Database schema and migrations
├── rust-solana/           # Solana blockchain integration
├── docs/                  # Documentation
└── __tests__/             # Test suites
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elicharlese/Dropics.git
   cd Dropics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_MERCHANT_WALLET=your_merchant_wallet_address

# Email
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database migrations**
   ```bash
   # Copy the contents of database/schema.sql to your Supabase SQL editor
   # Or use the Supabase CLI:
   supabase link --project-ref your-project-ref
   supabase db push
   ```

3. **Configure Row Level Security**
   ```bash
   # Apply RLS policies from database/rls-policies.sql
   ```

## 📚 API Documentation

### Authentication
All protected endpoints require a Bearer token in the Authorization header.

### Core Endpoints

- `GET /api/products` - List products with filtering
- `POST /api/cart` - Add items to cart
- `POST /api/orders` - Create new order
- `POST /api/payments/stripe` - Process Stripe payment
- `POST /api/payments/crypto` - Process crypto payment

See [API Documentation](./docs/API.md) for complete endpoint reference.

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# All tests
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployment on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🛡️ Security

- **Authentication** - JWT-based authentication with Supabase
- **Authorization** - Row Level Security (RLS) policies
- **Input Validation** - Server-side validation on all endpoints
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS** - Configured for production domains
- **Environment Variables** - Secure secret management

## 🎯 Performance

- **Server-Side Rendering** - Fast initial page loads
- **Static Generation** - Pre-built pages for optimal performance
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Lazy loading for optimal bundle sizes
- **Database Indexing** - Optimized database queries
- **CDN** - Global content delivery

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Standards

- **TypeScript** - All code must be typed
- **ESLint** - Follow the established linting rules
- **Prettier** - Use consistent code formatting
- **Tests** - Write tests for new features
- **Documentation** - Update docs for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Documentation** - [docs/](./docs/)
- **Issues** - [GitHub Issues](https://github.com/elicharlese/Dropics/issues)
- **Discussions** - [GitHub Discussions](https://github.com/elicharlese/Dropics/discussions)
- **Email** - support@dropics.com

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Core e-commerce functionality
- [x] Stripe payment integration
- [x] Basic cryptocurrency support
- [x] User authentication and accounts
- [x] Product catalog and cart

### Phase 2
- [ ] Advanced Solana Pay integration
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

### Phase 3
- [ ] Multi-vendor marketplace
- [ ] Subscription products
- [ ] Advanced personalization
- [ ] International shipping
- [ ] AR product visualization

## 🏆 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [Stripe](https://stripe.com/) - Internet commerce platform
- [Solana](https://solana.com/) - Web-scale blockchain for decentralized apps
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

Made with ❤️ by the Dropics Team

## 📊 Status

![Build Status](https://github.com/elicharlese/Dropics/workflows/CI/CD/badge.svg)
![License](https://img.shields.io/github/license/elicharlese/Dropics)
![Version](https://img.shields.io/github/package-json/v/elicharlese/Dropics)
![Contributors](https://img.shields.io/github/contributors/elicharlese/Dropics)
