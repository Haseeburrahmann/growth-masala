import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { LocationPage } from "@/data/locations";
import type { FaqItem } from "@/lib/schema";

interface LocationFaqProps {
  city: string;
  /** The SAME array the page serialises into FAQPage JSON-LD. */
  faqs: FaqItem[];
  related: LocationPage[];
}

/**
 * Local FAQ cards, plus the sibling-page link cluster underneath.
 *
 * Two things here are load-bearing and easy to break:
 *
 * 1. **Schema parity.** `faqs` is the identical array the page passes to
 *    `buildFaqSchema`, and every answer ships inside the server-rendered HTML.
 *    `<details>` is `open` by default and there is no JavaScript involved, so
 *    the visible text can never drift from the structured data. FAQ schema whose
 *    answers are not visible is a policy violation — see
 *    docs/seo-architecture.md §Rule 3.
 * 2. **The related links.** Location pages are otherwise orphans; these pills
 *    and the footer are the only internal paths into them.
 *
 * This deliberately does not use the shared `FAQSection`: the canvas puts these
 * in two columns of cards inside the same section as the "also serving" row,
 * and `FAQSection` renders a centred single column in its own section. The
 * markup contract that matters — native `<details>`, server-rendered answers,
 * same source array as the schema — is preserved.
 */
export default function LocationFaq({ city, faqs, related }: LocationFaqProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Straight answers
            </span>
          </div>

          <div className="mt-6 grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-text-primary text-balance sm:text-4xl lg:text-[2.875rem]">
              <span className="block">Questions we get</span>
              <span className="block text-text-secondary/75">
                from {city} businesses.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-[17px]">
              If yours is not here, message us on WhatsApp — a real person
              replies.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <AnimatedContainer key={faq.question} delay={index * 70}>
              <details
                open
                className="group h-full rounded-2xl border border-border bg-surface p-6"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 marker:hidden [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                  />
                  <span className="font-heading text-[17px] font-semibold leading-snug text-text-primary">
                    {faq.question}
                  </span>
                </summary>
                <p className="mt-3 pl-8 text-[15px] leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            </AnimatedContainer>
          ))}
        </div>

        {related.length > 0 && (
          <AnimatedContainer className="mt-10">
            <div className="h-px w-full bg-border" />
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Also serving
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link
                    href={`/${relatedPage.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {relatedPage.title}
                    <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        )}
      </div>
    </section>
  );
}
