import Image from "next/image";
import { ArrowUpRight, Check, TrendingUp } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { CaseStudy } from "@/types";

interface CaseStudySectionProps {
  study: CaseStudy;
  index: number;
}

/**
 * One case study as a full-width band: screenshot on one side, the reasoning on
 * the other.
 *
 * This replaced `CaseStudyCard`, which packed the same content into a tinted
 * gradient card with three equal columns — problem, build, shipped — and a
 * screenshot slab underneath. Three columns gave the problem statement the same
 * visual weight as the checklist, so a skim read the checklist and never the
 * reasoning, which is the only thing on this page a competitor cannot copy.
 *
 * The order is now the order someone reads in: what was wrong → what we built →
 * what shipped → go and look. `index` drives two things and they move together:
 * the background alternates white/surface so consecutive studies separate
 * without a divider, and the image side alternates so the eye is not tracking
 * down a single column for three screens.
 *
 * ── On the delivered list ──────────────────────────────────────────────────
 *
 * Checkmarks make a completeness claim, which is true and verifiable by opening
 * `study.link`. Big numerals make a measurement claim, which the previous
 * version made with "Live", "1-tap" and "100% Mobile Responsive" typeset as
 * KPIs. Nothing here needs the reader to take our word for it.
 *
 * `study.outcome` keeps the emerald trending-up treatment the fake figures were
 * borrowing. It is undefined on every study today — see the note in
 * `caseStudies.ts` — so this branch renders nothing, and when one real number
 * finally arrives it will be the only number on the page, which is what makes
 * it land. Do not populate it to fill the space.
 */
export default function CaseStudySection({ study, index }: CaseStudySectionProps) {
  const isAlternate = index % 2 === 1;

  return (
    <section
      className={`${isAlternate ? "bg-surface" : "bg-white"} py-14 sm:py-16 lg:py-[72px]`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div
            className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14 ${
              isAlternate ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Artwork — full-bleed on mobile, a fixed 520×400 plate on desktop */}
            <div className="relative h-50 w-full shrink-0 overflow-hidden rounded-2xl lg:h-100 lg:w-130 lg:rounded-[20px]">
              <Image
                src={study.image}
                alt={`${study.client} website built by Growth Masala`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 520px"
                loading="lazy"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/15 bg-primary/5 px-[11px] py-[5px] text-xs font-semibold text-primary">
                  {study.category}
                </span>
                <span className="rounded-full border border-primary/15 bg-primary/5 px-[11px] py-[5px] text-xs font-semibold text-primary">
                  {study.location}
                </span>
              </div>

              <h2 className="mt-4 font-heading text-[26px] font-bold leading-tight tracking-[-0.6px] text-text-primary sm:text-3xl lg:text-[32px] lg:leading-[38px] lg:tracking-[-0.8px]">
                {study.client}
              </h2>

              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 lg:mt-6">
                The problem
              </h3>
              <p className="mt-2 text-base leading-[26px] text-text-secondary">
                {study.challenge}
              </p>

              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                What we did
              </h3>
              <p className="mt-2 text-base leading-[26px] text-text-secondary">
                {study.solution}
              </p>

              <div className="mt-5 h-px w-full bg-border" />

              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {study.delivered.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                    <span className="text-sm leading-[21px] font-medium text-text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Reserved for a real measured figure. Undefined on every study
                  today — see the note in `caseStudies.ts`. */}
              {study.outcome && (
                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-600/20 bg-emerald-600/5 p-4">
                  <TrendingUp
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  />
                  <span className="font-heading text-base font-bold text-text-primary">
                    {study.outcome}
                  </span>
                </p>
              )}

              {study.link && (
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-primary"
                >
                  Visit the live site
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
