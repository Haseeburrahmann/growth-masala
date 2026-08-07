import { Fragment } from "react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, areasServed, business, trackRecord } from "@/data/business";
import { portfolioItems } from "@/data/portfolio";

/**
 * Portfolio hero.
 *
 * The page's central problem was a number. The `<title>` promised "50+ Websites
 * & Digital Projects" while the hero rendered `portfolioItems.length + "+"` —
 * "8+" — directly beneath it. Both came from the same track record; nothing
 * connected them, so the page read as an inflated claim caught out by its own
 * content.
 *
 * The fix is to state the relationship instead of hiding it. Fifty is the work
 * delivered; eight is what we can show, because a portfolio entry needs a named
 * client and a URL that still resolves. Saying that out loud is more convincing
 * than either number alone — it explains the gap before the reader finds it.
 *
 * The H1 avoids "website development in Mahabubnagar". That exact phrase belongs
 * to /website-development-mahabubnagar, which carries the Service schema and the
 * internal links built to support it; a second page chasing it splits the signal
 * (docs/seo-architecture.md §Rule 2). "built from Mahabubnagar" takes the
 * locality without taking the phrase — and is the literal truth, since the
 * clients span two states.
 *
 * White H1 with an amber underline, per /services and /contact. `.text-gradient`
 * was here and measures 3.64:1 on navy.
 */
export default function PortfolioHero() {
  const stats = [
    {
      value: `${trackRecord.projectsDelivered}+`,
      label: `Projects delivered since ${business.foundingYear}`,
    },
    {
      value: `${portfolioItems.length}`,
      label: "Live below — open any of them",
    },
    {
      value: `${areasServed.length}`,
      label: "Districts and cities served",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-secondary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute top-24 right-[6%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Portfolio
            </span>
          </div>

          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Websites and web apps</span>
            <span className="relative inline-block">
              built from {address.locality}
              <span
                aria-hidden="true"
                className="animate-underline-sweep absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent sm:-bottom-1.5 sm:h-1"
                style={{ animationDelay: "600ms" }}
              />
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            We have shipped {trackRecord.projectsDelivered}+ projects since{" "}
            {business.foundingYear}. The {portfolioItems.length} below are the
            ones whose owners are happy to be named — schools, retailers, a
            construction firm, a lender, and two web apps of our own. Every one
            is live right now.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Open them on your phone before you talk to us. That is the point of
            showing the URL rather than a mockup: you can check the load speed,
            the layout on a small screen, and whether the WhatsApp button
            actually works — without taking our word for any of it.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={140} animation="fade-in">
          {/* dt is visually hidden and dd carries the repeated label, so the
              number reads first for sighted users while screen readers still
              get term-then-definition. */}
          <dl className="mt-12 flex flex-wrap items-start gap-x-8 gap-y-6">
            {stats.map((stat, idx) => (
              <Fragment key={stat.label}>
                {idx > 0 && (
                  <div
                    aria-hidden="true"
                    className="hidden h-12 w-px self-center bg-white/10 sm:block"
                  />
                )}
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-heading text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 block max-w-52 text-xs uppercase tracking-wider text-slate-500"
                    >
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </AnimatedContainer>
      </div>
    </section>
  );
}
