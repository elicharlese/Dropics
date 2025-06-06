"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { CheckCircle } from "lucide-react"

const steps = [
  { name: "Cart", href: "/cart" },
  { name: "Shipping", href: "/checkout" },
  { name: "Payment", href: "/checkout/payment" },
  { name: "Confirmation", href: "/checkout/confirmation" },
]

export function CheckoutProgress() {
  const pathname = usePathname()

  // Determine current step
  const currentStepIndex = steps.findIndex(
    (step) =>
      pathname === step.href ||
      (pathname.startsWith("/checkout/") &&
        step.href === "/checkout" &&
        pathname !== "/checkout/payment" &&
        pathname !== "/checkout/confirmation"),
  )

  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isCurrentStep = stepIdx === currentStepIndex
          const isPreviousStep = stepIdx < currentStepIndex

          return (
            <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "", "relative")}>
              {isPreviousStep ? (
                <div className="group flex items-center">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </span>
                  </span>
                  <span className="ml-2 text-sm font-medium text-brand-purple">{step.name}</span>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className="absolute top-3 left-0 -ml-px mt-0.5 h-0.5 w-full bg-brand-purple"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ) : isCurrentStep ? (
                <div className="flex items-center" aria-current="step">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-purple bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
                    </span>
                  </span>
                  <span className="ml-2 text-sm font-medium text-brand-purple">{step.name}</span>
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-3 left-0 -ml-px mt-0.5 h-0.5 w-full bg-gray-200" aria-hidden="true" />
                  )}
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-500">{step.name}</span>
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-3 left-0 -ml-px mt-0.5 h-0.5 w-full bg-gray-200" aria-hidden="true" />
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

