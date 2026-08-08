"use client";

import { Search, PenTool, Zap, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useInView } from "@/lib/useInView";

/**
 * How the work actually runs.
 *
 * This section's job is de-risking, not persuasion. Someone about to spend
 * ₹19,000 with a company they found on Google needs to know what happens, in
 * what order, and when they are allowed to say no. "Fixed quote before any work
 * starts" is the single most reassuring sentence on the page, so it gets its
 * own emphasis rather than being buried in step two.
 *
 * Navy ground: this is the mid-page dark anchor in the light/dark rhythm, and it
 * makes the process read as a system rather than a promise.
 */
const steps = [
  {
    icon: Search,
    step: 1,
    title: "Discovery",
    description:
      "We learn your business, your customers, and who you are competing with locally. Usually one conversation.",
  },
  {
    icon: PenTool,
    step: 2,
    title: "Fixed quote",
    description:
      "You get the scope and the price in writing before anyone starts. Nothing changes without you agreeing to it first.",
  },
  {
    icon: Zap,
    step: 3,
    title: "Build",
    description:
      "We design, write, and build — showing you progress as it happens, not only at the end.",
  },
  {
    icon: TrendingUp,
    step: 4,
    title: "Launch & grow",
    description:
      "We go live, hand over the keys, and stay reachable. What we learn feeds the next round.",
  },
];

export default function ProcessSection() {
  // Drives the connector line drawing itself as the section scrolls into view.
  const { ref, isInView } = useInView("-120px");

  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Background layers — mirror the hero so the two dark sections feel related */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute -top-24 left-1/2 hidden h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[110px] md:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-white/20" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              How we work
            </span>
            <div className="h-px w-8 bg-white/20" />
          </div>
          <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Four steps, and you approve the price{" "}
            <span className="text-slate-400">at step two</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            No open-ended hourly billing, and no invoice at the end that is larger
            than the one you agreed to.
          </p>
        </AnimatedContainer>

        <div ref={ref} className="relative mt-20">
          {/* Connector — draws itself left to right as the section enters view */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px lg:block">
            <div
              className={`h-full origin-left bg-linear-to-r from-primary/50 via-secondary/40 to-accent/50 ${
                isInView ? "animate-draw-line" : "scale-x-0"
              }`}
            />
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((item, idx) => (
              <AnimatedContainer key={item.step} delay={idx * 140}>
                <div className="group relative text-center">
                  <div className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110" />
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-full border transition-colors duration-300 ${
                        item.step === 4
                          ? "border-accent/40 bg-accent/10"
                          : "border-white/10 bg-white/5 group-hover:border-primary/50"
                      }`}
                    >
                      <item.icon
                        className={`h-6 w-6 ${
                          item.step === 4 ? "text-accent" : "text-primary"
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                        item.step === 4
                          ? "bg-accent text-navy"
                          : "bg-primary text-white"
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Mid-page conversion point — the page's only soft CTA */}
        <AnimatedContainer className="mt-20" animation="fade-in" delay={200}>
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm md:grid-cols-[minmax(0,320px)_1fr]">
            {/* A real consultation, not an icon. Section 05 is about reducing
                risk, and showing what the meeting actually looks like does more
                for that than any adjective. */}
            <div className="hover-zoom relative h-48 overflow-hidden md:h-full md:min-h-[220px]">
              <Image
                src="/images/sections/consultation.webp"
                alt="Two people reviewing a project plan across a table"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-linear-to-r from-navy/30 to-navy/70 md:from-transparent md:to-navy/80" />
            </div>

            <div className="flex flex-col items-start gap-5 px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <div>
                <p className="font-heading text-lg font-bold text-white sm:text-xl">
                  Not sure what you actually need?
                </p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-400">
                  A free 20-minute call. We will tell you honestly if you do not
                  need us yet.
                </p>
              </div>
              {/* Pill CTA with a circular arrow badge — the button treatment
                  both reference sites use. */}
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-navy transition-all hover:bg-accent"
              >
                Book the call
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition-colors group-hover:bg-navy">
                  <ArrowRight className="cta-arrow h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
