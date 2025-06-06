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
}

const products: Product[] = [
  {
    id: "spray-silver",
    name: "Silver Mist",
    description: "Fine silver spray for decorating cakes and pastries",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Silver"],
  },
  {
    id: "spray-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored spray for desserts and confections",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Rose"],
  },
  {
    id: "spray-gold",
    name: "Gold Luster",
    description: "Luxurious gold spray for elegant cake decorations",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Gold"],
  },
  {
    id: "spray-platinum",
    name: "Platinum Shine",
    description: "Premium platinum spray for sophisticated dessert presentations",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "spray",
    colors: ["Platinum"],
  },
]

export default function SprayGlitterPage() {
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">
            Spray Glitter Collection
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elevate your desserts and confections with our premium organic spray glitter
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
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

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">How to Use Spray Glitter</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-brand-purple">1</span>
            </div>
            <h3 className="font-bold mb-2">Shake Well</h3>
            <p className="text-sm text-muted-foreground">
              Shake the spray bottle thoroughly before use to ensure even distribution of glitter particles.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-brand-purple">2</span>
            </div>
            <h3 className="font-bold mb-2">Hold at Distance</h3>
            <p className="text-sm text-muted-foreground">
              Hold the spray 6-8 inches away from your dessert or confection surface.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-brand-purple">3</span>
            </div>
            <h3 className="font-bold mb-2">Apply in Bursts</h3>
            <p className="text-sm text-muted-foreground">
              Apply in short, controlled bursts for an even coating and professional finish.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Cake decorated with spray glitter"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Professional Results</h2>
            <p className="text-muted-foreground mb-4">
              Our spray glitter products are designed for professional bakers and pastry chefs, but are easy enough for
              home use. Create stunning, Instagram-worthy desserts with just a few sprays.
            </p>
            <Link href="/inspiration">
              <Button className="bg-brand-purple hover:bg-brand-lavender">View Inspiration Gallery</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

