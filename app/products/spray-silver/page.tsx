import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { CryptoPayButton } from "@/components/crypto-pay-button"

export default function SilverMistPage() {
  // Product details
  const product = {
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
    features: [
      "100% organic and food-safe ingredients",
      "Fine mist for professional-quality finish",
      "Even coverage with no clumping",
      "Quick-drying formula",
      "75ml bottle (approximately 30-40 applications)",
    ],
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Link
        href="/products/spray"
        className="inline-flex items-center mb-8 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Spray Glitter Collection
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
            <h3 className="font-bold mb-2">Wedding Cakes</h3>
            <p className="text-muted-foreground mb-4">
              Create elegant silver accents on wedding cakes for a sophisticated, premium finish.
            </p>
            <Link href="/inspiration?category=weddings">
              <Button variant="outline">View Wedding Ideas</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Holiday Desserts</h3>
            <p className="text-muted-foreground mb-4">
              Add a festive touch to your Christmas, New Year's, and winter holiday desserts.
            </p>
            <Link href="/inspiration?category=holidays">
              <Button variant="outline">View Holiday Ideas</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Cupcake Decorating</h3>
            <p className="text-muted-foreground mb-4">
              Elevate simple cupcakes with a professional silver finish that will impress your guests.
            </p>
            <Link href="/inspiration?category=cupcakes">
              <Button variant="outline">View Cupcake Ideas</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

