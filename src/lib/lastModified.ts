import { execFileSync } from "node:child_process";

/**
 * Real last-modified dates for sitemap entries, read from git history.
 *
 * `sitemap.ts` used to stamp `new Date()` on every non-blog URL, so each deploy
 * told Google that all nineteen pages had changed that morning. Google discounts
 * a `lastmod` it finds unreliable, and for a URL it has discovered but never
 * fetched, `lastmod` is one of the few scheduling inputs it has. A field that
 * always says "today" carries no information at all.
 *
 * ## Why omitting beats guessing
 *
 * `lastModified` is optional in `MetadataRoute.Sitemap`. When git cannot answer
 * — no binary, not a repo, or a shallow clone whose window does not reach the
 * commit that touched the file — this returns `undefined` and the entry ships
 * without a `<lastmod>`. That is strictly better than a plausible-looking wrong
 * date: Google simply falls back to its own signals instead of learning to
 * distrust ours.
 *
 * Shallow clones degrade correctly without a special case. Vercel checks out
 * with a truncated history, so `git log -1 -- <path>` either finds a commit
 * inside that window (a real date, correct) or finds nothing (empty stdout,
 * omitted). It cannot return a wrong date.
 *
 * ## Build-time only
 *
 * The sitemap is statically prerendered, so these commands run during `next
 * build` and never on a request. Results are memoised per path because several
 * routes share source directories.
 */

const cache = new Map<string, number | undefined>();

/** Unix ms of the last commit touching `path`, or undefined if git can't say. */
function lastCommitTime(path: string): number | undefined {
  if (cache.has(path)) return cache.get(path);

  let result: number | undefined;
  try {
    const stdout = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", path],
      { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    if (stdout) {
      const parsed = new Date(stdout).getTime();
      if (Number.isFinite(parsed)) result = parsed;
    }
  } catch {
    // git missing, not a repository, or the path is untracked. Omit the field.
  }

  cache.set(path, result);
  return result;
}

/**
 * Newest commit date across every path that feeds a route.
 *
 * A route is rarely one file — /contact changes when its page, its sections, or
 * the NAP in `business.ts` changes — so callers pass the whole set and get the
 * most recent. Paths may be files or directories.
 *
 * Returns `undefined` when git can answer for none of them.
 */
export function lastModifiedFor(paths: string[]): Date | undefined {
  const times = paths
    .map(lastCommitTime)
    .filter((t): t is number => t !== undefined);

  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}
