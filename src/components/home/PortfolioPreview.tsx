"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioItems, portfolioCategoryConfig } from "@/data/portfolio";
import Link from "next/link";

export default function PortfolioPreview() {
  const featured = portfolioItems.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Projects That Speak Results"
          description="A glimpse at what we've built and the growth we've delivered for our clients."
        />

        {/* 3-column single row */}
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {featured.map((item, idx) => {
            const config = portfolioCategoryConfig[item.category];
            const Icon = config.icon;

            return (
              <AnimatedContainer key={item.title} delay={idx * 120}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} transition-all duration-250 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {/* Project image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="relative p-6">
                      {/* Background icon watermark */}
                      <Icon className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 text-black/3" />

                      {/* Tag */}
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                        <Icon className="h-3 w-3" />
                        {config.tag}
                      </span>

                      <h3 className="mt-4 font-heading text-xl font-bold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
                        {item.description}
                      </p>

                      {/* Hover CTA */}
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
                        Visit Live Site
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedContainer>
            );
          })}
        </div>

        <AnimatedContainer className="mt-12 text-center" animation="fade-in">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-text-primary px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-text-primary hover:text-white"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
