import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, Users, Heart, Zap } from "lucide-react"

type JobListing = {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  description: string
  requirements: string[]
  posted: string
}

const jobListings: JobListing[] = [
  {
    id: "product-developer",
    title: "Food Product Developer",
    department: "Research & Development",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Join our R&D team to create innovative edible glitter products. You'll work with food scientists and culinary experts to develop new formulations, colors, and applications.",
    requirements: [
      "Bachelor's degree in Food Science, Chemistry, or related field",
      "3+ years experience in food product development",
      "Knowledge of food safety regulations and standards",
      "Experience with natural food colorants and ingredients",
      "Creative problem-solving skills and attention to detail",
    ],
    posted: "2 weeks ago",
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Lead our marketing efforts to promote our premium edible glitter products to professional chefs, mixologists, and high-end food establishments.",
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "5+ years experience in marketing luxury or premium food products",
      "Strong understanding of digital marketing channels",
      "Experience working with influencers and industry professionals",
      "Excellent project management and communication skills",
    ],
    posted: "1 week ago",
  },
  {
    id: "sales-representative",
    title: "Wholesale Sales Representative",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description:
      "Build relationships with bakeries, restaurants, and retail stores to expand our wholesale program. You'll be responsible for identifying potential clients and growing our B2B sales.",
    requirements: [
      "3+ years experience in B2B sales, preferably in food or hospitality industry",
      "Strong networking and relationship-building skills",
      "Experience with CRM software and sales tracking",
      "Excellent communication and negotiation abilities",
      "Willingness to travel occasionally for client meetings and industry events",
    ],
    posted: "3 days ago",
  },
  {
    id: "content-creator",
    title: "Content Creator & Social Media Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Create engaging content for our social media channels, blog, and marketing materials. You'll work closely with our product team to showcase creative applications of our edible glitter products.",
    requirements: [
      "2+ years experience in content creation and social media management",
      "Strong photography and video skills",
      "Experience with Adobe Creative Suite",
      "Knowledge of food styling and presentation",
      "Understanding of social media analytics and trends",
    ],
    posted: "5 days ago",
  },
  {
    id: "customer-service",
    title: "Customer Service Specialist",
    department: "Customer Support",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Provide exceptional support to our customers, handling inquiries about products, orders, and applications. You'll be the voice of our brand and ensure customer satisfaction.",
    requirements: [
      "2+ years experience in customer service, preferably in e-commerce",
      "Excellent communication skills and problem-solving abilities",
      "Experience with CRM and order management systems",
      "Knowledge of food products and culinary applications a plus",
      "Ability to work in a fast-paced environment",
    ],
    posted: "1 week ago",
  },
]

export default function CareersPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient">Join Our Team</h1>
        <p className="text-muted-foreground md:text-lg">
          Help us revolutionize the culinary world with innovative, premium edible glitter products
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Dropics team working together"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Why Work With Us</h2>
          <p className="text-muted-foreground mb-6">
            At Dropics, we're passionate about innovation, quality, and creativity. We're a team of food scientists,
            culinary experts, and business professionals united by our mission to transform the culinary world with
            premium, organic edible glitter products.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Heart className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Meaningful Work</h3>
                <p className="text-sm text-muted-foreground">
                  Create products that bring joy and inspiration to culinary professionals worldwide
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Users className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Collaborative Culture</h3>
                <p className="text-sm text-muted-foreground">
                  Work with passionate, creative individuals in a supportive environment
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Innovation-Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Constantly push boundaries and explore new possibilities in food aesthetics
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Briefcase className="h-6 w-6 text-brand-purple flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Growth Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Develop your skills and advance your career in a rapidly growing company
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 mx-auto bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <CardTitle className="text-base">Health & Wellness</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0">
              Comprehensive health insurance, wellness programs, and mental health support
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 mx-auto bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <CardTitle className="text-base">Work-Life Balance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0">
              Flexible work arrangements, generous PTO, and paid parental leave
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 mx-auto bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <CardTitle className="text-base">Professional Development</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0">
              Learning stipends, conference attendance, and career advancement opportunities
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 mx-auto bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-purple"
                >
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                </svg>
              </div>
              <CardTitle className="text-base">Competitive Compensation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0">
              Competitive salary, equity options, and performance bonuses
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
        <div className="space-y-6">
          {jobListings.map((job) => (
            <Card key={job.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {job.department}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {job.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Link href={`/careers/${job.id}`}>
                  <Button className="bg-brand-purple hover:bg-brand-lavender">View Job & Apply</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#f9f5ff] p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Don't See the Right Fit?</h2>
        <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
          We're always looking for talented individuals to join our team. Send us your resume and let us know how you
          can contribute to Dropics.
        </p>
        <Link href="mailto:careers@dropics.com">
          <Button className="bg-brand-purple hover:bg-brand-lavender">Send Your Resume</Button>
        </Link>
      </div>
    </div>
  )
}

