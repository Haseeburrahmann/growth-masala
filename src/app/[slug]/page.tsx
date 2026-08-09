import { notFound } from "next/navigation";
import type { Metadata } from "next";

import LocationCTA from "@/components/locations/LocationCTA";
import LocationFaq from "@/components/locations/LocationFaq";
import LocationHero from "@/components/locations/LocationHero";
import LocationServices from "@/components/locations/LocationServices";
import LocationWhyLocal from "@/components/locations/LocationWhyLocal";
import { services } from "@/data/services";
import { buildLocationFaqs } from "@/data/faqs";
import {
  getLocationPage,
  locationPages,
  type LocationPage,
} from "@/data/locations";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { pageOpenGraph } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Only the slugs listed in `src/data/locations.ts` resolve here. Static routes
 * (/services, /about, /blog…) take precedence over this dynamic segment, and
 * `dynamicParams = false` makes every other slug render the 404 page rather
 * than generating an empty location page on demand.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: pageOpenGraph({
      title: `${page.title} | Growth Masala`,
      description: page.metaDescription,
      url: `/${page.slug}`,
    }),
  };
}

/**
 * One template, twelve pages — the highest-value SEO surfaces on the site.
 *
 * Everything visible is resolved from the matching `locations.ts` entry. The
 * page owns the data resolution and the JSON-LD; the five sections below are
 * presentation only. Two rules to keep in mind before editing:
 *
 * - `page.h1` renders verbatim in `LocationHero`. It is the exact-match phrase
 *   the page exists to rank for.
 * - `faqs` is built once and used twice — for `buildFaqSchema` and for the
 *   visible cards in `LocationFaq`. Never let those two read different arrays.
 */
export default async function LocationPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) notFound();

  const featured = page.featuredServices
    .map((serviceSlug) => services.find((s) => s.slug === serviceSlug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const related = page.relatedSlugs
    .map((relatedSlug) => getLocationPage(relatedSlug))
    .filter((p): p is LocationPage => Boolean(p));

  const faqs = buildLocationFaqs(page.city, page.serviceLabel);

  const schemas = [
    buildServiceSchema({
      name: `${page.serviceLabel} in ${page.city}`,
      description: page.metaDescription,
      path: `/${page.slug}`,
      areas: [page.city],
    }),
    buildFaqSchema(faqs),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path: `/${page.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <LocationHero page={page} />
      <LocationWhyLocal page={page} />
      <LocationServices city={page.city} services={featured} />
      <LocationFaq city={page.city} faqs={faqs} related={related} />
      <LocationCTA city={page.city} />
    </>
  );
}
