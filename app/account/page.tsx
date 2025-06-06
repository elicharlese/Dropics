"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, CreditCard, Heart } from "lucide-react"
import AccountNav from "@/components/account-nav"

export default function AccountPage() {
  // This would normally be fetched from an API after authentication
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    joined: "January 2023",
  }

  // Recent orders - would be fetched from an API
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "March 15, 2023",
      status: "Delivered",
      total: 42.97,
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "February 28, 2023",
      status: "Delivered",
      total: 29.99,
      items: 2,
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">Member since {user.joined}</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                    <CardDescription>Your most recent purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{order.items} items</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No recent orders</p>
                    )}
                    <div className="mt-4 pt-4 border-t">
                      <Link href="/account/orders">
                        <Button variant="outline" className="w-full">
                          View All Orders
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Saved Items</CardTitle>
                    <CardDescription>Products in your wishlist</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32 border rounded-md border-dashed">
                      <div className="text-center">
                        <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No saved items yet</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Link href="/account/wishlist">
                        <Button variant="outline" className="w-full">
                          View Wishlist
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Account Summary</CardTitle>
                  <CardDescription>Quick access to your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Link href="/account/orders" className="group">
                      <div className="flex flex-col items-center p-4 border rounded-md transition-colors group-hover:border-brand-purple group-hover:bg-brand-purple/5">
                        <Package className="h-8 w-8 text-brand-purple mb-2" />
                        <p className="font-medium">Orders</p>
                        <p className="text-sm text-muted-foreground">View order history</p>
                      </div>
                    </Link>

                    <Link href="/account/addresses" className="group">
                      <div className="flex flex-col items-center p-4 border rounded-md transition-colors group-hover:border-brand-purple group-hover:bg-brand-purple/5">
                        <MapPin className="h-8 w-8 text-brand-purple mb-2" />
                        <p className="font-medium">Addresses</p>
                        <p className="text-sm text-muted-foreground">Manage addresses</p>
                      </div>
                    </Link>

                    <Link href="/account/payment" className="group">
                      <div className="flex flex-col items-center p-4 border rounded-md transition-colors group-hover:border-brand-purple group-hover:bg-brand-purple/5">
                        <CreditCard className="h-8 w-8 text-brand-purple mb-2" />
                        <p className="font-medium">Payment</p>
                        <p className="text-sm text-muted-foreground">Manage payment methods</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                          <Link href={`/account/orders/${order.id}`}>
                            <Button variant="ghost" size="sm" className="mt-1">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/account/orders">
                      <Button variant="outline">View All Orders</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping and billing addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                    <div className="text-center">
                      <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No addresses saved yet</p>
                      <Button variant="outline" className="mt-4">
                        Add New Address
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wishlist</CardTitle>
                  <CardDescription>Products you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                    <div className="text-center">
                      <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Your wishlist is empty</p>
                      <Link href="/">
                        <Button variant="outline" className="mt-4">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
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

