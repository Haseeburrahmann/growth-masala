import LegalHero from "@/components/legal/LegalHero";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalDoc } from "@/lib/legal";

/**
 * /data-deletion — how to have us delete what we hold.
 *
 * The document itself is `src/content/legal/data-deletion.md`. Edit the
 * markdown, not this file.
 *
 * The section that matters most is the one explaining what we *keep*: an
 * opted-out phone number stays on a do-not-contact list, because erasing the
 * record of the opt-out is precisely what would cause the outreach system to
 * treat that number as a fresh lead and message it again. That is a real
 * consequence of how the lead engine dedupes, it is stated plainly rather than
 * buried, and it should not be edited out for looking untidy — a policy that
 * promises total erasure and then quietly retains a suppression list is the
 * version that is actually dishonest.
 */
export default function DataDeletionPage() {
  const { meta, content } = getLegalDoc("data-deletion");

  return (
    <>
      <LegalHero doc={meta} />
      <LegalDocument slug="data-deletion" content={content} />
    </>
  );
}
