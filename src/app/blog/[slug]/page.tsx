import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug, parsePostDate } from "@/lib/blog";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import PostBody, { extractHeadings } from "@/components/blog/PostBody";
import PostFaqs, { POST_FAQ_HEADING } from "@/components/blog/PostFaqs";
import PostRail from "@/components/blog/PostRail";
import PriceCallout from "@/components/blog/PriceCallout";
import BlogCTA from "@/components/blog/BlogCTA";
import { business } from "@/data/business";
import type { Metadata } from "next";

/**
 * Blog post template.
 *
 * The markdown-to-HTML parser that used to live in this file has moved to
 * `components/blog/PostBody.tsx` and now returns React nodes rather than one
 * HTML string. The reason is in that file's header; the short version is that a
 * `dangerouslySetInnerHTML` string cannot contain a `next/image`, so body images
 * were impossible and tables were unsupported — which made a price-comparison
 * post unwritable.
 *
 * Posts may now declare `faqs:` in their frontmatter. When present it renders
 * as visible `<details>` via `PostFaqs` *and* as `FAQPage` schema, both from the
 * same array — schema that does not match visible content is a policy violation,
 * not a shortcut (docs/seo-architecture.md §Rule 4).
 *
 * Layout is a two-column split: the prose measure on the left, a rail holding
 * the derived table of contents and the ask on the right. The rail is desktop
 * only; below `lg` the article is a single column, which is what the canvas
 * mobile frame draws.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  // Bare title — the root layout template appends "| Growth Masala", which is
  // why `seoTitle` exists: the headline is written for a reader, this is
  // written for a 60-character budget. Falls back when they can be the same.
  const seoTitle = post.meta.seoTitle || post.meta.title;

  return {
    title: seoTitle,
    description: post.meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.meta.title} | Growth Masala`,
      description: post.meta.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.meta.date,
      ...(post.meta.image && { images: [{ url: post.meta.image }] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = buildArticleSchema({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${slug}`,
    datePublished: post.meta.date,
    dateModified: post.meta.updated,
    image: post.meta.image,
  });

  const faqSchema = post.meta.faqs ? buildFaqSchema(post.meta.faqs) : null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.meta.title, path: `/blog/${slug}` },
  ]);

  // Derived from the post's own `## ` headings, plus the FAQ block when the
  // post carries one — both are real anchors that exist on the rendered page.
  const headings = [
    ...extractHeadings(post.content),
    ...(post.meta.faqs ? [POST_FAQ_HEADING] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Post header */}
      <section className="relative overflow-hidden bg-navy pt-28 pb-14 sm:pt-36 sm:pb-18">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[10%] h-100 w-100 rounded-full bg-primary/25 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400">
              <li className="hidden sm:block">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="hidden sm:block">
                /
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {/* The last crumb is the post, not its category.

                  It read `{post.meta.category}` to match the canvas, which
                  broke two things at once: `buildBreadcrumbSchema` below ends
                  this trail with the post title, so the visible trail and the
                  BreadcrumbList disagreed about where the reader is — and
                  `aria-current="page"` was announcing a category as the current
                  page when there is no /blog/category/* route for it to be.

                  The category still shows: it is the pill above the headline. */}
              <li
                aria-current="page"
                className="max-w-[22ch] truncate font-semibold text-blue-300 sm:max-w-none"
              >
                {post.meta.title}
              </li>
            </ol>
          </nav>

          {/* The category, moved out of the breadcrumb. It is a useful label
              and a poor crumb — there is no route behind it. */}
          <p className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-blue-300">
            {post.meta.category}
          </p>

          <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-[1.16] tracking-[-0.02em] text-white text-balance sm:text-4xl lg:text-[44px]">
            {post.meta.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
            {post.meta.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[13px] text-slate-400 sm:text-sm">
            <span className="font-semibold text-white">{business.name}</span>
            <span aria-hidden="true" className="h-0.75 w-0.75 rounded-full bg-slate-400" />
            <span>
              {parsePostDate(post.meta.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span aria-hidden="true" className="h-0.75 w-0.75 rounded-full bg-slate-400" />
            <span>{post.meta.readTime}</span>
            {/* Shown only when it differs from the publish date — "updated on
                the day it was published" is noise, and on a price guide the
                update date is the credibility signal, so it should mean
                something when it appears. */}
            {post.meta.updated && post.meta.updated !== post.meta.date && (
              <>
                <span
                  aria-hidden="true"
                  className="h-0.75 w-0.75 rounded-full bg-slate-400"
                />
                <span>
                  Prices checked{" "}
                  {parsePostDate(post.meta.updated).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="bg-white py-12 sm:py-16">
        {/* The prose column is capped at its measure and the rail is pinned to
            the right edge, so extra width becomes gutter rather than line
            length. Below `lg` the rail is not rendered at all. */}
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8">
          <article className="min-w-0 flex-1 lg:max-w-190">
            {post.meta.image && (
              <div className="relative h-52 overflow-hidden rounded-2xl sm:h-72 lg:h-100">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 760px"
                  priority
                />
              </div>
            )}

            <div className="mt-8">
              <PostBody content={post.content} />
            </div>

            <PriceCallout />

            {/* Same array as `faqSchema` above — never a second, prettier copy. */}
            {post.meta.faqs && <PostFaqs faqs={post.meta.faqs} />}
          </article>

          <PostRail headings={headings} />
        </div>
      </section>

      <BlogCTA
        eyebrow="Next step"
        titleTop="Enough reading."
        titleBottom="What would yours cost?"
        body="Tell us what you sell and what is not working. A scope and a fixed number back — usually the same day."
      />
    </>
  );
}
