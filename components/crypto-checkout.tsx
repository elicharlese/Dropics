"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Copy, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface CryptoCheckoutProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

export function CryptoCheckout({ amount, onSuccess, onCancel }: CryptoCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [currency, setCurrency] = useState("btc")

  // Mock crypto addresses
  const addresses = {
    btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdt: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  }

  // Mock exchange rates
  const exchangeRates = {
    btc: 0.000016, // 1 USD = 0.000016 BTC
    eth: 0.00025, // 1 USD = 0.00025 ETH
    usdt: 1, // 1 USD = 1 USDT
    usdc: 1, // 1 USD = 1 USDC
  }

  const cryptoAmount = amount * exchangeRates[currency as keyof typeof exchangeRates]
  const address = addresses[currency as keyof typeof addresses]

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)

    toast({
      title: "Address copied",
      description: "The wallet address has been copied to your clipboard.",
    })

    setTimeout(() => setIsCopied(false), 3000)
  }

  const handleConfirmPayment = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Call the success callback
    onSuccess()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Pay with Cryptocurrency</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferred cryptocurrency and send the exact amount to the provided address.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cryptoCurrency">Select Cryptocurrency</Label>
          <Select value={currency} onValueChange={setCurrency}>
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
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Amount to Send:</span>
            <span className="font-bold">
              {cryptoAmount.toFixed(currency === "btc" ? 8 : currency === "eth" ? 6 : 2)} {currency.toUpperCase()}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-sm font-medium">Send to this address:</span>
            <div className="mt-1 p-2 bg-background rounded border flex items-center justify-between">
              <span className="text-xs overflow-hidden text-ellipsis">{address}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyAddress}>
                {isCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Send only {currency.toUpperCase()} to this address</p>
            <p>• Transaction may take 10-30 minutes to confirm</p>
            <p>• After sending, click "I've Sent the Payment" below</p>
          </div>
        </div>

        <div>
          <Button
            className="w-full bg-brand-purple hover:bg-brand-lavender"
            onClick={handleConfirmPayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying Payment...
              </>
            ) : (
              "I've Sent the Payment"
            )}
          </Button>

          <Button variant="ghost" className="w-full mt-2" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

