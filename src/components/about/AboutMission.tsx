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
 * Closing CTA — the page's only call to action.
 *
 * The version this replaces ended on a mission quote with nothing to click. A
 * reader who had gone all the way down the About page and was persuaded had no
 * next step, and every other page on the site closes with one.
 *
 * Every value in the card is imported. NAP is the one thing on this site that
 * must be byte-identical everywhere it appears — page, JSON-LD, and every
 * external directory listing — so nothing here is retyped from the design.
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
  { icon: MapPin, label: "Studio", value: addressLine, href: null },
  { icon: Clock, label: "Hours", value: openingHoursLine, href: null },
];

export default function AboutMission() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-40 right-[6%] h-104 w-104 rounded-full bg-primary/20 blur-[100px]" />
        <div className="animate-float hidden md:block absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_520px] lg:items-start lg:gap-16 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Work with us
            </span>
          </div>

          <h2 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.875rem] lg:leading-13">
            <span className="block text-white">Come and meet us,</span>
            <span className="block text-slate-400">
              or just send a message.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-[17px] sm:leading-[1.65]">
            {address.streetAddress}, {address.locality} — or WhatsApp, if that
            is easier. Either way you get a scope and a fixed number back.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark"
            >
              Get a fixed quote
              <span className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20">
                <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
              </span>
            </Link>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10"
            >
              Message on WhatsApp
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
            </a>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={120} animation="fade-in">
          <div className="rounded-3xl border border-white/15 bg-navy-light/90 p-7 shadow-2xl backdrop-blur-sm sm:p-8">
            <p className="font-heading text-lg font-semibold text-white">
              Reach us directly
            </p>

            {/* A <ul>, not a <dl>: the phone and email values are links, and an
                anchor wrapping a <dt>/<dd> pair is invalid markup. */}
            <ul className="mt-3 divide-y divide-white/10">
              {contactRows.map((row) => (
                <li
                  key={row.label}
                  className="flex min-h-11 items-center gap-3.5 py-3.5"
                >
                  <span className="inline-flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <row.icon aria-hidden="true" className="h-4 w-4 text-sky" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-0.5 block text-[15px] leading-5.5 font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[15px] leading-5.5 font-medium text-white">
                        {row.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
