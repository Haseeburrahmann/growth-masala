"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll trigger. Fires once, then stops observing.
 *
 * The `entry.boundingClientRect.top < 0` branch is not an optimisation — without
 * it, content can stay invisible permanently.
 *
 * IntersectionObserver only reports elements it actually sees intersect. Move
 * the viewport past an element in a single step and there is no intersection to
 * report: the callback runs once with `isIntersecting: false`, the element is
 * now above the viewport, and it never intersects again. Paired with
 * `.reveal-pending { opacity: 0 }` that means the content is in the DOM,
 * readable by a crawler, and invisible to the person on the page — forever.
 *
 * Single-step scrolls are not an edge case here. Measured on the homepage at
 * 390x844, jumping straight to y=4500 left 10 blocks stuck — the entire Problem
 * section, heading and all. Every one of these does it:
 *
 *   - the hero's own "See our pricing" link (`#pricing`)
 *   - the four service-group anchors on /services
 *   - browser scroll restoration on back-navigation
 *   - find-in-page
 *   - a fast momentum flick on a phone, which is this audience's normal scroll
 *
 * The fix is in `rootMargin`, not in the callback. Testing
 * `boundingClientRect.top < 0` inside the callback looks like it should work and
 * does nothing, because the callback never runs: going from "not intersecting,
 * below" to "not intersecting, above" crosses no threshold, so there is nothing
 * to notify. Verified — that version still left all 10 blocks stuck.
 *
 * Extending the root box upward by a large amount makes "above the viewport" an
 * intersecting state, so the observer reports it the first time it evaluates the
 * element, whether or not a scroll was involved. One line, no scroll listeners,
 * no mount-time rect measurement, and it covers deep links, back-restore,
 * find-in-page and momentum flicks identically.
 */

/**
 * Far enough above the viewport to cover any page this site will ever have —
 * the tallest today is ~18,000px. Anything the reader has scrolled past counts
 * as intersecting and reveals immediately.
 */
const ABOVE_VIEWPORT_REACH = "100000px";

export function useInView(rootMargin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        // top / right / bottom / left. The caller's value is the *entry* delay —
        // how far into the viewport an element must come before it reveals — so
        // it belongs on the bottom edge only.
        rootMargin: `${ABOVE_VIEWPORT_REACH} 0px ${rootMargin} 0px`,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isInView };
}
