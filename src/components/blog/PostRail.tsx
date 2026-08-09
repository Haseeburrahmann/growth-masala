import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostHeading } from "@/components/blog/PostBody";

/**
 * The right-hand rail of a post: contents, then the ask.
 *
 * Desktop only. The canvas mobile frame drops the rail entirely, and it is the
 * right call — a table of contents above a 2,000-word article on a 390px screen
 * is a screen of links before the first sentence, and the quote card would be
 * the second CTA within a scroll of the closing one.
 *
 * `headings` is derived from the post's own markdown by `extractHeadings()`, so
 * the ids here are the ids the renderer put on the `<h2>`s. Nothing is listed by
 * hand; a post with no `## ` headings simply gets no contents box.
 *
 * There is no active-section highlight. The canvas marks the first entry as
 * current, which needs scroll-spy — an IntersectionObserver and `"use client"`
 * on a block that is otherwise free. Not worth the runtime for a decoration.
 */
export default function PostRail({ headings }: { headings: PostHeading[] }) {
  return (
    <aside className="hidden shrink-0 lg:block lg:w-72 xl:w-80">
      <div className="sticky top-28 flex flex-col gap-5">
        {headings.length > 0 && (
          <nav
            aria-label="On this page"
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
              On this page
            </p>
            <ul className="mt-3.5">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="group flex items-start gap-2.5 py-1.5 text-sm leading-snug text-text-secondary transition-colors hover:text-primary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-0.5 shrink-0 rounded-full bg-border transition-colors group-hover:bg-primary"
                    />
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="rounded-2xl bg-navy p-6">
          <p className="font-heading text-[19px] font-semibold leading-snug text-white">
            Want the number for your business?
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
            Tell us what you sell. You get a scope and a fixed price back,
            usually the same day.
          </p>
          <Link
            href="/contact"
            className="mt-4.5 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
          >
            Get a fixed quote
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
