/**
 * JSON-LD structured data builders.
 *
 * All schema is server-rendered into the HTML (never injected client-side) so
 * crawlers see it on first fetch without needing to execute JavaScript.
 *
 * Every builder returns a plain object; callers serialise it with
 * `JSON.stringify` into a `<script type="application/ld+json">` tag.
 */

import {
  SITE_URL,
  address,
  areasServed,
  business,
  geo,
  openingHours,
  socialProfiles,
} from "@/data/business";
import { services } from "@/data/services";
import { websiteTiers, carePlans } from "@/data/pricing";

/** Stable @id for the business entity so other nodes can reference it. */
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Builds a PostalAddress, omitting `streetAddress` and `postalCode` when they
 * are not yet known. An absent property is neutral; a wrong one actively
 * damages local trust signals, so we never emit a placeholder.
 */
function buildPostalAddress() {
  return {
    "@type": "PostalAddress",
    ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
    ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    addressLocality: address.locality,
    addressRegion: address.region,
    addressCountry: address.country,
  };
}

/**
 * The primary LocalBusiness node. Rendered once, in the root layout, and
 * referenced by @id from page-level schema rather than being repeated.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: business.name,
    description: `Digital marketing agency in ${address.locality}, ${address.region} offering website development, social media management, SEO, and performance marketing to help local businesses grow online.`,
    url: SITE_URL,
    email: business.email,
    telephone: business.phone,
    image: `${SITE_URL}/images/og-image.png`,
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: business.priceRange,
    foundingDate: String(business.foundingYear),
    address: buildPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...openingHours.days],
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    sameAs: socialProfiles,
    /* No `serviceType` here.
     *
     * `serviceType` is a property of `Service`, not of `LocalBusiness` /
     * `ProfessionalService`. Emitting it on the business node produced nine
     * warnings on validator.schema.org — one per service — each reading "The
     * property serviceType is not recognized by the schema for an object of
     * type LocalBusiness". It was also pure duplication: every one of those
     * titles is already published below in `hasOfferCatalog`, on `Service`
     * nodes where `serviceType` IS valid and where each one also carries a
     * description, a provider and an areaServed.
     *
     * Keep the offer catalog as the single place services are declared. */
    areaServed: areasServed.map((city) => ({ "@type": "City", name: city })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        ...services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.title,
            provider: { "@id": BUSINESS_ID },
            areaServed: areasServed.map((city) => ({
              "@type": "City",
              name: city,
            })),
          },
        })),
        // Priced packages, emitted with real figures.
        //
        // These come from `src/data/pricing.ts` — the same source the visible
        // pricing section reads — so the markup can never claim a price the page
        // does not show. That parity is the whole point: prices in schema that
        // disagree with the page are a spam signal, not an optimisation.
        //
        // Worth having because robots.txt admits GPTBot, PerplexityBot and
        // ClaudeBot: when someone asks an assistant what a website costs around
        // here, this is the machine-readable answer.
        ...[...websiteTiers, ...carePlans].map((tier) => ({
          "@type": "Offer",
          name: `${tier.name} — ${tier.audience}`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: tier.amount,
            priceCurrency: "INR",
            valueAddedTaxIncluded: false,
            ...(tier.billing === "monthly"
              ? { unitCode: "MON", billingIncrement: 1 }
              : {}),
          },
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: tier.name,
            description: tier.features.join(". "),
            provider: { "@id": BUSINESS_ID },
            areaServed: areasServed.map((city) => ({
              "@type": "City",
              name: city,
            })),
          },
        })),
      ],
    },
  };
}

/**
 * WebSite node. Enables the sitelinks search box treatment in Google when the
 * site is eligible.
 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    description: `${business.name} — ${business.tagline}`,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Path relative to the site root, e.g. "/services". */
  path: string;
}

/**
 * BreadcrumbList so Google renders a breadcrumb trail in the SERP instead of a
 * raw URL. Always include Home as the first item.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage schema.
 *
 * This no longer drives a Google SERP feature. FAQ rich results were narrowed
 * to government and health sites in August 2023 and removed outright on
 * 2026-05-07; Search Console dropped the FAQ appearance filter and rich-result
 * report the following month. Do not expect to see FAQ data in Search Console.
 *
 * It is still emitted because `FAQPage` remains a valid schema.org type that AI
 * answer engines parse, and `public/robots.txt` explicitly invites those
 * crawlers for citation visibility.
 *
 * Only emit this when the same questions and answers are visible on the page —
 * hidden FAQ schema is a structured-data policy violation.
 */
export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  /** Defaults to every area we serve. */
  areas?: readonly string[];
}

/** Service node for a location or service landing page. */
export function buildServiceSchema({
  name,
  description,
  path,
  areas = areasServed,
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: areas.map((city) => ({ "@type": "City", name: city })),
  };
}

export interface WebPageSchemaInput {
  name: string;
  description: string;
  path: string;
  /** ISO date of the last substantive revision. */
  dateModified: string;
}

/**
 * A plain `WebPage` node, used by the three legal documents.
 *
 * Deliberately minimal. schema.org has no `PrivacyPolicy` or `TermsOfService`
 * type — the closest thing is Google's merchant-specific vocabulary, which does
 * not apply to an agency — so inventing a narrower `@type` here would produce
 * exactly the validator warnings Rule 8 exists to avoid. `WebPage` is the
 * correct type, and correct beats specific.
 *
 * Worth emitting at all for one reason: `dateModified`. "When did these terms
 * last change" is a real question with a machine-readable answer, and
 * `public/robots.txt` invites GPTBot, PerplexityBot and ClaudeBot, which is
 * increasingly how anyone asks it.
 *
 * `isPartOf` and `publisher` reference the site and business nodes by @id
 * rather than restating them, the same as every other page-level node here.
 */
export function buildWebPageSchema({
  name,
  description,
  path,
  dateModified,
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
    dateModified,
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  /**
   * Last substantive revision. Falls back to `datePublished` when absent, which
   * is the correct claim for a post that has not been touched since.
   *
   * This matters most for the price guides: a post titled "…in 2026" whose
   * structured data says it was last modified two years ago tells Google the
   * figures are stale, and Google is right to believe it.
   */
  dateModified?: string;
  image?: string;
}

/** BlogPosting node, making posts eligible for Google Discover and Top Stories. */
export function buildArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "en-IN",
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    author: {
      "@type": "Organization",
      name: business.name,
      url: SITE_URL,
    },
    publisher: { "@id": BUSINESS_ID },
  };
}
