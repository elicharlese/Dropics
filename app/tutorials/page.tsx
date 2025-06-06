import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronLeft, Play, Clock, Eye } from "lucide-react"

type TutorialCategory = "cocktails" | "cakes" | "desserts" | "events"

type Tutorial = {
  id: string
  title: string
  description: string
  category: TutorialCategory
  author: string
  authorRole: string
  authorImage: string
  thumbnail: string
  duration: string
  views: number
  featured: boolean
}

const tutorials: Tutorial[] = [
  {
    id: "shimmer-cocktail-tutorial",
    title: "Creating Shimmering Cocktails",
    description: "A step-by-step guide to creating stunning shimmering cocktails using our liquid glitter products.",
    category: "cocktails",
    author: "Emma Johnson",
    authorRole: "Mixologist",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "8:45",
    views: 12540,
    featured: true,
  },
  {
    id: "wedding-cake-tutorial",
    title: "Elegant Wedding Cake Decoration",
    description: "Learn how to create a sophisticated wedding cake with perfect spray glitter application techniques.",
    category: "cakes",
    author: "Michael Rodriguez",
    authorRole: "Pastry Chef",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "15:20",
    views: 9870,
    featured: true,
  },
  {
    id: "dessert-plating-tutorial",
    title: "Professional Dessert Plating",
    description: "Master the art of dessert plating with edible glitter accents for restaurant-quality presentation.",
    category: "desserts",
    author: "Sophia Martinez",
    authorRole: "Culinary Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "12:15",
    views: 7650,
    featured: false,
  },
  {
    id: "event-table-setup",
    title: "Glamorous Event Table Setup",
    description: "Create a stunning table setup for special events with coordinated edible glitter elements.",
    category: "events",
    author: "Thomas Wright",
    authorRole: "Event Planner",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "18:30",
    views: 6320,
    featured: false,
  },
  {
    id: "signature-drink-tutorial",
    title: "Creating Signature Drinks",
    description: "Design unique signature drinks with liquid glitter for special events and celebrations.",
    category: "cocktails",
    author: "James Wilson",
    authorRole: "Bar Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "10:45",
    views: 8940,
    featured: false,
  },
  {
    id: "birthday-cake-tutorial",
    title: "Spectacular Birthday Cake Design",
    description: "Create an eye-catching birthday cake with multiple spray glitter techniques and effects.",
    category: "cakes",
    author: "Olivia Chen",
    authorRole: "Cake Designer",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "14:20",
    views: 11230,
    featured: false,
  },
  {
    id: "french-macaron-tutorial",
    title: "Glittering French Macarons",
    description: "Elevate your French macarons with precise application of edible glitter for a luxury finish.",
    category: "desserts",
    author: "David Kim",
    authorRole: "Pastry Chef",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "16:10",
    views: 7890,
    featured: false,
  },
  {
    id: "holiday-party-tutorial",
    title: "Holiday Party Glitter Elements",
    description: "Coordinate your holiday party with themed edible glitter decorations across food and drinks.",
    category: "events",
    author: "Rebecca Martinez",
    authorRole: "Event Specialist",
    authorImage: "/placeholder.svg?height=100&width=100",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "20:15",
    views: 5670,
    featured: false,
  },
]

export default function TutorialsPage() {
  const featuredTutorials = tutorials.filter((tutorial) => tutorial.featured)

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Video Tutorials</h1>
        <p className="text-muted-foreground md:text-lg">
          Step-by-step video guides from professional chefs, mixologists, and event planners to help you master edible
          glitter techniques.
        </p>
      </div>

      {/* Featured Tutorials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Tutorials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden">
              <div className="relative h-64 group">
                <Image
                  src={tutorial.thumbnail || "/placeholder.svg"}
                  alt={tutorial.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-brand-purple fill-brand-purple" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {tutorial.duration}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="mr-3">{tutorial.duration}</span>
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{tutorial.views.toLocaleString()}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                <div className="flex items-center">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={tutorial.authorImage || "/placeholder.svg"}
                      alt={tutorial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{tutorial.author}</p>
                    <p className="text-muted-foreground">{tutorial.authorRole}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="outline" className="w-full">
                  Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* All Tutorials by Category */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cocktails">Cocktails</TabsTrigger>
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{tutorial.title}</h3>
                    <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                      {tutorial.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-medium">{tutorial.author}</p>
                      <p className="text-muted-foreground">{tutorial.authorRole}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{tutorial.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {["cocktails", "cakes", "desserts", "events"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter((tutorial) => tutorial.category === category)
                .map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{tutorial.title}</h3>
                        <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                          {tutorial.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium">{tutorial.author}</p>
                          <p className="text-muted-foreground">{tutorial.authorRole}</p>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{tutorial.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Have a Tutorial Idea?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Are you a professional chef, baker, or mixologist who would like to create a tutorial using our products?
          We're always looking for new content creators to collaborate with.
        </p>
        <Link href="/submit-creation">
          <Button className="bg-brand-purple hover:bg-brand-lavender">
            Submit Your Idea <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

