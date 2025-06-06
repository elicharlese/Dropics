import { Award, Leaf, Sparkles, ShieldCheck } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-brand-purple" />,
      title: "100% Organic Ingredients",
      description:
        "Crafted from natural food ingredients with no artificial additives, preservatives, or synthetic dyes.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-brand-purple" />,
      title: "Food Safety Certified",
      description:
        "Rigorously tested and certified safe for culinary applications, meeting international food safety standards.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-brand-purple" />,
      title: "Professional-Grade Quality",
      description:
        "Developed with input from professional chefs and mixologists for exceptional performance and visual impact.",
    },
    {
      icon: <Award className="h-10 w-10 text-brand-purple" />,
      title: "Taste Neutral",
      description:
        "Specially formulated to add visual appeal without affecting the flavor profile of your culinary creations.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Crafted for Culinary Excellence
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Our premium edible glitter products are designed to meet the exacting standards of professional chefs,
              bakers, and mixologists.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-background">
                {feature.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

