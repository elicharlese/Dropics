"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-16 md:py-24 bg-white border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Informed</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Subscribe to our newsletter for professional tips, new product announcements, and exclusive offers
            </p>
          </div>
          <div className="mx-auto w-full max-w-md space-y-2 mt-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading} className="bg-brand-purple hover:bg-brand-lavender">
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

