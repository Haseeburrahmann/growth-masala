"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";

/**
 * How the work actually runs.
 *
 * This section's job is de-risking, not persuasion. Someone about to spend
 * ₹19,000 with a company they found on Google needs to know what happens, in
 * what order, and when they are allowed to say no. That is why the approval
 * point is in the headline rather than buried in step two.
 *
 * The steps carry numerals only. They used to carry a lucide icon as well —
 * a magnifier for Discovery, a pen for Build — and the icons were decoration
 * pretending to be information: four abstract glyphs that no reader decodes
 * faster than the word underneath them. The numeral is the one mark that
 * actually carries meaning here, because the order is the argument.
 *
 * The connector is a plain rule between markers, not the left-to-right draw it
 * was. That animation needed `useInView` in this file purely to time a
 * decorative line, and it only ever ran at `lg` — a client hook and a keyframe
 * for a hairline four people a month would see mid-scroll.
 *
 * The ground is `surface`, not navy. Losing the mid-page dark block is a real
 * cost to the scroll rhythm; it is paid back by Why-us, which is navy, runs
 * full-bleed and now reads as the only dark room in the lower half instead of
 * the second of three.
 */
const steps = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We learn your business, your customers and who you compete with locally. Usually one conversation.",
  },
  {
    step: 2,
    title: "Fixed quote",
    description:
      "Scope and price in writing before anyone starts. Nothing changes without your say-so.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "We design, write and build — showing progress as it happens, not only at the end.",
  },
  {
    step: 4,
    title: "Launch & handover",
    description:
      "We go live and hand over every login — domain, hosting, admin. The site is yours, not ours.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          eyebrow="How we work"
          lead="Four steps. You approve"
          trail="the price at step two."
          standfirst="No hourly billing. No scope creep. No invoice bigger than the number you agreed to."
        />

        {/* Four across from `lg`, two-up at `sm`, one column on a phone. The
            connector runs horizontally between markers on the wide layouts and
            is dropped entirely when the steps stack — a rule pointing sideways
            out of a column that continues downwards is a lie about direction. */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((item, idx) => (
            <AnimatedContainer key={item.step} delay={idx * 120}>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full font-heading text-base font-bold ${
                      item.step === 1
                        ? "bg-primary text-white"
                        : "border border-border bg-white text-text-primary"
                    }`}
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                  {/* Decorative. The last step ends the run, so it gets none. */}
                  {idx < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-0.5 flex-1 rounded-full bg-border sm:block"
                    />
                  )}
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* Mid-page conversion point — the page's only soft CTA.
            A real consultation, not an icon: this section is about reducing
            risk, and showing what the meeting actually looks like does more for
            that than any adjective. The scrim runs left-to-right so the copy
            sits on near-solid navy while the right of the frame stays a
            photograph. */}
        <AnimatedContainer className="mt-14 lg:mt-16" animation="fade-in" delay={150}>
          <div className="relative overflow-hidden rounded-3xl bg-navy">
            <Image
              src="/images/sections/consultation.webp"
              alt="Two people reviewing a project plan across a table"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/80 to-navy/40" />

            <div className="relative flex flex-col gap-6 px-6 py-9 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-xl">
                <p className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                  Not sure what you actually need?
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  Tell us the problem in one message — WhatsApp is fine. We will
                  say what we would do and what it costs.
                </p>
              </div>

              {/* Pill CTA with a circular arrow badge — the button treatment the
                  canvas uses for every primary action below the hero. */}
              <Link
                href="/contact"
                className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-primary py-1.5 pl-7 pr-1.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark lg:self-auto"
              >
                Get a fixed quote
                <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="cta-arrow h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
