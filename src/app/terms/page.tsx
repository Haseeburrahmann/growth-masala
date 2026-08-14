import LegalHero from "@/components/legal/LegalHero";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalDoc } from "@/lib/legal";

/**
 * /terms — the terms we work under.
 *
 * The document itself is `src/content/legal/terms.md`. Edit the markdown, not
 * this file.
 *
 * Two things in it are deliberate and should survive future editing:
 *
 *   - **The quote wins over this page.** Scope, price and timeline live in the
 *     written quote; the terms say so explicitly rather than trying to restate
 *     commercial detail that varies per project.
 *   - **The "what we honestly cannot promise" section stays.** No guaranteed
 *     rankings, no guaranteed ad results, no guaranteed revenue. An agency that
 *     publishes those limits is both more defensible and more credible than one
 *     that implies otherwise and argues about it later.
 *
 * No prices are quoted here. `src/data/pricing.ts` is the single source of
 * truth for every rupee figure on the site, markdown cannot read it, and a
 * legal page holding its own stale copy of a price is the exact drift the
 * `{{price:…}}` tokens exist to prevent on the blog. The page links to
 * /services instead.
 */
export default function TermsPage() {
  const { meta, content } = getLegalDoc("terms");

  return (
    <>
      <LegalHero doc={meta} />
      <LegalDocument slug="terms" content={content} />
    </>
  );
}
