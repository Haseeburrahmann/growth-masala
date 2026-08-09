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
 * The whole page used to be a client component so that these buttons could hold
 * a string in `useState`. Everything else it rendered was static, and metadata
 * had to live in a sibling `layout.tsx` because a client component cannot export
 * it. Isolating the state here lets the page be a server component; the tab
 * state is not worth a route-wide bundle.
 *
 * Filtering is CSS-free and unconditional — every project is in the HTML on
 * first paint regardless of the active tab, so a crawler (and a visitor whose
 * JS has not run) sees all eight. Filtering to a subset in the markup would put
 * the visible content behind an interaction Googlebot does not perform.
 *
 * Every card is the same card. The bento layout that used to promote the first
 * item to a two-column horizontal slab is gone: the canvas grid is a uniform
 * 4×2, and the featured variant only ever applied in the unfiltered view, so it
 * reflowed the whole grid the moment anyone touched a filter.
 *
 * No `priority` on any image here. The grid sits below a full navy hero, so
 * nothing in it is the LCP element — preloading the first card only made it
 * compete with the hero's own text for bandwidth on the connections this site
 * is built for.
 */
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
    <section className="bg-white py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex flex-wrap gap-2"
        >
          {availableCategories.map((cat) => {
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(cat.key)}
                /* Active state is a filled pill AND a weight change, so it does
                   not depend on colour alone. `min-h-11` keeps the 44px tap
                   target the canvas's 9px padding would otherwise miss. */
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-all sm:px-4.5 ${
                  isActive
                    ? "border-primary bg-primary font-semibold text-white shadow-lg shadow-primary/25"
                    : "border-border bg-white font-medium text-text-secondary hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {portfolioItems.map((item, idx) => {
            const config = portfolioCategoryConfig[item.category];
            const visible = isVisible(item.category);
            /* `category` is a filter bucket, not a caption. Six of eight
               projects are `website`, so keying the card label off it printed
               "Website" six times and told the reader nothing. `item.tag` is
               the per-project label from the design; the config tag stays as
               the fallback so a new item without one still renders. */
            const label = item.tag ?? config.tag;

            return (
              <div
                key={item.title}
                /* `hidden` rather than unmounting: the node stays in the DOM
                   for crawlers and the browser keeps the decoded image, so
                   flipping tabs does not re-fetch eight WebPs. */
                hidden={!visible}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl lg:rounded-[1.25rem]">
                    {/* Fixed-height artwork band, not an aspect ratio: the
                        canvas bands are all one height across a row, and these
                        are full-page site captures — `object-top` keeps the
                        client's own header in frame rather than centring on
                        whatever happens to be mid-page. */}
                    <div className="relative h-39.5 w-full shrink-0 overflow-hidden bg-surface lg:h-42">
                      <Image
                        src={item.image}
                        alt={`${item.title} — ${label.toLowerCase()} built by Growth Masala`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5 lg:p-5.5">
                      <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1.25 text-xs font-semibold text-primary">
                        {label}
                      </span>

                      {/* h2, not h3. The canvas grid has no section heading
                          above it — the filter row replaced it — so an h3 here
                          skipped a level straight from the hero's h1 and left
                          a screen-reader outline with a hole in it. Each
                          project is a top-level item on this page. */}
                      <h2 className="mt-3 font-heading text-[1.0625rem]/[1.375rem] font-semibold tracking-tight text-text-primary">
                        {item.title}
                      </h2>

                      {/* `summary` is written to fit a card; `description` is
                          the long record. Clamp stays as a backstop for any
                          item that has no summary yet. */}
                      <p className="mt-2 line-clamp-3 text-sm leading-5.5 text-text-secondary">
                        {item.summary ?? item.description}
                      </p>

                      {/* `mt-auto` pins the link to the bottom of every card, so
                          the row of links stays on one baseline even though the
                          titles wrap to different heights. */}
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary">
                        Visit the live site
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </article>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
