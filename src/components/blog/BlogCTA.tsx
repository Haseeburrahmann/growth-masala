import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { addressLine, business, openingHoursLine } from "@/data/business";

/**
 * Closing CTA for the two blog routes.
 *
 * Same shape as the one that closes /services and /contact — navy room, one ask
 * on the left, the NAP block on the right — because the canvas draws it that way
 * on every page and a reader who has just finished a price guide should land on
 * the same door they would have found anywhere else.
 *
 * The headline differs between the listing and a post, so the copy is props
 * rather than a constant. Everything in the contact card is read from
 * `src/data/business.ts`, so it can never drift from the `LocalBusiness` JSON-LD
 * or from an external listing.
 *
 * This duplicates `ServicesCTA`'s contact card rather than importing it: that
 * component is not shared, is owned elsewhere in this refactor, and exports only
 * its section. Worth extracting into `components/ui/` in a later pass.
 */

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  Icon: typeof Phone;
}

const contactRows: ContactRow[] = [
  {
    label: "Phone",
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
    Icon: Phone,
  },
  {
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    Icon: Mail,
  },
  { label: "Studio", value: addressLine, Icon: MapPin },
  { label: "Hours", value: openingHoursLine, Icon: Clock },
];

function ContactCard() {
  return (
    <div className="rounded-3xl border border-white/15 bg-navy-light/90 p-6 shadow-2xl shadow-black/40 sm:p-8">
      <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
        Reach us directly
      </h3>

      <ul className="mt-4 divide-y divide-white/10">
        {contactRows.map(({ label, value, href, Icon }) => {
          const body = (
            <>
              <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                <Icon aria-hidden="true" className="h-4 w-4 text-sky" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {label}
                </span>
                <span className="text-sm font-medium text-white sm:text-[15px]">
                  {value}
                </span>
              </span>
            </>
          );

          return (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  className="flex min-h-11 items-center gap-3.5 py-3.5 transition-opacity hover:opacity-80"
                >
                  {body}
                </a>
              ) : (
                <div className="flex min-h-11 items-center gap-3.5 py-3.5">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface BlogCTAProps {
  eyebrow: string;
  /** Rendered white. */
  titleTop: string;
  /** Rendered muted, the second visual line of a single <h2>. */
  titleBottom: string;
  body: string;
}

export default function BlogCTA({
  eyebrow,
  titleTop,
  titleBottom,
  body,
}: BlogCTAProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[8%] h-80 w-80 rounded-full bg-primary/20 blur-[110px]" />
        <div className="hidden md:block absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-[-0.02em] text-white text-balance sm:text-4xl lg:text-[2.875rem]">
            <span className="block">{titleTop}</span>{" "}
            <span className="block text-slate-400">{titleBottom}</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
            {body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark sm:w-auto"
            >
              Get a fixed quote
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
              </span>
            </Link>

            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-[15px] font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              Message on WhatsApp
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
            </a>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={120}>
          <ContactCard />
        </AnimatedContainer>
      </div>
    </section>
  );
}
