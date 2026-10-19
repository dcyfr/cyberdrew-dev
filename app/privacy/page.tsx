import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { person } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy · cyberdrew.dev",
  description: "What cyberdrew.dev collects when you visit, and how to ask about it.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "October 18, 2026";

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

              <h2>Wherever you live</h2>
              <p>
                The rights on this page are not limited to one country. I honour them for anyone who
                asks, and I will not treat you differently for asking. If a privacy law where you live
                gives you a right this page does not name, ask for it and I will honour that too. That
                includes Canada&apos;s PIPEDA, Brazil&apos;s LGPD, Switzerland&apos;s FADP,
                Australia&apos;s Privacy Act and similar laws elsewhere.
              </p>

              <h2>Where the data is processed, and for how long</h2>
              <p>
                Vercel may process the data above in the United States and in other countries where
                it runs servers. For visitors from the EU, the UK and Switzerland, those transfers
                rely on the safeguards in Vercel&apos;s data processing terms, such as the European
                Commission&apos;s Standard Contractual Clauses. The visit statistics are kept only
                in aggregate, for the period Vercel&apos;s analytics plan retains them, and then
                deleted. I keep no copy of my own.
              </p>

              <h2>If you are in the EU, the UK or Switzerland</h2>
              <p>
                I am the controller of the data described above. I rely on my legitimate interest in
                knowing how many people visit and keeping the site fast (GDPR and UK GDPR Article
                6(1)(f)). You can ask for access, correction, deletion, restriction or a portable
                copy, or object to the processing, by email as above. You can also complain to your
                local data protection authority. In the UK that is the Information
                Commissioner&apos;s Office, and in Switzerland the Federal Data Protection and
                Information Commissioner.
              </p>

              <h2>If you live in the United States</h2>
              <p>
                A growing number of states give their residents rights over personal information,
                among them California (CCPA, as amended by the CPRA), Colorado, Connecticut, Maryland
                (MODPA), Oregon, Texas and Virginia. A personal site like this one is likely below the
                thresholds that make those laws apply, but I honour the same rights for anyone who
                asks: to know what I hold and get a copy, to correct it, and to delete it. There is
                nothing to opt out of, because I do not sell personal information, share it for
                targeted advertising or use it for profiling. A Global Privacy Control signal from
                your browser is respected all the same. If I decline a request, reply to appeal it
                and I will answer within 60 days.
              </p>

              <h2>Children</h2>
              <p>
                This site is not directed at children under 16, and I do not knowingly collect their
                information. If you believe a child has sent me personal information, email me and I
                will delete it.
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
