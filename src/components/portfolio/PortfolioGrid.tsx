"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  portfolioItems,
  portfolioCategoryConfig,
  portfolioCategories,
} from "@/data/portfolio";

/**
 * The filterable project grid — the only part of /portfolio that needs a
 * bundle, which is why it is the only part still carrying `"use client"`.
 *
 * The whole page used to be a client component so that these three buttons
 * could hold a string in `useState`. Everything else it rendered was static,
 * and metadata had to live in a sibling `layout.tsx` because a client component
 * cannot export it. Isolating the state here lets the page be a server
 * component; the tab state is not worth a route-wide bundle.
 *
 * Filtering is CSS-free and unconditional — every project is in the HTML on
 * first paint regardless of the active tab, so a crawler (and a visitor whose
 * JS has not run) sees all eight. Filtering to a subset in the markup would put
 * the visible content behind an interaction Googlebot does not perform.
 *
 * No `priority` on any image here. The grid sits below a full navy hero, so
 * nothing in it is the LCP element — preloading the first card only made it
 * compete with the hero's own text for bandwidth on the connections this site
 * is built for.
 */

function domainOf(link?: string) {
  if (!link) return null;
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Only show tabs that actually have projects. Two of the four categories in
  // `portfolioCategories` have no items yet; rendering them produced tabs that
  // emptied the grid when clicked, which reads as a broken page rather than as
  // an honest "nothing here yet".
  const availableCategories = portfolioCategories.filter(
    (cat) =>
      cat.key === "all" || portfolioItems.some((i) => i.category === cat.key),
  );

  const isVisible = (category: string) =>
    activeFilter === "all" || activeFilter === category;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="mb-12 flex flex-wrap gap-2.5"
        >
          {availableCategories.map((cat) => {
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(cat.key)}
                className={`inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
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

        {/* Bento grid — the first project spans two columns. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, idx) => {
            const config = portfolioCategoryConfig[item.category];
            const Icon = config.icon;
            const domain = domainOf(item.link);
            const visible = isVisible(item.category);
            /* Featured only in the unfiltered view. The featured card is a
               two-column horizontal layout; inside a filtered single-column
               slot it renders cramped and misaligned against its neighbours,
               so a filtered first item falls back to the standard card. */
            const isFeatured = idx === 0 && activeFilter === "all";

            return (
              <div
                key={item.title}
                /* `hidden` rather than unmounting: the node stays in the DOM
                   for crawlers and the browser keeps the decoded image, so
                   flipping tabs does not re-fetch eight WebPs. */
                hidden={!visible}
                className={`animate-fade-in-up ${isFeatured ? "md:col-span-2" : ""}`}
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
                          alt={`${item.title} — ${config.tag.toLowerCase()} built by Growth Masala`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 66vw"
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
                          alt={`${item.title} — ${config.tag.toLowerCase()} built by Growth Masala`}
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
      </div>
    </section>
  );
}
