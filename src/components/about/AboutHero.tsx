import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { business, address, trackRecord } from "@/data/business";

/**
 * About hero.
 *
 * The H1 is one element with two `<span className="block">` lines — the second
 * one muted rather than a second `<h1>`. Multiple H1s on a page to get a
 * multi-line visual headline is a mistake this repo has already shipped once.
 *
 * It names the locality but stops short of "digital marketing agency in
 * Mahabubnagar" as a phrase. That exact-match string belongs to
 * /digital-marketing-agency-mahabubnagar, which holds the Service schema and the
 * internal links built to win it; a second page chasing it splits the signal
 * (docs/seo-architecture.md §Rule 2).
 *
 * The founding year and the project count are read from `business.ts`, not
 * typed. /about hardcoded its own "50+" once and it drifted out of step with the
 * /portfolio title — see the comment on `trackRecord`.
 */
export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-38 lg:pb-14">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-40 right-[6%] h-104 w-104 rounded-full bg-primary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute top-40 -left-32 h-72 w-72 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              About Us
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
            <span className="block text-white">A small studio</span>
            <span className="block text-slate-400">in {address.locality}.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px] sm:leading-[1.65]">
            {business.name} started in {business.foundingYear} building websites
            for businesses around us. {trackRecord.projectsDelivered}+ projects
            later the way we work has not changed: fixed price, senior person on
            the job, everything handed over at the end.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
