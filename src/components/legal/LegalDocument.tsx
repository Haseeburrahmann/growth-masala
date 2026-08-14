import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PostBody from "@/components/blog/PostBody";
import { legalLinks } from "@/data/navigation";
import type { LegalSlug } from "@/types";

/**
 * The body of a legal document, plus links to the other two.
 *
 * ## Why this reuses the blog's renderer
 *
 * `PostBody` is named for the blog but is a general markdown-to-React renderer
 * with no blog-specific logic in it — headings, lists, tables, blockquotes,
 * bold and links, styled with the site's own type scale. A legal document needs
 * exactly that set and nothing more.
 *
 * Writing a second renderer here would mean a second set of prose styles to
 * keep in step with the first, and the failure mode is not a crash: it is
 * /privacy quietly drifting to a different paragraph rhythm than /blog until
 * somebody notices the site has two typographic voices.
 *
 * Two constraints `PostBody` imposes on the markdown, worth knowing before
 * editing the documents in `src/content/legal/`:
 *
 *   - Blocks split on a blank line, and a multi-line paragraph is joined with
 *     spaces. Lines that must stay apart need a blank line between them.
 *   - A blockquote collapses to a single line for the same reason, so it suits
 *     a pull quote and not a multi-line template.
 *
 * ## Measure and alignment
 *
 * The column is `max-w-3xl` for readability, but it sits inside the site's
 * standard `max-w-7xl` container rather than being centred in the viewport —
 * the same structure `blog/[slug]` uses.
 *
 * That distinction is visible and worth keeping: centring the measure put the
 * body text 258px right of where the hero's `<h1>` starts, so the hero and the
 * document it introduces read as two unrelated pages stacked on top of each
 * other. Left-aligning within the container lines both up on the same edge.
 */
export default function LegalDocument({
  slug,
  content,
}: {
  slug: LegalSlug;
  content: string;
}) {
  const others = legalLinks.filter((link) => link.href !== `/${slug}`);

  return (
    <section className="bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <article className="max-w-3xl">
          <PostBody content={content} />
        </article>

        {/* The other two documents. Someone reading the privacy policy to find
            out how to be removed is one click from the page that tells them,
            and Meta's review fetches all three. */}
        <nav
          aria-label="Other legal documents"
          /* max-w-3xl too, so its rule stops where the prose does rather than
             running the full width of the container. */
          className="mt-14 max-w-3xl border-t border-border pt-8"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary">
            Also on this site
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {others.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
