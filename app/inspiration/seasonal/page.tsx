import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronLeft } from "lucide-react"

type Season = "spring" | "summer" | "fall" | "winter" | "holiday"

type SeasonalIdea = {
  id: string
  title: string
  description: string
  season: Season
  image: string
  products: string[]
  featured: boolean
}

const seasonalIdeas: SeasonalIdea[] = [
  {
    id: "winter-wonderland",
    title: "Winter Wonderland Dessert Table",
    description: "Create a magical winter-themed dessert table with Silver Mist and Platinum Shine spray glitters.",
    season: "winter",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Silver Mist", "Platinum Shine"],
    featured: true,
  },
  {
    id: "summer-cocktails",
    title: "Summer Sunset Cocktail Collection",
    description: "Vibrant summer cocktails featuring Rainbow Shimmer and Golden Sparkle liquid glitters.",
    season: "summer",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Rainbow Shimmer", "Golden Sparkle"],
    featured: true,
  },
  {
    id: "fall-harvest",
    title: "Fall Harvest Celebration Cake",
    description: "An elegant fall-themed cake decorated with Gold Luster spray glitter to complement autumn colors.",
    season: "fall",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Gold Luster"],
    featured: false,
  },
  {
    id: "spring-macarons",
    title: "Spring Floral Macarons",
    description: "Delicate spring-inspired macarons with Rose Glimmer spray accents to match seasonal blooms.",
    season: "spring",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Rose Glimmer"],
    featured: false,
  },
  {
    id: "christmas-desserts",
    title: "Christmas Dessert Collection",
    description: "Festive holiday desserts featuring red and green accents with complementary edible glitters.",
    season: "holiday",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Silver Mist", "Gold Luster"],
    featured: false,
  },
  {
    id: "new-years-champagne",
    title: "New Year's Eve Champagne Bar",
    description:
      "Elegant champagne display with Silver Elegance and Golden Sparkle liquid glitters for a festive celebration.",
    season: "holiday",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Silver Elegance", "Golden Sparkle"],
    featured: false,
  },
  {
    id: "summer-wedding",
    title: "Summer Wedding Cake Design",
    description:
      "Romantic summer wedding cake featuring delicate Rose Glimmer spray accents and fresh flower decorations.",
    season: "summer",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Rose Glimmer"],
    featured: false,
  },
  {
    id: "fall-cocktails",
    title: "Fall Spice Signature Cocktails",
    description:
      "Warm autumn-inspired cocktails with cinnamon and spice notes, enhanced with Golden Sparkle liquid glitter.",
    season: "fall",
    image: "/placeholder.svg?height=400&width=600",
    products: ["Golden Sparkle"],
    featured: false,
  },
]

export default function SeasonalIdeasPage() {
  const featuredIdeas = seasonalIdeas.filter((idea) => idea.featured)

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Seasonal Ideas</h1>
        <p className="text-muted-foreground md:text-lg">
          Discover creative ways to incorporate our edible glitter products into your seasonal celebrations and events.
        </p>
      </div>

      {/* Featured Seasonal Ideas */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Seasonal Ideas</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredIdeas.map((idea) => (
            <Card key={idea.id} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={idea.image || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                    {idea.season}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {idea.products.map((product, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
                <p className="text-muted-foreground mb-4">{idea.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* All Seasonal Ideas */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="spring">Spring</TabsTrigger>
            <TabsTrigger value="summer">Summer</TabsTrigger>
            <TabsTrigger value="fall">Fall</TabsTrigger>
            <TabsTrigger value="winter">Winter</TabsTrigger>
            <TabsTrigger value="holiday">Holiday</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalIdeas.map((idea) => (
              <div
                key={idea.id}
                className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={idea.image || "/placeholder.svg"}
                    alt={idea.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{idea.title}</h3>
                    <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                      {idea.season}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{idea.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {idea.products.map((product, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-purple">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {["spring", "summer", "fall", "winter", "holiday"].map((season) => (
          <TabsContent key={season} value={season} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalIdeas
                .filter((idea) => idea.season === season)
                .map((idea) => (
                  <div
                    key={idea.id}
                    className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={idea.image || "/placeholder.svg"}
                        alt={idea.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{idea.title}</h3>
                        <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                          {idea.season}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{idea.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {idea.products.map((product, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {product}
                          </span>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="text-brand-purple">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Seasonal Creation</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Have you created something amazing with our products for a seasonal celebration? We'd love to feature your
          work in our seasonal ideas gallery.
        </p>
        <Link href="/submit-creation">
          <Button className="bg-brand-purple hover:bg-brand-lavender">
            Submit Your Creation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

