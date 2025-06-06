import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Download } from "lucide-react"

export default function CertificationsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Food Safety Certifications</h1>
        <p className="text-muted-foreground mb-12 text-lg">
          At Dropics, we prioritize the safety and quality of our edible glitter products. Our commitment to excellence
          is backed by rigorous testing and internationally recognized certifications.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Commitment to Safety</h2>
            <p className="text-muted-foreground mb-4">
              Every Dropics product undergoes extensive testing and quality control measures to ensure it meets the
              highest standards for food safety. Our manufacturing facilities adhere to strict protocols, and our
              ingredients are sourced from trusted suppliers who share our commitment to quality.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that transparency is essential in the food industry. That's why we make our certifications
              publicly available and provide detailed information about our ingredients and manufacturing processes.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Rigorous Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Every batch is tested for safety and quality before release
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Traceable Ingredients</h3>
                  <p className="text-sm text-muted-foreground">Full traceability from source to finished product</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Clean Manufacturing</h3>
                  <p className="text-sm text-muted-foreground">
                    Production in certified facilities with strict hygiene protocols
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Dropics quality control laboratory"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Certifications</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-purple" />
                </div>
                <CardTitle>FDA Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All Dropics products comply with FDA regulations for food additives and colorants. Our ingredients are
                recognized as safe (GRAS) for use in food products.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-purple" />
                </div>
                <CardTitle>HACCP Certified</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our manufacturing facilities operate under Hazard Analysis Critical Control Point (HACCP) systems to
                ensure food safety throughout the production process.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-purple" />
                </div>
                <CardTitle>Organic Certification</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Dropics products are certified organic by USDA-accredited certifying agents, ensuring they meet strict
                standards for organic production and handling.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-purple" />
                </div>
                <CardTitle>ISO 22000</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our facilities are ISO 22000 certified, demonstrating our commitment to food safety management systems
                that ensure the safety of our food products.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Allergen Information</h2>
          <p className="text-muted-foreground mb-6">
            All Dropics products are manufactured in facilities that are free from common allergens. Our products are:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-brand-purple/5 p-4 rounded-lg text-center">
              <p className="font-semibold">Gluten-Free</p>
            </div>
            <div className="bg-brand-purple/5 p-4 rounded-lg text-center">
              <p className="font-semibold">Nut-Free</p>
            </div>
            <div className="bg-brand-purple/5 p-4 rounded-lg text-center">
              <p className="font-semibold">Dairy-Free</p>
            </div>
            <div className="bg-brand-purple/5 p-4 rounded-lg text-center">
              <p className="font-semibold">Soy-Free</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9f5ff] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Request Detailed Documentation</h2>
          <p className="text-muted-foreground mb-6">
            For wholesale customers, food service professionals, and retailers who require detailed documentation for
            compliance purposes, we offer comprehensive technical data sheets and safety documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button className="bg-brand-purple hover:bg-brand-lavender w-full sm:w-auto">
                Contact for Documentation
              </Button>
            </Link>
            <Link href="/wholesale">
              <Button variant="outline" className="w-full sm:w-auto">
                Wholesale Information
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

