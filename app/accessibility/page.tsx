import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AccessibilityPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Accessibility Statement</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Dropics is committed to ensuring digital accessibility for people with disabilities. We are continually
            improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h2>
          <p>
            We strive to ensure that our website conforms to level AA of the World Wide Web Consortium (W3C) Web Content
            Accessibility Guidelines 2.1 (WCAG 2.1). These guidelines explain how to make web content more accessible
            for people with disabilities and more user-friendly for everyone.
          </p>
          <p>
            The guidelines have three levels of accessibility (A, AA, and AAA). We've chosen Level AA as our target.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Measures We Take</h2>
          <p>We take the following measures to ensure accessibility of our website:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide accessibility training for our staff</li>
            <li>Include people with disabilities in our user experience research</li>
            <li>Employ formal accessibility quality assurance methods</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Accessibility Features</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Semantic HTML: We use proper HTML elements to ensure content is properly structured and navigable</li>
            <li>ARIA attributes: When necessary, we use ARIA to enhance accessibility for screen reader users</li>
            <li>Keyboard navigation: All interactive elements are accessible via keyboard</li>
            <li>Color contrast: We maintain sufficient color contrast ratios for text and interactive elements</li>
            <li>Text resizing: Our content remains readable and functional when text is resized up to 200%</li>
            <li>Alternative text: We provide descriptive alt text for images that convey information</li>
            <li>Focus indicators: Visible focus indicators help keyboard users navigate the site</li>
            <li>Consistent navigation: Navigation mechanisms are consistent throughout the website</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Assistive Technology Compatibility</h2>
          <p>Our website is designed to be compatible with the following assistive technologies:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Screen readers (such as NVDA, JAWS, VoiceOver, and TalkBack)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Known Limitations</h2>
          <p>
            Despite our best efforts to ensure accessibility of our website, there may be some limitations. Below is a
            description of known limitations, and we are working to resolve these issues:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Some older PDF documents may not be fully accessible. We are working to remediate these documents.</li>
            <li>
              Some video content may not have captions or audio descriptions. We are working to add these features.
            </li>
            <li>Some interactive features may have limited accessibility. We are working to improve these features.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of our website. Please let us know if you encounter
            accessibility barriers:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Phone: +1 (555) 123-4567</li>
            <li>Email: accessibility@dropics.com</li>
            <li>
              Contact form:{" "}
              <Link href="/contact" className="text-brand-purple hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
          <p>We try to respond to feedback within 3 business days.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Compatibility with Browsers and Assistive Technology</h2>
          <p>
            Our website is designed to be compatible with the following browsers and assistive technology combinations:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Latest versions of Chrome, Firefox, Safari, and Edge with screen readers (NVDA, JAWS, VoiceOver)</li>
            <li>Latest versions of Android and iOS with screen readers (TalkBack, VoiceOver)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Technical Specifications</h2>
          <p>
            Accessibility of our website relies on the following technologies to work with the particular combination of
            web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
          </ul>
          <p>These technologies are relied upon for conformance with the accessibility standards used.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Assessment Approach</h2>
          <p>Dropics assesses the accessibility of our website by the following approaches:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Self-evaluation</li>
            <li>External evaluation</li>
            <li>User testing with assistive technologies</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Additional Resources</h2>
          <p>For more information about web accessibility, we recommend the following resources:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <a
                href="https://www.w3.org/WAI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple hover:underline"
              >
                Web Accessibility Initiative (WAI)
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple hover:underline"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button className="bg-brand-purple hover:bg-brand-lavender">Contact Us</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

