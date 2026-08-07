import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, FaqEntry } from "@/types";
import { addOns, carePlans, formatPrice, websiteTiers } from "@/data/pricing";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Price tokens for post content.
 *
 * `pricing.ts` is the single source of truth for every rupee figure on this
 * site, and its header is explicit: never hardcode a price in a component.
 * Markdown cannot call `formatPrice()`, so without this a price guide would be
 * the one surface allowed to hold its own copy of the numbers — which is
 * exactly how /portfolio ended up advertising "50+" in its title while
 * rendering "8+" on the page.
 *
 * So posts write `{{price:starter}}` and it resolves at read time. Change a
 * number in `pricing.ts` and every article follows. A token with no matching
 * entry is left in place verbatim rather than silently emptied — a stray
 * `{{price:startr}}` in rendered output is obvious in review; a blank where a
 * price should be is not.
 *
 * Keys are the tier `id`s, plus slugified add-on names.
 */
function buildPriceTokens(): Record<string, string> {
  const tokens: Record<string, string> = {};

  for (const tier of [...websiteTiers, ...carePlans]) {
    tokens[tier.id] = formatPrice(tier.amount);
  }

  for (const addOn of addOns) {
    const key = addOn.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    tokens[key] = formatPrice(addOn.amount);
  }

  return tokens;
}

const PRICE_TOKENS = buildPriceTokens();

/**
 * Parse a `YYYY-MM-DD` frontmatter date as local midnight.
 *
 * `new Date("2026-08-07")` is parsed as **UTC** midnight per the ECMAScript
 * date-time-string spec, which in IST (UTC+5:30) formats back as 6 August. Every
 * post on the site was displaying the day before its own publication date, and
 * the sitemap was reporting `lastModified` a day early with it.
 *
 * Splitting the parts and using the multi-argument constructor gets local
 * midnight, which is what a date with no time attached is meant to mean.
 */
export function parsePostDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function resolvePrices(text: string): string {
  return text.replace(/\{\{price:([\w-]+)\}\}/g, (whole, key: string) =>
    key in PRICE_TOKENS ? PRICE_TOKENS[key] : whole,
  );
}

/**
 * Validate the optional `faqs:` frontmatter block.
 *
 * gray-matter hands back whatever the YAML happened to contain, so this is the
 * boundary where untyped file content becomes a typed `FaqEntry[]`. Entries
 * missing a question or an answer are dropped rather than rendered half-empty:
 * this array feeds both the visible `<details>` list and the `FAQPage` schema,
 * and a blank answer in structured data is an invalid-markup warning in Search
 * Console.
 */
function parseFaqs(raw: unknown): FaqEntry[] | undefined {
  if (!Array.isArray(raw)) return undefined;

  const faqs = raw
    .filter(
      (entry): entry is FaqEntry =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as FaqEntry).question === "string" &&
        typeof (entry as FaqEntry).answer === "string" &&
        (entry as FaqEntry).question.trim() !== "" &&
        (entry as FaqEntry).answer.trim() !== "",
    )
    // Tokens resolve here too. A price quoted in an FAQ answer goes straight
    // into FAQPage schema, so an unresolved token would be published to Google.
    .map((entry) => ({
      question: resolvePrices(entry.question),
      answer: resolvePrices(entry.answer),
    }));

  return faqs.length > 0 ? faqs : undefined;
}

/**
 * Frontmatter → `BlogPost`, in one place.
 *
 * The listing and the single-post reader used to build this object separately.
 * They drifted the moment `updated` and `faqs` were added: the listing picked
 * them up, `getPostBySlug` did not, and since the post template reads through
 * `getPostBySlug` every FAQ section and every `dateModified` would have been
 * silently dropped. Shared mapper so that cannot recur.
 */
function toMeta(slug: string, data: Record<string, unknown>): BlogPost {
  return {
    slug,
    title: (data.title as string) || slug,
    seoTitle: (data.seoTitle as string) || undefined,
    excerpt: resolvePrices((data.excerpt as string) || ""),
    date: (data.date as string) || "",
    readTime: (data.readTime as string) || "5 min read",
    category: (data.category as string) || "General",
    image: (data.image as string) || undefined,
    updated: (data.updated as string) || undefined,
    faqs: parseFaqs(data.faqs),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return toMeta(slug, data);
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): { meta: BlogPost; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: toMeta(slug, data),
    // Body tokens resolve here, so PostBody only ever sees final prices.
    content: resolvePrices(content),
  };
}
