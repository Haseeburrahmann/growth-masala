import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  address,
  addressLine,
  business,
  openingHoursLine,
} from "@/data/business";

/**
 * Closing band for /case-studies.
 *
 * "Start Your Growth Story" was the old label — the kind of phrase that means
 * nothing and commits to nothing. What someone reaches this point wanting is a
 * specific, low-stakes next step, so the button says what the first
 * conversation actually produces: a scope and a fixed number.
 *
 * The contact card beside it is the real change. A centred CTA with two buttons
 * asks the reader to start a form; this asks nothing — the phone number, the
 * email, where we are and when we answer are all just there. Someone who has
 * read three case studies and wants to ring rather than type should not have to
 * navigate to /contact to find the number.
 *
 * Every value is read from `business.ts`. NAP retyped into a component is how
 * citations drift out of sync — see the header of that file.
 */
const contactRows = [
  {
    icon: Phone,
    label: "Phone",
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: addressLine,
    href: undefined,
  },
  {
    icon: Clock,
    label: "Hours",
    value: openingHoursLine,
    href: undefined,
  },
];

export default function CaseStudiesCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24 lg:py-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[4%] h-[420px] w-[420px] rounded-full bg-primary/25 blur-[110px]" />
        <div className="hidden md:block absolute top-[300px] -left-40 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-x-24 lg:px-8">
        <AnimatedContainer>
          <div className="mb-5 flex items-center gap-3 lg:mb-6">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Start here
            </span>
          </div>

          <h2 className="font-heading text-[34px] font-bold leading-[39px] tracking-[-0.8px] text-white sm:text-[40px] sm:leading-[46px] lg:text-[46px] lg:leading-[52px] lg:tracking-[-1.2px]">
            <span className="block">Same problem?</span>{" "}
            <span className="block text-slate-400">Tell us about it.</span>
          </h2>

          <p className="mt-4 max-w-[580px] text-base leading-[26px] text-slate-300 lg:mt-5 lg:text-[17px] lg:leading-[28px]">
            One message with what is not working. You get a scope and a fixed
            number back — usually the same day. If a website is not the answer,
            we will say so.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-9">
            <Link
              href="/contact"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark"
            >
              Get a fixed quote
              <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20">
                <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
              </span>
            </Link>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10"
            >
              Message on WhatsApp
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
            </a>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={120}>
          <div className="rounded-2xl border border-white/15 bg-navy-light/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-sm sm:rounded-3xl sm:p-8">
            <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
              Reach us directly
            </h3>

            <dl className="mt-4 sm:mt-5">
              {contactRows.map((row, idx) => {
                const RowIcon = row.icon;
                return (
                  <div
                    key={row.label}
                    className={`relative flex min-h-14 items-center gap-3.5 py-3.5 ${
                      idx > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 sm:h-9.5 sm:w-9.5">
                      <RowIcon aria-hidden="true" className="h-4 w-4 text-sky" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 wrap-break-word text-[15px] leading-[22px] font-medium text-white">
                        {row.href ? (
                          /* The row, not the text, is the tap target — a 22px
                             line of text is well under the 44px floor. The
                             ::after overlay belongs to the anchor, so hover and
                             focus still resolve to the link itself. */
                          <a
                            href={row.href}
                            className="transition-colors after:absolute after:inset-0 hover:text-sky"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-400">
              Built in {address.locality} for businesses across {address.region}
              {" "}and beyond.
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
