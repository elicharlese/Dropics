import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronLeft } from "lucide-react"

type TipCategory = "application" | "techniques" | "storage" | "pairing"

type ProfessionalTip = {
  id: string
  title: string
  description: string
  category: TipCategory
  author: string
  authorRole: string
  authorImage: string
  image: string
  featured: boolean
}

const professionalTips: ProfessionalTip[] = [
  {
    id: "layering-technique",
    title: "Layering Techniques for Spray Glitter",
    description:
      "Learn how to create depth and dimension by layering different colors of spray glitter on cakes and pastries.",
    category: "techniques",
    author: "Michael Rodriguez",
    authorRole: "Executive Pastry Chef",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "temperature-control",
    title: "Temperature Control for Perfect Application",
    description:
      "Discover the optimal temperature ranges for applying liquid glitter to different beverages and desserts.",
    category: "application",
    author: "Emma Johnson",
    authorRole: "Mixologist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "storage-tips",
    title: "Proper Storage for Maximum Shelf Life",
    description: "Expert advice on storing your edible glitter products to maintain their quality and sparkle.",
    category: "storage",
    author: "David Kim",
    authorRole: "Food Scientist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "flavor-pairing",
    title: "Flavor Pairing Guide for Edible Glitter",
    description:
      "Learn which flavors complement different colors and types of edible glitter for a harmonious taste experience.",
    category: "pairing",
    author: "Sophia Martinez",
    authorRole: "Culinary Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "precision-application",
    title: "Precision Application Methods",
    description: "Master the art of precise glitter application using professional tools and techniques.",
    category: "application",
    author: "James Wilson",
    authorRole: "Cake Artist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "color-theory",
    title: "Color Theory for Edible Glitter",
    description: "Understanding color combinations and contrasts to create visually stunning edible glitter designs.",
    category: "techniques",
    author: "Olivia Chen",
    authorRole: "Food Stylist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "humidity-control",
    title: "Managing Humidity for Optimal Results",
    description:
      "Tips for working with edible glitter in different humidity conditions to prevent clumping and ensure even application.",
    category: "application",
    author: "Thomas Wright",
    authorRole: "Pastry Consultant",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "cocktail-rim-techniques",
    title: "Advanced Cocktail Rim Techniques",
    description: "Professional methods for creating stunning glitter-rimmed cocktails that will impress your guests.",
    category: "techniques",
    author: "Rebecca Martinez",
    authorRole: "Bar Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

export default function ProfessionalTipsPage() {
  const featuredTips = professionalTips.filter((tip) => tip.featured)

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Professional Tips</h1>
        <p className="text-muted-foreground md:text-lg">
          Expert advice and techniques from industry professionals to help you achieve stunning results with our edible
          glitter products.
        </p>
      </div>

      {/* Featured Tips */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Tips</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={tip.image || "/placeholder.svg"} alt={tip.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                    {tip.category}
                  </span>
                  <div className="flex items-center">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={tip.authorImage || "/placeholder.svg"}
                        alt={tip.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium">{tip.author}</p>
                      <p className="text-muted-foreground">{tip.authorRole}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                <p className="text-muted-foreground mb-4">{tip.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="outline" className="w-full">
                  Read Full Tip
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* All Tips by Category */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">All Tips</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="techniques">Techniques</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="pairing">Pairing</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalTips.map((tip) => (
              <div key={tip.id} className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tip.image || "/placeholder.svg"}
                    alt={tip.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{tip.title}</h3>
                    <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{tip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-medium">{tip.author}</p>
                      <p className="text-muted-foreground">{tip.authorRole}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-brand-purple">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {["application", "techniques", "storage", "pairing"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalTips
                .filter((tip) => tip.category === category)
                .map((tip) => (
                  <div
                    key={tip.id}
                    className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={tip.image || "/placeholder.svg"}
                        alt={tip.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{tip.title}</h3>
                        <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full capitalize">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium">{tip.author}</p>
                          <p className="text-muted-foreground">{tip.authorRole}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-brand-purple">
                          Read More
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
        <h2 className="text-2xl font-bold mb-4">Want to Share Your Expertise?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Are you a professional chef, baker, or mixologist with valuable tips for using edible glitter? We'd love to
          feature your expertise in our professional tips section.
        </p>
        <Link href="/submit-creation">
          <Button className="bg-brand-purple hover:bg-brand-lavender">
            Submit Your Tip <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

