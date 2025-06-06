"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckoutProgress } from "@/components/checkout-progress"
import { toast } from "@/components/ui/use-toast"
import { Loader2, CreditCard, Bitcoin, Lock } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [shippingInfo, setShippingInfo] = useState<any>(null)

  // Card payment form state
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  })

  // Crypto payment form state
  const [cryptoData, setCryptoData] = useState({
    currency: "btc",
  })

  useEffect(() => {
    // Get shipping info from session storage
    const storedShippingInfo = sessionStorage.getItem("shippingInfo")
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo))
    }
  }, [])

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store payment info in session storage for the next step
    if (paymentMethod === "card") {
      sessionStorage.setItem(
        "paymentInfo",
        JSON.stringify({
          method: "card",
          ...cardData,
        }),
      )
    } else {
      sessionStorage.setItem(
        "paymentInfo",
        JSON.stringify({
          method: "crypto",
          ...cryptoData,
        }),
      )
    }

    toast({
      title: "Payment processed",
      description: "Your payment has been processed successfully.",
    })

    router.push("/checkout/confirmation")
  }

  // Mock order summary data
  const subtotal = 41.97
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 md:px-6">
      <CheckoutProgress />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Payment Method</h1>
            <p className="text-muted-foreground">Choose your preferred payment method</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "card" | "crypto")}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-purple [&:has([data-state=checked])]:border-brand-purple"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span className="font-medium">Credit / Debit Card</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="crypto" id="crypto" className="peer sr-only" />
                  <Label
                    htmlFor="crypto"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-purple [&:has([data-state=checked])]:border-brand-purple"
                  >
                    <Bitcoin className="mb-3 h-6 w-6" />
                    <span className="font-medium">Cryptocurrency</span>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" ? (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardData.cardName}
                      onChange={handleCardChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Expiry Month</Label>
                      <Select
                        value={cardData.expiryMonth}
                        onValueChange={(value) => setCardData((prev) => ({ ...prev, expiryMonth: value }))}
                      >
                        <SelectTrigger id="expiryMonth">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = i + 1
                            return (
                              <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Expiry Year</Label>
                      <Select
                        value={cardData.expiryYear}
                        onValueChange={(value) => setCardData((prev) => ({ ...prev, expiryYear: value }))}
                      >
                        <SelectTrigger id="expiryYear">
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i
                            return (
                              <SelectItem key={year} value={year.toString().slice(-2)}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="cryptoCurrency">Select Cryptocurrency</Label>
                    <Select
                      value={cryptoData.currency}
                      onValueChange={(value) => setCryptoData((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger id="cryptoCurrency">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-2">
                      After clicking "Complete Order", you will be redirected to our secure crypto payment gateway where
                      you can complete your payment.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We support multiple cryptocurrencies and provide real-time exchange rates.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Link href="/checkout">
                  <Button variant="outline">Back to Shipping</Button>
                </Link>

                <Button type="submit" className="bg-brand-purple hover:bg-brand-lavender" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
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

            {shippingInfo && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Shipping Address</h3>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

