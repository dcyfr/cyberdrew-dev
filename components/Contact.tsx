import { contact } from "@/lib/site";

/**
 * The conversion block. It used to invert — accent ground, swapped ink — which
 * made it the loudest thing on the page and read as a different material from
 * the cards above it. It now wears the same glass panel as the header and a
 * settled row, and leans on scale, the shadow lift, and the solid button for
 * emphasis instead of a full material swap.
 */
export function Contact() {
  return (
    <section className="bay" id="contact">
      <div className="wide">
        <div className="contact" data-reveal>
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
      </div>
    </section>
  );
}
