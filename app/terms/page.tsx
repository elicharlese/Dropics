import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Dropics ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service")
            govern your use of our website located at www.dropics.com (the "Service") and all related products and
            services offered by Dropics.
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Purchases</h2>
          <p>
            If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to
            supply certain information relevant to your Purchase including, without limitation, your credit card number,
            the expiration date of your credit card, your billing address, and your shipping information.
          </p>
          <p>
            You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment
            method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct,
            and complete.
          </p>
          <p>
            The Service may employ the use of third-party services for the purpose of facilitating payment and the
            completion of Purchases. By submitting your information, you grant us the right to provide the information
            to these third parties subject to our Privacy Policy.
          </p>
          <p>
            We reserve the right to refuse or cancel your order at any time for reasons including but not limited to:
            product availability, errors in the description or price of the product, error in your order, or other
            reasons.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Products</h2>
          <p>
            All products are subject to availability. We reserve the right to discontinue any products at any time.
            Prices for all products are subject to change without notice. We shall not be liable to you or to any
            third-party for any modification, price change, suspension, or discontinuance of the product.
          </p>
          <p>
            Certain products may be available exclusively online through the website. These products may have limited
            quantities and are subject to return or exchange only according to our Return Policy.
          </p>
          <p>
            We have made every effort to display as accurately as possible the colors and images of our products that
            appear on the Service. We cannot guarantee that your computer monitor's display of any color will be
            accurate.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Food Safety and Usage</h2>
          <p>
            Our edible glitter products are designed for culinary use and are made with food-safe ingredients. However,
            we recommend that you review all product information, including ingredients and usage instructions, before
            use.
          </p>
          <p>
            You acknowledge that you are responsible for ensuring that our products are used in accordance with all
            applicable food safety regulations and guidelines. We are not responsible for any adverse reactions or
            effects resulting from improper use of our products.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Accuracy of Information</h2>
          <p>
            We are not responsible if information made available on this Service is not accurate, complete, or current.
            The material on this Service is provided for general information only and should not be relied upon or used
            as the sole basis for making decisions without consulting primary, more accurate, more complete, or more
            timely sources of information.
          </p>
          <p>
            Any reliance on the material on this Service is at your own risk. This Service may contain certain
            historical information. Historical information, necessarily, is not current and is provided for your
            reference only.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by
            Dropics. Dropics has no control over, and assumes no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>
          <p>
            You further acknowledge and agree that Dropics shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any
            such content, goods, or services available on or through any such websites or services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for
            any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive termination shall survive termination,
            including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of California, United
            States, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <ul className="list-disc pl-6 mb-8">
            <li>Email: legal@dropics.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>
              Mail: Dropics Legal Department
              <br />
              123 Culinary Avenue, Suite 456
              <br />
              San Francisco, CA 94103
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
          <Link href="/shipping">
            <Button variant="outline">Shipping Policy</Button>
          </Link>
          <Link href="/returns">
            <Button variant="outline">Returns & Refunds</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

