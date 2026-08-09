import { ArrowRight, ArrowUpRight, Check, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, websiteTiers } from "@/data/pricing";

/**
 * Hero.
 *
 * Four constraints shape this section, in order of how much they cost to get
 * wrong.
 *
 * 1. It has to fit one viewport. That is a height budget, not a preference. The
 *    photograph is what used to blow it: as a grid cell it dictated the section
 *    height and pushed it 26px past a 900px viewport. It is now an absolutely
 *    positioned bleed panel from lg up, so above that breakpoint the copy alone
 *    decides how tall the hero is and the section lands exactly on min-h-svh.
 *
 * 2. "in Mahabubnagar" is gone from the <h1>. The homepage <title> still carries
 *    the city, and /digital-marketing-agency-mahabubnagar and
 *    /website-development-mahabubnagar carry exact-match H1s for the queries
 *    that actually convert on it — repeating the city here competes with the
 *    pages built to win it. For a reader it survives twice above the fold: the
 *    subheading and the promise strip. A third mention in 72px display type was
 *    buying nothing and costing a line.
 *
 * 3. No frame around the photograph. A rounded card with a 1px border reads as
 *    a stock image dropped into a template regardless of the photograph's
 *    quality. `.hero-photo-mask` dissolves whichever edge faces the copy, and
 *    the plate is lit against a near-black backdrop specifically so that fade
 *    lands invisibly against the navy.
 *
 * 4. The secondary CTA carries a real number, read from `src/data/pricing.ts`.
 *    A hero that says "see our pricing" asks for a click; one that says "from
 *    ₹9,999" has already answered the question the click was going to ask, and
 *    publishing the floor is the same trust signal the pricing section sells.
 *    Never hardcode the figure — it is one of several surfaces fed by that file.
 *
 * The "what we build" panel is IN the photograph, composited onto the laptop
 * screen — see `.gen-images/hero-duo/` for the source plates. There is
 * deliberately no HTML card duplicating it: one was built here first and
 * rendering both put the same four words on screen twice. The words are still
 * reachable without the image because `alt` spells them out, and ServicesPreview
 * two sections down carries them as real headings, so nothing load-bearing is
 * trapped in a raster. If the offer changes, the plate has to be regenerated —
 * that is the cost of this composition and the reason nothing else on the site
 * bakes text into an image.
 */

const promises = [
  "Fixed quote before any work starts",
  "Prices published — no hidden costs",
  "Based in Mahabubnagar, not a call centre",
];

