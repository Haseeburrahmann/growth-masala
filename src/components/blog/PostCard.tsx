import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { parsePostDate } from "@/lib/blog";

/**
 * The two listing cards.
 *
 * Every value comes off the `BlogPost` the listing already reads — title,
 * excerpt, category, date, read time and cover image are frontmatter, never
 * typed here. The canvas draws one specific set of posts; this renders whatever
 * `src/content/blog/` happens to hold.
 *
 * Both cards are a single `<Link>` wrapping the whole card, so the visible
 * "Read the guide" / arrow affordances are spans rather than nested anchors —
 * an anchor inside an anchor is invalid and screen readers announce it twice.
 */

/** "7 Aug 2026" — the format the canvas uses in every card meta row. */
function formatCardDate(date: string): string {
  return parsePostDate(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
      {category}
    </span>
  );
}

function MetaRow({ post }: { post: BlogPost }) {
  return (
    <span className="flex items-center gap-2.5 text-[13px] text-slate-500">
      <span>{formatCardDate(post.date)}</span>
      <span aria-hidden="true" className="h-0.75 w-0.75 rounded-full bg-slate-500" />
      <span>{post.readTime}</span>
    </span>
  );
}

/**
 * The newest post.
 *
 * Desktop puts the cover art in a panel beside the copy. Mobile drops the panel
 * entirely — the canvas mobile frame keeps the featured post in the same stack
 * as the rest and marks it with a primary border instead, which is the only
 * treatment that does not cost a full screen of scroll before the second post.
 */
export function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="hover-lift flex flex-col gap-0 rounded-3xl border-2 border-primary bg-surface p-5 sm:p-7 lg:flex-row lg:items-center lg:gap-10 lg:border lg:border-border">
        {/* Artwork. The gradient is the base layer so a post with no cover image
            still reads as a deliberate panel rather than an empty box. */}
        <div className="relative hidden h-70 w-115 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-primary-dark to-navy lg:block">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="460px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-navy">
              Latest
            </span>
            <CategoryPill category={post.category} />
          </div>

          <h2 className="mt-4 font-heading text-xl font-bold leading-snug tracking-[-0.02em] text-text-primary transition-colors group-hover:text-primary sm:text-2xl lg:text-[30px]">
            {post.title}
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-text-secondary lg:text-base">
            {post.excerpt}
          </p>

          <div className="mt-5">
            <MetaRow post={post} />
          </div>

          <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-[15px] font-semibold text-text-primary transition-colors group-hover:border-primary/40 group-hover:text-primary">
            Read the guide
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}

/** Every post after the newest — the compact 3-up card. */
export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="hover-lift flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-white p-5 sm:p-6.5">
        <div>
          <CategoryPill category={post.category} />

          <h2 className="mt-3.5 font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-text-primary transition-colors group-hover:text-primary lg:text-[19px]">
            {post.title}
          </h2>

          <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <MetaRow post={post} />
          <ArrowRight
            aria-hidden="true"
            className="h-4.5 w-4.5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
          />
        </div>
      </article>
    </Link>
  );
}
