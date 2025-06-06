import type React from "react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - Dropics",
  description: "Complete your purchase of premium edible glitter products",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container py-4 px-4 md:px-6 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold elegant-text-gradient">Dropics</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">{children}</main>
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
        </div>
      </footer>
    </div>
  )
}

