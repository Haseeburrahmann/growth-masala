"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { portfolioItems, portfolioCategoryConfig, portfolioCategories } from "@/data/portfolio";

function domainOf(link?: string) {
  if (!link) return null;
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Only show filter tabs that actually have projects (no dead/empty tabs).
  const availableCategories = portfolioCategories.filter(
    (cat) =>
      cat.key === "all" || portfolioItems.some((i) => i.category === cat.key)
  );

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow hidden md:block absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-secondary/20 blur-[90px]" />
          <div className="animate-float hidden md:block absolute top-24 right-[6%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
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

            {/* Stat row */}
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <div>
                <p className="font-heading text-3xl font-bold text-white">
                  {portfolioItems.length}+
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  Live Projects
                </p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-heading text-3xl font-bold text-white">
                  {availableCategories.length - 1}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  Categories
                </p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-heading text-3xl font-bold text-white">100%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  Client Owned
                </p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Portfolio grid */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="mb-12 flex flex-wrap gap-2.5">
            {availableCategories.map((cat) => {
              const isActive = activeFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveFilter(cat.key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "border border-border bg-white text-text-secondary hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Bento grid: first item featured (spans 2 cols) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => {
              const config = portfolioCategoryConfig[item.category];
              const Icon = config.icon;
              const domain = domainOf(item.link);
              const isFeatured = idx === 0;

              return (
                <div
                  key={item.title}
                  className={`animate-fade-in-up ${
                    isFeatured ? "md:col-span-2" : ""
                  }`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {isFeatured ? (
                      /* ── Featured card — horizontal ───────────────── */
                      <article className="group grid h-full overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-2xl sm:grid-cols-2">
                        <div className="relative aspect-16/10 overflow-hidden sm:aspect-auto sm:min-h-80">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                            priority
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent" />
                          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-text-primary shadow-sm backdrop-blur-sm">
                            <Icon className="h-3 w-3 text-primary" />
                            {config.tag}
                          </span>
                        </div>
                        <div className="flex flex-col justify-center p-8 sm:p-10">
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                            Featured Project
                          </span>
                          <h3 className="mt-4 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-base leading-relaxed text-text-secondary">
                            {item.description}
                          </p>
                          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-primary/25">
                              Visit Live Site
                              <ArrowUpRight className="h-4 w-4 shrink-0" />
                            </span>
                            {domain && (
                              <span className="text-sm font-medium text-text-secondary">
                                {domain}
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    ) : (
                      /* ── Standard card ────────────────────────────── */
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
                        <div className="relative aspect-16/10 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-text-primary shadow-sm backdrop-blur-sm">
                            <Icon className="h-3 w-3 text-primary" />
                            {config.tag}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-heading text-lg font-bold text-text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                            {item.description}
                          </p>
                          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                            <span className="truncate text-xs font-medium text-text-secondary">
                              {domain}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                              Visit
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </div>
                      </article>
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          {/* CTA band */}
          <AnimatedContainer className="mt-20" animation="fade-in">
            <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-center sm:p-14">
              <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-[90px]" />
              <div className="relative">
                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Have a project in mind?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base text-slate-400">
                  Let&apos;s build something your customers will love — and your
                  competitors will envy.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </>
  );
}
