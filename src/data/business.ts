/**
 * Single source of truth for Growth Masala's identity, contact details,
 * operating base, and core business facts. Growth Masala works remotely and
 * does not publish a customer-facing street address.
 *
 * Every surface should import business facts from here rather than hardcoding.
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
  foundingYear: 2024,
} as const;

/**
 * Languages we actually answer the phone in.
 *
 * Lives here because it is a NAP-adjacent business fact that appears in page
 * copy on /contact and on all twelve location pages. It was typed by hand in
 * both places, which is how "Telugu, Hindi or English" and "Telugu · Hindi ·
 * English" ended up as two different strings for the same claim.
 *
 * Join with the separator the surface wants — the array is the source of truth,
 * not any one rendering of it.
 */
export const languages = ["Telugu", "Hindi", "English"] as const;

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
 * Publicly stated operating base. These city/region values do not identify a
 * customer-facing premises and must not be emitted as PostalAddress or Geo data.
 */
export const address = {
  locality: "Mahabubnagar",
  region: "Telangana",
  country: "IN",
} as const;

/** Backward-compatible display label for the business base, not a postal address. */
export const baseLocationLine = [
  address.locality,
  address.region,
]
  .filter(Boolean)
  .join(", ");

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
 * Contact-response hours as one display line; these are not visitor hours.
 *
 * These hours describe when enquiries are answered and are not emitted as
 * customer-visit hours in structured data.
 *
 * Assumes `days` is a contiguous run, which it is (Mon–Sat). A split schedule
 * would need real grouping logic, not a first-to-last dash.
 */
export const openingHoursDays = `${openingHours.days[0]} – ${
  openingHours.days[openingHours.days.length - 1]
}`;

/** "9:00 am – 6:00 pm". */
export const openingHoursTimes = `${to12Hour(openingHours.opens)} – ${to12Hour(
  openingHours.closes,
)}`;

/**
 * The two parts are exported separately because the contact page renders hours
 * as a two-column row (days | times) and was otherwise forced to split this
 * string on its first ", " to get them back. That worked only for as long as no
 * day name contains a comma and the separator never changes — a parser reaching
 * into a formatted string to undo the formatting.
 */
export const openingHoursLine = `${openingHoursDays}, ${openingHoursTimes}`;
