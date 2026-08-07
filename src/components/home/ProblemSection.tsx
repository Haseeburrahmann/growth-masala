"use client";

import Image from "next/image";
import { SearchX, Clock, ShieldAlert } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * The cost of the status quo.
 *
 * Deliberately contains zero mentions of Growth Masala. This section's only job
 * is to make the reader recognise their own situation — the moment it starts
 * talking about us, it stops doing that job and becomes another pitch.
 *
 * Layout follows the reference pattern: a real photograph anchoring one column
 * with a solid accent slab overlapping it, against a tight stack of failure
 * modes in the other. The previous version was three equal cards floating in
 * white space, which is what made the section read as empty.
 */
const problems = [
  {
    icon: SearchX,
    title: "They search. Someone else shows up.",
    body: "Local buying starts on Google and Instagram. With no page to land on, you are not losing the comparison — you were never in it.",
  },
  {
    icon: Clock,
    title: "They message. Nobody replies.",
    body: "An enquiry that waits until Monday was answered by someone else on Saturday. Most small businesses lose more leads to slow replies than to price.",
  },
  {
    icon: ShieldAlert,
    title: "They look you up. And hesitate.",
    body: "No website, no reviews, no address they can check. For anything costing real money, an unfamiliar name without proof is a risk people quietly walk away from.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photograph + accent slab */}
          <AnimatedContainer animation="slide-in-left" className="order-last lg:order-first">
            <div className="relative">
              <div className="hover-zoom relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/images/sections/problem.webp"
                  alt="A small shop open for business on a quiet street with no customers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/45 to-transparent" />
              </div>

              {/* Solid accent slab, overlapping the photo */}
              <div className="relative z-10 -mt-12 ml-6 mr-6 rounded-xl bg-navy p-6 shadow-2xl sm:-mt-14 sm:ml-10 sm:mr-14">
                <p className="font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                  Open six days a week.
                  <span className="text-accent"> Invisible online.</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  The shop is fine. The problem is that nobody searching for it
                  can find it.
                </p>
              </div>
            </div>
          </AnimatedContainer>

          {/* Failure modes */}
          <div>
            <AnimatedContainer>
              <div className="mb-5 h-1 w-12 rounded-full bg-accent" />
              <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-text-primary text-balance sm:text-4xl lg:text-5xl">
                Someone nearby is searching for what you sell{" "}
                <span className="text-text-secondary/45">right now</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                They are going to find somebody. The only question is whether it
                is you or the shop down the road.
              </p>
            </AnimatedContainer>

            <div className="mt-10 flex flex-col divide-y divide-border">
              {problems.map((problem, idx) => (
                <AnimatedContainer key={problem.title} delay={idx * 110}>
                  <div className="group flex gap-4 py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/8 transition-colors duration-300 group-hover:bg-primary/15">
                      <problem.icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-text-primary">
                        {problem.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                        {problem.body}
                      </p>
                    </div>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            <AnimatedContainer animation="fade-in" delay={200}>
              <p className="mt-8 border-l-2 border-accent pl-5 text-base leading-relaxed text-text-secondary">
                None of this is really a marketing problem. It is a{" "}
                <span className="font-semibold text-text-primary">
                  being-findable problem
                </span>{" "}
                — and unlike most business problems, it is one you can fix in a
                few weeks.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
