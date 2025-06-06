import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "liquid" | "spray"
  colors: string[]
  rating: number
  reviewCount: number
}

const products: Product[] = [
  {
    id: "liquid-gold",
    name: "Golden Sparkle",
    description: "Luxurious gold liquid glitter for champagne and desserts",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Gold"],
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "spray-silver",
    name: "Silver Mist",
    description: "Fine silver spray for decorating cakes and pastries",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Silver"],
    rating: 4.8,
    reviewCount: 97,
  },
  {
    id: "liquid-rainbow",
    name: "Rainbow Shimmer",
    description: "Multi-colored liquid glitter for cocktails and beverages",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Rainbow"],
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "spray-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored spray for desserts and confections",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Rose"],
    rating: 4.8,
    reviewCount: 84,
  },
]

export default function BestSellersPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">Best Sellers</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our most popular edible glitter products loved by professional chefs and mixologists
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
                <Badge className="absolute top-2 right-2 z-10 bg-brand-gold text-white">Best Seller</Badge>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{product.name}</CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{product.description}</p>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-brand-gold fill-brand-gold" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="font-semibold">${product.price}</p>
                <Button size="sm" className="bg-brand-purple hover:bg-brand-lavender">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

