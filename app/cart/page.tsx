"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { CheckoutProgress } from "@/components/checkout-progress"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: "liquid" | "spray"
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "liquid-rainbow",
      name: "Rainbow Shimmer",
      price: 12.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
      category: "liquid",
    },
    {
      id: "spray-silver",
      name: "Silver Mist",
      price: 15.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      category: "spray",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 md:px-6">
      <CheckoutProgress />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/">
            <Button className="bg-brand-purple hover:bg-brand-lavender">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4 hidden sm:table-cell">Price</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4 hidden sm:table-cell">Total</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="relative w-16 h-16 mr-4 rounded overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                            <p className="text-sm font-medium sm:hidden">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4 hidden sm:table-cell">${item.price.toFixed(2)}</td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 mx-2 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="text-right p-4 hidden sm:table-cell">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <Link href="/">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Link href="/checkout">
                  <Button className="w-full bg-brand-purple hover:bg-brand-lavender">Proceed to Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

