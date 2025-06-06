import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiePolicyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 elegant-text-gradient">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2023</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This Cookie Policy explains how Dropics ("we", "us", and "our") uses cookies and similar technologies to
            recognize you when you visit our website at www.dropics.com ("Website"). It explains what these technologies
            are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Dropics) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party cookies". Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Do We Use Cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical
            reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary"
            cookies. Other cookies also enable us to track and target the interests of our users to enhance the
            experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and
            other purposes. This is described in more detail below.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>
          <p>
            The specific types of first and third-party cookies served through our Website and the purposes they perform
            are described below:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our Website and to use
            some of its features, such as access to secure areas. Because these cookies are strictly necessary to
            deliver the Website, you cannot refuse them without impacting how our Website functions.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> These cookies remain on your device until you delete them or they
              expire.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our Website but are non-essential to
            their use. However, without these cookies, certain functionality may become unavailable.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Analytics Cookies:</strong> We use Google Analytics to collect information about how visitors use
              our site. These cookies collect information in an anonymous form, including the number of visitors to the
              site, where visitors have come to the site from, and the pages they visited.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies allow our Website to remember choices you have made in
              the past, like what language you prefer, or what your user name and password are so you can automatically
              log in.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Marketing and Advertising Cookies</h3>
          <p>
            These cookies track your browsing habits to enable us to show advertising which is more likely to be of
            interest to you. These cookies use information about your browsing history to group you with other users who
            have similar interests. Based on that information, and with our permission, third-party advertisers can
            place cookies to enable them to show advertisements which we think will be relevant to your interests while
            you are on third-party websites.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Social Media Cookies:</strong> These cookies are used when you share information using a social
              media sharing button or "like" button on our Website or you link your account or engage with our content
              on or through a social networking website such as Facebook, Twitter, or Instagram.
            </li>
            <li>
              <strong>Remarketing Cookies:</strong> These cookies collect information about your browsing habits in
              order to make advertising relevant to you and your interests.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences
            by clicking on the appropriate opt-out links provided in the cookie banner on our Website.
          </p>
          <p>
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
            cookies, you may still use our Website though your access to some functionality and areas of our Website may
            be restricted. As the means by which you can refuse cookies through your web browser controls vary from
            browser to browser, you should visit your browser's help menu for more information.
          </p>
          <p>
            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like
            to find out more information, please visit{" "}
            <a
              href="http://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple hover:underline"
            >
              http://www.aboutads.info/choices/
            </a>{" "}
            or{" "}
            <a
              href="http://www.youronlinechoices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple hover:underline"
            >
              http://www.youronlinechoices.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Often Will We Update This Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Where Can You Get Further Information?</h2>
          <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
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
          <Link href="/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
          <Link href="/terms">
            <Button variant="outline">Terms of Service</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

