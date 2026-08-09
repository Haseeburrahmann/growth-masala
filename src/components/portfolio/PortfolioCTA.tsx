import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  addressLine,
  business,
  openingHoursLine,
} from "@/data/business";

/**
 * Closing band for /portfolio — full-bleed navy, the ask on the left and the
 * four ways to reach us on the right.
 *
 * The previous version offered one route — "Start Your Project" → /contact —
 * which asks the highest-commitment action of someone who has just been
 * browsing. Someone who has spent two minutes opening client sites usually
 * wants a number, or wants to message a human, before they want a form. The
 * card gives both without a page load.
 *
 * Every value in it is imported. `addressLine` and `openingHoursLine` are
 * derived in `business.ts` from the same fields the JSON-LD reads, so the
 * visible NAP and the structured NAP cannot drift — which is the whole point of
 * that file. Retyping either here is the bug it exists to prevent.
 *
 * ⚠️ The street address is still a road-level placeholder (see `business.ts`).
 * It is rendered because a visitor asking "where are you" deserves an answer,
 * but it must be replaced before any directory listing is created.
 */

interface ContactRow {
  label: string;
  value: string;
  icon: LucideIcon;
  /** Omitted for rows that are facts rather than actions. */
  href?: string;
}

const contactRows: ContactRow[] = [
  {
    label: "Phone",
    value: business.phoneDisplay,
    icon: Phone,
    href: `tel:${business.phone}`,
  },
  {
    label: "Email",
    value: business.email,
    icon: Mail,
    href: `mailto:${business.email}`,
  },
  { label: "Studio", value: addressLine, icon: MapPin },
  { label: "Hours", value: openingHoursLine, icon: Clock },
];

export default function PortfolioCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 pb-22 sm:py-24 lg:py-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[4%] h-100 w-100 rounded-full bg-primary/20 blur-[110px]" />
        <div className="absolute bottom-0 -left-32 hidden h-80 w-80 rounded-full bg-accent/10 blur-[110px] md:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedContainer>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="h-px w-6 bg-accent/50 sm:w-8" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Your turn
              </span>
            </div>

            <h2 className="mt-4 font-heading text-[2.125rem]/[1.15] font-bold tracking-tight text-white text-balance sm:mt-5 sm:text-4xl/[1.1] lg:text-[2.875rem]/[1.13]">
              <span className="block">Want one of these</span>
              <span className="block text-slate-400">with your name on it?</span>
            </h2>

            {/* No delivery timeline here. `faqs.ts` flags it as the highest-
                value fact the owner has not supplied, and a guessed "two to six
                weeks" is a promise the business would be held to. "Usually the
                same day" is a reply time, not a build time, and it is the same
                claim the homepage CTA and the contact page already make. */}
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-[1.0625rem] sm:leading-7">
              Send us the brief. You get a scope and a fixed number back —
              usually the same day.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex min-h-13.5 items-center justify-center gap-3 rounded-full bg-primary px-7 text-[0.9375rem] font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
              >
                Get a fixed quote
                <span
                  aria-hidden="true"
                  className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20"
                >
                  <ArrowRight className="cta-arrow h-3.5 w-3.5" />
                </span>
              </Link>

              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13.5 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10"
              >
                Message on WhatsApp
                <MessageCircle className="h-4 w-4 text-accent" />
              </a>
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-in" delay={120}>
            <div className="rounded-2xl border border-white/15 bg-navy-light/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8 lg:rounded-3xl">
              <h3 className="font-heading text-lg font-semibold text-white">
                Reach us directly
              </h3>

              <dl className="mt-4 sm:mt-5">
                {contactRows.map(({ label, value, icon: Icon, href }, idx) => (
                  <div
                    key={label}
                    className={`relative flex items-center gap-3 py-3 sm:gap-3.5 sm:py-3.5 ${
                      idx > 0 ? "border-t border-white/8" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-primary/20"
                    >
                      <Icon className="h-4 w-4 text-secondary" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium leading-5 text-white sm:text-[0.9375rem] sm:leading-5.5">
                        {href ? (
                          /* `after:inset-0` stretches the hit area over the
                             whole row. The value on its own is a ~20px line of
                             text — well under the 44px tap target a phone
                             number has to be, given it is the thing most
                             visitors on this page will actually press. */
                          <a
                            href={href}
                            className="wrap-break-word transition-colors after:absolute after:inset-0 hover:text-accent"
                          >
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
