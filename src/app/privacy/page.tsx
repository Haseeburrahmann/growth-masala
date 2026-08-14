import LegalHero from "@/components/legal/LegalHero";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalDoc } from "@/lib/legal";

/**
 * /privacy — what we collect and what we do with it.
 *
 * The document itself is `src/content/legal/privacy.md`. Edit the markdown, not
 * this file.
 *
 * It describes the site's **actual** data flows, which were traced through the
 * code rather than assumed: the contact form and the chatbot lead capture both
 * end as email and touch no database, chat conversations live in the visitor's
 * own sessionStorage, and the IP address used for chatbot rate limiting is held
 * in memory for a minute and never written down. A policy claiming a database
 * we do not have would be inaccurate in the direction that matters.
 *
 * It also covers the outreach side — how business contact details are collected
 * from public listings and how to opt out — because that is what Meta's app
 * review reads this page for, and because it is true.
 *
 * Keep it in step with the code. If the contact form starts writing to a
 * database, this document is wrong the same day.
 */
export default function PrivacyPage() {
  const { meta, content } = getLegalDoc("privacy");

  return (
    <>
      <LegalHero doc={meta} />
      <LegalDocument slug="privacy" content={content} />
    </>
  );
}
