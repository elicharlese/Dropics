import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  authorRole: string
  authorImage: string
  image: string
  category: string
  readTime: number
}

const blogPosts: BlogPost[] = [
  {
    id: "cocktail-trends-2023",
    title: "Top Cocktail Trends for Professional Mixologists in 2023",
    excerpt:
      "Discover the latest trends in craft cocktails and how edible glitter is transforming the premium beverage scene.",
    date: "June 15, 2023",
    author: "James Wilson",
    authorRole: "Head Mixologist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mixology",
    readTime: 5,
  },
  {
    id: "wedding-cake-designs",
    title: "Elegant Wedding Cake Designs Using Edible Shimmer",
    excerpt:
      "Explore sophisticated cake decorating techniques that incorporate edible glitter for unforgettable wedding celebrations.",
    date: "May 28, 2023",
    author: "Emma Rodriguez",
    authorRole: "Pastry Chef",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Baking",
    readTime: 7,
  },
  {
    id: "food-photography-tips",
    title: "Food Photography: Capturing the Perfect Shimmer",
    excerpt:
      "Professional tips for photographing desserts and cocktails with edible glitter to create stunning visual content.",
    date: "May 12, 2023",
    author: "Michael Chen",
    authorRole: "Food Photographer",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Photography",
    readTime: 6,
  },
  {
    id: "holiday-desserts",
    title: "Festive Holiday Desserts with a Luxurious Twist",
    excerpt:
      "Elevate your seasonal offerings with these professional dessert recipes featuring edible glitter accents.",
    date: "April 30, 2023",
    author: "Sarah Thompson",
    authorRole: "Executive Pastry Chef",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Seasonal",
    readTime: 8,
  },
  {
    id: "organic-ingredients",
    title: "The Importance of Organic Ingredients in Culinary Artistry",
    excerpt:
      "Why leading chefs are choosing organic decorative elements and how it impacts both quality and sustainability.",
    date: "April 15, 2023",
    author: "Dr. Thomas Wright",
    authorRole: "Food Scientist",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Ingredients",
    readTime: 10,
  },
  {
    id: "event-planning",
    title: "Creating Memorable Corporate Events with Visual Food Elements",
    excerpt:
      "How event planners are using edible glitter to create Instagram-worthy food presentations at high-end corporate functions.",
    date: "March 28, 2023",
    author: "Rebecca Martinez",
    authorRole: "Event Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Events",
    readTime: 6,
  },
]

const categories = ["All Categories", "Mixology", "Baking", "Photography", "Seasonal", "Ingredients", "Events"]

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">The Dropics Blog</h1>
        <p className="text-muted-foreground md:text-lg">
          Professional insights, creative inspiration, and expert tips for using premium edible glitter
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative h-60 md:h-full overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-brand-purple/10 text-brand-purple">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <CardFooter className="p-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={post.authorImage || "/placeholder.svg"}
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-brand-purple">
                          Read More
                        </Button>
                      </CardFooter>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All Categories" ? "default" : "outline"}
                  className={
                    category === "All Categories"
                      ? "bg-brand-purple hover:bg-brand-lavender cursor-pointer"
                      : "hover:bg-brand-purple/10 hover:text-brand-purple cursor-pointer"
                  }
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Popular Posts</h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-3 group">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-brand-purple transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest articles, recipes, and professional tips delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full bg-brand-purple hover:bg-brand-lavender">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

