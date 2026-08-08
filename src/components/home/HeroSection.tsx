import { ArrowRight, ArrowUpRight, Flame, Check, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero.
 *
 * Three constraints shape this section, in order of how much they cost to get
 * wrong.
 *
 * 1. It has to fit one viewport. That is a height budget, not a preference, and
 *    it is spent almost entirely by the headline and the portrait. The headline
 *    lost its third line (see below) and the amber capability panel moved from
 *    sitting BELOW the portrait to overlapping it, which is what the reference
 *    layouts do and what returns ~250px.
 *
 * 2. "in Mahabubnagar" is gone from the <h1>. The homepage <title> still carries
 *    the city, and /digital-marketing-agency-mahabubnagar and
 *    /website-development-mahabubnagar carry exact-match H1s for the queries
 *    that actually convert on it — repeating the city here competes with the
 *    pages built to win it. For a reader it survives three more times above the
 *    fold: the badge on the photo, the subheading, and the promise strip. A
 *    fourth mention in 72px display type was buying nothing and costing a line.
 *
 * 3. No frame around the photograph. A rounded card with a 1px border reads as
 *    a stock image dropped into a template regardless of the photograph's
 *    quality. `.photo-blend` masks every edge to transparent, and the shot is
 *    lit against a near-black backdrop specifically so that mask lands
 *    invisibly against the navy.
 */

const capabilities = [
  "Websites & online stores",
  "SEO & Google Business Profile",
  "Meta & Google Ads",
  "AI chatbots & WhatsApp",
];

const promises = [
  "Fixed quote before any work starts",
  "Prices published — no hidden costs",
  "Based in Mahabubnagar, not a call centre",
];

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

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-12 sm:pt-32 lg:px-8 lg:pt-28 lg:pb-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-14">
          {/* ---------- Left column ---------- */}
          <div>
            <div className="mb-6 animate-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                <Flame className="h-4 w-4 text-accent" />
                Your Growth Partner
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-accent">India</span>
              </span>
            </div>

            {/* One <h1> per page. The visual line breaks are spans — three
                separate <h1> elements is a mistake this project has already
                made once. */}
            <h1 className="font-heading text-[2.6rem] font-bold leading-[1.03] tracking-tight text-balance text-white sm:text-6xl xl:text-7xl">
              <span
                className="block animate-hero-reveal"
                style={{ animationDelay: "150ms" }}
              >
                Websites that get
              </span>
              <span
                className="block animate-hero-reveal"
                style={{ animationDelay: "300ms" }}
              >
                {/* The emphasis mark. Sits under the phrase rather than
                    recolouring it, so the line keeps full white contrast —
                    the blue gradient this replaced measured 3.64:1 on navy.

                    Two nested spans because they animate on different delays:
                    the outer one lifts the words in, the inner one draws the
                    rule 600ms later. The inner must stay a plain inline for
                    `.headline-mark` to draw per line — this phrase wraps at
                    every viewport width. */}
                <span
                  className="headline-mark animate-headline-mark"
                  style={{ animationDelay: "900ms" }}
                >
                  your business found
                </span>
              </span>
            </h1>

            <p
              className="animate-hero-reveal mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ animationDelay: "600ms" }}
            >
              Websites, online stores, SEO, and ads for businesses in{" "}
              <span className="text-white">Mahabubnagar, Hyderabad</span>, and
              across Telangana — with a{" "}
              <span className="text-white">fixed quote before any work starts.</span>
            </p>

            <div
              className="animate-hero-reveal mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              style={{ animationDelay: "700ms" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
              >
                Get a free quote
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <ArrowRight className="cta-arrow h-3.5 w-3.5" />
                </span>
              </Link>
              {/* Publishing prices is itself a trust signal, so the hero says so */}
              <Link
                href="#pricing"
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
              >
                See our pricing
                <ArrowUpRight className="cta-arrow h-4 w-4 text-accent" />
              </Link>
            </div>
          </div>

          {/* ---------- Right column ---------- */}
          <div className="animate-portrait-reveal relative" style={{ animationDelay: "400ms" }}>
            {/* Warm shape behind the subject, so the masked photo has something
                to separate from instead of dissolving into flat navy. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[70px] md:block" />

            {/* Square crop on phones. The shot is head-and-shoulders, so a 4:5
                frame spends 100px on shirt; cropping square reclaims that from
                a hero that cannot fit one viewport on a 390px screen no matter
                what, and loses nothing from the picture. */}
            <div className="photo-blend relative mx-auto aspect-square w-full max-w-sm sm:aspect-4/5 lg:max-w-none">
              <Image
                src="/images/sections/hero-agency.webp"
                alt="A Growth Masala designer, photographed against a dark studio backdrop"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>

            {/* With the city gone from the <h1>, this badge is the locality
                anchor above the fold. Top-right: the amber panel owns the
                bottom-left corner and at bottom-right it was covering this. */}
            <div className="absolute right-0 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/80 px-3 py-1.5 backdrop-blur-sm sm:right-2 lg:top-8">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-semibold tracking-wide text-white">
                Mahabubnagar, Telangana
              </span>
            </div>

            {/* Amber capability panel. Overlaps the portrait rather than sitting
                under it — that is the reference move, and it is also what buys
                back the ~250px the section needs to hold one viewport. Absolute
                only from lg up; on a phone it would cover the subject's face, so
                below that it drops back into the flow. */}
            <div
              className="animate-fade-in-up relative z-10 -mt-10 rounded-2xl bg-accent p-5 shadow-2xl shadow-accent/25 sm:-mt-14 sm:p-6 lg:absolute lg:-left-10 lg:bottom-2 lg:mt-0 lg:w-[86%] xl:-left-16"
              style={{ animationDelay: "900ms" }}
            >
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-navy/75">
                What we build
              </p>
              <ul className="mt-3 grid gap-2.5">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-navy" strokeWidth={3} />
                    <span className="font-heading text-sm font-semibold text-navy sm:text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

      {/* The hero carries ambient bloom and orbs that leave its lower edge
          measurably lighter than the flat #0B1121 of the client strip below.
          Fading to its own colour first stops that step showing as a hard line. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-navy" />
    </section>
  );
}
