import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlogCTA from "@/components/blog/BlogCTA";
import PostCard, { FeaturedPostCard } from "@/components/blog/PostCard";

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
  const [featured, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[6%] h-100 w-100 rounded-full bg-primary/25 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Blog
            </span>
          </div>

          {/* One <h1>, two visual lines. The second is muted rather than
              gradient-filled — the blue-to-amber ramp measured 3.64:1 on navy
              and was pulled off every other hero for that reason. */}
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-white text-balance sm:text-5xl lg:text-[52px]">
            <span className="block">Straight answers to</span>
            <span className="block text-slate-400">what things cost.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px] sm:leading-7">
            Price guides and plain explanations for the questions people
            actually type into Google — with our own numbers included, not
            hidden.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-text-secondary">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <>
              <AnimatedContainer>
                <FeaturedPostCard post={featured} />
              </AnimatedContainer>

              {rest.length > 0 && (
                <div className="mt-3.5 grid gap-3.5 sm:mt-6 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <AnimatedContainer key={post.slug} delay={i * 80} className="h-full">
                      <PostCard post={post} />
                    </AnimatedContainer>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <BlogCTA
        eyebrow="Skip the reading"
        titleTop="Or just ask us"
        titleBottom="what yours would cost."
        body="One message with what you sell and what you need. A scope and a fixed number back — usually the same day."
      />
    </>
  );
}
