"use client";

import { SearchX, Clock, ShieldAlert } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * The cost of the status quo.
 *
 * Deliberately contains zero mentions of Growth Masala. This section's only job
 * is to make the reader recognise their own situation — the moment it starts
 * talking about us, it stops doing that job and becomes another pitch.
 *
 * Each card is one concrete local failure, not an abstract statistic.
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
        <AnimatedContainer className="max-w-3xl">
          <div className="mb-5 h-1 w-12 rounded-full bg-accent" />
          <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            Someone nearby is searching for what you sell right now
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            They are going to find somebody. The only question is whether it is
            you or the shop down the road.
          </p>
        </AnimatedContainer>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problems.map((problem, idx) => (
            <AnimatedContainer key={problem.title} delay={idx * 120}>
              <div className="hover-lift group h-full rounded-xl border border-border bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 transition-colors duration-300 group-hover:bg-primary/15">
                  <problem.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-text-primary">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {problem.body}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer className="mt-14 max-w-2xl" animation="fade-in" delay={200}>
          <p className="border-l-2 border-primary/30 pl-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            None of this is really a marketing problem. It is a{" "}
            <span className="font-semibold text-text-primary">
              being-findable problem
            </span>{" "}
            — and unlike most business problems, it is one you can fix in a few
            weeks.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
