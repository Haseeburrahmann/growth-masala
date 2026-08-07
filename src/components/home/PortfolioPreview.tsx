"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our work
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
              Real businesses. Live sites. Named clients.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              Every site below is online right now, and every quote is from the
              person who paid for it.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="group hidden items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex"
          >
            <span className="link-sweep">See all projects</span>
            <ArrowUpRight className="cta-arrow h-4 w-4" />
          </Link>
        </AnimatedContainer>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((item, idx) => {
            const config = portfolioCategoryConfig[item.category];
            const Icon = config.icon;
            const testimonial = testimonialByCompany.get(item.title);

            return (
              <AnimatedContainer key={item.title} delay={idx * 120}>
                <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-zoom relative block aspect-[16/10] overflow-hidden bg-surface"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} website built by Growth Masala`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                      <Icon className="h-3 w-3" />
                      {config.tag}
                    </span>
                  </a>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {item.description}
                    </p>

                    {/* Evidence block — a quote where we have one, the live link
                        otherwise, so card heights stay even either way. */}
                    <div className="mt-5 flex flex-1 flex-col justify-end border-t border-border pt-5">
                      {testimonial ? (
                        <figure className="border-l-2 border-accent pl-4">
                          <Quote className="mb-2 h-3.5 w-3.5 text-accent" />
                          <blockquote className="text-sm leading-relaxed text-text-primary">
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>
                          <figcaption className="mt-3 text-xs text-text-secondary">
                            <span className="font-semibold text-text-primary">
                              {testimonial.name}
                            </span>
                            {" · "}
                            {testimonial.role}
                          </figcaption>
                        </figure>
                      ) : (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                        >
                          <span className="link-sweep">Visit the live site</span>
                          <ArrowUpRight className="cta-arrow h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </AnimatedContainer>
            );
          })}
        </div>

        <AnimatedContainer className="mt-12 sm:hidden" animation="fade-in">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-text-primary px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-text-primary hover:text-white"
          >
            See all projects
            <ArrowUpRight className="cta-arrow h-4 w-4" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
