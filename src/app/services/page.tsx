import ServicesHero from "@/components/services/ServicesHero";
import ServiceGroupSection from "@/components/services/ServiceGroupSection";
import ServicesPricing from "@/components/services/ServicesPricing";
import ServicesCTA from "@/components/services/ServicesCTA";
import FAQSection from "@/components/ui/FAQSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { serviceGroups } from "@/data/services";
import { servicesFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

/**
 * /services — the four groups, the full price list, the objections.
 *
 * This was a client component rendering nine ungrouped cards from the flat
 * `services` array. Three things were wrong with that:
 *
 *   - `"use client"` bought nothing. The page has no state and no handlers, so
 *     it shipped a bundle to render static data, and metadata had to live in a
 *     sibling `layout.tsx` because a client component cannot export it.
 *   - It predated the group taxonomy. The homepage was rebuilt around
 *     `serviceGroups`; this page still ignored them.
 *   - Its "flagship" treatment keyed off `!!service.subItems`, which stopped
 *     being unique the moment Custom Software gained sub-items. Two services
 *     rendered as "New · Flagship Service" simultaneously. Grouping removes the
 *     flag rather than fixing it.
 *
 * Backgrounds follow the homepage convention — alternate so a long scroll has
 * landmarks, and mark only the seams the alternation cannot carry:
 *
 *   navy | light · surface · NAVY · light | surface · surface | navy
 *
 * Navy boundaries are a change of room and need no marker. The three light-on-
 * light seams get a <SectionDivider>, whose tone matches the section above it.
 *
 * Schema: `FAQPage` only. `BreadcrumbList` comes from `layout.tsx`, and the
 * prices below are already in the site-wide `OfferCatalog` on the business node
 * (`schema.ts` reads the same `pricing.ts`), so emitting `Offer` markup here
 * would describe the same offers twice.
 */

const faqSchema = buildFaqSchema(servicesFaqs);

/** Background per group, in `serviceGroups` order. See the rhythm note above. */
const GROUP_TONES = ["light", "surface", "navy", "light"] as const;

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServicesHero />

      {serviceGroups.map((group, idx) => (
        <div key={group.id}>
          {/* Only the light→light seam needs marking; navy edges carry themselves. */}
          {GROUP_TONES[idx] !== "navy" && GROUP_TONES[idx - 1] === "light" && (
            <SectionDivider tone="light" />
          )}
          <ServiceGroupSection
            group={group}
            index={idx}
            tone={GROUP_TONES[idx]}
          />
        </div>
      ))}

      <SectionDivider tone="light" />
      <ServicesPricing />

      <SectionDivider tone="surface" />
      <FAQSection
        faqs={servicesFaqs}
        heading="Before you get in touch"
        intro="The questions we field most often once someone has read this far. If yours isn't here, WhatsApp us — we'll answer it straight."
      />

      <ServicesCTA />
    </>
  );
}
