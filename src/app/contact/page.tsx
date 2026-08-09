import ContactHero from "@/components/contact/ContactHero";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactLocal from "@/components/contact/ContactLocal";
import FAQSection from "@/components/ui/FAQSection";
import { contactFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

/**
 * /contact — four ways to reach us, the form, what happens after, and where we
 * are.
 *
 * Everything on this page except `ContactForm` is a server component. The page
 * was a client component once; `"use client"` bought nothing but a bundle to
 * render static markup, and it forced the metadata into a sibling `layout.tsx`
 * — which is where it still lives, and where it must stay, because that file
 * also owns the canonical and the `BreadcrumbList`.
 *
 * Section backgrounds alternate navy | white · surface · white · surface, so
 * every seam is a tone change and none of them needs a `SectionDivider` —
 * the two that used to sit here separated same-tone sections that no longer
 * exist.
 *
 * The FAQ is NOT in the approved canvas. It stays: it is the only source of
 * `FAQPage` schema on this page, a collapsed `<details>` list costs almost no
 * vertical length, and removing it is a measurable search regression.
 *
 * Schema here is `FAQPage` only. `BreadcrumbList` comes from `layout.tsx`, and
 * the NAP, geo and opening hours are already on the site-wide `LocalBusiness`
 * node emitted by the root layout — repeating them here would describe one
 * business twice.
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
      <ContactChannels />
      <ContactFormSection />
      <ContactLocal />
      <FAQSection
        faqs={contactFaqs}
        heading="Before you write"
        intro="What people usually want to know before sending the first message."
      />
    </>
  );
}
