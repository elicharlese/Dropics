"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about our products or interested in wholesale opportunities? We'd love to hear from you.
              Fill out the form and our team will get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-purple mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">info@dropics.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-brand-purple mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-purple mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    123 Culinary Avenue
                    <br />
                    Suite 456
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-brand-purple mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:00 PM PST
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-purple hover:bg-brand-lavender">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Wholesale Inquiries</h2>
          <p className="text-muted-foreground mb-4">
            If you're interested in wholesale opportunities for your bakery, restaurant, or retail store, please contact
            our wholesale department directly at <span className="text-brand-purple">wholesale@dropics.com</span> or
            call <span className="text-brand-purple">+1 (555) 987-6543</span>.
          </p>
          <p className="text-muted-foreground">
            We offer competitive pricing, custom packaging options, and dedicated support for our wholesale partners.
          </p>
        </div>
      </div>
    </div>
  )
}

