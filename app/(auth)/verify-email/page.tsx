"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Mail, CheckCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  // In a real app, you would get this from the URL query params
  const email = "user@example.com"

  const handleResendEmail = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just show a success message
    // In a real app, you would resend the verification email
    toast({
      title: "Verification email sent",
      description: "Please check your email for the verification link.",
    })

    setIsLoading(false)
  }

  const handleVerify = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just show a success message
    // In a real app, you would verify the email token
    toast({
      title: "Email verified",
      description: "Your email has been verified successfully.",
    })

    setIsVerified(true)
    setIsLoading(false)
  }

  if (isVerified) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verified</CardTitle>
          <CardDescription className="text-center">Your email has been verified successfully</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-center text-sm text-muted-foreground mb-4">You can now sign in to your account.</p>
          <Button className="w-full bg-brand-purple hover:bg-brand-lavender" onClick={() => router.push("/signin")}>
            Go to Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          We've sent a verification link to <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="rounded-full bg-brand-purple/10 p-3 mb-4">
          <Mail className="h-6 w-6 text-brand-purple" />
        </div>
        <p className="text-center text-sm text-muted-foreground mb-4">
          Click the link in the email to verify your account. If you don't see the email, check your spam folder.
        </p>
        <div className="grid gap-4 w-full">
          <Button variant="outline" className="w-full" onClick={handleResendEmail} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </Button>

          {/* This button is for demo purposes only */}
          <Button
            className="w-full bg-brand-purple hover:bg-brand-lavender"
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email (Demo)"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-center text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/signin" className="text-brand-purple hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

