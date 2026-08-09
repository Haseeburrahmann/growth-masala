import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  Languages,
  MapPin,
  MessageCircle,
} from "lucide-react";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business, languages } from "@/data/business";
import type { LocationPage } from "@/data/locations";

/**
 * The one `<h1>` on a location page.
 *
 * `page.h1` is rendered verbatim and must stay that way: these twelve pages
 * exist to hold an exact-match phrase ("Digital Marketing Agency in
 * Mahabubnagar"), and the `<h1>` is the strongest on-page signal for it. Do not
 * split it into a two-line canvas headline or rewrite it into something
 * punchier — see docs/seo-architecture.md §Rule 2.
 *
 * Everything else on this section is per-page data. The trust pills are the one
 * exception worth knowing about: they are business-wide facts, so all three are
 * derived from `business.ts` — address, `languages`, and the fixed-price claim.
 * The language list in particular is shared with /contact's hero, which is why
 * it is a data field and not a string typed into both.
 */
export default function LocationHero({ page }: { page: LocationPage }) {
  const pills = [
    {
      icon: MapPin,
      label: `Based on ${address.streetAddress}, ${address.locality}`,
    },
    { icon: Languages, label: languages.join(" · ") },
    { icon: FileCheck, label: "Fixed price before work starts" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-14 sm:pt-36 sm:pb-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-40 right-[6%] h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="animate-float hidden md:block absolute top-48 left-[-8%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          {/* Visible counterpart to the BreadcrumbList JSON-LD on the page. */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-blue-300" aria-current="page">
                {page.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-3xl font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-white text-balance sm:text-[2.5rem] lg:text-5xl">
            {page.h1}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
            {page.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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

        <AnimatedContainer delay={120} animation="fade-in">
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {pills.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2.5 text-[13px] font-medium text-slate-300"
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 text-sky" />
                {label}
              </li>
            ))}
          </ul>
        </AnimatedContainer>
      </div>
    </section>
  );
}
