"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Upload, Check } from "lucide-react"

export default function SubmitCreationPage() {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = () => {
    // Simulate image upload with placeholder images
    setUploadedImages(["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formStep < 3) {
      setFormStep(formStep + 1)
    } else {
      setFormSubmitted(true)
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex items-center mb-8">
        <Link
          href="/inspiration"
          className="flex items-center text-muted-foreground hover:text-brand-purple transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Inspiration
        </Link>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Submit Your Creation</h1>
        <p className="text-muted-foreground md:text-lg">
          Share your creative work using Dropics products and get featured in our inspiration gallery.
        </p>
      </div>

      {formSubmitted ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Submission Received!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for sharing your creation with us. Our team will review your submission and get in touch with
              you if your work is selected to be featured in our inspiration gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inspiration">
                <Button variant="outline">Back to Inspiration</Button>
              </Link>
              <Link href="/">
                <Button className="bg-brand-purple hover:bg-brand-lavender">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step === formStep
                          ? "bg-brand-purple text-white"
                          : step < formStep
                            ? "bg-brand-purple/20 text-brand-purple"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step < formStep ? <Check className="h-5 w-5" /> : step}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground">
                      {step === 1 ? "Details" : step === 2 ? "Images" : "Review"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-1 bg-gray-100 mt-2">
                <div
                  className="absolute top-0 left-0 h-1 bg-brand-purple transition-all duration-300"
                  style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Creation Details</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title of Your Creation</Label>
                      <Input id="title" placeholder="e.g., Golden Champagne Celebration Cake" required />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your creation, including techniques used and inspiration"
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <Label>Category</Label>
                      <RadioGroup defaultValue="cocktails" className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cocktails" id="cocktails" />
                          <Label htmlFor="cocktails" className="cursor-pointer">
                            Cocktails
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="desserts" id="desserts" />
                          <Label htmlFor="desserts" className="cursor-pointer">
                            Desserts
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cakes" id="cakes" />
                          <Label htmlFor="cakes" className="cursor-pointer">
                            Cakes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="events" id="events" />
                          <Label htmlFor="events" className="cursor-pointer">
                            Events
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="products">Products Used</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select products used" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rainbow-shimmer">Rainbow Shimmer</SelectItem>
                          <SelectItem value="golden-sparkle">Golden Sparkle</SelectItem>
                          <SelectItem value="silver-elegance">Silver Elegance</SelectItem>
                          <SelectItem value="rose-glimmer">Rose Glimmer</SelectItem>
                          <SelectItem value="silver-mist">Silver Mist</SelectItem>
                          <SelectItem value="gold-luster">Gold Luster</SelectItem>
                          <SelectItem value="platinum-shine">Platinum Shine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Full name" required />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="email@example.com" required />
                    </div>

                    <div>
                      <Label htmlFor="profession">Professional Title (optional)</Label>
                      <Input id="profession" placeholder="e.g., Pastry Chef, Mixologist, Event Planner" />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Upload Images</h2>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    {uploadedImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative h-40 rounded-md overflow-hidden">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Uploaded image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Drag and drop your images here, or click to browse</p>
                        <p className="text-xs text-muted-foreground mb-4">PNG, JPG or JPEG (max 5MB each)</p>
                        <Button type="button" variant="outline" onClick={handleImageUpload}>
                          Select Images
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Tips for great photos:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Use good lighting to showcase the glitter effect</li>
                      <li>Take photos from multiple angles</li>
                      <li>Include close-up shots to show detail</li>
                      <li>Ensure your creation is the main focus of the image</li>
                    </ul>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Review & Submit</h2>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Creation Details</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Title:</span> Golden Champagne Celebration Cake
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Category:</span> Cakes
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Products Used:</span> Golden Sparkle, Silver Mist
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Description:</span> A three-tier celebration cake with gold and
                        silver accents created using Dropics products...
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Your Information</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Name:</span> Jane Smith
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">Email:</span> jane.smith@example.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Professional Title:</span> Pastry Chef
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Images</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {uploadedImages.length > 0 ? (
                          uploadedImages.map((image, index) => (
                            <div key={index} className="relative h-32 rounded-md overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Uploaded image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-red-500 col-span-2">
                            No images uploaded. Please go back and add images.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="terms" className="text-sm font-normal leading-snug text-muted-foreground">
                          I agree to the{" "}
                          <Link href="/terms" className="text-brand-purple hover:underline">
                            terms and conditions
                          </Link>{" "}
                          and grant Dropics permission to feature my creation in the inspiration gallery and social
                          media.
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {formStep > 1 ? (
                  <Button type="button" variant="outline" onClick={() => setFormStep(formStep - 1)}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button type="submit" className="bg-brand-purple hover:bg-brand-lavender">
                  {formStep < 3 ? "Continue" : "Submit Creation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

