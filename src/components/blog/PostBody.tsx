import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Markdown renderer for blog posts.
 *
 * ── Why this returns React nodes instead of an HTML string ────────────────
 *
 * The previous renderer lived inline in `app/blog/[slug]/page.tsx` and built one
 * big HTML string for `dangerouslySetInnerHTML`. It handled headings, lists,
 * bold and links — and nothing else. Two consequences:
 *
 *   - `![alt](src)` rendered as literal text. The blog could not show an image
 *     anywhere except the cover.
 *   - Tables rendered as literal pipe characters. A price-comparison post — the
 *     entire point of the cost cluster — was not expressible.
 *
 * Fixing that inside a string was not an option: an HTML string cannot contain a
 * `next/image`, and body images have to be optimised like every other image on
 * the site. So blocks are React nodes now. Only the *inline* layer (bold, links)
 * still goes through `dangerouslySetInnerHTML`, on text we author ourselves.
 *
 * No markdown library. None is installed — `next-mdx-remote` in CLAUDE.md is
 * aspirational, not a dependency — and pulling one in would mean either losing
 * `next/image` for body images or bolting a sanitiser and a prose stylesheet on
 * top of it. We control every byte of input here; a full CommonMark parser is
 * solving a problem we do not have.
 *
 * ── Supported syntax ──────────────────────────────────────────────────────
 *
 *   ## Heading            h2, with a slugified id so headings are linkable
 *   ### Heading           h3
 *   ![alt](/path)         image, 16:9, lazy
 *   ![alt](/path "cap")   image with a visible caption
 *   | a | b |             table; `---:` in the divider right-aligns a column
 *   > quote               blockquote
 *   - item                unordered list
 *   1. item               ordered list
 *   text                  paragraph
 *
 * Inline, anywhere: `**bold**` and `[label](href)`.
 */

/** Heading ids let Google surface jump-links and let posts cross-reference. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Bold and links only.
 *
 * Not escaped, and deliberately so — the input is markdown we write and commit
 * to this repo, never user submissions. If a post ever renders untrusted text,
 * this is the line that has to change first.
 */
function inlineFormat(text: string): string {
  return text
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-text-primary">$1</strong>',
    )
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary">$1</a>',
    );
}

function Inline({ text, as = "span" }: { text: string; as?: "span" | "p" }) {
  const Tag = as;
  return (
    <Tag
      className={as === "p" ? "my-5 text-base leading-relaxed text-text-secondary" : ""}
      dangerouslySetInnerHTML={{ __html: inlineFormat(text) }}
    />
  );
}

/** `![alt](/path)` or `![alt](/path "caption")` */
function renderImage(block: string, key: number): ReactNode | null {
  const match = block.match(/^!\[(.*?)\]\((\S+?)(?:\s+"(.*?)")?\)$/);
  if (!match) return null;

  const [, alt, src, caption] = match;

  return (
    <figure key={key} className="my-10">
      <div className="relative aspect-16/9 overflow-hidden rounded-2xl border border-border">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Pipe tables.
 *
 * Wrapped in `overflow-x-auto` rather than allowed to squeeze: a four-column
 * price table at 390px either overflows the page or crushes every column to two
 * characters. Scrolling the table is the only version that stays readable, and
 * it keeps the page body from scrolling sideways.
 */
function renderTable(block: string, key: number): ReactNode | null {
  const lines = block.split("\n").filter((l) => l.trim().startsWith("|"));
  if (lines.length < 2) return null;

  const cells = (line: string) =>
    line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());

  const header = cells(lines[0]);
  const divider = cells(lines[1]);
  if (!divider.every((d) => /^:?-{2,}:?$/.test(d))) return null;

  // `---:` means the column holds figures and should sit right.
  const alignments = divider.map((d) => (d.endsWith(":") ? "text-right" : "text-left"));
  const rows = lines.slice(2).map(cells);

  return (
    <div key={key} className="my-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-136 border-collapse text-sm">
        <thead>
          <tr className="bg-surface">
            {header.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className={`border-b border-border px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-text-primary ${alignments[i]}`}
              >
                <Inline text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-0">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`px-5 py-3.5 leading-relaxed text-text-secondary ${alignments[i] ?? "text-left"}`}
                >
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PostBody({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8">
      {blocks.map((raw, key) => {
        const block = raw.trim();
        if (!block) return null;

        if (block.startsWith("![")) {
          const img = renderImage(block, key);
          if (img) return img;
        }

        if (block.startsWith("|")) {
          const table = renderTable(block, key);
          if (table) return table;
        }

        if (block.startsWith("## ")) {
          const text = block.slice(3);
          return (
            <h2
              key={key}
              id={slugify(text)}
              className="mt-12 mb-4 scroll-mt-28 font-heading text-2xl font-bold text-text-primary sm:text-3xl"
            >
              <Inline text={text} />
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          const text = block.slice(4);
          return (
            <h3
              key={key}
              id={slugify(text)}
              className="mt-9 mb-3 scroll-mt-28 font-heading text-lg font-semibold text-text-primary sm:text-xl"
            >
              <Inline text={text} />
            </h3>
          );
        }

        if (block.startsWith("> ")) {
          const text = block
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join(" ");
          return (
            <blockquote
              key={key}
              className="my-8 border-l-4 border-accent bg-surface py-5 pl-6 pr-5 text-base leading-relaxed text-text-primary"
            >
              <Inline text={text} />
            </blockquote>
          );
        }

        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={key} className="my-5 space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <Inline text={item.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s/.test(block)) {
          const items = block.split("\n").filter((l) => /^\d+\.\s/.test(l));
          return (
            <ol key={key} className="my-5 space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                  <span className="font-heading text-sm font-bold text-primary">
                    {i + 1}.
                  </span>
                  <Inline text={item.replace(/^\d+\.\s/, "")} />
                </li>
              ))}
            </ol>
          );
        }

        return <Inline key={key} as="p" text={block.replace(/\n/g, " ")} />;
      })}
    </div>
  );
}

