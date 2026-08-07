import Image from "next/image";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, areasServed } from "@/data/business";

/**
 * What happens after you send, and where we actually are.
 *
 * The three steps exist because a contact form is otherwise a black box: you
 * write into it and have no idea whether the next thing is a quote, a sales
 * call, or nothing. Saying so removes the main reason people close the tab
 * without sending.
 *
 * The map carries NO marker, and that is deliberate — see `CTASection`. The
 * street address in `business.ts` is a road-level placeholder, and a pin would
 * turn it into a specific claim about premises. Add the marker in the same
 * commit that lands the real address.
 *
 * It is a flat image rather than a live embed for the same reason it is on the
 * homepage: the OpenStreetMap iframe pulled 1.9MB of Leaflet and tiles and
 * swallowed vertical swipes on touch. OSM's licence wants visible credit, which
 * is the line under the image. Do not delete it.
 */

const steps = [
  {
    title: "You send it",
    body: "The form, WhatsApp, a call — whichever suits. Nothing is more official than the others.",
  },
  {
    title: "We ask questions",
    body: "Usually within 24 hours. We would rather understand the problem than guess at a package.",
  },
  {
    title: "You get a fixed quote",
    body: "A number and a scope, in writing, before any work starts. If we are the wrong fit, we say so.",
  },
];

export default function ContactLocal() {
  return (
    <section className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* What happens next */}
          <AnimatedContainer>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What happens next
              </span>
            </div>
            <h2 className="mt-5 font-heading text-3xl font-bold text-text-primary text-balance sm:text-4xl">
              No sales funnel, no discovery call you have to sit through
            </h2>

            <ol className="mt-10 space-y-8">
              {steps.map((step, idx) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </AnimatedContainer>

          {/* Where we are */}
          <AnimatedContainer delay={140}>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-white">
              <Image
                src="/images/sections/mahabubnagar-map.webp"
                alt={`Street map of ${address.locality}, ${address.region}`}
                fill
                loading="lazy"
                /* Desaturated so OSM's road colours sit inside the palette
                   rather than pulling the eye off the copy beside them. */
                className="object-cover filter-[saturate(0.35)_contrast(1.05)]"
                sizes="(max-width: 1023px) 90vw, 45vw"
              />
            </div>
            <p className="mt-3 text-[11px] text-text-secondary/60">
              Map data © OpenStreetMap contributors
            </p>

            <h3 className="mt-8 font-heading text-lg font-semibold text-text-primary">
              A local agency, genuinely
            </h3>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              We are based in {address.locality}, not running this from a metro
              office with a {address.region} landing page. That means we can meet
              you, and it means we already know the market you sell into. We work
              across:
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {areasServed.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-text-secondary"
                >
                  {area}
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
