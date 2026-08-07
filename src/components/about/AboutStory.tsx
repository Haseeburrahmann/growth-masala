import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, areasServed, business, trackRecord } from "@/data/business";

/**
 * Origin story, plus the numbers.
 *
 * ── On the stat block ─────────────────────────────────────────────────────
 *
 * It used to read: 50+ Projects Delivered · 30+ Happy Clients · 3x Average
 * Growth Rate · 95% Client Retention.
 *
 * The first two are owner-confirmed and now come from `trackRecord` in
 * `business.ts`, which also feeds the /portfolio title — they were typed
 * separately before, which is how that page ended up promising "50+" in the
 * SERP and rendering "8+" in the hero.
 *
 * The other two are gone. "3x average growth rate" is a cross-client
 * performance claim over an unstated baseline and period; "95% client
 * retention" is a ratio nobody computed. Neither has a source, both are the
 * first thing a Clutch reviewer or a competitor would ask for evidence of, and
 * an agency that publishes unverifiable numbers on its About page has a weaker
 * position when it later asks a client to trust its reporting.
 *
 * The two replacements are derived rather than asserted: the founding year, and
 * `areasServed.length`. Smaller claims, and every one of them checkable.
 */
export default function AboutStory() {
  const stats = [
    {
      value: `${trackRecord.projectsDelivered}+`,
      label: "Projects delivered",
    },
    {
      value: `${trackRecord.clientsServed}+`,
      label: "Businesses worked with",
    },
    {
      value: `${business.foundingYear}`,
      label: "Building since",
    },
    {
      value: `${areasServed.length}`,
      label: "Districts and cities served",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <AnimatedContainer>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our Story
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              Good marketing should not require a Hyderabad postcode
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Growth Masala started with a frustration. Businesses across{" "}
                {address.locality} district were being quoted city rates for
                template websites, handed reports full of impressions and
                follower counts, and left without anything that brought a
                customer through the door.
              </p>
              <p>
                The agencies doing it were rarely local. They had never seen the
                shop, did not know which weeks are busy here, and had no reason
                to care whether the site still worked six months later. Distance
                made it easy to sell activity instead of outcomes.
              </p>
              <p>
                So we built the opposite. We work from {address.locality}, we
                publish{" "}
                <Link
                  href="/services#pricing"
                  className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  every price
                </Link>{" "}
                rather than quoting by how the client sounds on the phone, and
                every project we have delivered is{" "}
                <Link
                  href="/portfolio"
                  className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  a live URL you can open
                </Link>{" "}
                rather than a screenshot in a deck.
              </p>
              <p>
                The name is the approach. Masala is a blend — strategy,
                design, code and paid media are separate trades, and the result
                only works when the same people are handling all of them with the
                same business in mind.
              </p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={120}>
            <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-text-secondary">
                Where we are so far
              </p>

              <dl className="mt-8 space-y-7">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline gap-4 border-b border-border pb-7 last:border-0 last:pb-0"
                  >
                    {/* Source order is dt-then-dd, which the spec requires;
                        `order` flips them so the figure still reads first. */}
                    <dt className="order-2 text-sm leading-snug text-text-secondary">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-heading text-4xl font-bold text-primary tabular-nums">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* The honesty note is load-bearing, not decoration — it is what
                  separates these four from the "3x growth rate" they replaced. */}
              <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-text-secondary">
                Counts of work done, not performance claims. We do not publish an
                average growth figure or a retention rate, because we have not
                measured either one properly — and a number nobody can check is
                not worth the space.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
