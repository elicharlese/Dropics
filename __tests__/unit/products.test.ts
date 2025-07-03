import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/products/route'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
          range: jest.fn(),
          order: jest.fn(() => ({
            range: jest.fn()
          }))
        })),
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn()
          }))
        })),
        order: jest.fn(() => ({
          range: jest.fn()
        }))
      }))
    }))
  }
}))

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/products', () => {
    it('should return products with default pagination', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/products'
      })

      const mockProducts = [
        {
          id: '1',
          name: 'Gold Liquid Glitter',
          price: 29.99,
          category: 'liquid',
          active: true
        }
      ]

      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().select().eq().order().range.mockResolvedValue({
        data: mockProducts,
        error: null,
        count: 1
      })

      const response = await GET(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toEqual(mockProducts)
      expect(data.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 1,
        pages: 1
      })
    })

    it('should filter products by category', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/products?category=liquid'
      })

      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().select().eq().order().range.mockResolvedValue({
        data: [],
        error: null,
        count: 0
      })

      const response = await GET(req as any)
      
      expect(response.status).toBe(200)
      expect(mockSupabase.from().select().eq).toHaveBeenCalledWith('category', 'liquid')
    })

    it('should handle search queries', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/products?search=glitter'
      })

      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().select().eq().or = jest.fn(() => ({
        order: jest.fn(() => ({
          range: jest.fn().mockResolvedValue({
            data: [],
            error: null,
            count: 0
          })
        }))
      }))

      const response = await GET(req as any)
      
      expect(response.status).toBe(200)
    })

    it('should handle database errors', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/products'
      })

      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().select().eq().order().range.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
        count: 0
      })

      const response = await GET(req as any)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Invalid query parameters')
    })
  })

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Silver Spray Glitter',
        description: 'Beautiful silver spray glitter',
        price: 24.99,
        category: 'spray',
        colors: ['silver'],
        stock_quantity: 100
      }

      const { req } = createMocks({
        method: 'POST',
        body: productData
      })

      const createdProduct = { id: '1', ...productData }
      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().insert().select().single.mockResolvedValue({
        data: createdProduct,
        error: null
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.data).toEqual(createdProduct)
      expect(data.message).toBe('Product created successfully')
    })

    it('should validate required fields', async () => {
      const invalidData = {
        description: 'Missing required fields'
      }

      const { req } = createMocks({
        method: 'POST',
        body: invalidData
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid request data')
    })

    it('should validate price is positive', async () => {
      const invalidData = {
        name: 'Test Product',
        price: -10,
        category: 'liquid'
      }

      const { req } = createMocks({
        method: 'POST',
        body: invalidData
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid request data')
    })

    it('should handle database creation errors', async () => {
      const productData = {
        name: 'Test Product',
        price: 29.99,
        category: 'liquid'
      }

      const { req } = createMocks({
        method: 'POST',
        body: productData
      })

      const mockSupabase = require('@/lib/supabase').supabaseAdmin
      mockSupabase.from().insert().select().single.mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Invalid request data')
    })
  })
})
