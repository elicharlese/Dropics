"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, Package, MapPin, CreditCard, Heart, Settings, Bell, LogOut } from "lucide-react"

// Import the useAuth hook
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  {
    title: "Account Overview",
    href: "/account",
    icon: User,
  },
  {
    title: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "Payment Methods",
    href: "/account/payment",
    icon: CreditCard,
  },
  {
    title: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    title: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    title: "Account Settings",
    href: "/account/settings",
    icon: Settings,
  },
]

export default function AccountNav() {
  const pathname = usePathname()

  // Add this line near the top of the component
  const { signOut } = useAuth()

  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Account</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-brand-purple",
                pathname === item.href
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {/* Update the sign out button */}
      <div className="px-3 py-2">
        <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

