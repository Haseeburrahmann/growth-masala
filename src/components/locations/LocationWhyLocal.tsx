import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { LocationPage } from "@/data/locations";

/**
 * The two paragraphs that make these twelve pages legal.
 *
 * `whyLocal` and `marketContext` are the per-page copy the anti-doorway rule in
 * `src/data/locations.ts` exists to protect — nothing here may be replaced with
 * a shared sentence, because a shared sentence rendered twelve times is what
 * turns a location page into a doorway page.
 *
 * The canvas headings ("Why a local agency, and not a metro one" / "What this
 * market actually looks like") carry no locality. The city is interpolated into
 * both so the H2s keep reinforcing the page's exact-match phrase; the wording
 * and the two-block rhythm are otherwise the canvas's.
 */
export default function LocationWhyLocal({ page }: { page: LocationPage }) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-14">
          <AnimatedContainer animation="fade-in">
            <div className="hover-zoom relative aspect-13/10 w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/sections/search-phone.webp"
                /* Not interpolated with `page.city`. This is one shared
                   photograph rendered on all twelve location pages, so naming
                   each page's city in its alt asserted twelve different places
                   for a single image — none of which it is a photograph of. */
                alt="A customer searching for a local business on his phone before walking in"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer>
            <h2 className="font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-text-primary text-balance sm:text-[1.625rem]">
              How we work with businesses in {page.city}
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-text-secondary">
              {page.whyLocal}
            </p>

            <h2 className="mt-7 font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-text-primary text-balance sm:text-[1.625rem]">
              What the {page.city} market actually looks like
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-text-secondary">
              {page.marketContext}
            </p>
            {page.slug === "website-development-hyderabad" && (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href="/case-studies"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  See the Kings Mobile World project
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog/website-design-cost-hyderabad"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Read the Hyderabad website cost guide
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            )}
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
