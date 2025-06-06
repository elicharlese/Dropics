"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CreditCard, Bitcoin } from "lucide-react"
import { StripeCheckout } from "@/components/stripe-checkout"
import { CryptoCheckout } from "@/components/crypto-checkout"
import { useRouter } from "next/navigation"

interface CryptoPayButtonProps {
  amount: number
  productName?: string
}

export function CryptoPayButton({ amount, productName }: CryptoPayButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false)
    router.push("/checkout/confirmation")
  }

  const handlePaymentCancel = () => {
    setShowPaymentDialog(false)
  }

  return (
    <>
      <Button
        onClick={() => setShowPaymentDialog(true)}
        disabled={isLoading}
        className="w-full bg-brand-purple hover:bg-brand-lavender"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Buy Now"
        )}
      </Button>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              {productName ? `Purchase ${productName}` : "Complete your purchase"} for ${amount.toFixed(2)}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="card"
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as "card" | "crypto")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex items-center">
                <Bitcoin className="mr-2 h-4 w-4" />
                Crypto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <StripeCheckout amount={amount} onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
            </TabsContent>

            <TabsContent value="crypto" className="mt-4">
              <CryptoCheckout amount={amount} onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}

