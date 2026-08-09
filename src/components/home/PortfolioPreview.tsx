"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";
import { portfolioItems, portfolioCategoryConfig } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";

/**
 * Projects, each carrying its own client's testimonial.
 *
 * The three clients who gave testimonials — Triveni, Kings Mobile World, and
 * Freewings — are also portfolio items. A quote sitting beside the site it is
 * actually about is far more credible than the same quote floating in a
 * carousel, and it solves the volume problem: three testimonials is thin for a
 * section of its own but exactly right as project-card evidence.
 *
 * This is why there is no separate testimonials section on the homepage.
 *
 * ⚠️ The quotes, names and roles are real, named clients (see the note at the
 * top of `src/data/testimonials.ts`). Nothing here trims, paraphrases or
 * re-attributes them — the card renders `testimonial.quote` whole, and a card
 * too short for it grows rather than clamping.
 */

/** Testimonials keyed by the company name, which matches the portfolio title. */
const testimonialByCompany = new Map(
  testimonials.map((testimonial) => [testimonial.company, testimonial])
);

/**
 * Prefer projects that have a quote, then backfill with the rest so the row is
 * always full even if a testimonial is removed later.
 */
const withQuotes = portfolioItems.filter((item) =>
  testimonialByCompany.has(item.title)
);
const withoutQuotes = portfolioItems.filter(
  (item) => !testimonialByCompany.has(item.title)
);
const featured = [...withQuotes, ...withoutQuotes].slice(0, 3);

export default function PortfolioPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          eyebrow="Work you can check"
          lead="Real businesses."
          trail="Live sites. Named clients."
          standfirst="Every site below is live right now — open any of them. Every quote is from the client who paid."
        />

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {featured.map((item, idx) => {
            const config = portfolioCategoryConfig[item.category];
            const testimonial = testimonialByCompany.get(item.title);

            return (
              <AnimatedContainer key={item.title} delay={idx * 120} className="h-full">
                <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
                  {/* The screenshot links out on its own so the whole card is
                      not one giant anchor — the footer link needs to be
                      separately reachable by keyboard. */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-zoom relative block aspect-16/10 shrink-0 overflow-hidden bg-surface"
                    aria-label={`Open the ${item.title} website in a new tab`}
                  >
                    <Image
                      src={item.image}
                      alt={`Screenshot of the ${item.title} website`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 92vw, 33vw"
                    />
                  </a>

                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    {/* `tag` is the per-project caption; `category` is the
                        filter bucket and makes a poor label because six of
                        eight projects share it. */}
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item.tag ?? config.tag}
                    </span>

                    <h3 className="mt-3.5 font-heading text-xl font-semibold leading-tight tracking-tight text-text-primary sm:text-[22px]">
                      {item.title}
                    </h3>

                    {testimonial ? (
                      <blockquote className="mt-3.5 text-sm leading-6 text-text-secondary">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                    ) : (
                      <p className="mt-3.5 text-sm leading-6 text-text-secondary">
                        {item.summary ?? item.description}
                      </p>
                    )}

                    {/* `mt-auto` pins the footer to the card's foot, which is
                        what keeps the attribution rows aligned across a row of
                        three quotes of different lengths. */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 sm:pt-5">
                      {testimonial ? (
                        <div>
                          <p className="font-heading text-sm font-semibold text-text-primary">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-slate-500">{testimonial.role}</p>
                        </div>
                      ) : (
                        <span />
                      )}

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary"
                      >
                        <span className="link-sweep">Visit the live site</span>
                        <ArrowUpRight className="cta-arrow h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* The count comes from the data, so it cannot claim a portfolio size
            the /portfolio page does not actually render. */}
        <AnimatedContainer className="mt-10 flex justify-center lg:mt-12" animation="fade-in">
          <Link
            href="/portfolio"
            className="group inline-flex min-h-14 items-center gap-2 rounded-full border border-border bg-white px-6 text-[15px] font-semibold text-text-primary transition-colors hover:border-primary/40"
          >
            See all {portfolioItems.length} projects
            <ArrowUpRight className="cta-arrow h-4 w-4 text-primary" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
