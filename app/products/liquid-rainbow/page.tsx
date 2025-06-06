import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { CryptoPayButton } from "@/components/crypto-pay-button"

export default function RainbowShimmerPage() {
  // Product details
  const product = {
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
    features: [
      "100% organic and food-safe ingredients",
      "Multi-colored rainbow effect",
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
        <h2 className="text-2xl font-bold mb-6">Recommended Pairings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Signature Cocktails</h3>
            <p className="text-muted-foreground mb-4">
              Rainbow Shimmer pairs beautifully with vodka-based cocktails, gin and tonics, and champagne cocktails.
            </p>
            <Link href="/inspiration?category=cocktails">
              <Button variant="outline">View Cocktail Recipes</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Non-Alcoholic Beverages</h3>
            <p className="text-muted-foreground mb-4">
              Create stunning lemonades, iced teas, and mocktails with a few drops of Rainbow Shimmer.
            </p>
            <Link href="/inspiration?category=mocktails">
              <Button variant="outline">View Mocktail Ideas</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Dessert Applications</h3>
            <p className="text-muted-foreground mb-4">
              Add to clear glazes, jellies, and mousses for an elegant rainbow shimmer effect.
            </p>
            <Link href="/inspiration?category=desserts">
              <Button variant="outline">View Dessert Ideas</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

