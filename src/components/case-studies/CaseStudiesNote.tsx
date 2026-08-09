import { Info } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { caseStudies } from "@/data/caseStudies";

/**
 * Why there are no percentages on this page.
 *
 * This band exists because of what it replaced. The studies above used to
 * present "Live", "1-tap" and "100% Mobile Responsive" as results, and the
 * obvious fix — delete them — leaves an agency case-studies page conspicuously
 * missing the numbers every competitor's page has. A reader notices the absence
 * whether or not it is explained.
 *
 * So it is explained, briefly. Naming the gap is more persuasive than filling it
 * badly, and in a market where "300% growth" appears on agency sites with
 * nothing behind it, being the page that says which numbers it does not have is
 * a differentiator rather than a hedge. It is a one-paragraph callout and not a
 * section, because a three-paragraph apology reads as protesting too much.
 *
 * It carries no background of its own — it sits inside the last study's band, so
 * the parity here has to follow `caseStudies.length`. Delete this component the
 * moment a client shares a real figure and `outcome` gets populated in
 * `caseStudies.ts`; at that point it stops being honest and starts being false
 * modesty.
 */
export default function CaseStudiesNote() {
  const lastStudyIsAlternate = (caseStudies.length - 1) % 2 === 1;

  return (
    <section
      className={`${lastStudyIsAlternate ? "bg-surface" : "bg-white"} pb-14 sm:pb-16 lg:pb-[72px]`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-start gap-4 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 sm:items-center sm:gap-[18px] sm:rounded-[20px] sm:p-[26px]">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0"
            />
            <div className="flex-1">
              <h2 className="font-heading text-base font-semibold leading-[22px] text-text-primary sm:text-[17px]">
                Why there are no percentages on this page
              </h2>
              <p className="mt-1.5 text-[15px] leading-[24px] text-text-secondary">
                Nobody has measured enquiries or admissions for these clients
                yet, so there is nothing true to put there. When a client gives
                us a real number, it goes here — not before.
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
