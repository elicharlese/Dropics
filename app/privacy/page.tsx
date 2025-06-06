import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            At Dropics, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or make a purchase.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            <strong>Personal Information:</strong> We may collect personally identifiable information, such as your
            name, email address, shipping address, billing address, phone number, and payment information when you make
            a purchase or create an account.
          </p>
          <p>
            <strong>Non-Personal Information:</strong> We may also collect non-personal information about you such as
            browser type, IP address, device type, and operating system. This information is collected automatically
            through cookies and similar technologies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and fulfill your orders</li>
            <li>Provide customer service and respond to inquiries</li>
            <li>Send transactional emails and order confirmations</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website, products, and services</li>
            <li>Administer promotions, surveys, or contests</li>
            <li>Protect against fraudulent or unauthorized transactions</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Service Providers:</strong> Third-party vendors who help us operate our business, such as payment
              processors, shipping companies, and marketing partners.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety,
              or the rights, property, or safety of others.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion
              of our assets.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for their marketing purposes
            without your explicit consent.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to or restrict processing of your information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. California Privacy Rights</h2>
          <p>
            If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA)
            regarding your personal information. Please refer to our California Privacy Notice for more information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 16 years of age. We do not knowingly collect personal
            information from children under 16. If you are a parent or guardian and believe your child has provided us
            with personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="list-disc pl-6 mb-8">
            <li>Email: privacy@dropics.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>
              Mail: Dropics Privacy Office
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

