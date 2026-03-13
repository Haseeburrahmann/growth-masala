import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Growth Masala",
  description: "Insights, tips, and strategies on digital marketing, social media, and web development from the Growth Masala team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[20%] h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Blog
            </span>
          </div>
          <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Insights & <span className="text-gradient">Ideas</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Tips, strategies, and lessons from the trenches of digital marketing.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
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
                    {/* Category gradient strip */}
                    <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                    <div className="p-7">
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-GB", {
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
