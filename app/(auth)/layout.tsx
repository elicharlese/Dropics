import type React from "react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Dropics",
  description: "Sign in or create an account to access your Dropics profile",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex-1 flex items-center justify-center py-12 md:py-24">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold elegant-text-gradient">Dropics</span>
            </Link>
            <p className="text-muted-foreground text-center">
              Premium organic edible glitter for professional culinary applications
            </p>
          </div>
          {children}
        </div>
      </div>
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dropics. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-brand-purple transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-brand-purple transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-brand-purple transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

