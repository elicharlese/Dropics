import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

type InspirationItem = {
  id: string
  title: string
  description: string
  image: string
  category: "cocktails" | "desserts" | "cakes" | "events"
  author: string
  authorRole: string
}

const inspirationItems: InspirationItem[] = [
  {
    id: "gold-champagne",
    title: "Golden Champagne Toast",
    description: "Elevate your champagne with our Golden Sparkle liquid glitter for an elegant celebration.",
    image: "/placeholder.svg?height=400&width=600",
    category: "cocktails",
    author: "James Wilson",
    authorRole: "Mixologist",
  },
  {
    id: "rainbow-martini",
    title: "Shimmering Rainbow Martini",
    description: "Create a show-stopping cocktail with our Rainbow Shimmer liquid glitter.",
    image: "/placeholder.svg?height=400&width=600",
    category: "cocktails",
    author: "Olivia Chen",
    authorRole: "Bar Director",
  },
  {
    id: "silver-wedding-cake",
    title: "Silver Elegance Wedding Cake",
    description: "A sophisticated three-tier wedding cake with Silver Mist spray glitter accents.",
    image: "/placeholder.svg?height=400&width=600",
    category: "cakes",
    author: "Michael Rodriguez",
    authorRole: "Pastry Chef",
  },
  {
    id: "rose-macarons",
    title: "Rose Gold Macarons",
    description: "Delicate French macarons with a touch of Rose Glimmer spray for a luxurious finish.",
    image: "/placeholder.svg?height=400&width=600",
    category: "desserts",
    author: "Emma Johnson",
    authorRole: "Pastry Chef",
  },
  {
    id: "gala-dessert-table",
    title: "Gala Dessert Table",
    description: "A complete dessert table setup for a corporate gala featuring various Dropics products.",
    image: "/placeholder.svg?height=400&width=600",
    category: "events",
    author: "Sarah Thompson",
    authorRole: "Event Director",
  },
  {
    id: "golden-chocolate-truffles",
    title: "Golden Chocolate Truffles",
    description: "Handcrafted chocolate truffles with a Golden Sparkle finish for luxury gifting.",
    image: "/placeholder.svg?height=400&width=600",
    category: "desserts",
    author: "David Kim",
    authorRole: "Chocolatier",
  },
  {
    id: "anniversary-cake",
    title: "Silver Anniversary Cake",
    description: "A sophisticated cake design for milestone anniversaries using Silver Mist spray.",
    image: "/placeholder.svg?height=400&width=600",
    category: "cakes",
    author: "Rebecca Martinez",
    authorRole: "Cake Designer",
  },
  {
    id: "corporate-event-cocktails",
    title: "Corporate Event Signature Drinks",
    description: "Custom branded cocktails with Dropics liquid glitter for corporate events.",
    image: "/placeholder.svg?height=400&width=600",
    category: "events",
    author: "Thomas Wright",
    authorRole: "Corporate Event Specialist",
  },
]

export default function InspirationPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Inspiration Gallery</h1>
        <p className="text-muted-foreground md:text-lg">
          Discover creative ways to use our premium edible glitter products from top chefs, mixologists, and event
          planners.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cocktails">Cocktails</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspirationItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-medium">{item.author}</p>
                      <p className="text-muted-foreground">{item.authorRole}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-brand-purple">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {["cocktails", "desserts", "cakes", "events"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspirationItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium">{item.author}</p>
                          <p className="text-muted-foreground">{item.authorRole}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-brand-purple">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Creations</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Are you a professional chef, baker, or mixologist who has created something amazing with our products? We'd
          love to feature your work in our inspiration gallery.
        </p>
        <Link href="/contact">
          <Button className="bg-brand-purple hover:bg-brand-lavender">
            Submit Your Creation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Professional workshop"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Professional Workshops</h3>
            <p className="text-muted-foreground mb-4">
              Join our expert-led workshops to learn advanced techniques for using edible glitter in your professional
              creations.
            </p>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button variant="outline">Learn More</Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-64">
            <Image src="/placeholder.svg?height=400&width=600" alt="Seasonal recipes" fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Seasonal Recipe Collection</h3>
            <p className="text-muted-foreground mb-4">
              Explore our curated collection of seasonal recipes featuring creative ways to incorporate edible glitter.
            </p>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button variant="outline">View Recipes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

