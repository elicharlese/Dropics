import type React from "react"
import "@/app/globals.css"
import { Playfair_Display, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
// Import the AuthProvider
import { AuthProvider } from "@/contexts/auth-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: "Dropics - Premium Edible Glitter for Professional Use",
  description:
    "Elevate your culinary creations with our premium organic edible glitter. Perfect for professional bakers, mixologists, and sophisticated events.",
    generator: 'v0.dev'
}

// Update the RootLayout component to wrap the children with AuthProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

