import { Check, FileCheck, Info, UserCheck } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * The four rules.
 *
 * Each one names something specific this business does, and something it costs
 * us — a fixed number before work starts, no handover to a junior, full
 * ownership at the end, and a willingness to talk a client out of a sale. A
 * value that cannot be falsified ("we treat your business like our own") is
 * decoration; a reader can check every one of these against the rest of the
 * site.
 */
const principles = [
  {
    icon: FileCheck,
    title: "A fixed price, before anything starts",
    description:
      "Scope and number in writing. If the scope changes you approve a new number. No hourly billing, no surprise invoice at the end.",
  },
  {
    icon: UserCheck,
    title: "The person who quotes it builds it",
    description:
      "No quiet handover to a junior once you have paid. You have a direct line to whoever is doing the work.",
  },
  {
    icon: Check,
    title: "You own everything at the end",
    description:
      "Domain, hosting, admin logins — all handed over. If you ever leave, you leave with the site.",
  },
  {
    icon: Info,
    title: "We will tell you not to buy",
    description:
      "If ads will not pay back yet, or a care plan beats a rebuild, we say so. Losing one sale beats losing a client.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Built inline rather than with <SectionHeading>: this heading is a
            two-line title whose second line is muted, with the standfirst
            beside it rather than beneath it. SectionHeading renders one title
            string and stacks its description, and it is owned by another
            component boundary — so the markup lives here. */}
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              How we work
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:w-180 lg:shrink-0 lg:text-[2.875rem] lg:leading-13">
              <span className="block">Four rules</span>
              <span className="block text-text-secondary/75">
                we do not bend.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-[17px] sm:leading-[1.65]">
              None of these are unusual. They are just uncommon enough locally
              that they are worth writing down.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {principles.map((principle, idx) => (
            <AnimatedContainer key={principle.title} delay={idx * 100}>
              <div className="hover-lift h-full rounded-2xl border border-border bg-white p-6 lg:p-6.5">
                <div className="inline-flex h-10.5 w-10.5 items-center justify-center rounded-xl bg-primary/10">
                  <principle.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                  />
                </div>
                <h3 className="mt-4.5 font-heading text-lg font-semibold leading-snug tracking-tight text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                  {principle.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
