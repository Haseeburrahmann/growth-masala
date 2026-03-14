"use client";

import { Flame, Target, Heart, Lightbulb, Zap } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every strategy is tied to measurable business outcomes. No vanity metrics.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "We treat your business like our own. Your growth is our reputation.",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solving",
    description: "We think beyond templates and cookie-cutter solutions for every challenge.",
  },
  {
    icon: Zap,
    title: "Speed & Agility",
    description: "Fast execution, rapid iteration, and the flexibility to pivot when data tells us to.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[30%] h-125 w-125 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute -bottom-32 right-[10%] h-75 w-75 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About Us
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              The Team Behind{" "}
              <span className="text-gradient">Your Growth</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              We&apos;re a team of digital marketers, designers, and strategists who
              believe every business deserves marketing that actually works.
            </p>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Story */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <AnimatedContainer>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary/30" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Our Story
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Born from a simple belief: marketing should{" "}
                <span className="text-gradient">deliver results.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  Growth Masala started with a frustration — watching businesses pour
                  money into marketing that didn&apos;t work. Generic strategies, vanity
                  metrics, and agencies that cared more about contracts than
                  conversions.
                </p>
                <p>
                  We decided to do things differently. Every campaign we run is
                  rooted in data, tailored to the business, and measured by real
                  outcomes — leads, revenue, and growth.
                </p>
                <p>
                  The name &ldquo;Masala&rdquo; reflects our approach: we blend the right
                  ingredients — strategy, creativity, and technology — to create
                  something that has real flavour and impact.
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={120}>
              <div className="relative rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 p-10">
                <Flame className="pointer-events-none absolute -right-4 -bottom-4 h-32 w-32 text-primary/5" />
                <div className="relative space-y-8">
                  {[
                    { value: "50+", label: "Projects Delivered" },
                    { value: "30+", label: "Happy Clients" },
                    { value: "3x", label: "Average Growth Rate" },
                    { value: "95%", label: "Client Retention" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-4">
                      <span className="font-heading text-4xl font-bold text-primary">
                        {stat.value}
                      </span>
                      <span className="text-sm text-text-secondary">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            description="The principles that guide every decision, campaign, and conversation at Growth Masala."
          />

          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <AnimatedContainer key={value.title} delay={idx * 120}>
                <div className="h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:shadow-lg">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <AnimatedContainer>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Flame className="h-7 w-7 text-accent" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Our mission is simple
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-400">
              &ldquo;To be the growth partner every ambitious business deserves — delivering
              marketing that is honest, effective, and built on real data.&rdquo;
            </p>
          </AnimatedContainer>
        </div>
      </section>
    </>
  );
}
