import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CaseStudiesNote from "@/components/case-studies/CaseStudiesNote";
import CaseStudiesCTA from "@/components/case-studies/CaseStudiesCTA";
import { caseStudies } from "@/data/caseStudies";

/**
 * /case-studies — three projects, told as problem → build → what shipped.
 *
 * The rewrite was editorial before it was structural. The page presented
 * "Live", "1-tap" and "100% Mobile Responsive" under a heading that said
 * RESULTS, beside a green trending-up icon, at KPI typography. Those are
 * deliverables. Dressing them as measured outcomes is the kind of claim that
 * costs more in credibility than it buys in persuasion — particularly on the
 * one page a serious prospect reads before enquiring.
 *
 * Alongside that:
 *
 *   - `"use client"` bought nothing. No state, no handlers; it shipped a bundle
 *     to render static text and pushed metadata into `layout.tsx`.
 *   - The three studies were hardcoded in the page body rather than living in
 *     `src/data/`, so nothing else could read them and the page could not be a
 *     server component.
 *   - "Mahabubnagar" appeared zero times, on a site whose entire SEO strategy is
 *     local intent.
 *
 * Each study now owns its own full-width band and paints its own background —
 * `CaseStudySection` alternates white/surface off `index`, so consecutive
 * studies separate themselves and there is no light-on-light seam left for a
 * `SectionDivider` to mark. `CaseStudiesNote` reads `caseStudies.length` to
 * finish on whichever background the last study used; the navy hero and navy
 * closing band are a change of room and carry themselves.
 *
 * Schema: `BreadcrumbList` only, from `layout.tsx`. No `Review` or
 * `AggregateRating` — those need real collected reviews, which is a separate
 * open item in `.claude/TODO.md`, and inventing them is a policy violation
 * rather than merely a bad idea.
 */
export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />

      {caseStudies.map((study, idx) => (
        <CaseStudySection key={study.slug} study={study} index={idx} />
      ))}

      <CaseStudiesNote />

      <CaseStudiesCTA />
    </>
  );
}
