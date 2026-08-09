import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/schema";

/**
 * The post's FAQ block, inside the article column.
 *
 * ⚠️ This renders the **same array** that `buildFaqSchema()` turned into the
 * page's `FAQPage` JSON-LD — never a second, prettier copy. Structured data that
 * does not match what a visitor can read is a policy violation, not a shortcut
 * (docs/seo-architecture.md §Rule 4).
 *
 * That is also why it is a server component built on native `<details>`: the
 * answers ship inside the HTML. An accordion that fetched or revealed its
 * answers client-side would put the schema and the page out of sync.
 *
 * It exists alongside `components/ui/FAQSection` rather than reusing it because
 * that component is a full-bleed `<section>` with its own eyebrow and heading,
 * sized to close a page. The canvas puts these cards in the middle of a 760px
 * prose column under an ordinary `## ` heading, which is a different object.
 */
/**
 * Exported so the rail can list this block without retyping its anchor. The
 * `<h2>` below is the only thing that owns the id; a second literal elsewhere is
 * how a table of contents ends up pointing at nothing.
 */
export const POST_FAQ_HEADING = {
  id: "frequently-asked",
  text: "Frequently asked",
} as const;

export default function PostFaqs({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-12">
      <h2
        id={POST_FAQ_HEADING.id}
        className="mb-4 scroll-mt-28 font-heading text-[23px] font-bold leading-tight tracking-[-0.02em] text-text-primary sm:text-[28px]"
      >
        {POST_FAQ_HEADING.text}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border bg-surface p-5 transition-colors open:border-primary/30 sm:p-5.5"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 font-heading text-base font-semibold leading-snug text-text-primary marker:hidden sm:text-[17px] [&::-webkit-details-marker]:hidden">
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
              />
              {faq.question}
            </summary>
            <p className="mt-2.5 pl-7.5 text-[15px] leading-relaxed text-text-secondary">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
