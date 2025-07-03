// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>
      }
      cart_items: {
        Row: CartItem
        Insert: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CartItem, 'id' | 'created_at' | 'updated_at'>>
      }
      wishlist_items: {
        Row: WishlistItem
        Insert: Omit<WishlistItem, 'id' | 'created_at'>
        Update: never
      }
    }
  }
}

// Core entity types
export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Product {
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

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  currency: string
  payment_method: 'stripe' | 'crypto'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address?: Address
  billing_address?: Address
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  title?: string
  comment?: string
  verified_purchase: boolean
  created_at: string
  updated_at: string
  user?: Profile
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content?: string
  excerpt?: string
  featured_image?: string
  category?: string
  author_id: string
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
  author?: Profile
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed: boolean
  created_at: string
}

export interface CryptoPayment {
  id: string
  order_id: string
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'SOL'
  amount: number
  address: string
  transaction_hash?: string
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
  updated_at: string
}

export interface Address {
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

export interface UserAddress extends Address {
  id: string
  user_id: string
  type: 'billing' | 'shipping'
  is_default: boolean
  created_at: string
  updated_at: string
}

// API request/response types
export interface CreateOrderRequest {
  items: Array<{
    product_id: string
    quantity: number
  }>
  shipping_address: Address
  billing_address?: Address
  payment_method: 'stripe' | 'crypto'
}

export interface UpdateCartItemRequest {
  quantity: number
}

export interface CreateReviewRequest {
  product_id: string
  rating: number
  title?: string
  comment?: string
}

export interface ContactFormRequest {
  name: string
  email: string
  subject?: string
  message: string
}

export interface NewsletterSignupRequest {
  email: string
}

// API response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Payment types
export interface StripePaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
}

export interface CryptoPaymentRequest {
  amount: number
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'SOL'
  order_id: string
}

export interface CryptoPaymentResponse {
  address: string
  amount: number
  currency: string
  qr_code?: string
  expires_at: string
}

// Authentication types
export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}

// Error types
export interface ApiError {
  code: string
  message: string
  details?: any
}

// Utility types
export type CreateProduct = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating' | 'review_count'>
export type UpdateProduct = Partial<CreateProduct>
export type CreateOrder = Omit<Order, 'id' | 'created_at' | 'updated_at'>
export type UpdateOrder = Partial<Pick<Order, 'status' | 'tracking_number' | 'notes'>>
