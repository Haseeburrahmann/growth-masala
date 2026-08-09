import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { addressLine, business, openingHoursLine } from "@/data/business";

/**
 * Closing CTA — one ask on the left, the ways to reach a human on the right.
 *
 * This replaced a white section built from two overlapping discs (a desaturated
 * OpenStreetMap capture of the town and a navy circle holding the headline),
 * with a cut-out photograph of an owner standing across the seam and an amber
 * contact slab beneath. It was the most elaborate composition on the site and
 * it cost three images — two of them, the map and the cut-out, carrying no
 * information a visitor at the foot of a 10-section page still needs. The map
 * survives on /contact, where "where are you" is the actual question.
 *
 * The OpenStreetMap credit line went with the map. It was a licence obligation
 * attached to that image; there is no OSM data on this page any more. If a map
 * ever comes back here, the credit comes back with it in the same commit.
 *
 * The page ends dark. It opens dark too, so the scroll closes where it started,
 * and a navy foot runs straight into the navy footer without a seam to explain.
 *
 * Every value in the contact card is read from `src/data/business.ts` — the NAP
 * single source of truth. Typing the phone number here is how a site ends up
 * with two of them.
 */
const contactRows = [
  {
    label: "Phone",
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
    icon: Phone,
  },
  {
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    icon: Mail,
  },
  // Not a link. `address.streetAddress` is a road-level placeholder set on the
  // owner's instruction, so it must not become a "get directions" affordance
  // that sends someone to a building nobody has verified.
  { label: "Studio", value: addressLine, href: undefined, icon: MapPin },
  { label: "Hours", value: openingHoursLine, href: undefined, icon: Clock },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      {/* Grid texture and two blooms. All decorative and pointer-transparent —
          the grid is a pair of repeating gradients rather than the ~26 hairline
          divs the canvas exports it as. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 right-0 hidden h-155 w-175 rounded-full bg-primary/25 blur-[120px] md:block" />
      <div className="pointer-events-none absolute -left-50 bottom-0 hidden h-130 w-160 rounded-full bg-accent/12 blur-[120px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32.5rem)] lg:gap-16">
          <AnimatedContainer>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 bg-accent/50 sm:w-8" />
              <span className="text-xs font-semibold uppercase tracking-[0.17em] text-accent sm:tracking-[0.2em]">
                Start here
              </span>
            </div>

            {/* One <h2>, two visual lines. The page's only <h1> is in the hero. */}
            <h2 className="mt-4 font-heading text-[34px] font-bold leading-[1.15] tracking-tight text-white text-balance sm:text-4xl lg:text-[2.875rem] lg:leading-[1.13]">
              <span className="block">Tell us what you need.</span>{" "}
              <span className="block text-slate-400">Get a fixed quote back.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-[17px] sm:leading-7">
              A scope and a number back — not a discovery call. Usually the same
              day.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary pl-7 pr-1.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
              >
                Get a fixed quote
                <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="cta-arrow h-3.5 w-3.5" />
                </span>
              </Link>

              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/5 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Message on WhatsApp
                <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
              </a>
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-in" delay={140}>
            <div className="rounded-2xl border border-white/14 bg-navy-light/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm sm:rounded-3xl sm:p-8">
              <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
                Reach us directly
              </h3>

              <dl className="mt-4 divide-y divide-white/8">
                {contactRows.map(({ label, value, href, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3.5 py-3.5">
                    <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5 text-secondary" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium leading-snug text-white sm:text-[15px]">
                        {href ? (
                          <a href={href} className="link-sweep wrap-break-word">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
