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
  category: "spray"
  colors: string[]
  rating: number
  reviewCount: number
  forUse: string[]
}

const products: Product[] = [
  {
    id: "spray-silver",
    name: "Silver Mist",
    description: "Fine silver spray for delicate pastry decoration",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Silver"],
    rating: 4.8,
    reviewCount: 97,
    forUse: ["cakes", "pastries"],
  },
  {
    id: "spray-gold",
    name: "Gold Luster",
    description: "Luxurious gold spray for premium pastry finishes",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Gold"],
    rating: 4.7,
    reviewCount: 85,
    forUse: ["cakes", "pastries", "chocolates"],
  },
  {
    id: "spray-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored spray for elegant pastries",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Rose"],
    rating: 4.8,
    reviewCount: 84,
    forUse: ["cakes", "pastries"],
  },
]

export default function SprayForPastriesPage() {
  // Filter products for pastries
  const pastryProducts = products.filter((product) => product.forUse.includes("pastries"))

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/products/spray"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Spray Glitter
      </Link>

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">
            Spray Glitter for Pastries
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Add a touch of elegance to your pastries with our premium edible spray glitter
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {pastryProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
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

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 elegant-text-gradient">Pastry Decoration Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Light Application</h3>
            <p className="text-muted-foreground">
              For delicate pastries, use a light touch. Hold the spray 10-12 inches away and apply in a sweeping motion
              for an even, subtle shimmer.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Accent Details</h3>
            <p className="text-muted-foreground">
              Focus on highlighting specific areas of your pastries rather than covering the entire surface. This
              creates elegant focal points.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Combining with Sugar</h3>
            <p className="text-muted-foreground">
              For added texture, spray over areas dusted with powdered sugar or pearl dust for a multi-dimensional
              effect.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Timing Matters</h3>
            <p className="text-muted-foreground">
              Apply spray glitter just before serving for the most vibrant appearance, especially on glazed or iced
              pastries.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 elegant-text-gradient">Featured Pastry Creations</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover how pastry chefs use our spray glitter to transform ordinary pastries into extraordinary treats
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=300&width=300&text=Pastry+Creation+${i}`}
                alt={`Pastry creation example ${i}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <Button className="mt-6 bg-brand-purple hover:bg-brand-lavender">
          <Link href="/inspiration?category=pastries">View More Inspiration</Link>
        </Button>
      </div>
    </div>
  )
}

