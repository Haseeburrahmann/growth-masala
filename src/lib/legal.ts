import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LegalDoc, LegalSlug } from "@/types";
import {
  SITE_URL,
  address,
  addressLine,
  business,
} from "@/data/business";

/**
 * Loader for the three legal documents in `src/content/legal/`.
 *
 * Deliberately parallel to `lib/blog.ts`: markdown on disk, gray-matter for the
 * frontmatter, and `PostBody` renders the body. Legal text is long prose that
 * gets revised by reading it end to end, which is exactly what markdown files
 * are good for and what a TypeScript template literal in `src/data/` is not.
 *
 * ## Why NAP is tokenised rather than typed out
 *
 * `src/data/business.ts` is the single source of truth for the address, phone
 * and email, and `docs/seo-architecture.md` is explicit that those strings must
 * match character-for-character everywhere they appear — on-page, in JSON-LD,
 * and on every external directory listing. Markdown cannot import a module, so
 * without tokens these three documents would become the one surface allowed to
 * keep its own copy of the phone number.
 *
 * That is not hypothetical: /portfolio's title claimed "50+" while the page
 * rendered "8+" for exactly this reason, and `trackRecord` exists because of it.
 * A privacy policy quoting a dead email address is the same failure with worse
 * consequences — it is the address a regulator and an opted-out lead are told
 * to write to.
 *
 * An unknown token is left in place verbatim rather than replaced with an empty
 * string. A stray `{{emial}}` in rendered output is obvious in review; a blank
 * where the contact address should be is not.
 */

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

/**
 * Values a legal document may interpolate.
 *
 * Only NAP and identity — nothing that would let a document state a price or a
 * commitment from a data file. Those belong in the quote, not in the terms.
 */
function buildBusinessTokens(): Record<string, string> {
  return {
    name: business.name,
    legalName: business.legalName,
    email: business.email,
    phone: business.phone,
    phoneDisplay: business.phoneDisplay,
    whatsapp: business.whatsapp,
    site: SITE_URL,
    addressLine,
    locality: address.locality,
    region: address.region,
  };
}

const BUSINESS_TOKENS = buildBusinessTokens();

function resolveBusinessTokens(text: string): string {
  return text.replace(/\{\{(\w+)\}\}/g, (whole, key: string) =>
    key in BUSINESS_TOKENS ? BUSINESS_TOKENS[key] : whole,
  );
}

/**
 * Parse a `YYYY-MM-DD` frontmatter date as local midnight.
 *
 * Same trap, same fix as `parsePostDate` in `lib/blog.ts`:
 * `new Date("2026-08-13")` is UTC midnight per spec, which formats back as
 * 12 August in IST. A legal document displaying the day before its own
 * effective date is a bad look on the one page where dates carry weight.
 */
export function parseLegalDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

/** "13 August 2026" — the form an Indian reader expects on a legal document. */
export function formatLegalDate(date: string): string {
  return parseLegalDate(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Frontmatter date → `YYYY-MM-DD`, whether YAML handed us a string or a Date.
 *
 * `updated: 2026-08-13` **unquoted** is parsed by YAML as a timestamp, so
 * gray-matter returns a `Date`, not a string. Casting it with `as string` — the
 * pattern `lib/blog.ts` uses — compiles fine and then throws
 * `e.split is not a function` at build time, which is what happened the first
 * time these documents were added. The blog gets away with the cast only
 * because every value in every post's frontmatter happens to be quoted.
 *
 * Quoting is still the convention and all three documents follow it. This
 * exists so that un-quoting one is a formatting choice rather than a broken
 * deploy, because the failure surfaces in the sitemap route — several files
 * away from the edit that caused it.
 *
 * `toISOString()` is UTC, which is correct here: the value came from a
 * date-only literal that YAML already interpreted as UTC midnight, so this
 * round-trips to the same calendar day it was written as. Rendering is a
 * separate concern — `parseLegalDate` re-reads this as *local* midnight so the
 * displayed date is not a day early in IST.
 */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return "";
}

function toMeta(slug: LegalSlug, data: Record<string, unknown>): LegalDoc {
  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    standfirst: (data.standfirst as string) || "",
    updated: toIsoDate(data.updated),
  };
}

/**
 * A legal document's metadata and rendered-ready body.
 *
 * Throws rather than returning null when the file is missing. These are three
 * static routes over three committed files — a missing one is a broken build,
 * not a 404 to handle gracefully, and failing at build time is how it gets
 * noticed before it reaches Meta's crawler.
 */
export function getLegalDoc(slug: LegalSlug): { meta: LegalDoc; content: string } {
  const filePath = path.join(LEGAL_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Legal document "${slug}" not found at ${filePath}. ` +
        `The route exists, so the file must too.`,
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      ...toMeta(slug, data),
      // Frontmatter is tokenised too. `description` becomes the meta
      // description and the OG description, so a raw `{{name}}` there would be
      // published straight into a search result and a WhatsApp preview card.
      description: resolveBusinessTokens((data.description as string) || ""),
      standfirst: resolveBusinessTokens((data.standfirst as string) || ""),
    },
    content: resolveBusinessTokens(content),
  };
}
