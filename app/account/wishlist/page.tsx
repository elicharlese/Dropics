"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import AccountNav from "@/components/account-nav"

// Mock wishlist data - would be fetched from an API
const wishlistItems = [
  {
    id: "liquid-rainbow",
    name: "Rainbow Shimmer",
    description: "Multi-colored liquid glitter for cocktails and beverages",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "liquid",
    addedOn: "March 10, 2023",
  },
  {
    id: "spray-gold",
    name: "Gold Luster",
    description: "Luxurious gold spray for decorating cakes and pastries",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "spray",
    addedOn: "March 5, 2023",
  },
  {
    id: "liquid-platinum",
    name: "Platinum Shimmer",
    description: "Our newest liquid glitter with a sophisticated platinum finish",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "liquid",
    addedOn: "February 28, 2023",
  },
]

export default function WishlistPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">Products you've saved for later</p>
            </div>
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-48 bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-4" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                  </div>
                  <CardHeader className="pb-2">
                    <Link href={`/products/${item.id}`}>
                      <CardTitle className="text-lg hover:text-brand-purple transition-colors">{item.name}</CardTitle>
                    </Link>
                    <CardDescription>Added on {item.addedOn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    <p className="mt-2 font-semibold">${item.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full bg-brand-purple hover:bg-brand-lavender">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 border rounded-lg border-dashed">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Save items you love to your wishlist</p>
              <Link href="/">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

