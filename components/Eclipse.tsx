import { eclipse } from "@/lib/site";
import { EclipseField } from "./EclipseField";

/**
 * The one picture on the page — now the hero's light source rather than a
 * section of its own.
 *
 * IT USED TO BE A BAND BETWEEN THE CLAIM AND THE EVIDENCE, and as a band it
 * was mostly empty: a 2.4:1 letterbox holding one centred disc, costing a whole
 * screen of scroll to say something the hero was already saying in words. Folded
 * into the hero it stops being a picture ABOUT the statement and becomes the
 * thing the statement is lit by — which is also what the rest of the page has
 * claimed all along, since the corona in the page ground is this same event seen
 * from further away.
 *
 * RENDERED LAST, PAINTED FIRST. It sits after the statement in the DOM so a
 * screen reader reaches the claim before the picture of it, and behind the
 * statement on screen via z-index inside the hero's own stacking context. Source
 * order is for the reader; z-index is for the eye.
 *
 * Everything that carries the idea is still CSS on empty divs — occluder, limb,
 * atmosphere, spill, grain — so the hero is complete with scripting off, on a
 * cold connection, and under prefers-reduced-motion. <EclipseField> adds the
 * streamers on top of that and removes nothing if it never runs.
 *
 * role="img" plus a name is what turns a box of gradients into something
 * announceable; the caption in the hero carries why it is here rather than what
 * is in it.
 */
export function Eclipse() {
  return (
    <div className="hero-eclipse" data-eclipse role="img" aria-label={eclipse.alt}>
      {/* Order matters, and it is back to front: the halo is the light spilling
          around the disc, the streamers stand in that spill, and the occluder
          covers both — it is the thing in front. */}
      <div className="eclipse-halo" aria-hidden="true" />
      <EclipseField />
      <div className="eclipse-disc" data-limb aria-hidden="true" />
    </div>
  );
}
