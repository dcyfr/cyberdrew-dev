import Image from "next/image";
import { field } from "@/lib/site";
import { AgentField } from "./AgentField";
import { FieldMorph } from "./FieldMorph";
import plate from "@/public/img/field.webp";

/**
 * The one picture on the page, sitting between the claim and the evidence.
 *
 * It earns its place by being the argument rather than decoration: a swarm
 * acting on its own, inside a boundary it cannot leave. That is the headline
 * two sections up, drawn instead of written.
 *
 * Two layers. The render is the plate and is always present, so the section
 * is complete with no JavaScript, on a slow connection, and under
 * prefers-reduced-motion. The canvas over it animates the same motif and
 * reacts to the cursor, and simply never starts when it should not.
 */
export function Field() {
  return (
    <section className="bay field" aria-labelledby="field-cap">
      <div className="wide">
        <figure className="plate" data-reveal>
          <Image
            className="plate-img"
            src={plate}
            alt={field.alt}
            sizes="(min-width: 64rem) 62rem, 100vw"
            placeholder="blur"
          />
          {/* Warps the render so the mass at the centre actually changes
              shape. Sits over the <img> and only becomes visible once it has
              the texture uploaded, so the still plate is what shows on no
              WebGL, no motion, or a lost context. `plate.src` rather than the
              optimised URL: this is a texture upload, not a layout image. */}
          <FieldMorph src={plate.src} />
          <AgentField />
          <figcaption className="plate-cap" id="field-cap">
            {field.caption}
            {/* Middot, not a comma: the hint is an imperative after a
                declarative, and a comma there is a splice. */}
            <span className="plate-hint"> · {field.hint}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
