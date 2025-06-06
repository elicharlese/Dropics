"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutProgress } from "@/components/checkout-progress"
import { CheckCircle, CreditCard, Bitcoin, Package, Printer, ArrowRight } from "lucide-react"

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>("")
  const [shippingInfo, setShippingInfo] = useState<any>(null)
  const [paymentInfo, setPaymentInfo] = useState<any>(null)

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`
    setOrderNumber(randomOrderNumber)

    // Get shipping and payment info from session storage
    const storedShippingInfo = sessionStorage.getItem("shippingInfo")
    const storedPaymentInfo = sessionStorage.getItem("paymentInfo")

    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo))
    }

    if (storedPaymentInfo) {
      setPaymentInfo(JSON.parse(storedPaymentInfo))
    }

    // Clear session storage
    // In a real app, you might want to keep this data for a while
    // sessionStorage.clear()
  }, [])

  // Mock order summary data
  const subtotal = 41.97
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container px-4 md:px-6">
      <CheckoutProgress />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We've received your payment and will process your order shortly.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{orderNumber}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                {shippingInfo ? (
                  <p className="text-sm text-muted-foreground">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address} {shippingInfo.apartment && `, ${shippingInfo.apartment}`}
                    <br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    <br />
                    {shippingInfo.country === "us"
                      ? "United States"
                      : shippingInfo.country === "ca"
                        ? "Canada"
                        : shippingInfo.country === "uk"
                          ? "United Kingdom"
                          : "Australia"}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Address information not available</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                {paymentInfo ? (
                  <div className="flex items-center text-sm text-muted-foreground">
                    {paymentInfo.method === "card" ? (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</span>
                      </>
                    ) : (
                      <>
                        <Bitcoin className="h-4 w-4 mr-2" />
                        <span>
                          {paymentInfo.currency === "btc"
                            ? "Bitcoin (BTC)"
                            : paymentInfo.currency === "eth"
                              ? "Ethereum (ETH)"
                              : paymentInfo.currency === "usdt"
                                ? "Tether (USDT)"
                                : "USD Coin (USDC)"}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Payment information not available</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex items-center justify-center text-xs font-medium">
                      2x
                    </div>
                    <span>Rainbow Shimmer</span>
                  </div>
                  <span>$25.98</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex items-center justify-center text-xs font-medium">
                      1x
                    </div>
                    <span>Silver Mist</span>
                  </div>
                  <span>$15.99</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
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

            <div className="bg-muted p-4 rounded-md flex items-start">
              <Package className="h-5 w-5 mr-3 mt-0.5 text-brand-purple" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Your order is expected to arrive by {formattedDeliveryDate}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>

            <Link href="/account/orders">
              <Button className="bg-brand-purple hover:bg-brand-lavender">
                View Order Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">What's Next?</h2>
          <p className="text-muted-foreground">
            You will receive an order confirmation email with details of your order. We will send you another email when
            your order has shipped.
          </p>
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

