import { contact } from "@/lib/site";

/**
 * The one inverted block on the page. With no accent hue available, a full
 * material swap is the strongest emphasis the system has — so it is spent
 * exactly once, on the conversion.
 */
export function Contact() {
  return (
    <section className="contact" id="contact" data-reveal>
      <div className="wide">
        <p className="eyebrow">
          <span className="idx">{contact.index}</span>
          {contact.eyebrow}
        </p>
        <h2 data-glow>{contact.headline}</h2>
        <p>{contact.deck}</p>

        <div className="contact-actions">
          <a
            className="btn btn-solid"
            href={contact.primary.href}
            target="_blank"
            rel="noreferrer"
          >
            {contact.primary.label}
          </a>
          <a className="btn btn-ghost" href={contact.secondary.href}>
            {contact.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
