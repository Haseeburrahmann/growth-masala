import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address } from "@/data/business";
import { caseStudies } from "@/data/caseStudies";

/**
 * Case studies hero.
 *
 * The H1 was "Results That Speak" — with `.text-gradient` on navy, and above
 * three cards whose "results" were "Live", "1-tap" and "100% Mobile
 * Responsive". The headline wrote a cheque the page could not cash.
 *
 * The replacement promises exactly what follows: a brief, a build, and a list of
 * what shipped. It is a weaker claim than "results", and it is the one we can
 * substantiate — which on a page competing against agencies advertising "300%
 * growth" is closer to an advantage than a concession.
 *
 * White H1 with an amber underline. `.text-gradient` measures 3.64:1 on navy
 * and lands its muddy midpoint mid-word on small viewports.
 */
export default function CaseStudiesHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 right-[14%] h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
        <div className="animate-float hidden md:block absolute top-28 left-[6%] h-56 w-56 rounded-full bg-primary/20 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Case Studies
            </span>
          </div>

          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">The brief, the build,</span>
            <span
              className="headline-mark animate-headline-mark"
              style={{ animationDelay: "600ms" }}
            >
              and what shipped
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {caseStudies.length} projects written up properly — what the business
            was actually stuck on, what we built about it, and what exists now
            that did not before. Two schools and a four-branch repair chain,
            built from {address.locality} for clients in {address.region} and
            Bengaluru.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Each one links to the live site. If a claim below looks generous,
            open it and check.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
