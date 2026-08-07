import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, areasServed, openingHoursLine } from "@/data/business";

/**
 * Where we are, and why it matters.
 *
 * The old /about had no location in it at all — not the district, not the
 * region, not one of the towns we serve — on a site whose entire ranking
 * strategy is local intent, and under a title that said "Digital Agency in
 * Mahabubnagar". This section is where that gets repaired, in body copy a
 * reader has a reason to read rather than as a keyword sprinkle.
 *
 * The `areasServed` chips come from `business.ts`, which also feeds the
 * `areaServed` property on the LocalBusiness JSON-LD. Same list, one source —
 * so the towns Google is told we cover and the towns the page claims can never
 * diverge.
 *
 * The chips deliberately do not link to the matching location landing pages.
 * Seven identical footer-style links from an About page is the pattern Google
 * reads as a link farm; the pages are already cross-linked from each other and
 * from the footer, which is where that internal linking belongs.
 */
export default function AboutLocal() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedContainer>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Where we work
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              Based in {address.locality}, working across {address.region}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Most of the agencies bidding for work in {address.locality}{" "}
                district are run from Hyderabad or further, and it shows in what
                they produce. They price for a city market, they build for a
                city audience, and a site visit is something that has to be
                scheduled a fortnight out.
              </p>
              <p>
                We are here. That means we can walk into the shop, we know which
                months are busy in this district and which are dead, and we know
                that a customer in Wanaparthy is going to open your site on a
                mid-range Android over a patchy connection — which decides how
                heavy the build can be long before anyone chooses a colour.
              </p>
              <p>
                We work with clients outside the district too — the{" "}
                <Link
                  href="/case-studies"
                  className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Bengaluru school and the Hyderabad repair chain
                </Link>{" "}
                are both live — but {address.locality} is home, and it is where
                we are easiest to hold accountable.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-text-secondary">
                Districts and cities we serve
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areasServed.map((area) => (
                  <li
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text-secondary"
                  >
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-text-secondary">
                {openingHoursLine} ·{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Come and find us
                </Link>
              </p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={120} animation="fade-in">
            <div className="overflow-hidden rounded-3xl border border-border">
              {/* Empty alt on purpose. This is generic workspace imagery, not
                  a photograph of the Growth Masala team — describing it as one
                  on the About page would be the same class of small untruth
                  this rewrite exists to remove. Decorative, so it is hidden
                  from assistive tech rather than narrated misleadingly. */}
              <Image
                src="/images/sections/team-work.webp"
                alt=""
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
