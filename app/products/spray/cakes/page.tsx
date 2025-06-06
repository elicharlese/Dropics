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
    description: "Fine silver spray for elegant cake decoration",
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
    description: "Luxurious gold spray for premium cake finishes",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Gold"],
    rating: 4.7,
    reviewCount: 85,
    forUse: ["cakes", "pastries", "chocolates"],
  },
  {
    id: "spray-platinum",
    name: "Platinum Shine",
    description: "Sophisticated platinum spray for wedding and celebration cakes",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Platinum"],
    rating: 4.9,
    reviewCount: 62,
    forUse: ["cakes"],
  },
  {
    id: "spray-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored spray for romantic cake designs",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Rose"],
    rating: 4.8,
    reviewCount: 84,
    forUse: ["cakes", "pastries"],
  },
]

export default function SprayForCakesPage() {
  // Filter products for cakes
  const cakeProducts = products.filter((product) => product.forUse.includes("cakes"))

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
            Spray Glitter for Cakes
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elevate your cake designs with our premium edible spray glitter collection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {cakeProducts.map((product) => (
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
        <h2 className="text-2xl font-bold mb-4 elegant-text-gradient">Cake Decoration Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Perfect Application</h3>
            <p className="text-muted-foreground">
              For best results, hold the spray 8-10 inches away from your cake and apply in short bursts. Allow each
              layer to dry before adding more for a buildable effect.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Creating Patterns</h3>
            <p className="text-muted-foreground">
              Use stencils or templates to create intricate patterns on your cakes. Our fine mist sprays are perfect for
              detailed work and professional finishes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Layering Colors</h3>
            <p className="text-muted-foreground">
              Experiment with layering different colors for unique effects. Start with lighter colors and gradually add
              darker shades for dimension.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Storage Tips</h3>
            <p className="text-muted-foreground">
              Store your decorated cakes in a cool, dry place away from direct sunlight to maintain the vibrant colors
              of the spray glitter.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 elegant-text-gradient">Inspiration Gallery</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
          See how professional bakers and cake artists use our spray glitter products to create stunning designs
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=300&width=300&text=Cake+Design+${i}`}
                alt={`Cake design example ${i}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <Button className="mt-6 bg-brand-purple hover:bg-brand-lavender">
          <Link href="/inspiration?category=cakes">View More Inspiration</Link>
        </Button>
      </div>
    </div>
  )
}

