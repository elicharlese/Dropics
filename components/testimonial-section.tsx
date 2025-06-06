import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Chef Sarah Johnson",
      role: "Executive Pastry Chef, The Grand Hotel",
      content:
        "Dropics' spray glitter has transformed our dessert presentations. The quality and consistency are unmatched, and our clients are consistently impressed by the elegant shimmer effect.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Head Mixologist, Elixir Lounge",
      content:
        "As a mixologist focused on creating memorable experiences, I've found Dropics' liquid glitter to be the perfect finishing touch for our signature cocktails. The organic ingredients align perfectly with our commitment to quality.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Event Director, Luxe Events",
      content:
        "We've incorporated Dropics products into our high-end events with spectacular results. From champagne receptions to dessert displays, the subtle elegance of their edible glitter elevates every occasion.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#f9f5ff]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Culinary Professionals
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Hear what leading chefs, mixologists, and event planners have to say about our products
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                    ))}
                </div>
                <p className="text-muted-foreground italic">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-6 pt-0 border-t">
                <div className="rounded-full overflow-hidden h-12 w-12">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

