"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { portfolioItems, portfolioCategoryConfig, portfolioCategories } from "@/data/portfolio";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="hidden md:block absolute -top-32 left-[10%] h-72 w-72 rounded-full bg-secondary/15 blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Portfolio
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Our <span className="text-gradient">Work</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Real projects, real results. Browse our portfolio to see the impact
              we&apos;ve created for businesses like yours.
            </p>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Portfolio grid */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="mb-12 flex flex-wrap gap-2">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeFilter === cat.key
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-text-secondary hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => {
              const config = portfolioCategoryConfig[item.category];
              const Icon = config.icon;

              return (
                <div
                  key={item.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className={`group relative h-full overflow-hidden rounded-2xl bg-linear-to-br ${config.gradient} transition-all duration-250 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      {/* Project image */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div className="relative p-6">
                        <Icon className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 text-black/3" />
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                          <Icon className="h-3 w-3" />
                          {portfolioCategories.find((c) => c.key === item.category)?.label}
                        </span>
                        <h3 className="mt-4 font-heading text-xl font-bold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
                          Visit Live Site
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
