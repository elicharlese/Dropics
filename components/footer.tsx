import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-brand-teal/10 via-brand-yellow/10 to-brand-coral/10 border-t border-brand-teal/20">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold fun-text-gradient">Dropics</h3>
            <p className="text-sm text-muted-foreground">
              Premium organic edible glitter for professional culinary applications. Add some sparkle to your creations
              with our colorful, fun products!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-brand-teal hover:text-brand-coral transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-brand-teal hover:text-brand-coral transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-brand-teal hover:text-brand-coral transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-brand-teal hover:text-brand-coral transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-teal">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/liquid"
                  className="text-muted-foreground hover:text-brand-coral transition-colors"
                >
                  Liquid Glitter
                </Link>
              </li>
              <li>
                <Link href="/products/spray" className="text-muted-foreground hover:text-brand-coral transition-colors">
                  Spray Glitter
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-muted-foreground hover:text-brand-coral transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products/bestsellers"
                  className="text-muted-foreground hover:text-brand-coral transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-muted-foreground hover:text-brand-coral transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-coral">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  Inspiration Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-brand-teal transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-yellow">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="text-muted-foreground hover:text-brand-yellow transition-colors"
                >
                  Food Safety Certifications
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-teal/20 grid md:grid-cols-2 gap-4 items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Dropics. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 md:justify-end text-sm text-muted-foreground">
            <Link href="/sitemap" className="hover:text-brand-teal transition-colors">
              Sitemap
            </Link>
            <Link href="/accessibility" className="hover:text-brand-teal transition-colors">
              Accessibility
            </Link>
            <Link href="/cookies" className="hover:text-brand-teal transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

