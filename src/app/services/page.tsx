import ServicesHero from "@/components/services/ServicesHero";
import ServiceGroupsGrid from "@/components/services/ServiceGroupsGrid";
import ServicesPricing from "@/components/services/ServicesPricing";
import ServicesCTA from "@/components/services/ServicesCTA";
import FAQSection from "@/components/ui/FAQSection";
import { servicesFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

/**
 * /services — four groups, the published prices, the objections, the ask.
 *
 * Previously this rendered four full-width `ServiceGroupSection` blocks, one per
 * group, each with a deliverables list per service. That came to roughly 7,800px
 * of scroll and the client rejected it as overwhelming, so the groups collapse
 * into a single row of compact cards (`ServiceGroupsGrid`) and the full price
 * tables move behind a native disclosure inside `ServicesPricing`.
 *
 * `ServiceGroupSection.tsx` has been deleted (2026-08-09). It sat unreferenced
 * for a day and the only thing keeping it was nobody wanting to make the call.
 * A copy is in ~/Desktop/2026/growth-masala-removed/20260809/, and git history
 * has it either way.
 *
 * The FAQ is not in the canvas. It stays: `<FAQSection>` is what makes the
 * `FAQPage` JSON-LD below legal, since the schema must match visible copy, and a
 * collapsed <details> accordion costs almost nothing in length. Removing it
 * would be a measurable search regression.
 *
 * Background rhythm, which is what tells a reader a new section has started:
 *
 *   navy | white · surface · white | navy
 *
 * The navy edges are a change of room and carry themselves. Pricing into FAQ
 * used to be surface→surface with a `<SectionDivider>` hairline across it;
 * the divider has been removed site-wide, so the FAQ takes `tone="light"`
 * instead and the seam marks itself.
 *
 * Schema: `FAQPage` only. `BreadcrumbList` comes from `layout.tsx`, and the
 * prices below are already in the site-wide `OfferCatalog` on the business node
 * (`schema.ts` reads the same `pricing.ts`), so emitting `Offer` markup here
 * would describe the same offers twice.
 *
 * Server component throughout — this page has no state and must not gain
 * `"use client"`.
 */

const faqSchema = buildFaqSchema(servicesFaqs);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServicesHero />

      <ServiceGroupsGrid />

      <ServicesPricing />

      {/* The image is the only photograph on /services, and it is here on
          purpose.

          Swapping four `ServiceGroupSection` blocks for the compact grid took
          every picture off the page with them. This route rendered three <img>
          elements and all three were `logo.png` — nav, footer, chat button. An
          agency selling design had exactly one page with no photography on it
          and it was the page that sells the work.

          It goes in the FAQ rail rather than back into the group cards: those
          are compact by design and a photo band would undo the 7,800px of
          scroll the grid was built to save. The rail already had the slot, it
          is column-width so it costs no vertical space on desktop, and a face
          beside "before you get in touch" is doing work rather than
          decorating. */}
      <FAQSection
        tone="light"
        faqs={servicesFaqs}
        heading="Before you get in touch"
        intro="The questions we field most often once someone has read this far. If yours isn't here, WhatsApp us — we'll answer it straight."
        image="/images/sections/consultation.webp"
        imageAlt="A consultation across a table — talking through scope and price before any work is quoted"
      />

      <ServicesCTA />
    </>
  );
}
