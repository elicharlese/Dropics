import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { CryptoPayButton } from "@/components/crypto-pay-button"

type Product = {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  category: "liquid" | "spray"
  colors: string[]
  ingredients: string[]
  usage: string[]
}

const products: Product[] = [
  {
    id: "liquid-rainbow",
    name: "Rainbow Shimmer",
    description: "Multi-colored liquid glitter for cocktails and beverages",
    longDescription:
      "Our Rainbow Shimmer liquid glitter adds a magical, multi-colored sparkle to any beverage. Perfect for cocktails, mocktails, lemonades, and more. This food-safe, organic glitter creates a stunning visual effect that will impress your guests and elevate your drink presentation.",
    price: 12.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "liquid",
    colors: ["Rainbow"],
    ingredients: ["Organic sugar", "Natural food coloring", "Mica powder (food grade)", "Gum arabic"],
    usage: [
      "Add 2-3 drops to beverages for a subtle shimmer",
      "Stir gently to distribute the glitter effect",
      "Best used in clear or light-colored drinks",
      "Shake well before use",
    ],
  },
  {
    id: "liquid-gold",
    name: "Golden Sparkle",
    description: "Luxurious gold liquid glitter for champagne and desserts",
    longDescription:
      "Add a touch of luxury to your celebrations with our Golden Sparkle liquid glitter. This elegant gold shimmer is perfect for champagne, white wine, or as a finishing touch on desserts. Made with organic ingredients and food-safe colorants, it creates a stunning visual effect for special occasions.",
    price: 14.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "liquid",
    colors: ["Gold"],
    ingredients: ["Organic sugar", "Natural food coloring", "Mica powder (food grade)", "Gum arabic"],
    usage: [
      "Add 2-3 drops to champagne or white wine",
      "Drizzle over desserts for an elegant finish",
      "Mix into clear glazes for pastries",
      "Shake well before use",
    ],
  },
  {
    id: "spray-silver",
    name: "Silver Mist",
    description: "Fine silver spray for decorating cakes and pastries",
    longDescription:
      "Our Silver Mist spray delivers a fine, even coating of silver shimmer perfect for decorating cakes, cupcakes, and pastries. This easy-to-use spray creates a professional-looking finish with minimal effort. Made from organic ingredients and natural colorants, it's completely food-safe and adds an elegant touch to your baked creations.",
    price: 15.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "spray",
    colors: ["Silver"],
    ingredients: ["Organic sugar", "Natural food coloring", "Mica powder (food grade)", "Gum arabic", "Filtered water"],
    usage: [
      "Shake well before use",
      "Hold 6-8 inches away from food surface",
      "Apply in short bursts for even coverage",
      "Allow to dry for 5 minutes before serving",
    ],
  },
  {
    id: "spray-rose",
    name: "Rose Glimmer",
    description: "Delicate rose-colored spray for desserts and confections",
    longDescription:
      "Add a romantic touch to your desserts with our Rose Glimmer spray. This delicate, rose-colored shimmer is perfect for wedding cakes, Valentine's Day treats, or anytime you want to add a touch of pink elegance. The fine mist creates an even, subtle shimmer that enhances without overwhelming your beautiful creations.",
    price: 15.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "spray",
    colors: ["Rose"],
    ingredients: ["Organic sugar", "Natural food coloring", "Mica powder (food grade)", "Gum arabic", "Filtered water"],
    usage: [
      "Shake well before use",
      "Hold 6-8 inches away from food surface",
      "Apply in short bursts for even coverage",
      "Perfect for white or light-colored desserts",
    ],
  },
]

export default function Page({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
              {product.colors.map((color) => (
                <Badge key={color} variant="secondary">
                  {color}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">${product.price}</p>
          </div>

          <p className="text-muted-foreground">{product.longDescription}</p>

          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How to Use:</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {product.usage.map((usage, index) => (
                  <li key={index}>{usage}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Or buy now with:</p>
              <CryptoPayButton amount={product.price} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

