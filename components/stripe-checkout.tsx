"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"

interface StripeCheckoutProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

export function StripeCheckout({ amount, onSuccess, onCancel }: StripeCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Call the success callback
    onSuccess()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Pay with Card</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Lock className="h-3 w-3 mr-1" />
          Secure Payment
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input
            id="cardName"
            name="cardName"
            placeholder="John Doe"
            value={cardData.cardName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" name="cvc" placeholder="123" value={cardData.cvc} onChange={handleChange} required />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-lavender" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>

          <Button type="button" variant="ghost" className="w-full mt-2" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

