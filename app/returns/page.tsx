import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReturnsRefundsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Returns & Refunds Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            We want you to be completely satisfied with your purchase. This Returns & Refunds Policy outlines our
            procedures for returns, exchanges, and refunds for Dropics products.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Return Eligibility</h2>
          <p>
            <strong>Unopened Products:</strong> We accept returns of unopened products in their original packaging
            within 30 days of delivery. The product must be in the same condition as when you received it.
          </p>
          <p>
            <strong>Opened Products:</strong> Due to the nature of food products and for health and safety reasons, we
            cannot accept returns of opened products unless they are defective.
          </p>
          <p>
            <strong>Defective Products:</strong> If you receive a product that is damaged or defective, please contact
            our customer service team within 7 days of delivery. We may request photos of the defective product to
            process your return.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Products that have been opened, used, or tampered with (unless defective)</li>
            <li>Custom or personalized orders</li>
            <li>Downloadable digital products</li>
            <li>Gift cards</li>
            <li>Items marked as final sale or clearance</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Return Process</h2>
          <p>To initiate a return, please follow these steps:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>
              Contact our customer service team at returns@dropics.com or call +1 (555) 123-4567 to request a return
              authorization.
            </li>
            <li>Include your order number, the items you wish to return, and the reason for the return.</li>
            <li>Our team will provide you with return instructions and a return authorization number (if approved).</li>
            <li>Package the item securely in its original packaging if possible.</li>
            <li>Include the return authorization number and your order information with the return package.</li>
            <li>Ship the package to the address provided in the return instructions.</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Return Shipping</h2>
          <p>
            <strong>Customer-Initiated Returns:</strong> For returns due to customer preference (not defective or
            incorrect items), the customer is responsible for return shipping costs.
          </p>
          <p>
            <strong>Defective or Incorrect Items:</strong> If you received a defective product or we shipped an
            incorrect item, we will provide a prepaid return shipping label and cover the return shipping costs.
          </p>
          <p>
            We recommend using a trackable shipping service and purchasing shipping insurance for your return, as we
            cannot be responsible for items lost or damaged during return shipping unless we provided the return label.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Refunds</h2>
          <p>Once we receive and inspect your return, we will notify you about the status of your refund.</p>
          <p>
            <strong>Approved Refunds:</strong> If your return is approved, we will initiate a refund to your original
            payment method. The time it takes for the refund to appear in your account depends on your payment
            provider's processing times, typically 5-10 business days.
          </p>
          <p>
            <strong>Refund Amount:</strong> Refunds include the purchase price of the returned item(s). Original
            shipping costs are non-refundable unless the return is due to our error (defective product or incorrect
            shipment).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Exchanges</h2>
          <p>
            We do not process direct exchanges. If you wish to exchange an item, please return the original item
            following our return process and place a new order for the desired item.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Late or Missing Refunds</h2>
          <p>
            If you haven't received your refund within 10 business days after we've confirmed its processing, please
            check your bank account again and contact your credit card company or bank, as it may take some time for the
            refund to be officially posted.
          </p>
          <p>If you've done this and still haven't received your refund, please contact our customer service team.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Wholesale Orders</h2>
          <p>
            Return policies for wholesale orders may differ from those for retail customers. Please contact our
            wholesale department for specific information regarding returns and refunds for bulk orders.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Return Policy</h2>
          <p>
            We reserve the right to modify this Returns & Refunds Policy at any time. Changes will be effective
            immediately upon posting to our website. We encourage you to review this policy periodically for any
            updates.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about our Returns & Refunds Policy, please contact our customer service team at:
          </p>
          <ul className="list-disc pl-6 mb-8">
            <li>Email: returns@dropics.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>
              Mail: Dropics Returns Department
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
          <Link href="/shipping">
            <Button variant="outline">Shipping Policy</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

