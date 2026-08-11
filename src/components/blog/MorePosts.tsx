import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPosts } from "@/lib/blog";

/**
 * Links from a post to its siblings.
 *
 * This exists for crawlability, not decoration. Until it shipped, `/blog` was
 * the only page on the site that linked to a blog post — `PostCard` is used
 * nowhere else — so every post hung off a single listing page Google had never
 * fetched. One unfetched page meant four unreachable ones.
 *
 * With the homepage now linking one post directly (see the pricing fine print
 * in `PricingSection`), these sibling links complete the chain: an indexed page
 * reaches one post, and that post reaches the rest. Every post is within two
 * hops of the homepage without depending on `/blog` being crawled at all.
 *
 * Deliberately not rendered in `PostRail`: that rail is `hidden lg:block`, so
 * its contents sit in a `display: none` container on mobile. Links that are
 * invisible at the viewport Google crawls with are the wrong place to put the
 * only path to a page.
 *
 * Three links, in the listing's own order (newest first), current post removed.
 */
export default function MorePosts({ currentSlug }: { currentSlug: string }) {
  const siblings = getAllPosts().filter((post) => post.slug !== currentSlug);

  if (siblings.length === 0) return null;

  return (
    <nav
      aria-labelledby="more-posts-heading"
      className="mt-12 border-t border-border pt-8"
    >
      <h2
        id="more-posts-heading"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
      >
        Keep reading
      </h2>

      <ul className="mt-4 flex flex-col gap-3">
        {siblings.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex min-h-11 items-start gap-3 text-[15px] font-medium leading-snug text-primary transition-colors hover:text-primary-dark"
            >
              <ArrowRight
                aria-hidden="true"
                className="cta-arrow mt-1 h-4 w-4 shrink-0"
              />
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
