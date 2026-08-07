import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react";
import Image from "next/image";
import { getAllPosts, getPostBySlug, parsePostDate } from "@/lib/blog";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import PostBody from "@/components/blog/PostBody";
import FAQSection from "@/components/ui/FAQSection";
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
 * as visible `<details>` via the shared `FAQSection` *and* as `FAQPage` schema,
 * both from the same array — schema that does not match visible content is a
 * policy violation, not a shortcut (docs/seo-architecture.md §Rule 4).
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

      {/* Header */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[30%] h-100 w-100 rounded-full bg-primary/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            {post.meta.category}
          </span>
          <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.meta.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {parsePostDate(post.meta.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.meta.readTime}
            </span>
            {/* Shown only when it differs from the publish date — "updated on
                the day it was published" is noise, and on a price guide the
                update date is the credibility signal, so it should mean
                something when it appears. */}
            {post.meta.updated && post.meta.updated !== post.meta.date && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" />
                Prices checked{" "}
                {parsePostDate(post.meta.updated).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Cover image */}
      {post.meta.image && (
        <div className="relative mx-auto -mt-12 max-w-4xl px-6 lg:px-8">
          <div className="relative h-64 overflow-hidden rounded-2xl shadow-xl sm:h-80 lg:h-96">
            <Image
              src={post.meta.image}
              alt={post.meta.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="bg-white py-16 sm:py-20">
        <article className="prose-custom">
          <PostBody content={post.content} />
        </article>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-3xl border-t border-border px-6 pt-10 lg:px-8">
          <p className="text-sm text-text-secondary">
            Want to learn more about growing your business online?
          </p>
          <div className="mt-4 flex gap-4">
            <Link
              href="/blog"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
            >
              More Articles
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Same array as `faqSchema` above — never a second, prettier copy. */}
      {post.meta.faqs && (
        <FAQSection
          faqs={post.meta.faqs}
          heading="Questions people ask about this"
          intro="Short answers to what usually comes up next. If yours is not here, WhatsApp us and we will answer it straight."
        />
      )}
    </>
  );
}
