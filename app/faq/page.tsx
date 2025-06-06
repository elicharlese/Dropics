import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 elegant-text-gradient text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-center mb-12 md:text-lg">
          Find answers to common questions about our products, ordering, and more
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Products & Ingredients</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are Dropics edible glitters made of?</AccordionTrigger>
                <AccordionContent>
                  Our edible glitters are made from 100% food-safe, organic ingredients. The primary ingredients include
                  organic sugar, natural food coloring, food-grade mica powder, and gum arabic. All our products are
                  certified food-safe and meet international food safety standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Are your products allergen-free?</AccordionTrigger>
                <AccordionContent>
                  Yes, all Dropics products are free from common allergens including gluten, nuts, dairy, soy, and eggs.
                  However, if you have specific allergies or dietary concerns, we recommend reviewing the full
                  ingredient list on each product page or contacting our customer service team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do your products affect the taste of food or drinks?</AccordionTrigger>
                <AccordionContent>
                  Our edible glitters are specially formulated to be taste-neutral. They add visual appeal without
                  affecting the flavor profile of your culinary creations. This makes them perfect for professional
                  applications where maintaining the intended flavor is crucial.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What's the difference between liquid and spray glitter?</AccordionTrigger>
                <AccordionContent>
                  Liquid glitter is designed for adding shimmer to beverages and liquid-based desserts. It comes in a
                  dropper bottle for precise application and creates a suspended shimmer effect. Spray glitter is
                  formulated for decorating solid surfaces like cakes, pastries, and chocolates. It provides an even,
                  fine mist of glitter that adheres well to surfaces.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How long does the glitter effect last?</AccordionTrigger>
                <AccordionContent>
                  For liquid glitters, the shimmer effect typically remains suspended for 2-3 hours in most beverages.
                  For spray glitters, the effect is permanent once applied and dried on the food surface. The visual
                  impact remains until the food is consumed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Usage & Application</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-6">
                <AccordionTrigger>How do I use liquid glitter in cocktails?</AccordionTrigger>
                <AccordionContent>
                  For cocktails and beverages, add 2-3 drops of liquid glitter per standard drink (8 oz). Stir gently to
                  distribute the effect. For best results, add the glitter as the final step before serving. The effect
                  is most visible in clear or light-colored drinks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What's the best way to apply spray glitter to desserts?</AccordionTrigger>
                <AccordionContent>
                  Shake the spray bottle well before use. Hold the bottle 6-8 inches away from the food surface and
                  apply in short bursts for even coverage. For more precise application, you can use stencils or mask
                  areas you don't want to cover. Allow the spray to dry for about 5 minutes before serving or additional
                  decorating.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Can I mix different colors of glitter?</AccordionTrigger>
                <AccordionContent>
                  Mixing different colors can create unique effects. For liquid glitters, you can combine drops of
                  different colors in the same beverage. For spray glitters, you can layer different colors or apply
                  them to different areas of your creation for a multi-dimensional effect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>At what stage of preparation should I add the glitter?</AccordionTrigger>
                <AccordionContent>
                  For liquid glitters, add them as the final step just before serving to maximize the visual impact. For
                  spray glitters, it's best to apply them after your dessert is fully decorated but before adding any
                  final elements that might be affected by the spray, such as fresh fruit or delicate decorations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Ordering & Shipping</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-10">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping within the continental US typically takes 3-5 business days. Expedited shipping
                  options are available at checkout. International shipping times vary by destination, generally ranging
                  from 7-14 business days. All orders are processed within 1-2 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most international destinations. Shipping rates and delivery times vary by location.
                  Please note that customers are responsible for any customs fees, duties, or taxes that may apply to
                  international orders. These are not included in our shipping charges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns of unopened products within 30 days of delivery. Due to the nature of food products,
                  we cannot accept returns of opened items unless they are defective. If you receive a damaged or
                  defective product, please contact our customer service team within 7 days of delivery for a
                  replacement or refund.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13">
                <AccordionTrigger>Is there a minimum order quantity?</AccordionTrigger>
                <AccordionContent>
                  For retail customers, there is no minimum order quantity. For wholesale customers, our standard
                  minimum order is 12 units per SKU with a total order minimum of $500. Volume discounts begin at 24
                  units per SKU. Please visit our Wholesale page for more information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Storage & Shelf Life</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-14">
                <AccordionTrigger>What is the shelf life of your products?</AccordionTrigger>
                <AccordionContent>
                  All Dropics products have a shelf life of 24 months from the date of manufacture when stored properly.
                  Each product has a batch code and expiration date printed on the packaging.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-15">
                <AccordionTrigger>How should I store my edible glitter products?</AccordionTrigger>
                <AccordionContent>
                  Store all products in a cool, dry place away from direct sunlight. Liquid glitters should be kept
                  tightly sealed when not in use. Spray glitters should be stored upright with the cap securely
                  fastened. Do not refrigerate or freeze our products as this may affect their performance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#f9f5ff] rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Our customer service team is here to help with any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-brand-purple hover:bg-brand-lavender w-full sm:w-auto">Contact Us</Button>
            </Link>
            <Link href="mailto:support@dropics.com">
              <Button variant="outline" className="w-full sm:w-auto">
                Email Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

