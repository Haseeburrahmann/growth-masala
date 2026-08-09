import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { FaqItem } from "@/lib/schema";

interface FAQSectionProps {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
  intro?: string;
  /** Matches the section to the one above it. */
  tone?: "surface" | "light";
  /** Optional portrait for the left column. Homepage only — see below. */
  image?: string;
  imageAlt?: string;
}

/**
 * Accessible FAQ accordion built on native <details>/<summary>.
 *
 * Deliberately a server component with no JavaScript: the answers ship inside
 * the HTML, which is what makes the matching FAQPage schema valid. An accordion
 * that renders its answers client-side would put the schema and the visible
 * content out of sync.
 *
 * Two columns, not one. This used to be a single `max-w-3xl` stack: heading,
 * then eight rows beneath it, in a section padded `py-32`. Everything queued
 * vertically, so the block ran most of a screen taller than it needed to and
 * the heading had scrolled away by the third question. The heading, the
 * standfirst and the ask now sit in a sticky left column beside the list, which
 * costs no extra height at all — the column is shorter than the accordion —
 * and keeps the invitation to just message us on screen the whole way down.
 *
 * `image` is optional and only the homepage passes one. The rail there is short
 * against eight questions and a photograph fills it; on /services and /contact
 * the lists are shorter and the sticky block alone is enough. Nothing about the
 * layout depends on it.
 *
 * The first item ships `open`. On every page that first question is the one
 * about money, and an accordion where all eight rows are shut reads as a wall
 * of closed doors — one answer visible shows the reader what kind of answers
 * these are before they decide whether to open another.
 *
 * The +/− marker is CSS-only (`group-open:rotate-45` turns the plus into a
 * cross), so it needs no state and no bundle.
 */
export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow = "FAQ",
  intro,
  tone = "surface",
  image,
  imageAlt = "",
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section
      className={`${tone === "light" ? "bg-white" : "bg-surface"} py-16 sm:py-20`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-8">
        {/* Left rail. `lg:sticky` only — a sticky heading on a phone would eat
            a third of the viewport for the length of the list. */}
        <AnimatedContainer className="lg:sticky lg:top-28 lg:w-[31%] lg:shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.16] tracking-tight text-text-primary text-balance sm:text-4xl">
            {heading}
          </h2>

          {intro && (
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              {intro}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
          >
            Ask us directly
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>

          {image && (
            <div className="relative mt-8 hidden h-64 overflow-hidden rounded-2xl bg-surface lg:block">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover object-center"
                sizes="380px"
              />
            </div>
          )}
        </AnimatedContainer>

        {/* One AnimatedContainer around the list, not one per row: eight
            IntersectionObservers to fade in eight adjacent rows is eight
            observers doing the job of one. */}
        <AnimatedContainer delay={120} className="min-w-0 flex-1">
          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group rounded-xl border border-border bg-white px-5 transition-colors open:border-primary/30 sm:px-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-heading text-[15px] font-semibold leading-snug text-text-primary marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    aria-hidden="true"
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 pr-8 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
