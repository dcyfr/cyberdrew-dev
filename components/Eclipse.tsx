import { eclipse } from "@/lib/site";

/**
 * The one picture on the page, sitting between the claim and the evidence.
 *
 * It replaced a bitmap under a WebGL warp with a particle canvas over it. That
 * stack existed to animate a swarm inside a boundary; this says the same thing
 * with a disc and a rim of light, and says it with no asset, no canvas, no
 * shader and no JavaScript. It is identical with scripting off, on a cold
 * connection, and under prefers-reduced-motion.
 *
 * Everything visible is painted by CSS on empty divs, so there is nothing here
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
            {/* Order matters: the halo is the light spilling around the disc,
                so it has to be painted under it. */}
            <div className="eclipse-halo" aria-hidden="true" />
            <div className="eclipse-disc" aria-hidden="true" />
          </div>
          <figcaption className="eclipse-cap" id="eclipse-cap">
            {eclipse.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
