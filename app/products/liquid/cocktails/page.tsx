import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "liquid" | "spray"
  colors: string[]
  uses: string[]
}

const products: Product[] = [
  {
    id: "liquid-rainbow",
    name: "Rainbow Shimmer",
    description: "Multi-colored liquid glitter for cocktails and beverages",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Rainbow"],
    uses: ["cocktails", "beverages"],
  },
  {
    id: "liquid-gold",
    name: "Golden Sparkle",
    description: "Luxurious gold liquid glitter for champagne and desserts",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Gold"],
    uses: ["cocktails", "champagne", "desserts"],
  },
  {
    id: "liquid-silver",
    name: "Silver Elegance",
    description: "Sophisticated silver liquid glitter for premium beverages",
    price: 13.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Silver"],
    uses: ["cocktails", "beverages"],
  },
  {
    id: "liquid-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored liquid glitter for romantic occasions",
    price: 13.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Rose"],
    uses: ["cocktails", "champagne"],
  },
]

// Filter products for cocktails
const cocktailProducts = products.filter((product) => product.uses.includes("cocktails"))

export default function CocktailsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/products/liquid"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Liquid Glitter Collection
      </Link>

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">
            Liquid Glitter for Cocktails
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elevate your cocktail creations with our premium organic liquid glitter
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cocktailProducts.map((product) => (
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
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="font-semibold">${product.price}</p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Mixologist Tips</h2>
            <p className="text-muted-foreground mb-4">
              Our liquid glitter products are perfect for creating stunning signature cocktails that will impress your
              guests. Here are some tips from professional mixologists:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-4">
              <li>Add 2-3 drops per cocktail for the perfect shimmer effect</li>
              <li>Works best in clear or light-colored cocktails</li>
              <li>Add as the final step before serving</li>
              <li>Pairs beautifully with gin, vodka, and white rum-based cocktails</li>
            </ul>
            <Link href="/inspiration?category=cocktails">
              <Button className="bg-brand-purple hover:bg-brand-lavender">View Cocktail Recipes</Button>
            </Link>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Cocktails with liquid glitter"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

