import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, trackRecord } from "@/data/business";
import { portfolioItems } from "@/data/portfolio";
import { spellOut } from "@/lib/spellOut";

/**
 * Portfolio hero — a 440px navy band: eyebrow, two-line headline, one standfirst.
 *
 * The page's central problem was a number. The `<title>` promised "50+ Websites
 * & Digital Projects" while the hero rendered `portfolioItems.length + "+"` —
 * "8+" — directly beneath it. Both came from the same track record; nothing
 * connected them, so the page read as an inflated claim caught out by its own
 * content.
 *
 * The fix is to state the relationship instead of hiding it. Fifty is the work
 * delivered; eight is what we can show, because a portfolio entry needs a named
 * client and a URL that still resolves. The standfirst says exactly that —
 * "a curated slice of 50+ projects delivered" — which is why the stat strip that
 * used to sit under this copy is gone: it repeated both numbers side by side
 * without the sentence that reconciles them.
 *
 * Neither number is typed. The headline count is `portfolioItems.length` spelled
 * out; the delivered count is `trackRecord.projectsDelivered`, always rendered
 * with a "+" because it is a floor, not a measurement.
 *
 * White H1 with the muted second line, per the canvas. `.text-gradient` was here
 * and measures 3.64:1 on navy.
 */

/**
 * Spelled-out counts for the headline. The canvas headline reads "Eight sites",
 * not "8 sites", and a numeral opening an H1 reads like a stat rather than a
 * sentence. Anything past the table falls back to the numeral, which is correct
 * rather than pretty — the alternative is a headline that silently disagrees
 * with the grid below it.
 */
export default function PortfolioHero() {
  const liveCount = portfolioItems.length;
  const liveCountWord = spellOut(liveCount);

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-secondary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute top-24 right-[6%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
            <div className="h-px w-6 bg-accent/50 sm:w-8" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Work
            </span>
          </div>

          {/* One h1, two visual lines. Two <h1> elements for a stacked headline
              is the mistake this codebase has already shipped once. */}
          {/* The canvas drew "Eight sites you can open / right now." It is the
              better sentence, and it carries no keyword and no locality — where
              the H1 it replaced ("Websites and web apps built from
              Mahabubnagar") deliberately took the locality without taking the
              exact-match phrase owned by /website-development-mahabubnagar.

              Dropping both from the H1 of an indexed page is a silent on-page
              regression, so the keyword line keeps the <h1> and the canvas line
              opens the standfirst. The design's two-line, muted-second-line
              treatment is unchanged — only which sentence sits in the heading. */}
          <h1 className="max-w-3xl font-heading text-[2.0625rem]/[1.15] font-bold tracking-tight text-white text-balance sm:text-5xl/[1.1] lg:text-[3.25rem]/[1.1]">
            <span className="block">Websites and web apps</span>{" "}
            <span className="block text-slate-400">
              built from {address.locality}.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-[1.0625rem] sm:leading-7">
            {liveCountWord} sites you can open right now — every link below is
            live. Named clients, real businesses, a curated slice of{" "}
            {trackRecord.projectsDelivered}+ projects delivered.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
