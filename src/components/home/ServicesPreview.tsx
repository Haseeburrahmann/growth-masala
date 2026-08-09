"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";
import { homepageServiceGroups, servicesInGroup } from "@/data/services";

/**
 * The three headline service groups as photo-led cards.
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
 * article is `h-full`, and the sub-service list takes `flex-1` so the Explore
 * link lands on one baseline across the whole row. The canvas pins the card at
 * 470px; a fixed height cannot survive a wrapped title at 1024px, so the height
 * is matched rather than measured.
 *
 * The numeral moved inline beside the title and the icon plate went with it.
 * A plate top-right plus an oversized numeral bottom-left gave one card two
 * competing anchors, and neither said anything the heading did not.
 *
 * Group artwork is decorative, so every image carries an empty alt. The heading
 * and sub-service list already say everything the picture is gesturing at.
 */

/**
 * Link copy per group.
 *
 * Not derivable from `group.title` — "Websites & E-Commerce" does not fold into
 * "websites & stores" by any rule — and too small a string to earn a field in
 * `services.ts`, which is read by the chatbot and the schema builders. Keyed by
 * `id` with a title-based fallback, so adding a group degrades to a sentence
 * that is merely long rather than to nothing.
 */
const exploreLabels: Record<string, string> = {
  web: "Explore websites & stores",
  marketing: "Explore marketing",
  ai: "Explore AI & automation",
};

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          eyebrow="What we do"
          lead="Three ways we get your"
          trail="phone ringing"
          standfirst="Most clients start with a website and add the rest once it earns its keep. Never the whole list on day one."
        />

        {/* Three across from `lg`. Between 640 and 1023 the row runs two-up and
            leaves the third card alone on the second line: at those widths a
            single full-bleed card is nearly 700px, far wider than this card
            wants to be, and an odd card on its own line costs less than that.

            Stretch alignment is deliberate — it is what makes every card in the
            row exactly as tall as its neighbours. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {homepageServiceGroups.map((group, idx) => {
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
                <article className="svc-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-300 hover:border-primary/30">
                  {/* Photo band. Full card width, no radius of its own, no
                      border — `overflow-hidden` on the article is what clips it
                      into the top corners. The navy underneath covers the frame
                      while the WebP decodes. */}
                  <div className="svc-band relative h-40 w-full shrink-0 overflow-hidden bg-navy sm:h-49">
                    <Image
                      src={group.image}
                      alt={group.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    {/* The numeral is structure, not content — "01" read aloud
                        tells nobody anything, so it stays out of the heading. */}
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 font-heading text-sm font-bold tabular-nums tracking-wide text-slate-400"
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight text-text-primary sm:text-[22px]">
                        {group.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                      {group.outcome}
                    </p>

                    <div className="mt-3 h-px w-full bg-border" />

                    {/* Lists run 3, 3 and 2 items. `flex-1` absorbs the
                        difference so the Explore link sits on one baseline
                        across the row. */}
                    <ul className="mt-3 flex flex-1 flex-col gap-2.5">
                      {listed.map((label) => (
                        <li
                          key={label}
                          className="flex items-start gap-2.5 text-sm font-medium leading-5 text-text-primary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {label}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/services"
                      className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
                    >
                      <span className="link-sweep">
                        {exploreLabels[group.id] ?? `Explore ${group.title}`}
                      </span>
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
