"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-brand-teal/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-brand-teal">
                Add Some Sparkle to Your Creations!
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Premium organic edible glitter for bakers, mixologists, and party planners. Make your treats and drinks
                shine with our colorful, fun products!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products/liquid">
                <Button
                  size="lg"
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white rounded-full"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Explore Liquid Glitter
                </Button>
              </Link>
              <Link href="/products/spray">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal/10 rounded-full"
                >
                  Explore Spray Glitter
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                rotate: isHovering ? [0, 5, -5, 0] : 0,
                scale: isHovering ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
              className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
            >
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Premium edible glitter products"
                fill
                className="object-contain"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-brand-teal/10 rounded-full blur-xl -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

