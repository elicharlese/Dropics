"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just show a success message
    // In a real app, you would send a password reset email
    toast({
      title: "Reset link sent",
      description: "Check your email for a link to reset your password.",
    })

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Click the link in the email to reset your password. If you don't see the email, check your spam folder.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
            Back to Reset Password
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/signin" className="text-brand-purple hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-lavender" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Link href="/signin" className="flex items-center text-sm text-brand-purple hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  )
}

