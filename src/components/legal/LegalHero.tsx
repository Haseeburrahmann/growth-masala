import { CalendarClock } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { formatLegalDate } from "@/lib/legal";
import type { LegalDoc } from "@/types";

/**
 * Hero for the three legal documents.
 *
 * Shorter and quieter than the marketing heroes — no floating orbs, no fact
 * pills. Someone landing here is looking for a specific clause or an email
 * address, and decoration between them and it is friction.
 *
 * The H1 is a single line, so unlike `AboutHero` and the location pages it
 * needs no `{" "}` between two `block` spans (docs/seo-architecture.md §Rule 6).
 * If a title ever wraps to two spans, that space becomes load-bearing again.
 *
 * The "last updated" date is rendered from the same `updated` frontmatter that
 * feeds `dateModified` in the page's WebPage schema. On a legal document those
 * two must agree — the visible one is what a reader relies on when deciding
 * whether the terms they accepted are the terms on screen.
 */
export default function LegalHero({ doc }: { doc: LegalDoc }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-38">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Legal
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-balance text-white sm:text-5xl">
            {doc.title}
          </h1>

          {doc.standfirst && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px] sm:leading-[1.65]">
              {doc.standfirst}
            </p>
          )}

          {doc.updated && (
            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2.5 text-[13px] font-medium text-slate-300">
              <CalendarClock aria-hidden="true" className="h-3.5 w-3.5 text-sky" />
              Last updated{" "}
              <time dateTime={doc.updated}>{formatLegalDate(doc.updated)}</time>
            </p>
          )}
        </AnimatedContainer>
      </div>
    </section>
  );
}
