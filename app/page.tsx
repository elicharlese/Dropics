import ProductShowcase from "@/components/product-showcase"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import NewsletterSignup from "@/components/newsletter-signup"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-12 md:py-24 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Organic Glitter Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Made from 100% organic food materials and natural coloring. Safe, beautiful, and delicious.
              </p>
            </div>
          </div>
          <ProductShowcase />
        </div>
      </section>

      <FeatureSection />
      <TestimonialSection />

      <NewsletterSignup />
    </div>
  )
}

