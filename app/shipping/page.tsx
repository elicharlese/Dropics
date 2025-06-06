import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ShippingPolicyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Shipping Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This Shipping Policy outlines the shipping methods, timeframes, and costs associated with the delivery of
            Dropics products. We are committed to ensuring your order reaches you safely and in a timely manner.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Processing Time</h2>
          <p>
            All orders are processed within 1-2 business days (Monday-Friday, excluding holidays) after receiving your
            order confirmation email. Orders placed after 12 PM PST will be processed the next business day.
          </p>
          <p>
            During peak seasons or promotional periods, processing times may be slightly longer. We will notify you if
            there are any significant delays with your order.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Shipping Methods & Timeframes</h2>
          <p>
            <strong>Domestic Shipping (United States):</strong>
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Standard Shipping:</strong> 3-5 business days
            </li>
            <li>
              <strong>Expedited Shipping:</strong> 2-3 business days
            </li>
            <li>
              <strong>Priority Shipping:</strong> 1-2 business days
            </li>
          </ul>

          <p>
            <strong>International Shipping:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Standard International:</strong> 7-14 business days
            </li>
            <li>
              <strong>Express International:</strong> 3-5 business days
            </li>
          </ul>

          <p>
            Please note that these timeframes are estimates and do not include processing time. Actual delivery times
            may vary based on destination, customs processing, and other factors beyond our control.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Shipping Costs</h2>
          <p>
            Shipping costs are calculated based on the weight of your order, shipping method, and destination. The exact
            shipping cost will be displayed during checkout before you complete your purchase.
          </p>
          <p>
            <strong>Free Shipping:</strong> Orders over $75 within the continental United States qualify for free
            standard shipping.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Tracking Information</h2>
          <p>
            Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use
            this tracking number to monitor the status of your delivery through the carrier's website.
          </p>
          <p>
            If you do not receive tracking information within 3 business days after your order confirmation, please
            contact our customer service team.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. International Orders</h2>
          <p>
            We ship to most international destinations. Please note that international orders may be subject to import
            duties, taxes, and customs clearance fees imposed by the destination country. These charges are the
            responsibility of the recipient and are not included in our shipping costs.
          </p>
          <p>
            Customs policies vary widely from country to country. We recommend contacting your local customs office for
            more information prior to placing your order.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Shipping Restrictions</h2>
          <p>
            Due to food safety regulations and customs restrictions, we may be unable to ship certain products to
            specific international destinations. If we cannot ship to your location, we will notify you as soon as
            possible.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Order Issues</h2>
          <p>
            <strong>Lost or Damaged Packages:</strong> If your package appears to be lost or damaged during transit,
            please contact us within 7 days of the expected delivery date. We will work with the shipping carrier to
            resolve the issue.
          </p>
          <p>
            <strong>Incorrect Address:</strong> Please ensure your shipping address is correct at checkout. We are not
            responsible for packages sent to addresses provided by the customer that are incorrect or incomplete.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Wholesale Orders</h2>
          <p>
            Shipping policies for wholesale orders may differ from those for retail customers. Please contact our
            wholesale department for specific information regarding shipping options and costs for bulk orders.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Shipping Policy</h2>
          <p>
            We reserve the right to modify this Shipping Policy at any time. Changes will be effective immediately upon
            posting to our website. We encourage you to review this policy periodically for any updates.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about our Shipping Policy, please contact our customer service team at:</p>
          <ul className="list-disc pl-6 mb-8">
            <li>Email: support@dropics.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>
              Mail: Dropics Customer Service
              <br />
              123 Culinary Avenue, Suite 456
              <br />
              San Francisco, CA 94103
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/terms">
            <Button variant="outline">Terms of Service</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
          <Link href="/returns">
            <Button variant="outline">Returns & Refunds</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