const startingPrice = formatPrice(websiteTiers[0].amount);

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-navy">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Ambient bloom field, drawn in CSS rather than loaded as an image.
            This was a generated WebP; even at 8KB, a full-viewport above-fold
            raster pushed mobile LCP from 2.7s to 4.9s and tripled FCP. Layered
            radial gradients give the same soft atmosphere for zero bytes, no
            decode, and no resolution ceiling. */}
        <div
          className="animate-ambient absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 78% 12%, rgba(56,189,248,0.20) 0%, transparent 65%)," +
              "radial-gradient(45% 45% at 92% 30%, rgba(37,99,235,0.28) 0%, transparent 70%)," +
              "radial-gradient(50% 50% at 6% 88%, rgba(245,158,11,0.13) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/55 to-transparent" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gradient orbs — desktop only, GPU-intensive blur hidden on mobile */}
        <div className="hidden md:block absolute -top-32 right-[10%] h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="hidden md:block absolute -bottom-32 left-[5%] h-72 w-72 rounded-full bg-accent/15 blur-[80px]" />
      </div>

      {/* ---------- Photograph ----------

          Not a column in the grid. From lg up it is a full-height panel pinned
          to the section's right edge, bleeding off the top, right and bottom
          and dissolving leftward into the navy — the canvas composition. Laying
          it out as a grid cell instead put it in a contained box, which (a) let
          the picture dictate the section height, pushing it 26px past the
          viewport, and (b) left a visible gutter on the right where the canvas
          has none.

          `order-last` puts it after the copy in the flex column on phones,
          where it is a static full-bleed block; `lg:absolute` takes it out of
          the flow entirely above that, so from lg up the copy alone decides how
          tall the hero is. */}
      <div className="animate-portrait-reveal relative order-last -mt-4 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[56%] xl:w-[54%]">
        {/* Warm shape behind the subjects, so the masked plate has something to
            separate from instead of dissolving into flat navy. */}
        <div className="pointer-events-none absolute left-[58%] top-1/2 hidden h-[70%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[80px] md:block" />

        {/* Mobile keeps a fixed 4:5 so the block has a height at all; desktop
            takes its height from the section and crops with object-cover. */}
        <div className="hero-photo-mask relative aspect-4/5 w-full sm:aspect-3/2 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
          <Image
            src="/images/sections/hero-team.webp"
            /* Describes the laptop screen, not the two people. They are a
               staged photograph, not the Growth Masala team, so the alt says
               what is legibly on the screen — which is genuinely ours — and
               makes no claim about who is holding it. Same reason AboutStory
               carries an empty alt. */
            alt="Two people reviewing a laptop that lists what we build: websites, online stores, SEO, and ads with AI chat — with a fixed quote before any work starts, from Mahabubnagar"
            fill
            priority
            className="object-cover object-[62%_center] lg:object-center"
            sizes="(max-width: 1023px) 100vw, 56vw"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-14 sm:pt-32 lg:px-8 lg:pt-28 lg:pb-16">
        {/* The copy never crosses into the photograph's half. 52% at lg leaves
            a ~40px breathing gap before the plate's fade begins at 44%. */}
        <div className="lg:w-[52%]">
          <div className="mb-6 animate-hero-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
              {/* The trend arrow, not a flame — it is the shape in
                    `public/brand-assets/logo-mark.svg`, so the badge reads as
                    the mark rather than as a generic "hot" pill. */}
              <TrendingUp className="h-4 w-4 text-accent" />
              Your Growth Partner
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-accent">India</span>
            </span>
          </div>

          {/* One <h1> per page. The visual line breaks are spans — three
                separate <h1> elements is a mistake this project has already
                made once. */}
          {/* Sized to hold TWO lines, which is the whole point of the amber
                rule: it underlines one phrase on one line. At 72px the second
                line measured 717px against a 638px column and broke into
                "your business" / "found", drawing the rule twice and turning
                the emphasis into a scribble. The steps below are the largest
                that still fit "your business found" unbroken at each breakpoint
                — 48px against the 499px lg column, 60px against the 632px xl
                one. Re-measure before raising either, or before changing the
                52% width the copy column is set to. */}
          <h1 className="font-heading text-[2.6rem] font-bold leading-[1.03] tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
            <span
              className="block animate-hero-reveal-text"
              style={{ animationDelay: "0ms" }}
            >
              Websites that get
            </span>{" "}
            <span
              className="block animate-hero-reveal-text"
              style={{ animationDelay: "90ms" }}
            >
              {/* The emphasis mark. Sits under the phrase rather than
                    recolouring it, so the line keeps full white contrast —
                    the blue gradient this replaced measured 3.64:1 on navy.

                    The rule no longer animates in. It faded via
                    `text-decoration-color`, which no browser can composite, so
                    it ran on the main thread every frame — the single
                    "non-composited animation" Lighthouse reports. A 700ms fade
                    on a 4px underline is not worth main-thread time on a phone,
                    and there is no compositable equivalent: a transform-based
                    pseudo-element cannot follow this phrase, which wraps at
                    every viewport width. So it is simply drawn.

                    The inner span must stay a plain inline for `.headline-mark`
                    to draw per line. */}
              <span className="headline-mark">
                your business found
              </span>
            </span>
          </h1>

          {/* Set in one weight throughout. The white-highlighted spans this
                replaced picked out "Mahabubnagar, Hyderabad" and the fixed-price
                promise, which put three competing emphasis levels — the amber
                rule, the highlights, the CTAs — inside 400px of vertical space. */}
          <p
            className="animate-hero-reveal-text mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Websites, online stores, SEO and ads for businesses in Mahabubnagar,
            Hyderabad and across Telangana. Fixed price agreed before work
            starts.
          </p>

          <div
            className="animate-hero-reveal-text mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "260ms" }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
            >
              Get a fixed quote
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <ArrowRight className="cta-arrow h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              href="#pricing"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
            >
              See pricing — from {startingPrice}
              <ArrowUpRight className="cta-arrow h-4 w-4 text-accent" />
            </Link>
          </div>

          {/*
          Promises, not counters.

          This strip previously claimed "50+ Projects Delivered" and "30+ Happy
          Clients". The portfolio holds 8 projects and the testimonials file 3
          clients, so both numbers were unverifiable — and on a page that now
          publishes exact prices beside a promise of fixed quotes, an inflated
          counter undercuts the very thing being sold. Every line below is a
          commitment we can be held to, and the proof itself moved to the client
          strip immediately underneath.

          It also has to be HTML. The photograph's laptop screen makes two of
          these three promises, but it makes them in pixels — unreadable at
          390px, invisible to a screen reader beyond the alt string, and worth
          nothing to a crawler. This strip is where those claims actually exist.
        */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7 lg:mt-8">
            {promises.map((point, i) => (
              <div
                key={point}
                className="animate-fade-in-up flex items-center gap-2.5"
                style={{ animationDelay: `${800 + i * 100}ms` }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-3 w-3 text-accent" />
                </span>
                <span className="text-sm text-slate-300">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The hero carries ambient bloom and orbs that leave its lower edge
          measurably lighter than the flat #0B1121 of the client strip below.
          Fading to its own colour first stops that step showing as a hard line. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-navy" />
    </section>
  );
}
