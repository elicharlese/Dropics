import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SitemapPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Sitemap</h1>
        <p className="text-muted-foreground mb-12">
          Use our sitemap to navigate through all the pages on the Dropics website.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-brand-purple hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-brand-purple hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-purple hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="text-brand-purple hover:underline">
                  Inspiration Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-brand-purple hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-purple hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-brand-purple hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-brand-purple hover:underline">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-brand-purple hover:underline">
                  Cart
                </Link>
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">Account</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-brand-purple hover:underline">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-brand-purple hover:underline">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="text-brand-purple hover:underline">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/products/liquid" className="text-brand-purple hover:underline">
                  Liquid Glitter
                </Link>
              </li>
              <li>
                <Link href="/products/spray" className="text-brand-purple hover:underline">
                  Spray Glitter
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-brand-purple hover:underline">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/bestsellers" className="text-brand-purple hover:underline">
                  Best Sellers
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Liquid Glitter Products</h3>
            <ul className="space-y-2 pl-4">
              <li>
                <Link href="/products/liquid-rainbow" className="text-muted-foreground hover:text-brand-purple">
                  Rainbow Shimmer
                </Link>
              </li>
              <li>
                <Link href="/products/liquid-gold" className="text-muted-foreground hover:text-brand-purple">
                  Golden Sparkle
                </Link>
              </li>
              <li>
                <Link href="/products/liquid-silver" className="text-muted-foreground hover:text-brand-purple">
                  Silver Elegance
                </Link>
              </li>
              <li>
                <Link href="/products/liquid-rose" className="text-muted-foreground hover:text-brand-purple">
                  Rose Glimmer
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Spray Glitter Products</h3>
            <ul className="space-y-2 pl-4">
              <li>
                <Link href="/products/spray-silver" className="text-muted-foreground hover:text-brand-purple">
                  Silver Mist
                </Link>
              </li>
              <li>
                <Link href="/products/spray-rose" className="text-muted-foreground hover:text-brand-purple">
                  Rose Glimmer
                </Link>
              </li>
              <li>
                <Link href="/products/spray-gold" className="text-muted-foreground hover:text-brand-purple">
                  Gold Luster
                </Link>
              </li>
              <li>
                <Link href="/products/spray-platinum" className="text-muted-foreground hover:text-brand-purple">
                  Platinum Shine
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Legal & Policies</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-brand-purple hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-brand-purple hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-brand-purple hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-brand-purple hover:underline">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-brand-purple hover:underline">
                  Food Safety Certifications
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-brand-purple hover:underline">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-brand-purple hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/inspiration?category=cocktails" className="text-brand-purple hover:underline">
                  Cocktail Creations
                </Link>
              </li>
              <li>
                <Link href="/inspiration?category=desserts" className="text-brand-purple hover:underline">
                  Dessert Masterpieces
                </Link>
              </li>
              <li>
                <Link href="/inspiration?category=cakes" className="text-brand-purple hover:underline">
                  Cake Designs
                </Link>
              </li>
              <li>
                <Link href="/inspiration?category=events" className="text-brand-purple hover:underline">
                  Event Showcases
                </Link>
              </li>
              <li>
                <Link href="/blog/professional-tips" className="text-brand-purple hover:underline">
                  Professional Tips
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-brand-purple hover:underline">
                  Video Tutorials
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Feel free to contact our customer support team.
          </p>
          <Link href="/contact">
            <Button className="bg-brand-purple hover:bg-brand-lavender">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

