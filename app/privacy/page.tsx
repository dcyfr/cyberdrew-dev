import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { person } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy · cyberdrew.dev",
  description: "What cyberdrew.dev collects when you visit, and how to ask about it.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "October 15, 2026";

/**
 * Plain prose on the same ground as the rest of the site. No Header: its
 * links are in-page anchors on the home route and would go nowhere from here,
 * so the page carries one link back instead.
 */
export default function PrivacyPage() {
  return (
    <>
      <main id="main">
        <section className="bay">
          <div className="wide">
            <div className="sect-head">
              <p className="eyebrow">
                <Link href="/">{person.domain}</Link>
              </p>
              <h1 className="sect-h">Privacy</h1>
              <p className="sect-deck">Last updated {LAST_UPDATED}</p>
            </div>

            <div className="legal">
              <p>
                This is the personal website of Drew Gowan. I run it myself, and no company sits
                behind it. This page explains what happens to information about you when you visit.
              </p>

              <h2>What this site collects</h2>
              <ul>
                <li>
                  <strong>Visit statistics</strong>, through Vercel Web Analytics: the page you
                  viewed, the site that linked you here, your country, and your browser, operating
                  system and device type. Vercel tells visits apart with a hash made from the
                  request, and the hash resets every day, so a visit cannot be linked to your visits
                  on other days or to other websites. No cookies are set.
                </li>
                <li>
                  <strong>Performance measurements</strong>, through Vercel Speed Insights: how fast
                  the page loaded (Core Web Vitals), the page path, and your device type and
                  browser.
                </li>
              </ul>
              <p>
                Both run from this site&apos;s own address, under <code>/_vercel/</code>, so no
                third-party analytics script loads in your browser. The data is used only to see
                how many people visit and whether the page is fast.
              </p>

              <h2>What this site does not collect</h2>
              <ul>
                <li>No cookies, advertising pixels or cross-site trackers.</li>
                <li>No forms and no accounts.</li>
                <li>
                  If you switch between light and dark mode, the choice is saved in your
                  browser&apos;s local storage. It never leaves your device.
                </li>
              </ul>

              <h2>Hosting</h2>
              <p>
                Vercel hosts this site. Like any web host, it processes your IP address and browser
                details to deliver the page and protect the service. See{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                  Vercel&apos;s privacy policy
                </a>.
              </p>

              <h2>Links to other services</h2>
              <p>
                The email link opens your own mail app. Book a call goes to Cal.com, and the other
                links go to GitHub, LinkedIn, X, Credly and the sites of the organisations I work
                with. Once you follow one, that service&apos;s privacy policy applies.
              </p>

              <h2>Selling and sharing</h2>
              <p>I do not sell personal information, and I do not share it for advertising.</p>

              <h2>Your choices</h2>
              <p>
                The analytics are optional. Any content blocker stops them, and the site works the
                same without them. Because the statistics are aggregated and reset daily, I usually
                cannot find records about one particular visitor. You can still ask: email{" "}
                <a href={`mailto:${person.email}`}>{person.email}</a> about the data, or to request
                access, correction or deletion, and I will reply within 30 days.
              </p>

              <h2>Children</h2>
              <p>
                This site is not directed at children under 13, and I do not knowingly collect their
                information.
              </p>

              <h2>Changes</h2>
              <p>If this page changes, the date at the top changes with it.</p>

              <h2>Contact</h2>
              <p>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
