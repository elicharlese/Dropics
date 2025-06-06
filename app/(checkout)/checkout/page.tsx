"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckoutProgress } from "@/components/checkout-progress"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [saveAddress, setSaveAddress] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "us",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store shipping info in session storage for the next step
    sessionStorage.setItem("shippingInfo", JSON.stringify(formData))

    if (saveAddress) {
      toast({
        title: "Address saved",
        description: "Your shipping address has been saved for future orders.",
      })
    }

    router.push("/checkout/payment")
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
            <h1 className="text-2xl font-bold mb-2">Shipping Information</h1>
            <p className="text-muted-foreground">Please enter your shipping details</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" name="apartment" value={formData.apartment} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="save-address"
                  checked={saveAddress}
                  onCheckedChange={(checked) => setSaveAddress(!!checked)}
                />
                <Label htmlFor="save-address">Save this address for future orders</Label>
              </div>

              <div className="flex justify-between">
                <Link href="/cart">
                  <Button variant="outline">Back to Cart</Button>
                </Link>

                <Button type="submit" className="bg-brand-purple hover:bg-brand-lavender" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
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
          </div>
        </div>
      </div>
    </div>
  )
}

