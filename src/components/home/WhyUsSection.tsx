"use client";

import { MapPin, UserCheck, FileCheck, Bot, Check } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * Differentiation by comparison, not by adjective.
 *
 * The reader is not choosing between us and nothing — they are choosing between
 * us, a Hyderabad agency, a freelancer, and a relative who "knows computers".
 * Naming those options directly is more persuasive than a list of qualities we
 * assert about ourselves.
 *
 * Every claim here has to be provable. An unprovable differentiator is worse
 * than none, because the first one that turns out to be false discredits the
 * rest.
 */
const pillars = [
  {
    icon: MapPin,
    title: "We are actually here",
    body: "A Mahabubnagar address, a phone number that gets answered, and meetings in person — in Telugu, Hindi, or English.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "You get the senior person",
    body: "Whoever scopes your project builds it. Nothing quietly moves to a trainee once the contract is signed.",
    accent: false,
  },
  {
    icon: FileCheck,
    title: "Fixed quote before anything starts",
    body: "You approve a scope and a number in writing. No hourly creep, no larger invoice waiting at the end.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI and automation nobody else here offers",
    body: "Chatbots, WhatsApp automation, and voice agents — running on this very site. The assistant in the corner is ours; try it.",
    accent: true,
  },
];

const comparisons = [
  {
    option: "A Hyderabad agency",
    usually: "Large retainers, and you are a small account handed to juniors",
    ours: "Senior attention and a direct line — no account-manager relay",
  },
  {
    option: "A freelancer",
    usually: "Fine until they stop replying halfway through the build",
    ours: "A registered business with an address you can walk into",
  },
  {
    option: "Someone's nephew",
    usually: "Costs nothing, and is still unfinished a year later",
    ours: "A fixed timeline with a launch date agreed in writing",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why us
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            You have four options. Here is the honest comparison.
          </h2>
        </AnimatedContainer>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Pillars */}
          <div className="flex flex-col gap-6">
            {pillars.map((pillar, idx) => (
              <AnimatedContainer key={pillar.title} delay={idx * 100} animation="slide-in-left">
                <div className="flex gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                      pillar.accent ? "bg-accent/15" : "bg-primary/8"
                    }`}
                  >
                    <pillar.icon
                      className={`h-5 w-5 ${pillar.accent ? "text-accent" : "text-primary"}`}
                    />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>

          {/* Comparison */}
          <AnimatedContainer animation="slide-in-right" delay={120}>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <div className="border-b border-border bg-navy px-6 py-4">
                <p className="font-heading text-sm font-semibold text-white">
                  What the alternatives actually look like
                </p>
              </div>

              <div className="divide-y divide-border">
                {comparisons.map((row) => (
                  <div key={row.option} className="px-6 py-5">
                    <p className="font-heading text-[15px] font-bold text-text-primary">
                      {row.option}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {row.usually}
                    </p>
                    <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-relaxed text-text-primary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {row.ours}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border bg-surface px-6 py-4">
                <p className="text-sm leading-relaxed text-text-secondary">
                  The fourth option is doing nothing — which costs nothing today,
                  and a few customers every week.
                </p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
