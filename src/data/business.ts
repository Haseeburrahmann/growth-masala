/**
 * Single source of truth for Growth Masala's NAP (Name, Address, Phone) and
 * core business facts.
 *
 * Local SEO depends on this data being byte-identical everywhere it appears —
 * on-page, in JSON-LD, and on external directories (Justdial, Sulekha, Clutch,
 * GoodFirms). Every surface should import from here rather than hardcoding, so
 * a change in one place propagates to all of them.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://growthmasala.com";

export const business = {
  name: "Growth Masala",
  legalName: "Growth Masala",
  tagline: "Spice Up Your Brand Growth",
  email: "growthmasala@gmail.com",
  /** E.164 format — required by schema.org and tel: links. */
  phone: "+918688269427",
  /** Human-readable form shown in the UI. */
  phoneDisplay: "+91 86882 69427",
  whatsapp: "https://wa.me/918688269427",
  priceRange: "₹₹",
  foundingYear: 2024,
} as const;

/**
 * Headline delivery counts.
 *
 * Owner-supplied and confirmed 2026-08-07. Both are **floors** — always rendered
 * with a "+" — so they stay true as the real figures climb.
 *
 * These live here because they were previously retyped in three places and drifted:
 * the /portfolio `<title>` claimed "50+ Websites" while the page rendered
 * `portfolioItems.length + "+"` = "8+", and /about hardcoded its own "50+". A
 * visitor comparing the SERP snippet to the page saw two different businesses.
 *
 * `projectsDelivered` is NOT `portfolioItems.length`. The portfolio is a curated
 * subset — the clients happy to be named with a live URL — so any surface
 * showing both must state the relationship rather than let the reader infer that
 * eight is the whole track record.
 *
 * Do not add a metric here that nobody has measured. An earlier version of
 * /about carried "3x Average Growth Rate" and "95% Client Retention"; neither
 * came from a source, and both are exactly the kind of claim a Clutch reviewer
 * or a competitor can demand evidence for.
 */
export const trackRecord = {
  projectsDelivered: 50,
  clientsServed: 30,
} as const;

/**
 * Postal address.
 *
 * ⚠️ PLACEHOLDER — set on the owner's explicit instruction (2026-08-06).
 *
 * `streetAddress` is road-level only ("Station Road" is a real public
 * thoroughfare in Mahabubnagar), not a verified premises. `postalCode` 509001 is
 * the correct PIN for Mahabubnagar town.
 *
 * This is good enough to emit a complete PostalAddress in the JSON-LD, which is
 * what local ranking wants to see. It is NOT good enough to build citations on.
 *
 * TODO(owner): replace with the real registered address BEFORE creating any
 * directory listing (Justdial, Sulekha, Clutch, GoodFirms). Local SEO scores NAP
 * consistency across sources — once a wrong address is published to a directory,
 * correcting it everywhere is far more work than getting it right the first time.
 * Whatever ends up here must appear character-for-character on every listing.
 */
export const address = {
  streetAddress: "Station Road",
  postalCode: "509001",
  locality: "Mahabubnagar",
  region: "Telangana",
  country: "IN",
} as const;

/** Rendered as a single line wherever a short address is needed. */
export const addressLine = [
  address.streetAddress,
  address.locality,
  address.region,
  address.postalCode,
]
  .filter(Boolean)
  .join(", ");

/** Coordinates for Mahabubnagar, Telangana. */
export const geo = {
  latitude: 16.7488,
  longitude: 77.9869,
} as const;

export const socialProfiles = [
  "https://www.instagram.com/growthmasala",
  "https://www.facebook.com/share/17EGgbmTK9/",
  "https://x.com/growthmasala",
];

/**
 * Cities and districts we actively serve. Drives both the `areaServed` schema
 * property and the copy on location landing pages.
 */
export const areasServed = [
  "Mahabubnagar",
  "Shadnagar",
  "Wanaparthy",
  "Kalwakurthy",
  "Jadcherla",
  "Narayanpet",
  "Hyderabad",
] as const;

export const openingHours = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  opens: "09:00",
  closes: "18:00",
} as const;

/** 24h "09:00" → "9:00 am". Schema wants 24h; a human reading a page does not. */
function to12Hour(time: string): string {
  const [rawHour, minute] = time.split(":");
  const hour = Number(rawHour);
  const suffix = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${suffix}`;
}

/**
 * Opening hours as one display line, derived the same way `addressLine` is.
 *
 * These hours existed only inside the JSON-LD until the contact page rendered
 * them — the structured data told Google when we are open while the page told
 * a visitor nothing. Derived rather than retyped so the two can never disagree.
 *
 * Assumes `days` is a contiguous run, which it is (Mon–Sat). A split schedule
 * would need real grouping logic, not a first-to-last dash.
 */
export const openingHoursLine = `${openingHours.days[0]} – ${
  openingHours.days[openingHours.days.length - 1]
}, ${to12Hour(openingHours.opens)} – ${to12Hour(openingHours.closes)}`;
