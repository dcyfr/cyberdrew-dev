import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { nav } from "@/lib/site";

export const metadata = { title: "Not found · cyberdrew.dev" };

/**
 * Without this, a mistyped URL gets the stock Next 404: white ground,
 * unrelated type, no relationship to the site. Reuses the real chrome so a
 * dead end still looks like the same system, and states the status as a
 * named machine value rather than a cartoon.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="wide">
            <p className="eyebrow">
              <span className="idx">404</span>
              No route
            </p>
            <h1>
              <span>Nothing here</span>
              <span>Try one of these</span>
            </h1>
            <p className="hero-deck">
              That address does not resolve. The rest of the site is intact.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-solid" href="/">
                Back to start
              </Link>
              {nav.map((n) => (
                <Link className="btn btn-ghost" key={n.href} href={`/${n.href}`}>
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
