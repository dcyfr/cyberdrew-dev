import { eclipse } from "@/lib/site";
import { EclipseField } from "./EclipseField";

/**
 * The one picture on the page, sitting between the claim and the evidence.
 *
 * It replaced a bitmap under a WebGL warp with a particle canvas over it. That
 * stack existed to animate a swarm inside a boundary; this says the same thing
 * with a disc and a rim of light, and says it with no asset. Everything that
 * carries the idea — the occluder, the limb, the atmosphere, the spill, the
 * grain — is still gradients on empty divs, so the section is complete with
 * scripting off, on a cold connection, and under prefers-reduced-motion.
 *
 * <EclipseField> is the one thing added back, and it is strictly additive: a
 * fragment shader drawing the streamers, which are the part of a corona a
 * box-shadow genuinely cannot do. It paints nothing until it has a frame, so
 * every way it can fail leaves exactly the picture described above. See the
 * note in that file for why it is raw WebGL2 and not a library.
 *
 * Everything visible is painted rather than marked up, so there is nothing here
 * for a screen reader to reach. The <figure> carries the description and the
 * caption instead: role="img" plus an accessible name is what turns a box of
 * gradients into something announceable, and without it the section would be a
 * labelled region containing one line of text and nothing else.
 */
export function Eclipse() {
  return (
    <section className="bay eclipse-sec" aria-labelledby="eclipse-cap">
      <div className="wide">
        <figure className="eclipse" data-reveal>
          <div className="eclipse-art" role="img" aria-label={eclipse.alt}>
            {/* Order matters, and it is back to front: the halo is the light
                spilling around the disc, the streamers stand on top of that
                spill, and the occluder covers both — it is the thing in front. */}
            <div className="eclipse-halo" aria-hidden="true" />
            <EclipseField />
            <div className="eclipse-disc" data-limb aria-hidden="true" />
          </div>
          <figcaption className="eclipse-cap" id="eclipse-cap">
            {eclipse.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
