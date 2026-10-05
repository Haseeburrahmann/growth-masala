import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CaseStudiesNote from "@/components/case-studies/CaseStudiesNote";
import CaseStudiesCTA from "@/components/case-studies/CaseStudiesCTA";
import { caseStudies } from "@/data/caseStudies";
import Link from "next/link";
import Image from "next/image";

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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recently launched</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-primary">Two new builds, explained.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[
              { href: "/blog/sqc-solar-loans-website-mahabubnagar", title: "SQC Solar & Loans", image: "/images/portfolio/sqc-solar-loans.webp", text: "Two service journeys for a Mahabubnagar business, with a clear path to an enquiry." },
              { href: "/blog/health-factor-dental-website-case-study", title: "Health Factor Dental Clinic", image: "/images/portfolio/health-factor-dental.webp", text: "Treatment information, clinic evidence and a WhatsApp appointment-request flow for a Delhi practice." },
            ].map((project) => (
              <article key={project.href} className="overflow-hidden rounded-2xl border border-border">
                <Link href={project.href} className="block focus-visible:outline-2 focus-visible:outline-primary">
                  <Image src={project.image} alt={`Screenshot of the ${project.title} website`} width={1512} height={771} className="aspect-video w-full object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="p-6"><h3 className="font-heading text-xl font-semibold text-text-primary">{project.title}</h3><p className="mt-3 leading-7 text-text-secondary">{project.text}</p><span className="mt-5 inline-block text-sm font-semibold text-primary">Read the project story →</span></div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {caseStudies.map((study, idx) => (
        <CaseStudySection key={study.slug} study={study} index={idx} />
      ))}

      <CaseStudiesNote />

      <CaseStudiesCTA />
    </>
  );
}
