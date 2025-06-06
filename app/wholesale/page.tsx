"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Package, Users, Building, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Inquiry Received",
      description: "Thank you for your wholesale inquiry. Our team will contact you within 1-2 business days.",
    })

    setFormData({
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl elegant-text-gradient">Wholesale Program</h1>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          Premium edible glitter solutions for bakeries, restaurants, bars, and retail stores
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
          <p className="text-muted-foreground mb-6">
            Join our network of professional partners and offer your customers the finest organic edible glitter
            products on the market. Our wholesale program provides competitive pricing, reliable fulfillment, and
            dedicated support.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Competitive Pricing</h3>
                <p className="text-sm text-muted-foreground">Volume discounts starting at just 12 units per SKU</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Custom Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  White label and co-branding options available for qualified partners
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Dedicated Support</h3>
                <p className="text-sm text-muted-foreground">Personal account manager for all wholesale partners</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Marketing Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Access to professional photography, product descriptions, and usage guides
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Wholesale partners using Dropics products"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Package className="h-10 w-10 text-brand-purple mb-2" />
            <CardTitle>Bakeries & Patisseries</CardTitle>
            <CardDescription>Elevate your cakes, pastries, and confections</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our spray glitters are perfect for decorating cakes, macarons, and pastries with a professional finish
              that will impress your customers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-10 w-10 text-brand-purple mb-2" />
            <CardTitle>Bars & Restaurants</CardTitle>
            <CardDescription>Create signature cocktails and desserts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our liquid glitters add a magical touch to cocktails and beverages, while our sprays can transform plated
              desserts into Instagram-worthy creations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Building className="h-10 w-10 text-brand-purple mb-2" />
            <CardTitle>Retail Stores</CardTitle>
            <CardDescription>Stock premium products your customers will love</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Offer your customers the highest quality edible glitter products with attractive packaging and excellent
              margins for your business.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-brand-purple font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Submit Inquiry</h3>
            <p className="text-sm text-muted-foreground">
              Fill out our wholesale application form with your business details
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-brand-purple font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Consultation</h3>
            <p className="text-sm text-muted-foreground">
              Speak with our wholesale team to discuss your specific needs
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-brand-purple font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Account Setup</h3>
            <p className="text-sm text-muted-foreground">Get access to wholesale pricing and our partner portal</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-brand-purple font-bold">4</span>
            </div>
            <h3 className="font-semibold mb-2">Start Ordering</h3>
            <p className="text-sm text-muted-foreground">Place your first order with preferred shipping options</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the minimum order quantity?</AccordionTrigger>
              <AccordionContent>
                Our standard minimum order is 12 units per SKU, with a total order minimum of $500. Volume discounts
                begin at 24 units per SKU.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer samples before ordering?</AccordionTrigger>
              <AccordionContent>
                Yes, qualified wholesale applicants can request a sample kit containing our most popular products for a
                nominal shipping fee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What are the payment terms?</AccordionTrigger>
              <AccordionContent>
                New wholesale accounts require payment upfront for the first three orders. After establishing a
                relationship, we offer Net-30 terms for qualified businesses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to select international destinations. International shipping rates and minimum order
                quantities may vary. Please contact us for specific details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What is the shelf life of your products?</AccordionTrigger>
              <AccordionContent>
                Our products have a shelf life of 24 months when stored properly in a cool, dry place away from direct
                sunlight.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Apply for Wholesale</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="businessName" className="block text-sm font-medium mb-1">
                  Business Name*
                </label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                  Contact Name*
                </label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number*
                </label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="col-span-2">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address*
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="col-span-2">
                <label htmlFor="businessType" className="block text-sm font-medium mb-1">
                  Business Type*
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select business type</option>
                  <option value="bakery">Bakery/Patisserie</option>
                  <option value="restaurant">Restaurant/Bar</option>
                  <option value="retail">Retail Store</option>
                  <option value="distributor">Distributor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Tell us about your business and needs
                </label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} />
              </div>
            </div>

            <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-lavender" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Wholesale Application"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our{" "}
              <a href="/terms" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>

      <div className="bg-[#f9f5ff] p-8 rounded-lg text-center">
        <FileText className="h-12 w-12 mx-auto text-brand-purple mb-4" />
        <h2 className="text-2xl font-bold mb-2">Download Wholesale Catalog</h2>
        <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
          Get our complete product catalog with wholesale pricing, minimum order quantities, and product specifications.
        </p>
        <Button className="bg-brand-purple hover:bg-brand-lavender">Download Catalog (PDF)</Button>
      </div>
    </div>
  )
}

