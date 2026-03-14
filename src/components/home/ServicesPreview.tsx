"use client";

import { Globe, TrendingUp, BarChart3, ArrowUpRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  TrendingUp,
  BarChart3,
};

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Accent orb */}
      <div className="pointer-events-none hidden md:block absolute top-0 left-1/2 h-72 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="Everything You Need to Grow Online"
          description="From building your digital presence to driving qualified leads — end-to-end marketing solutions tailored to your goals."
          dark
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <AnimatedContainer key={service.title} delay={idx * 120}>
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-250 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/6"
                >
                  {/* Service number */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="h-6 w-6 text-slate-300 transition-colors group-hover:text-primary" />
                    </div>
                    <span className="font-heading text-5xl font-bold text-white/[0.04]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>

                  {/* Feature tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500 transition-colors group-hover:border-primary/20 group-hover:text-slate-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore service
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>

        <AnimatedContainer className="mt-12 text-center" animation="fade-in">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
          >
            View All Services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
