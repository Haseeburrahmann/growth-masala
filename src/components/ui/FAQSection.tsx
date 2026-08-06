import { ChevronDown } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { FaqItem } from "@/lib/schema";

interface FAQSectionProps {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
  intro?: string;
}

/**
 * Accessible FAQ accordion built on native <details>/<summary>.
 *
 * Deliberately a server component with no JavaScript: the answers ship inside
 * the HTML, which is what makes the matching FAQPage schema valid. An accordion
 * that renders its answers client-side would put the schema and the visible
 * content out of sync.
 */
export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow = "FAQ",
  intro,
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            {heading}
          </h2>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {intro}
            </p>
          )}
        </AnimatedContainer>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <AnimatedContainer key={faq.question}>
              <details className="group rounded-xl border border-border bg-white px-6 py-5 transition-colors open:border-primary/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-text-primary marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
