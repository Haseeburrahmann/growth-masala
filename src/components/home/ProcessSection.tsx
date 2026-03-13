"use client";

import { Search, PenTool, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const steps = [
  {
    icon: Search,
    step: 1,
    title: "Discovery",
    description:
      "We learn about your business, goals, audience, and competitors to build a solid foundation.",
    accent: "bg-primary",
  },
  {
    icon: PenTool,
    step: 2,
    title: "Strategy",
    description:
      "We craft a custom marketing plan with clear milestones, KPIs, and a realistic timeline.",
    accent: "bg-secondary",
  },
  {
    icon: Zap,
    step: 3,
    title: "Execution",
    description:
      "Our team brings the strategy to life — building, launching, and optimising every campaign.",
    accent: "bg-accent",
  },
  {
    icon: TrendingUp,
    step: 4,
    title: "Growth",
    description:
      "We analyse results, double down on what works, and continuously scale your success.",
    accent: "bg-emerald-500",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="Four Steps to Your Growth"
          description="A proven process that turns your marketing investment into measurable, compounding business growth."
        />

        <motion.div
          className="relative mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connecting line (desktop) */}
          <div className="absolute top-[60px] left-[calc(12.5%)] right-[calc(12.5%)] hidden h-px bg-gradient-to-r from-primary/20 via-accent/20 to-emerald-500/20 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <AnimatedContainer key={item.step} variants={fadeInUp}>
                <div className="group relative text-center">
                  {/* Step circle */}
                  <div className="relative mx-auto mb-8 flex h-[120px] w-[120px] items-center justify-center">
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full ${item.accent} opacity-[0.06]`} />
                    <div className={`absolute inset-3 rounded-full ${item.accent} opacity-[0.08]`} />
                    {/* Inner circle */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/5 transition-transform group-hover:scale-110">
                      <item.icon className={`h-6 w-6 ${
                        item.step === 1 ? "text-primary" :
                        item.step === 2 ? "text-secondary" :
                        item.step === 3 ? "text-accent" :
                        "text-emerald-500"
                      }`} />
                    </div>
                    {/* Step number badge */}
                    <div className={`absolute -right-1 top-2 flex h-7 w-7 items-center justify-center rounded-full ${item.accent} text-xs font-bold text-white shadow-md`}>
                      {item.step}
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[240px] text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
