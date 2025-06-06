"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "next/navigation"
import { Icons } from "@/components/icons"

// Import the useAuth hook
import { useAuth } from "@/contexts/auth-context"

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const { toast } = useToast()

  // Add this line near the top of the component
  const { signUp, googleAuth } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await signUp(formData.name, formData.email, formData.password)

      toast({
        title: "Account created successfully",
        description: "Welcome to Dropics!",
      })
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Update the handleGoogleSignUp function
  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    try {
      await googleAuth()

      toast({
        title: "Google sign up successful",
        description: "Welcome to Dropics!",
      })
    } catch (error) {
      toast({
        title: "Google sign up failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData((prevData) => ({
                  ...prevData,
                  agreeTerms: checked || false,
                }))
              }
            />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              I agree to the{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </CardFooter>
        <Separator />
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" disabled={isLoading} onClick={handleGoogleSignUp}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Sign up with Google
          </Button>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-2">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp

