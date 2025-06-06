"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function SolanaPayButton() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnected(true)
    setIsConnecting(false)
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || isConnected}
      className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3EE8] hover:to-[#12D988] text-white"
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting Wallet
        </>
      ) : isConnected ? (
        "Wallet Connected"
      ) : (
        "Pay with Solana"
      )}
    </Button>
  )
}

