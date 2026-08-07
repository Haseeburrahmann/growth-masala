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
 * Layout follows the reference: an organic image cluster anchoring the left,
 * text and failure modes on the right. The cluster is a tall stadium-shaped
 * capsule with a circle overlapping its lower corner, sitting inside two thin
 * concentric rings. Rectangles here would read as a stock-photo grid; the
 * capsule is what makes the composition look drawn rather than assembled.
 *
 * On the photographs — the previous version used a shuttered, empty shopfront.
 * It was atmospheric and it said nothing: a closed shop reads as "closed", not
 * as "invisible online", and nobody in the picture wanted anything. These two
 * carry the actual argument. The capsule holds the owner who is open and
 * waiting; the circle holds the customer, out on the street, searching on a
 * phone for exactly what he sells. Two halves of a transaction that is not
 * happening, and the reason is the gap between the frames.
 *
 * The section stays light. The reference is dark, but the hero and the client
 * strip above it are both navy, and a third dark block would erase the boundary
 * that makes them read as separate rooms. The composition is the borrowed part,
 * not the palette.
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
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------- Image cluster ---------- */}
          <AnimatedContainer
            animation="slide-in-left"
            className="order-last lg:order-first"
          >
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              {/* Concentric rings. Decorative, desktop only — at phone widths
                  they crowd the capsule instead of framing it. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-text-secondary/12 sm:block"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-text-secondary/10 sm:block"
              />

              {/* Stadium capsule — the owner, open and waiting.
                  Explicit pixel radii, not `rounded-full`. On a non-square box
                  a 9999px radius clamps to 50% of BOTH axes, which produces an
                  ellipse — curved everywhere, straight nowhere. A stadium needs
                  the radius to equal half the width, so the sides run straight
                  and only the ends round off. Each value below is half the
                  rendered width at that breakpoint. */}
              <div className="hover-zoom relative aspect-3/6 w-[58%] overflow-hidden rounded-[125px] lg:rounded-[165px]">
                <Image
                  src="/images/sections/hero-owner.webp"
                  alt="A shop owner behind his counter in Mahabubnagar, phone in hand, waiting for customers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 70vw, 340px"
                />
              </div>

              {/* Circle — the customer, out on the street, searching */}
              <div className="hover-zoom absolute bottom-6 right-2 aspect-square w-[42%] overflow-hidden rounded-full border-[6px] border-surface sm:bottom-14 lg:right-8">
                <Image
                  src="/images/sections/search-phone.webp"
                  alt="A customer on a Mahabubnagar market street searching for a shop on his phone"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 200px"
                />
              </div>
            </div>
          </AnimatedContainer>

          {/* ---------- Failure modes ---------- */}
          <div>
            <AnimatedContainer>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rotate-45 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  The problem
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-text-primary text-balance sm:text-4xl lg:text-5xl">
                Someone nearby is searching for what you sell{" "}
                <span className="text-text-secondary/45">right now</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                They are going to find somebody. The only question is whether it
                is you or the shop down the road.
              </p>
            </AnimatedContainer>

            <div className="mt-9 flex flex-col divide-y divide-border">
              {problems.map((problem, idx) => (
                <AnimatedContainer key={problem.title} delay={idx * 110}>
                  <div className="group flex gap-4 py-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy transition-colors duration-300 group-hover:bg-accent">
                      <problem.icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-navy" />
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

            {/* The turn from problem to solvable problem, and the one line in
                this section allowed to sound hopeful — so it gets a filled amber
                tint rather than the coloured left stripe it used to carry. */}
            <AnimatedContainer animation="fade-in" delay={200}>
              <p className="mt-7 rounded-xl bg-accent/10 px-5 py-4 text-base leading-relaxed text-text-secondary">
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
