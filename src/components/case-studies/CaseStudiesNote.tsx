import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { caseStudies } from "@/data/caseStudies";

/**
 * Why there are no percentages on this page.
 *
 * This section exists because of what it replaced. The cards above used to
 * present "Live", "1-tap" and "100% Mobile Responsive" as results, and the
 * obvious fix — delete them — leaves an agency case-studies page conspicuously
 * missing the numbers every competitor's page has. A reader notices the absence
 * whether or not it is explained.
 *
 * So it is explained. Naming the gap is more persuasive than filling it badly,
 * and in a market where "300% growth" appears on agency sites with nothing
 * behind it, being the page that says which numbers it does not have is a
 * genuine differentiator rather than a hedge.
 *
 * Delete this section the moment a client shares a real figure and `outcome`
 * gets populated in `caseStudies.ts` — at that point it stops being honest and
 * starts being false modesty.
 */
export default function CaseStudiesNote() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-12">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10">
              <ShieldCheck aria-hidden="true" className="h-6 w-6 text-emerald-600" />
            </span>

            <h2 className="mt-6 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
              You will not find a percentage on this page
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Most agency case studies open with a number — 300% more traffic,
                5x the leads — and almost none of them say what the number was
                measured against, over what period, or by whom. We would rather
                not join in.
              </p>
              <p>
                What the {caseStudies.length} studies above claim is what we
                built, and every line of it is checkable in about thirty seconds
                by opening the client&apos;s live site. Where a claim needs you to
                trust us, we have left it out.
              </p>
              <p>
                When a client is ready to share real figures — enquiries a month,
                admissions, search traffic — they will appear here with the
                client&apos;s name attached to them. Until then, judge the work
                by the work.
              </p>
            </div>

            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-text-secondary">
              Want to see more of what we have built rather than how we think
              about it?{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
              >
                The full portfolio
              </Link>{" "}
              has every live project, and{" "}
              <Link
                href="/services#pricing"
                className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
              >
                the price list
              </Link>{" "}
              says what each of them costs.
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
