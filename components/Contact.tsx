import type { CSSProperties } from "react";
import { contact } from "@/lib/site";

/**
 * The conversion block. It used to invert — accent ground, swapped ink — which
 * made it the loudest thing on the page and read as a different material from
 * the cards above it. It now wears the same glass panel as the header and a
 * settled row, and leans on scale, the shadow lift, and the solid button for
 * emphasis instead of a full material swap.
 *
 * The three engagement shapes were one sentence of prose. Naming them as rows
 * lets a visitor recognise their own situation before they decide whether to
 * book anything, and gives the "what do I actually get" line somewhere to
 * live — which the sentence had no room for.
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

        <ul className="engagements">
          {contact.engagements.map((e, i) => (
            <li className="engagement" key={e.num} style={{ "--i": i } as CSSProperties}>
              <span className="num">{e.num}</span>
              <div>
                <h3 className="engagement-name">{e.name}</h3>
                <p className="engagement-desc">{e.desc}</p>
                <p className="engagement-out">{e.outcome}</p>
              </div>
            </li>
          ))}
        </ul>

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
