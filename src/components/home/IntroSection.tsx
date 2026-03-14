"use client";

import { Target, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const pillars = [
  {
    icon: Target,
    number: "01",
    title: "Strategy First",
    description:
      "Every campaign starts with research and a clear strategy tailored to your business goals and market.",
    color: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Creative Execution",
    description:
      "Eye-catching designs and compelling content that make your brand impossible to scroll past.",
    color: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Measurable Results",
    description:
      "Transparent reporting and real metrics so you always know exactly what your investment delivers.",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
];

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Dot pattern background */}
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Asymmetric header — left-aligned with large text */}
        <div className="mb-20 grid items-end gap-8 lg:grid-cols-2">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Why Growth Masala
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-[3.25rem]">
              Growth is Not Luck.
              <br />
              <span className="text-gradient">It&apos;s Strategy.</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer delay={120}>
            <p className="max-w-lg text-lg leading-relaxed text-text-secondary lg:ml-auto">
              We combine creativity with data to build marketing that actually
              works. No fluff, no vanity metrics — just real business growth
              you can measure.
            </p>
          </AnimatedContainer>
        </div>

        {/* Cards — editorial numbered layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <AnimatedContainer key={pillar.title} delay={idx * 120}>
              <div
                className={`group relative h-full overflow-hidden rounded-2xl bg-gradient-to-b ${pillar.color} p-8 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                {/* Large watermark number */}
                <span className="pointer-events-none absolute -right-2 -top-4 font-heading text-[8rem] font-bold leading-none text-black/[0.03]">
                  {pillar.number}
                </span>

                <div className="relative">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${pillar.iconBg}`}>
                    <pillar.icon className={`h-6 w-6 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
