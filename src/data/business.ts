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
