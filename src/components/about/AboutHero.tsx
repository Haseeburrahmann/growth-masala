import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business } from "@/data/business";

/**
 * About hero.
 *
 * The H1 keeps the team framing — Growth Masala is genuinely more than one
 * person (owner-confirmed 2026-08-07) — and adds the locality, which the page
 * previously carried nowhere in its body copy despite being titled "About —
 * Digital Agency in Mahabubnagar".
 *
 * It stops short of "digital marketing agency in Mahabubnagar" as a phrase.
 * That belongs to /digital-marketing-agency-mahabubnagar, which holds the
 * Service schema and the internal links built to win it; a second page chasing
 * the same string splits the signal (docs/seo-architecture.md §Rule 2).
 *
 * White H1 with an amber underline. `.text-gradient` was on both this H1 and
 * the story H2 below, and measures 3.64:1 on navy.
 */
export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 left-[26%] h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute -bottom-24 right-[10%] h-56 w-56 rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              About Us
            </span>
          </div>

          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">The team behind your growth,</span>
            <span
              className="headline-mark animate-headline-mark"
              style={{ animationDelay: "600ms" }}
            >
              based in {address.locality}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Designers, developers and marketers working together out of{" "}
            {address.locality}, {address.region} — building the websites, stores
            and campaigns that local businesses are usually told they have to go
            to Hyderabad for.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            We started in {business.foundingYear} and we are still small enough
            that the person who scopes your project is one of the people who
            builds it. That is the whole pitch.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
