import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { serviceIconMap } from "@/data/services";
import type { Service } from "@/types";

interface LocationServicesProps {
  city: string;
  /** Resolved from the page's `featuredServices` slugs — three to five of them. */
  services: Service[];
}

/**
 * The featured-services row.
 *
 * Card count is per-page (`featuredServices` holds three on the micro-local
 * pages and five on the two hub pages), so the row is an auto-fit grid rather
 * than a fixed column count: five cards sit in one row on a wide screen, three
 * stretch to fill it, and neither leaves a hole. A `lg:grid-cols-5` would have
 * rendered the three-service pages as three narrow cards and two empty tracks.
 *
 * Titles and descriptions come from `src/data/services.ts` by slug — the canvas
 * shows shorter body copy, but duplicating it here would fork the service
 * descriptions away from every other surface that renders them.
 */
export default function LocationServices({
  city,
  services,
}: LocationServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              In {city}
            </span>
          </div>

          <div className="mt-6 grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-text-primary text-balance sm:text-4xl lg:text-[2.875rem]">
              <span className="block">What we do</span>
              <span className="block text-text-secondary/75">
                for businesses in {city}.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-[17px]">
              Most clients start with a website and add the rest once it is
              earning its keep.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))]">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <AnimatedContainer key={service.slug} delay={index * 70}>
                <div className="hover-lift h-full rounded-2xl border border-border bg-white p-5.5">
                  {/* Icon beside the title on a phone, above it once the cards
                      sit side by side — the canvas draws both. */}
                  <div className="flex items-start gap-4 lg:block">
                    {Icon && (
                      <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-primary/8 lg:mb-4">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5 text-primary" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-heading text-base font-semibold text-text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-text-secondary">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>

        <AnimatedContainer className="mt-10">
          <Link
            href="/services"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
          >
            See everything we do
            <ArrowRight aria-hidden="true" className="cta-arrow h-4 w-4" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
