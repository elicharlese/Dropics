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
  isNew: boolean
}

const products: Product[] = [
  {
    id: "liquid-platinum",
    name: "Platinum Shimmer",
    description: "Our newest liquid glitter with a sophisticated platinum finish",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Platinum"],
    isNew: true,
  },
  {
    id: "spray-copper",
    name: "Copper Luster",
    description: "Warm copper-toned spray glitter for elegant dessert decoration",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Copper"],
    isNew: true,
  },
  {
    id: "liquid-emerald",
    name: "Emerald Sparkle",
    description: "Rich emerald green liquid glitter for cocktails and beverages",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Emerald"],
    isNew: true,
  },
  {
    id: "spray-holographic",
    name: "Holographic Mist",
    description: "Multi-dimensional holographic spray for show-stopping desserts",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Holographic"],
    isNew: true,
  },
]

export default function NewArrivalsPage() {
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">New Arrivals</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover our latest edible glitter products for your culinary creations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
                <Badge className="absolute top-2 right-2 z-10 bg-brand-purple text-white">New</Badge>
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

