import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star } from "lucide-react"

export default function AllProductsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 elegant-text-gradient">All Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our complete collection of premium edible glitters and decorative products for all your creative
          culinary needs.
        </p>
      </div>

      {/* Filter/Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by:</span>
          <select className="border rounded-md px-3 py-1 text-sm">
            <option>All Categories</option>
            <option>Liquid Glitter</option>
            <option>Spray Glitter</option>
          </select>
          <select className="border rounded-md px-3 py-1 text-sm">
            <option>All Colors</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Rainbow</option>
            <option>Rose</option>
            <option>Platinum</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <select className="border rounded-md px-3 py-1 text-sm">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Best Selling</option>
          </select>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products/bestsellers"
            className="text-sm font-medium text-brand-purple flex items-center hover:underline"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Featured Product 1 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-brand-purple text-white text-xs font-medium px-2 py-1 rounded">
              Best Seller
            </div>
            <Link href="/products/liquid-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Golden Sparkle Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Golden Sparkle</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(42)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$24.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Featured Product 2 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Gold Luster Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Gold Luster</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(38)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Featured Product 3 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </div>
            <Link href="/products/liquid-rainbow" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Rainbow Shimmer Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rainbow Shimmer</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(27)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$26.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Featured Product 4 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-silver" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Silver Mist Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Silver Mist</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(31)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Liquid Glitter Collection */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Liquid Glitter Collection</h2>
          <Link
            href="/products/liquid"
            className="text-sm font-medium text-brand-purple flex items-center hover:underline"
          >
            View collection <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Liquid Glitter Product 1 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/liquid-rainbow" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Rainbow Shimmer Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rainbow Shimmer</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$26.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Liquid Glitter Product 2 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/liquid-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Golden Sparkle Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Golden Sparkle</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$24.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Liquid Glitter Product 3 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/liquid-silver" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Silver Elegance Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Silver Elegance</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$24.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Liquid Glitter Product 4 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/liquid-rose" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Rose Glimmer Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rose Glimmer</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$24.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Spray Glitter Collection */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Spray Glitter Collection</h2>
          <Link
            href="/products/spray"
            className="text-sm font-medium text-brand-purple flex items-center hover:underline"
          >
            View collection <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Spray Glitter Product 1 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-silver" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Silver Mist Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Silver Mist</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Spray Glitter Product 2 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-rose" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Rose Glimmer Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rose Glimmer</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Spray Glitter Product 3 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Gold Luster Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Gold Luster</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Spray Glitter Product 4 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <Link href="/products/spray-platinum" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Platinum Shine Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Platinum Shine</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$21.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link
            href="/products/new"
            className="text-sm font-medium text-brand-purple flex items-center hover:underline"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* New Arrival 1 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </div>
            <Link href="/products/liquid-rainbow" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Rainbow Shimmer Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Rainbow Shimmer</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$26.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* New Arrival 2 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </div>
            <Link href="/products/spray-platinum" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Platinum Shine Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Platinum Shine</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$21.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link
            href="/products/bestsellers"
            className="text-sm font-medium text-brand-purple flex items-center hover:underline"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Best Seller 1 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-brand-purple text-white text-xs font-medium px-2 py-1 rounded">
              Best Seller
            </div>
            <Link href="/products/liquid-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Golden Sparkle Liquid Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Golden Sparkle</h3>
                <p className="text-sm text-muted-foreground mb-2">Liquid Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$24.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Best Seller 2 */}
          <div className="group relative border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-brand-purple text-white text-xs font-medium px-2 py-1 rounded">
              Best Seller
            </div>
            <Link href="/products/spray-gold" className="block">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Gold Luster Spray Glitter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Gold Luster</h3>
                <p className="text-sm text-muted-foreground mb-2">Spray Glitter</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$19.99</span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't decide which product to choose?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our starter kit includes samples of our most popular products, perfect for trying out different options.
        </p>
        <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
          Shop Starter Kits
        </Button>
      </section>
    </main>
  )
}

