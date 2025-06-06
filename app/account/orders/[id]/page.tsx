"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Package, Truck, CheckCircle, Download } from "lucide-react"
import AccountNav from "@/components/account-nav"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // Mock order data - would be fetched from an API based on the order ID
  const order = {
    id: orderId,
    date: "March 15, 2023",
    status: "Delivered",
    total: 42.97,
    subtotal: 38.97,
    shipping: 4.0,
    tax: 0.0,
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: {
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
    },
    billingAddress: {
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
    },
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
    timeline: [
      {
        status: "Order Placed",
        date: "March 15, 2023",
        time: "10:30 AM",
      },
      {
        status: "Processing",
        date: "March 15, 2023",
        time: "2:45 PM",
      },
      {
        status: "Shipped",
        date: "March 16, 2023",
        time: "9:15 AM",
      },
      {
        status: "Delivered",
        date: "March 18, 2023",
        time: "2:30 PM",
      },
    ],
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <Link
              href="/account/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-brand-purple mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Order {order.id}</h1>
                <p className="text-muted-foreground">Placed on {order.date}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`} className="font-medium hover:text-brand-purple">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.billingAddress.name}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="mr-4 relative">
                      <div className="flex items-center justify-center w-8 h-8 bg-brand-purple rounded-full">
                        {index === 0 && <Package className="h-4 w-4 text-white" />}
                        {index === 1 && <Package className="h-4 w-4 text-white" />}
                        {index === 2 && <Truck className="h-4 w-4 text-white" />}
                        {index === 3 && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="absolute top-8 left-1/2 w-0.5 h-full -translate-x-1/2 bg-brand-purple/20" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

