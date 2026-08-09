/**
 * Open Graph helpers.
 *
 * ## Why this file exists
 *
 * In the App Router, `openGraph` is NOT deep-merged between a layout and its
 * parent. A child that declares `openGraph` replaces the root's object outright
 * — every field it does not repeat is simply gone.
 *
 * The root layout sets `openGraph.images`. Eight routes then declared their own
 * `openGraph` with a title, description and url, which silently dropped the
 * image from all of them. Around twenty pages — /services, /portfolio,
 * /case-studies, /about, /blog, /contact and all twelve location pages —
 * shipped social cards with no picture on them. Enquiries here arrive over
 * WhatsApp, which is exactly the surface that renders that card, so the pages
 * built to be shared were the ones sharing worst. It survived review because
 * every one of those files reads correctly on its own.
 *
 * `pageOpenGraph()` puts the image in first and spreads the caller's fields
 * over it, so forgetting is no longer possible and a page that genuinely has
 * its own artwork (a blog post) can still pass `images` and win.
 *
 * ## Verify against rendered HTML, never the source
 *
 *     pnpm build && pnpm start
 *     curl -s http://localhost:3000/services | grep -o '<meta property="og:image"[^>]*>'
 *
 * No output means the merge is broken again.
 *
 * ## Twitter
 *
 * There is deliberately no `pageTwitter()`. The root sets `twitter.card` and
 * `twitter.images` and nothing else — with `twitter:title` and
 * `twitter:description` absent, X falls back to `og:title` and
 * `og:description`, which are already per-page. The root used to set those two
 * as well, and because no child ever overrode `twitter`, every inner page
 * rendered the HOMEPAGE title on its X card. Do not reintroduce them at the
 * root: a per-page value there is a per-page value everywhere.
 */

/** The site-wide social card. 1200×630, the size both Facebook and X want. */
export const OG_IMAGE = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: "Growth Masala — Digital Marketing Agency in Mahabubnagar, Telangana",
} as const;

/**
 * Build a route's `openGraph` object with the social card already attached.
 *
 * Pass `images` explicitly to override it — blog posts with their own hero do
 * exactly that, and the spread order means their value wins.
 */
export function pageOpenGraph<T extends object>(og: T) {
  return { images: [OG_IMAGE], ...og };
}
