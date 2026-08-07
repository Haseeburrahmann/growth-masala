"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  homepageServiceGroups,
  serviceIconMap,
  servicesInGroup,
} from "@/data/services";

/**
 * The three headline service groups as fixed-height, photo-led cards.
 *
 * Three across, not four. Custom Software sits this section out
 * (`homepageHidden` in `services.ts`) because a quarter-width column could not
 * carry a photograph and a list at once; three columns give each card roughly
 * 390px instead of 286px, which is what the artwork needs to read as a picture
 * rather than a strip. The group is still sold in full on /services.
 *
 * Three mechanics worth knowing before editing this.
 *
 * The artwork is permanent, not revealed. It used to open on hover by animating
 * `grid-template-rows`, which grew the card it was inside — one card in the row
 * would suddenly stand taller than its neighbours, and on touch (this audience's
 * primary device) the picture had to be force-opened by a media query anyway.
 * A fixed band shows the same photograph to everyone and the row never reflows.
 * Hover now pays out in colour and scale instead, which costs no layout.
 *
 * The band bleeds to the card's own edges and inherits its top corners. It has
 * no border and no inset of its own: a rounded, bordered thumbnail floating
 * inside a rounded, bordered card is two frames around one picture, and it reads
 * as stock artwork dropped into a template no matter how good the shot is.
 *
 * Cards are equal height by construction — the grid stretches every item, the
 * article is `h-full`, and the sub-service list takes `flex-1` so the numeral
 * and the Explore link land on one baseline across the whole row.
 *
 * Group artwork is decorative, so every image carries an empty alt. The heading
 * and sub-service list already say everything the picture is gesturing at.
 */
export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading left, standfirst right. Stacked, the standfirst left a wide
            empty quadrant beside a max-w-3xl heading; splitting them fills the
            row and gives the block a horizontal axis to sit on. */}
        <AnimatedContainer>
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/30" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  What we do
                </span>
              </div>
              {/* Two-tone heading: the emphasis lands on the first clause and
                  the rest recedes. Both reference sites use this on every
                  section title, and it reads as deliberate typography rather
                  than a plain sentence. */}
              <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-text-primary text-balance sm:text-4xl lg:text-5xl">
                Three ways we get your{" "}
                <span className="text-text-secondary/45">business growing</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Most clients start with a website and add the rest once it is
              earning its keep. You are never sold the whole list on day one.
            </p>
          </div>
        </AnimatedContainer>

        {/* Three across from `lg`. Between 640 and 1023 the row runs two-up and
            leaves the third card alone on the second line: at those widths a
            single full-bleed card is nearly 700px, far wider than this card
            wants to be, and an odd card on its own line costs less than that.

            Stretch alignment is deliberate — it is what makes every card in the
            row exactly as tall as its neighbours. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {homepageServiceGroups.map((group, idx) => {
            const Icon = serviceIconMap[group.icon];
            const groupServices = servicesInGroup(group);

            // A group holding a single service would render one lonely bullet
            // beside cards showing three, leaving an obvious hole in the row.
            // Where that service defines sub-items, list those instead — same
            // real content, balanced card.
            const listed =
              groupServices.length === 1 && groupServices[0].subItems?.length
                ? groupServices[0].subItems.map((sub) => sub.title)
                : groupServices.map((service) => service.title);

            return (
              <AnimatedContainer key={group.id} delay={idx * 100} className="h-full">
                <article
                  className={`svc-card group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    group.featured
                      ? "border-primary/40 shadow-[0_0_0_1px_rgba(37,99,235,0.10)]"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Photo band. Full card width, no radius of its own, no
                      border — `overflow-hidden` on the article is what clips it
                      into the top corners. The navy underneath covers the frame
                      while the WebP decodes. */}
                  <div className="svc-band relative h-44 w-full shrink-0 overflow-hidden bg-navy sm:h-52 lg:h-48">
                    <Image
                      src={group.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                    />
                    {/* Weights the foot of the photo so the heading below it
                        starts against a settled edge rather than whatever the
                        crop happened to land on. */}
                    <div className="absolute inset-0 bg-linear-to-t from-navy/55 via-navy/5 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {/* The reserve holds two lines so a wrapped title does not
                        push its outcome line out of step with the card beside
                        it. It applies only where cards actually sit beside each
                        other: one per row there is nothing to align to, and
                        from `xl` the column is wide enough that all three
                        titles set on one line. Outside that band the reserve
                        would only show as a gap under the heading. */}
                    <div className="flex items-start justify-between gap-3 sm:min-h-14 xl:min-h-0">
                      <h3 className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-text-primary">
                        {group.title}
                      </h3>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                          group.featured
                            ? "bg-accent text-navy"
                            : "bg-navy text-white group-hover:bg-accent group-hover:text-navy"
                        }`}
                      >
                        {Icon && <Icon className="h-4.5 w-4.5" />}
                      </span>
                    </div>

                    <p className="mt-2.5 min-h-10 font-heading text-sm font-semibold text-primary">
                      {group.outcome}
                    </p>

                    {/* Lists run 3, 3, 3 and 2 items. `flex-1` absorbs the
                        difference so the numeral and the Explore link sit on one
                        baseline across the row. */}
                    <ul className="mt-4 flex flex-1 flex-col gap-2">
                      {listed.map((label) => (
                        <li
                          key={label}
                          className="flex items-start gap-2.5 text-[15px] text-text-secondary"
                        >
                          {/* Square marks, matching the reference. A round dot at
                              this size is indistinguishable from a bullet glyph. */}
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                          {label}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                      {/* Oversized numeral — structure, not decoration. Kept
                          aria-hidden because "01" read aloud tells nobody
                          anything. */}
                      <span
                        aria-hidden="true"
                        className="font-heading text-4xl font-bold leading-none tabular-nums text-accent"
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                        aria-label={`Explore ${group.title}`}
                      >
                        <span className="link-sweep">Explore</span>
                        <ArrowUpRight className="cta-arrow h-4 w-4" />
                      </Link>
                    </div>
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
