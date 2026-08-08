import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import FAQSection from "@/components/ui/FAQSection";
import { serviceIconMap, services } from "@/data/services";
import { buildLocationFaqs } from "@/data/faqs";
import { business } from "@/data/business";
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
    openGraph: {
      title: `${page.title} | Growth Masala`,
      description: page.metaDescription,
      url: `/${page.slug}`,
    },
  };
}

const processSteps = [
  {
    title: "Discovery",
    description:
      "We learn your business, your customers, and what a good month actually looks like for you.",
  },
  {
    title: "Strategy",
    description:
      "We decide what to do first based on what will bring enquiries soonest, and tell you why.",
  },
  {
    title: "Execution",
    description:
      "We build and launch — website, content, campaigns — with you seeing progress as it happens.",
  },
  {
    title: "Growth",
    description:
      "We measure what worked, cut what did not, and keep compounding the parts that pay off.",
  },
];

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

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[15%] h-100 w-100 rounded-full bg-primary/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              {/* text-secondary, not text-primary: this kicker is on navy, where
                  #2563EB measures 3.64:1. The two below it sit on light grounds
                  and keep primary at 5.17:1. */}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                <MapPin className="h-3.5 w-3.5" />
                {page.city}, Telangana
              </span>
            </div>
            <h1 className="max-w-4xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {page.intro}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
              >
                Get a Free Consultation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Why a local agency + market context */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimatedContainer>
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Why choose a local agency in {page.city}?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                {page.whyLocal}
              </p>
            </AnimatedContainer>
            <AnimatedContainer>
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                The {page.city} market right now
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                {page.marketContext}
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Services
              </span>
            </div>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              {page.serviceLabel} services we offer in {page.city}
            </h2>
          </AnimatedContainer>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => {
              const Icon = serviceIconMap[service.icon];
              return (
                <AnimatedContainer key={service.slug} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    {Icon && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <h3 className="mt-6 font-heading text-lg font-bold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              );
            })}
          </div>

          <AnimatedContainer className="mt-12">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              See everything we do
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </AnimatedContainer>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our Process
              </span>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              How we work with {page.city} businesses
            </h2>
          </AnimatedContainer>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <AnimatedContainer key={step.title} delay={index * 80}>
                <div className="border-t-2 border-border pt-6 transition-colors hover:border-primary">
                  <span className="font-heading text-sm font-bold text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={faqs}
        heading={`${page.serviceLabel} in ${page.city} — common questions`}
      />

      {/* Related locations — internal linking cluster */}
      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedContainer>
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                Areas and services we also cover
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {related.map((relatedPage) => (
                  <Link
                    key={relatedPage.slug}
                    href={`/${relatedPage.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {relatedPage.title}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <AnimatedContainer>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to grow your business in {page.city}?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Tell us what you are trying to achieve. We will come back within 24
              hours with a plan and a fixed quote — the first consultation is free.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:text-primary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </>
  );
}
