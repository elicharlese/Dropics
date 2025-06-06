"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MegaMenu } from "@/components/mega-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuOpen = (menu: string) => {
    setOpenMenu(menu)
  }

  const handleMenuClose = () => {
    setOpenMenu(null)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-teal">Dropics</span>
        </Link>

        <nav className="hidden md:flex gap-8 relative">
          <Link
            href="/products"
            className="text-sm font-medium hover:text-brand-teal transition-colors h-full flex items-center"
          >
            All Products
          </Link>

          <div className="relative h-full flex items-center" onMouseEnter={() => handleMenuOpen("liquid")}>
            <Link
              href="/products/liquid"
              className={cn(
                "flex items-center text-sm font-medium hover:text-brand-teal transition-colors h-full",
                openMenu === "liquid" && "text-brand-teal",
              )}
            >
              Liquid Glitter <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="relative h-full flex items-center" onMouseEnter={() => handleMenuOpen("spray")}>
            <Link
              href="/products/spray"
              className={cn(
                "flex items-center text-sm font-medium hover:text-brand-teal transition-colors h-full",
                openMenu === "spray" && "text-brand-teal",
              )}
            >
              Spray Glitter <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="relative h-full flex items-center" onMouseEnter={() => handleMenuOpen("inspiration")}>
            <Link
              href="/inspiration"
              className={cn(
                "flex items-center text-sm font-medium hover:text-brand-teal transition-colors h-full",
                openMenu === "inspiration" && "text-brand-teal",
              )}
            >
              Inspiration <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <Link
            href="/wholesale"
            className="text-sm font-medium hover:text-brand-teal transition-colors h-full flex items-center"
          >
            Wholesale
          </Link>

          {/* Mega Menu Container - Fixed Position */}
          <div
            className={cn(
              "fixed left-0 right-0 top-[80px] flex justify-center z-50 transition-opacity duration-200",
              openMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
            onMouseEnter={() => {}} // Keep menu open when hovering
            onMouseLeave={handleMenuClose}
          >
            {openMenu === "liquid" && (
              <MegaMenu
                title="Liquid Glitter Collection"
                description="Add a magical shimmer to your beverages and desserts"
                image="/placeholder.svg?height=200&width=300"
                items={[
                  { name: "All Liquid Glitter", href: "/products/liquid" },
                  { name: "Rainbow Shimmer", href: "/products/liquid-rainbow" },
                  { name: "Golden Sparkle", href: "/products/liquid-gold" },
                  { name: "Silver Elegance", href: "/products/liquid-silver" },
                  { name: "Rose Glimmer", href: "/products/liquid-rose" },
                ]}
                categories={[
                  { name: "For Cocktails", href: "/products/liquid/cocktails" },
                  { name: "For Champagne", href: "/products/liquid/champagne" },
                  { name: "For Desserts", href: "/products/liquid/desserts" },
                  { name: "New Arrivals", href: "/products/new" },
                  { name: "Best Sellers", href: "/products/bestsellers" },
                ]}
              />
            )}

            {openMenu === "spray" && (
              <MegaMenu
                title="Spray Glitter Collection"
                description="Perfect for decorating cakes, pastries, and confections"
                image="/placeholder.svg?height=200&width=300"
                items={[
                  { name: "All Spray Glitter", href: "/products/spray" },
                  { name: "Silver Mist", href: "/products/spray-silver" },
                  { name: "Rose Glimmer", href: "/products/spray-rose" },
                  { name: "Gold Luster", href: "/products/spray-gold" },
                  { name: "Platinum Shine", href: "/products/spray-platinum" },
                ]}
                categories={[
                  { name: "For Cakes", href: "/products/spray/cakes" },
                  { name: "For Pastries", href: "/products/spray/pastries" },
                  { name: "For Chocolates", href: "/products/spray/chocolates" },
                  { name: "New Arrivals", href: "/products/new" },
                  { name: "Best Sellers", href: "/products/bestsellers" },
                ]}
              />
            )}

            {openMenu === "inspiration" && (
              <MegaMenu
                title="Inspiration Gallery"
                description="Creative ideas from professional chefs and mixologists"
                image="/placeholder.svg?height=200&width=300"
                items={[
                  { name: "All Inspiration", href: "/inspiration" },
                  { name: "Cocktail Creations", href: "/inspiration/cocktails" },
                  { name: "Dessert Masterpieces", href: "/inspiration/desserts" },
                  { name: "Cake Designs", href: "/inspiration/cakes" },
                  { name: "Event Showcases", href: "/inspiration/events" },
                ]}
                categories={[
                  { name: "Professional Tips", href: "/blog/professional-tips" },
                  { name: "Video Tutorials", href: "/tutorials" },
                  { name: "Seasonal Ideas", href: "/inspiration/seasonal" },
                  { name: "Submit Your Creation", href: "/submit-creation" },
                ]}
              />
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Input type="search" placeholder="Search..." className="w-[200px] rounded-full pr-8" />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Shopping Cart"
              className="text-brand-teal hover:text-brand-coral"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" size="icon" aria-label="Account" className="text-brand-teal hover:text-brand-coral">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/signin">
            <Button className="hidden md:flex bg-brand-teal hover:bg-brand-coral text-white rounded-full">
              Sign In
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-brand-teal hover:text-brand-coral"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <div className="flex flex-col gap-4 mt-8">
                <Input type="search" placeholder="Search..." className="mb-4 rounded-full" />

                <Link
                  href="/products"
                  className="text-sm font-medium hover:text-brand-teal transition-colors py-2 border-b pb-4"
                >
                  All Products
                </Link>

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2 text-brand-teal">Liquid Glitter</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/products/liquid"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      All Liquid Glitter
                    </Link>
                    <Link
                      href="/products/liquid-rainbow"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      Rainbow Shimmer
                    </Link>
                    <Link
                      href="/products/liquid-gold"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      Golden Sparkle
                    </Link>
                    <Link
                      href="/products/liquid-silver"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      Silver Elegance
                    </Link>
                    <Link
                      href="/products/liquid-rose"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      Rose Glimmer
                    </Link>
                    <Link
                      href="/products/liquid/cocktails"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      For Cocktails
                    </Link>
                    <Link
                      href="/products/liquid/champagne"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      For Champagne
                    </Link>
                    <Link
                      href="/products/liquid/desserts"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      For Desserts
                    </Link>
                    <Link
                      href="/products/new"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href="/products/bestsellers"
                      className="text-sm text-muted-foreground hover:text-brand-coral transition-colors py-1"
                    >
                      Best Sellers
                    </Link>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2 text-brand-coral">Spray Glitter</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/products/spray"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      All Spray Glitter
                    </Link>
                    <Link
                      href="/products/spray-silver"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      Silver Mist
                    </Link>
                    <Link
                      href="/products/spray-rose"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      Rose Glimmer
                    </Link>
                    <Link
                      href="/products/spray-gold"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      Gold Luster
                    </Link>
                    <Link
                      href="/products/spray-platinum"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      Platinum Shine
                    </Link>
                    <Link
                      href="/products/spray/cakes"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      For Cakes
                    </Link>
                    <Link
                      href="/products/spray/pastries"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      For Pastries
                    </Link>
                    <Link
                      href="/products/spray/chocolates"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      For Chocolates
                    </Link>
                    <Link
                      href="/products/new"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href="/products/bestsellers"
                      className="text-sm text-muted-foreground hover:text-brand-teal transition-colors py-1"
                    >
                      Best Sellers
                    </Link>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2 text-brand-yellow">Inspiration</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/inspiration"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      All Inspiration
                    </Link>
                    <Link
                      href="/inspiration/cocktails"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Cocktail Creations
                    </Link>
                    <Link
                      href="/inspiration/desserts"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Dessert Masterpieces
                    </Link>
                    <Link
                      href="/inspiration/cakes"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Cake Designs
                    </Link>
                    <Link
                      href="/inspiration/events"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Event Showcases
                    </Link>
                    <Link
                      href="/blog/professional-tips"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Professional Tips
                    </Link>
                    <Link
                      href="/tutorials"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Video Tutorials
                    </Link>
                    <Link
                      href="/inspiration/seasonal"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Seasonal Ideas
                    </Link>
                    <Link
                      href="/submit-creation"
                      className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors py-1"
                    >
                      Submit Your Creation
                    </Link>
                  </div>
                </div>

                <Link
                  href="/wholesale"
                  className="text-sm font-medium hover:text-brand-blue transition-colors py-2 border-b pb-4"
                >
                  Wholesale
                </Link>

                <div className="mt-4 space-y-2">
                  <Link
                    href="/account"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors block"
                  >
                    Account
                  </Link>
                  <Link
                    href="/signin"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors block"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors block"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors block"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors block"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Overlay for mega menu */}
      {openMenu && <div className="fixed inset-0 bg-black/20 z-40" onClick={handleMenuClose} style={{ top: "80px" }} />}
    </header>
  )
}

