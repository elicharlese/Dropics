"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    id: "liquid-rainbow",
    name: "Rainbow Shimmer",
    description: "Multi-colored liquid glitter for cocktails and beverages",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Rainbow"],
  },
  {
    id: "liquid-gold",
    name: "Golden Sparkle",
    description: "Luxurious gold liquid glitter for champagne and desserts",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "liquid",
    colors: ["Gold"],
  },
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
]

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<"all" | "liquid" | "spray">("all")

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div className="mt-12">
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => setActiveCategory("all")}
          className={activeCategory === "all" ? "bg-brand-teal text-white rounded-full" : "rounded-full"}
        >
          All Products
        </Button>
        <Button
          variant={activeCategory === "liquid" ? "default" : "outline"}
          onClick={() => setActiveCategory("liquid")}
          className={activeCategory === "liquid" ? "bg-brand-coral text-white rounded-full" : "rounded-full"}
        >
          Liquid Glitter
        </Button>
        <Button
          variant={activeCategory === "spray" ? "default" : "outline"}
          onClick={() => setActiveCategory("spray")}
          className={activeCategory === "spray" ? "bg-brand-yellow text-white rounded-full" : "rounded-full"}
        >
          Spray Glitter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="fun-card h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-gradient-to-r from-brand-teal/10 via-brand-coral/10 to-brand-yellow/10">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-brand-teal">{product.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="capitalize bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30"
                    >
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="font-semibold text-brand-coral">${product.price}</p>
                  <Button size="sm" className="bg-brand-teal hover:bg-brand-coral text-white rounded-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

