import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { CryptoPayButton } from "@/components/crypto-pay-button"

export default function GoldenSparklePage() {
  // Product details
  const product = {
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
    features: [
      "100% organic and food-safe ingredients",
      "Luxurious gold shimmer effect",
      "Taste-neutral formula",
      "Long-lasting shimmer (2-3 hours)",
      "15ml bottle (approximately 30-45 servings)",
    ],
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/products/liquid"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Liquid Glitter Collection
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
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

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

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Perfect For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Champagne Toasts</h3>
            <p className="text-muted-foreground mb-4">
              Elevate your wedding toasts, anniversary celebrations, and New Year's Eve parties with golden champagne.
            </p>
            <Link href="/inspiration?category=celebrations">
              <Button variant="outline">View Celebration Ideas</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Luxury Desserts</h3>
            <p className="text-muted-foreground mb-4">
              Add a touch of gold to mousses, panna cotta, and other elegant desserts for a premium finish.
            </p>
            <Link href="/inspiration?category=desserts">
              <Button variant="outline">View Dessert Ideas</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Corporate Events</h3>
            <p className="text-muted-foreground mb-4">
              Impress clients and colleagues with branded gold-shimmer cocktails at your next corporate function.
            </p>
            <Link href="/inspiration?category=events">
              <Button variant="outline">View Event Ideas</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

