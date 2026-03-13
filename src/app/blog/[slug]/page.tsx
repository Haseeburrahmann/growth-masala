import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";

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

  return {
    title: `${post.meta.title} — Growth Masala Blog`,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown-to-HTML (handles headings, paragraphs, lists, bold, links, line breaks)
  const htmlContent = post.content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Headings
      if (trimmed.startsWith("## ")) {
        return `<h2 class="mt-10 mb-4 font-heading text-2xl font-bold text-text-primary">${inlineFormat(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3 class="mt-8 mb-3 font-heading text-xl font-semibold text-text-primary">${inlineFormat(trimmed.slice(4))}</h3>`;
      }

      // Unordered list
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => `<li class="flex items-start gap-2"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span><span>${inlineFormat(l.slice(2))}</span></li>`)
          .join("");
        return `<ul class="my-4 space-y-2 text-text-secondary">${items}</ul>`;
      }

      // Ordered list
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed
          .split("\n")
          .filter((l) => /^\d+\.\s/.test(l))
          .map((l, i) => `<li class="flex items-start gap-3"><span class="font-heading text-sm font-bold text-primary">${i + 1}.</span><span>${inlineFormat(l.replace(/^\d+\.\s/, ""))}</span></li>`)
          .join("");
        return `<ol class="my-4 space-y-2 text-text-secondary">${items}</ol>`;
      }

      // Regular paragraph
      return `<p class="my-4 text-base leading-relaxed text-text-secondary">${inlineFormat(trimmed)}</p>`;
    })
    .join("");

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[30%] h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />
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
              {new Date(post.meta.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.meta.readTime}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20">
        <article
          className="prose-custom mx-auto max-w-3xl px-6 lg:px-8"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

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
    </>
  );
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="font-medium text-primary underline decoration-primary/30 hover:decoration-primary">$1</a>');
}
