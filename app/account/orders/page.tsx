"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search } from "lucide-react"
import AccountNav from "@/components/account-nav"

// Mock order data - would be fetched from an API
const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2023",
    status: "Delivered",
    total: 42.97,
    items: [
      {
        id: "liquid-rainbow",
        name: "Rainbow Shimmer",
        price: 12.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "spray-silver",
        name: "Silver Mist",
        price: 15.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-12344",
    date: "February 28, 2023",
    status: "Delivered",
    total: 29.99,
    items: [
      {
        id: "liquid-gold",
        name: "Golden Sparkle",
        price: 14.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-12343",
    date: "January 15, 2023",
    status: "Delivered",
    total: 58.96,
    items: [
      {
        id: "spray-rose",
        name: "Rose Glimmer",
        price: 15.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "liquid-rainbow",
        name: "Rainbow Shimmer",
        price: 12.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

export default function OrdersPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Order History</h1>
              <p className="text-muted-foreground">View and track your orders</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search orders..." className="w-full md:w-[250px] pl-8" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted p-4 flex flex-col md:flex-row justify-between md:items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">Order {order.id}</h3>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center gap-4">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <Link href={`/account/orders/${order.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Link href={`/products/${item.id}`} className="font-medium hover:text-brand-purple">
                                      {item.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">When you place orders, they will appear here</p>
                      <Link href="/">
                        <Button>Start Shopping</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="processing" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No processing orders</h3>
                    <p className="text-muted-foreground mb-4">You don't have any orders being processed right now</p>
                    <Link href="/">
                      <Button>Continue Shopping</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-4 flex flex-col md:flex-row justify-between md:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Order {order.id}</h3>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center gap-4">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <Link href={`/account/orders/${order.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <Link href={`/products/${item.id}`} className="font-medium hover:text-brand-purple">
                                    {item.name}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${item.price.toFixed(2)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

