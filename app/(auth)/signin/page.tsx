"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Icons } from "@/components/icons"

// Import the useAuth hook
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { toast } = useToast()

  // Add this line near the top of the component
  const { signIn, googleAuth } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(formData.email, formData.password)

      toast({
        title: "Sign in successful",
        description: "Welcome back to Dropics!",
      })
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Update the handleGoogleSignIn function
  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    try {
      await googleAuth()

      toast({
        title: "Google sign in successful",
        description: "Welcome back to Dropics!",
      })
    } catch (error) {
      toast({
        title: "Google sign in failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
          <Separator className="my-4" />
          <Button variant="outline" disabled={isLoading} onClick={handleGoogleSignIn}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Icons.google className="mr-2 h-4 w-4" />
                Sign in with Google
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

