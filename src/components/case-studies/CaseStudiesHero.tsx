import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { caseStudies } from "@/data/caseStudies";
import { spellOut, spellOutLower } from "@/lib/spellOut";

/**
 * Case studies hero.
 *
 * The H1 was "Results That Speak" — with `.text-gradient` on navy, and above
 * three cards whose "results" were "Live", "1-tap" and "100% Mobile
 * Responsive". The headline wrote a cheque the page could not cash.
 *
 * The replacement promises exactly what follows: a build, the reasoning, and a
 * live URL to check it against. It is a weaker claim than "results", and it is
 * the one we can substantiate — which on a page competing against agencies
 * advertising "300% growth" is closer to an advantage than a concession.
 *
 * Line two is muted rather than underlined. `.text-gradient` measures 3.64:1 on
 * navy and lands its muddy midpoint mid-word on small viewports; slate-400 on
 * navy measures ~6.4:1 and carries the same "second clause" reading.
 *
 * The count is derived, not typed. "Three builds," has to stop saying three the
 * moment a fourth study is added to `caseStudies.ts`.
 */
export default function CaseStudiesHero() {
  const count = spellOutLower(caseStudies.length);
  const countTitleCase = spellOut(caseStudies.length);

  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-[152px] lg:pb-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-40 right-[6%] h-[420px] w-[420px] rounded-full bg-primary/25 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-5 flex items-center gap-3 lg:mb-6">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Case Studies
            </span>
          </div>

          {/* One <h1>, two visual lines. Two <h1>s shipped here once. */}
          <h1 className="max-w-3xl font-heading text-[33px] font-bold leading-[38px] tracking-[-0.9px] text-white sm:text-5xl sm:leading-[1.08] lg:text-[52px] lg:leading-[57px] lg:tracking-[-1.4px]">
            <span className="block">{countTitleCase} builds,</span>{" "}
            <span className="block text-slate-400">
              and why we made those calls.
            </span>
          </h1>

          <p className="mt-4 max-w-[620px] text-base leading-[26px] text-slate-300 lg:mt-5 lg:text-[17px] lg:leading-[28px]">
            What the client was actually up against, what we built, and what
            shipped. All {count} sites are live — open them and check.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
