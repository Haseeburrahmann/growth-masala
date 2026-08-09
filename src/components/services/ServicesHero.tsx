import Link from "next/link";
import { ArrowRight, IndianRupee } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { services, serviceGroups } from "@/data/services";
import { address } from "@/data/business";
import { spellOut } from "@/lib/spellOut";

/**
 * The one `<h1>` on /services.
 *
 * ⚠️ The headline used to read "Digital Marketing Services in Mahabubnagar" —
 * keyword-first, matching the page `<title>`. The approved canvas replaced it
 * with the outcome-led "What we build, and what it actually fixes.", which
 * carries neither the service phrase nor the locality. The metadata contract in
 * `layout.tsx` is untouched, so the SERP snippet still targets the keyword, but
 * the H1 no longer reinforces it. That is a deliberate, client-approved copy
 * decision, not an oversight — see the deviation note in the implementation
 * report before "fixing" it back.
 *
 * The jump-to-group pill nav was dropped with the same canvas: the four deep
 * group sections it pointed at no longer exist, so the anchors had no targets.
 *
 * Counts in the standfirst are derived, never typed — adding a service or a
 * group updates the sentence.
 */
export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 sm:pt-36 sm:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 right-[8%] h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute top-20 left-[5%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </span>
          </div>

          {/* One <h1>, two visual lines. Never two <h1> elements.

              The canvas drew this as "What we build, / and what it actually
              fixes." — good voice, but it carries neither the service phrase
              nor the locality, while `layout.tsx` still targets "Digital
              Marketing Services in Mahabubnagar". Shipping a page whose <title>
              and <h1> disagree about the subject throws away the main on-page
              signal for this page's primary keyword, on a site that has already
              lost its entire index once to a metadata mistake.

              So the keyword line takes the <h1> and the canvas line leads the
              standfirst — the design's two-line, muted-second-line treatment is
              preserved exactly; only which sentence sits in which element
              changed. It stays "Services", not "Agency": the agency phrase is
              the exact-match property of /digital-marketing-agency-mahabubnagar,
              and two pages competing for one phrase split the signal
              (docs/seo-architecture.md §Rule 2). */}
          <h1 className="mt-6 max-w-4xl font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.25rem]">
            <span className="block">Digital marketing services</span>{" "}
            <span className="block text-slate-400">in {address.locality}.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
            What we build, and what it actually fixes.{" "}
            {spellOut(serviceGroups.length)} groups,{" "}
            {spellOut(services.length).toLowerCase()} services. Start with one.
            Add the rest once it earns its keep.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark sm:w-auto"
            >
              Get a fixed quote
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="cta-arrow h-3.5 w-3.5" />
              </span>
            </Link>

            <a
              href="#pricing"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-[15px] font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              See what it costs
              <IndianRupee aria-hidden="true" className="h-4 w-4 text-accent" />
            </a>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
