import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactLocal from "@/components/contact/ContactLocal";
import FAQSection from "@/components/ui/FAQSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { contactFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

/**
 * /contact — three ways to reach us, what happens after, and where we are.
 *
 * Was a client component that rendered a navy hero and a single white block
 * containing an icon list and the form. `"use client"` bought nothing: the only
 * interactive thing on the page is `ContactForm`, which carries its own
 * directive, so the wrapper was shipping a bundle to render static markup and
 * forcing the metadata into a sibling `layout.tsx`.
 *
 * What the page was missing mattered more than how it looked:
 *
 *   - Opening hours existed only inside the JSON-LD. Google knew when we were
 *     open; a visitor reading the page did not.
 *   - Nothing said what happens after you press send, which is the main reason
 *     a contact form goes unsent.
 *   - No FAQ, so the page had no `FAQPage` schema and no answer to the
 *     objections that actually stop an enquiry.
 *   - "Mahabubnagar" appeared twice in body copy, on the page whose entire job
 *     is local intent.
 *
 * Backgrounds follow the homepage convention — navy | light · surface · surface
 * — with a `SectionDivider` on the two light-on-light seams and nothing on the
 * navy one, which is a change of room and carries itself.
 *
 * Schema is `FAQPage` only. `BreadcrumbList` comes from `layout.tsx`, and the
 * NAP, geo, and opening hours are already on the site-wide `LocalBusiness` node
 * emitted by the root layout — repeating them here would describe one business
 * twice.
 */

const faqSchema = buildFaqSchema(contactFaqs);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ContactHero />
      <ContactFormSection />

      <SectionDivider tone="light" />
      <ContactLocal />

      <SectionDivider tone="surface" />
      <FAQSection
        faqs={contactFaqs}
        heading="Before you write"
        intro="What people usually want to know before sending the first message."
      />
    </>
  );
}
