"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { serviceGroups, serviceIconMap, servicesInGroup } from "@/data/services";

/**
 * The four service groups.
 *
 * Sub-services render as plain text rather than nested cards — nesting cards
 * inside cards is what makes a four-group layout unscannable.
 *
 * Group artwork is decorative, so every image carries an empty alt. The heading
 * and sub-service list already say everything the picture is gesturing at.
 */
export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What we do
            </span>
          </div>
          {/* Two-tone heading: the emphasis lands on the first clause and the
              rest recedes. Both reference sites use this on every section
              title, and it reads as deliberate typography rather than a plain
              sentence. */}
          <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-text-primary text-balance sm:text-4xl lg:text-5xl">
            Four ways we get your{" "}
            <span className="text-text-secondary/45">business growing</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            Most clients start with a website and add the rest once it is earning
            its keep. You are never sold the whole list on day one.
          </p>
        </AnimatedContainer>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group, idx) => {
            const Icon = serviceIconMap[group.icon];
            const groupServices = servicesInGroup(group);

            // A group holding a single service (Custom Software) would render one
            // lonely bullet beside cards showing three, leaving an obvious hole in
            // the 2x2 grid. Where that service defines sub-items, list those
            // instead — same real content, balanced card.
            const listed =
              groupServices.length === 1 && groupServices[0].subItems?.length
                ? groupServices[0].subItems.map((sub) => sub.title)
                : groupServices.map((service) => service.title);

            return (
              <AnimatedContainer
                key={group.id}
                delay={idx * 110}
                /* Staggered baselines. The right-hand column drops by 14 so no
                   two cards share a horizontal line — the cascade is what stops
                   a 2x2 grid reading as a spreadsheet. Grid-only, so the mobile
                   stack is unaffected. */
                className={idx % 2 === 1 ? "md:mt-14" : ""}
              >
                <article
                  className={`hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${
                    group.featured
                      ? "border-primary/40 shadow-[0_0_0_1px_rgba(37,99,235,0.12)]"
                      : "border-border"
                  }`}
                >
                  {/* Artwork */}
                  <div className="hover-zoom relative aspect-[3/2] w-full overflow-hidden bg-navy">
                    <Image
                      src={group.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Grounds the artwork into the card so the seam is not a hard line */}
                    <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/10 to-transparent" />

                    <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm">
                        {Icon && <Icon className="h-4.5 w-4.5 text-white" />}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                        {group.title}
                      </h3>
                    </div>

                    {group.featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
                        Start here
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="relative flex flex-1 flex-col p-6">
                    {/* Oversized numeral — structure, not decoration. Kept
                        aria-hidden because "01" read aloud tells nobody
                        anything. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-4 font-heading text-5xl font-bold leading-none tabular-nums text-primary/8 transition-colors duration-300 group-hover:text-primary/15"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <p className="font-heading text-[15px] font-semibold text-primary">
                      {group.outcome}
                    </p>

                    <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-border pt-5">
                      {listed.map((label) => (
                        <li
                          key={label}
                          className="flex items-start gap-2.5 text-[15px] text-text-secondary"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                          {label}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/services"
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary"
                    >
                      <span className="link-sweep">Explore {group.title}</span>
                      <ArrowUpRight className="cta-arrow h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </AnimatedContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
