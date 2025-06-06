import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">About Dropics</h1>

        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Dropics team in the laboratory"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-6">
            Founded in 2020 by a team of food scientists and culinary artists, Dropics was born from a simple
            observation: the edible glitter market lacked a truly premium, organic option that met the exacting
            standards of professional chefs and mixologists.
          </p>

          <p className="text-muted-foreground mb-6">
            After two years of research and development, we perfected our proprietary formula—a blend of organic
            ingredients that creates a stunning shimmer effect while maintaining complete food safety and exceptional
            taste neutrality.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            At Dropics, we're committed to elevating culinary artistry through innovative, organic products that inspire
            creativity while adhering to the highest standards of quality and safety. We believe that visual
            presentation is as important as flavor in creating memorable dining experiences.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Commitment to Quality</h2>
          <p className="text-muted-foreground mb-6">
            Every Dropics product undergoes rigorous testing and quality control. We source only the finest organic
            ingredients, and our manufacturing process adheres to strict food safety protocols. Our products are
            certified organic, vegan, gluten-free, and allergen-free.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2">Food Safety Certified</h3>
              <p className="text-sm text-muted-foreground">Meets the highest standards for food-grade products</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2">100% Organic</h3>
              <p className="text-sm text-muted-foreground">Made with certified organic ingredients</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2">Rigorously Tested</h3>
              <p className="text-sm text-muted-foreground">Every batch undergoes extensive quality testing</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Meet Our Team</h2>
          <p className="text-muted-foreground mb-6">
            Our diverse team brings together expertise from the worlds of food science, culinary arts, and sustainable
            manufacturing. Led by our founder, Chef Alexandra Chen, we're united by a passion for innovation and
            excellence in the culinary world.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Chef Alexandra Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Alexandra Chen</h3>
              <p className="text-sm text-muted-foreground">Founder & Head of Product</p>
            </div>

            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Dr. Marcus Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Dr. Marcus Johnson</h3>
              <p className="text-sm text-muted-foreground">Food Scientist</p>
            </div>

            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Sophia Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Sophia Rodriguez</h3>
              <p className="text-sm text-muted-foreground">Creative Director</p>
            </div>
          </div>

          <div className="bg-[#f9f5ff] p-6 rounded-lg my-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-brand-purple">•</span>
                <span>
                  <strong>Innovation:</strong> We continuously explore new techniques and ingredients to push the
                  boundaries of culinary artistry.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brand-purple">•</span>
                <span>
                  <strong>Quality:</strong> We never compromise on the quality of our ingredients or the safety of our
                  products.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brand-purple">•</span>
                <span>
                  <strong>Sustainability:</strong> We're committed to environmentally responsible practices throughout
                  our supply chain.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brand-purple">•</span>
                <span>
                  <strong>Collaboration:</strong> We work closely with chefs, mixologists, and food artists to develop
                  products that meet their needs.
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="bg-brand-purple hover:bg-brand-lavender">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

