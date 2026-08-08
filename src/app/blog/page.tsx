import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, parsePostDate } from "@/lib/blog";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";

export const metadata: Metadata = {
  title: "Blog — Website Costs & Local Marketing Advice",
  description: `Website pricing guides and practical digital marketing advice for businesses in ${address.locality}, Hyderabad and across ${address.region} — with every figure taken from our published price list.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Website Costs & Local Marketing Advice | Growth Masala",
    description: `Website pricing guides and local marketing advice for businesses across ${address.region}.`,
    url: "/blog",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[20%] h-100 w-100 rounded-full bg-secondary/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Blog
            </span>
          </div>
          {/* White with an amber underline, matching every other H1 on the
              site. `.text-gradient` was on "Ideas" and measures 3.64:1 on navy
              — the same contrast regression already pulled off the homepage,
              /services, /contact, /about, /portfolio and /case-studies. */}
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Straight answers about</span>
            <span
              className="headline-mark animate-headline-mark"
              style={{ animationDelay: "600ms" }}
            >
              what this actually costs
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Price guides, buying advice and local marketing notes, written for
            business owners in {address.locality}, Hyderabad and across{" "}
            {address.region} — by the people who do the work rather than by a
            content team that has never quoted a job.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Every rupee figure in these posts is the same number published on{" "}
            <Link
              href="/services#pricing"
              className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              our price list
            </Link>
            . We do not quote one price in an article and another on a call.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Posts grid */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-text-secondary">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-primary/30 hover:shadow-lg">
                    {/* Cover image */}
                    {post.image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="h-2 bg-linear-to-r from-primary to-secondary" />
                    )}
                    <div className="p-7">
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {parsePostDate(post.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mt-4 font-heading text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Read more
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
