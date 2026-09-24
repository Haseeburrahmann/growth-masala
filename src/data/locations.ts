/**
 * Location + service landing pages.
 *
 * These are the pages every competitor ranking for "digital marketing agency
 * Mahabubnagar" uses, and the ones we had none of. They render at the site root
 * (e.g. /digital-marketing-agency-mahabubnagar) via `src/app/[slug]/page.tsx`.
 *
 * ANTI-DOORWAY RULE: every entry must carry its own `intro`, `whyLocal`, and
 * `marketContext` copy. Twelve pages that differ only by a swapped city name are
 * doorway pages and get filtered by Google. If you add a city, write real copy
 * for it — do not clone an existing entry and find-replace the name.
 *
 * Geography note: these towns are all in Telangana within reach of Mahabubnagar.
 * District boundaries were redrawn in 2016, so the copy deliberately avoids
 * asserting which district each town now belongs to.
 */

export interface LocationPage {
  /** URL slug, rendered at the site root. */
  slug: string;
  city: string;
  /** Human label for the service this page targets. */
  serviceLabel: string;
  /** <title> — bare, no brand; the root template appends it. Keep under ~45 chars. */
  title: string;
  metaDescription: string;
  h1: string;
  /** Opening paragraph under the H1. Must be unique per page. */
  intro: string;
  /** "Why work with a local agency" angle. Must be unique per page. */
  whyLocal: string;
  /** What this specific local market looks like. Must be unique per page. */
  marketContext: string;
  /** Service slugs from `src/data/services.ts` to feature, in order. */
  featuredServices: string[];
  /** Slugs of sibling location pages to cross-link. */
  relatedSlugs: string[];
}

export const locationPages: LocationPage[] = [
  // ---------------------------------------------------------------------------
  // Mahabubnagar — primary money pages
  // ---------------------------------------------------------------------------
  {
    slug: "digital-marketing-agency-mahabubnagar",
    city: "Mahabubnagar",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Mahabubnagar",
    metaDescription:
      "Growth Masala is a digital marketing agency based in Mahabubnagar, Telangana. Websites, social media, SEO, and Meta ads for local businesses. Free consultation.",
    h1: "Digital Marketing Agency in Mahabubnagar",
    intro:
      "Growth Masala is a digital marketing agency based in Mahabubnagar, Telangana. We build websites and run social media, SEO, and paid ad campaigns for businesses that want customers in Mahabubnagar — not vanity metrics from somewhere else. Everything we do is measured against one question: did it bring you enquiries?",
    whyLocal:
      "Growth Masala is based in Mahabubnagar and delivers work remotely. You speak directly with the people doing the work, in Telugu, Hindi, or English. Bring your own business context, photos, and seasonal priorities into the plan; we shape the website and campaigns around what your customers need to see.",
    marketContext:
      "Mahabubnagar businesses compete for a customer who now researches on a phone before walking in. Schools get judged on their website before a parent books a visit. Retailers lose walk-ins to whoever shows up in the map results first. Service businesses live and die on WhatsApp enquiries. The businesses winning here are not spending the most — they are simply findable, credible, and easy to contact.",
    featuredServices: [
      "website-development",
      "social-media-growth",
      "performance-marketing",
      "seo",
      "ai-automation",
    ],
    relatedSlugs: [
      "website-development-mahabubnagar",
      "seo-services-mahabubnagar",
      "social-media-marketing-mahabubnagar",
      "meta-ads-mahabubnagar",
    ],
  },
  {
    slug: "website-development-mahabubnagar",
    city: "Mahabubnagar",
    serviceLabel: "Website Development",
    title: "Website Development in Mahabubnagar",
    metaDescription:
      "Custom website design and development in Mahabubnagar, Telangana. Fast, mobile-first business websites with SEO structure, WhatsApp enquiries, and 30-day support.",
    h1: "Website Development in Mahabubnagar",
    intro:
      "We build business websites in Mahabubnagar that load fast, look right on a phone, and turn visitors into enquiries. No page-builder bloat, no template everyone else in town is already using — a custom site built around what your customers actually need to see before they contact you.",
    whyLocal:
      "A website built by someone who has never seen your business tends to show it. We work with businesses here, so we know that a school site needs an admissions path front and centre, a repair shop needs branch details and a one-tap WhatsApp button, and a construction firm needs completed-project photos that prove the work is real. Those decisions come from knowing the market, not from a template.",
    marketContext:
      "Plenty of businesses in Mahabubnagar still send customers to a Facebook page or nothing at all. That is a genuine opening: a proper website makes you look established next to competitors who have not bothered. It also gives you something to point ads and search traffic at — without one, every rupee you spend on marketing sends people somewhere you do not control.",
    featuredServices: ["website-development", "seo", "ai-automation"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "seo-services-mahabubnagar",
      "social-media-marketing-mahabubnagar",
    ],
  },
  {
    slug: "seo-services-mahabubnagar",
    city: "Mahabubnagar",
    serviceLabel: "SEO Services",
    title: "SEO Services in Mahabubnagar",
    metaDescription:
      "Local SEO services in Mahabubnagar, Telangana. Get found when customers search for your business — technical SEO, local search, and content built for real enquiries.",
    h1: "SEO Services in Mahabubnagar",
    intro:
      "SEO is how customers find you when they are already looking. We handle the technical foundations, the local search signals, and the content that gets a Mahabubnagar business showing up for the searches that actually end in a phone call.",
    whyLocal:
      "Local SEO is not the same game as national SEO. It runs on proximity, consistent business details across directories, reviews, and pages that genuinely serve a local audience. We know which directories matter in this district and which are a waste of an afternoon — and we know what the agencies currently ranking here have done, because we went and looked.",
    marketContext:
      "Search for almost any service in Mahabubnagar and the first page is a mix of Justdial category pages and agencies based hundreds of kilometres away. Very few genuinely local businesses have claimed their own search results. That gap is closeable — it takes correct technical setup, consistent business information everywhere you appear, and pages that answer what people are actually typing.",
    featuredServices: ["seo", "website-development", "ai-automation"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "website-development-mahabubnagar",
      "meta-ads-mahabubnagar",
    ],
  },
  {
    slug: "social-media-marketing-mahabubnagar",
    city: "Mahabubnagar",
    serviceLabel: "Social Media Marketing",
    title: "Social Media Marketing in Mahabubnagar",
    metaDescription:
      "Social media management for businesses in Mahabubnagar, Telangana. Content, design, community management, and reporting that builds a real local audience.",
    h1: "Social Media Marketing in Mahabubnagar",
    intro:
      "We run social media for Mahabubnagar businesses — content calendars, post design, copy, community management, and monthly reporting. The goal is an audience that buys from you, not a follower count that looks good and does nothing.",
    whyLocal:
      "Content for Mahabubnagar should reflect its audience rather than copy a metro template. Language mix, festival timing, and real photographs supplied by the business can all shape the content plan. We coordinate remotely and help turn the material you provide into a consistent publishing schedule.",
    marketContext:
      "Instagram and WhatsApp are where a lot of local buying decisions now start in Mahabubnagar. Most businesses either post nothing for weeks or post irregularly with no plan behind it. Consistency alone puts you ahead of most of your competition here, and consistency is a process problem — which is exactly what an agency is for.",
    featuredServices: ["social-media-growth", "performance-marketing", "ai-automation"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "meta-ads-mahabubnagar",
      "website-development-mahabubnagar",
    ],
  },
  {
    slug: "meta-ads-mahabubnagar",
    city: "Mahabubnagar",
    serviceLabel: "Meta Ads",
    title: "Meta Ads Agency in Mahabubnagar",
    metaDescription:
      "Facebook and Instagram ads for businesses in Mahabubnagar, Telangana. Tightly targeted local campaigns, creative that converts, and reporting on cost per enquiry.",
    h1: "Meta Ads Agency in Mahabubnagar",
    intro:
      "We plan, build, and manage Facebook and Instagram ad campaigns for businesses in Mahabubnagar. Tight local targeting, creative built for the offer, and reporting that tells you what each enquiry actually cost — not just impressions and reach.",
    whyLocal:
      "Local ad accounts fail for boring reasons: the radius is too wide, the creative is generic, and nobody is tracking what happens after the click. Running campaigns for businesses in this district means we already know roughly what a reasonable cost per enquiry looks like here, so we can tell early whether a campaign is working or burning money.",
    marketContext:
      "Meta ads are still cheap in tier-two Telangana markets compared to Hyderabad, because far fewer local businesses run them properly. A modest monthly budget can genuinely move the needle for a shop, school, or clinic in Mahabubnagar — provided the targeting is tight, the creative is specific, and enquiries land somewhere that gets answered.",
    featuredServices: ["performance-marketing", "social-media-growth", "website-development"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "social-media-marketing-mahabubnagar",
      "seo-services-mahabubnagar",
    ],
  },

  // ---------------------------------------------------------------------------
  // Micro-local — lower competition, faster to rank
  // ---------------------------------------------------------------------------
  {
    slug: "digital-marketing-agency-shadnagar",
    city: "Shadnagar",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Shadnagar",
    metaDescription:
      "Digital marketing for Shadnagar businesses — websites, social media, SEO, and Meta ads delivered remotely by a Telangana-based team.",
    h1: "Digital Marketing Agency in Shadnagar",
    intro:
      "Growth Masala works remotely with businesses in Shadnagar on websites, social media, SEO, and paid ads. We are based in Mahabubnagar and plan each project around the business, audience, and goals you share with us.",
    whyLocal:
      "Shadnagar sits on the highway between Hyderabad and Mahabubnagar, and that position shapes who your customers are. Some are local, some are passing through, and an increasing number work in Hyderabad but live here. Marketing that treats all three the same tends to miss all three. Knowing the corridor is the difference.",
    marketContext:
      "Industrial and residential growth along this corridor has brought new customers with metro expectations — they check reviews, expect a website, and message on WhatsApp rather than calling. Local businesses that have not caught up yet are losing them quietly, usually without knowing why.",
    featuredServices: ["website-development", "social-media-growth", "performance-marketing", "seo"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-jadcherla",
      "digital-marketing-agency-hyderabad",
    ],
  },
  {
    slug: "digital-marketing-agency-wanaparthy",
    city: "Wanaparthy",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Wanaparthy",
    metaDescription:
      "Digital marketing for Wanaparthy businesses — websites, social media, SEO, and Meta ads from a nearby Telangana agency. Free consultation, fixed quotes.",
    h1: "Digital Marketing Agency in Wanaparthy",
    intro:
      "We help businesses in Wanaparthy get found online and turn that attention into enquiries — websites, social media, SEO, and paid ads, delivered remotely by a team based in Mahabubnagar.",
    whyLocal:
      "Businesses in smaller towns should be able to work with a team that stays reachable after launch. We work remotely, agree the scope and communication process up front, and use the business details and imagery you provide to make the site specific to your customers.",
    marketContext:
      "Wanaparthy has a strong base of established local businesses and institutions, most with little or no online presence. That makes search competition here genuinely thin. A business that sets up properly now can occupy the top results for its category well before anyone else here starts trying.",
    featuredServices: ["website-development", "social-media-growth", "seo"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-narayanpet",
      "website-development-mahabubnagar",
    ],
  },
  {
    slug: "digital-marketing-agency-kalwakurthy",
    city: "Kalwakurthy",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Kalwakurthy",
    metaDescription:
      "Websites, social media, SEO, and Meta ads for businesses in Kalwakurthy, Telangana. A Telangana-based team, remote delivery, fixed quotes, and a free first consultation.",
    h1: "Digital Marketing Agency in Kalwakurthy",
    intro:
      "Growth Masala builds websites and runs social media, SEO, and ad campaigns for businesses in Kalwakurthy. We are based in Mahabubnagar and work with clients remotely through calls, messages, and shared online workspaces.",
    whyLocal:
      "In a town this size, reputation travels by word of mouth — and now that word of mouth happens in WhatsApp groups and on Instagram as much as in person. Marketing here works when it reinforces what people already say about you, not when it sounds like an advertisement written elsewhere.",
    marketContext:
      "Agriculture, retail, and services drive most of the local economy in Kalwakurthy, and customers increasingly check a phone before choosing where to go. Almost no local business here has claimed its search results. Getting the basics right — a real website, consistent listings, an active page — is enough to lead the category.",
    featuredServices: ["website-development", "social-media-growth", "seo"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-wanaparthy",
      "social-media-marketing-mahabubnagar",
    ],
  },
  {
    slug: "digital-marketing-agency-jadcherla",
    city: "Jadcherla",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Jadcherla",
    metaDescription:
      "Digital marketing for Jadcherla businesses — websites, social media, SEO, and Meta ads delivered remotely by a team based in Mahabubnagar. Free consultation.",
    h1: "Digital Marketing Agency in Jadcherla",
    intro:
      "We work remotely with businesses in Jadcherla on the things that help customers choose and contact them: a useful website, consistent social media, accurate search information, and measured ad campaigns.",
    whyLocal:
      "A clear project brief helps a remote team understand what customers ask before they buy. We agree how to share source material, review drafts, and communicate after launch before work starts.",
    marketContext:
      "Jadcherla's position on the main route south brings steady passing trade alongside its local customer base. Businesses that show up in map and search results capture the passing traffic; those that do not are invisible to anyone who has not already been told about them.",
    featuredServices: ["website-development", "social-media-growth", "performance-marketing"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-shadnagar",
      "meta-ads-mahabubnagar",
    ],
  },
  {
    slug: "digital-marketing-agency-narayanpet",
    city: "Narayanpet",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Narayanpet",
    metaDescription:
      "Websites, social media, SEO, and Meta ads for businesses in Narayanpet, Telangana — including handloom and retail brands looking to sell beyond the district.",
    h1: "Digital Marketing Agency in Narayanpet",
    intro:
      "Growth Masala helps Narayanpet businesses build an online presence that reaches beyond the district — websites, social media, SEO, and paid campaigns, delivered remotely from Mahabubnagar.",
    whyLocal:
      "Narayanpet is known well outside Telangana for its weaving tradition, and that name recognition is an asset local businesses can use online. Product and process photos supplied by the business can help a remote buyer understand the craft before enquiring.",
    marketContext:
      "For a handloom or retail business here, the customer worth reaching is often not in Narayanpet at all — they are in Hyderabad, Bengaluru, or overseas. That changes the priorities: the website has to carry the product properly, Instagram becomes a catalogue, and ads can target far beyond the district.",
    featuredServices: ["social-media-growth", "website-development", "performance-marketing"],
    relatedSlugs: [
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-wanaparthy",
      "social-media-marketing-mahabubnagar",
    ],
  },

  // ---------------------------------------------------------------------------
  // Hyderabad — larger market, harder to rank, higher value
  // ---------------------------------------------------------------------------
  {
    slug: "digital-marketing-agency-hyderabad",
    city: "Hyderabad",
    serviceLabel: "Digital Marketing",
    title: "Digital Marketing Agency in Hyderabad",
    metaDescription:
      "Digital marketing for Hyderabad businesses — websites, social media, SEO, and Meta ads delivered remotely by a Telangana-based team. Senior attention and fixed quotes before work starts.",
    h1: "Digital Marketing Agency in Hyderabad",
    intro:
      "We work remotely with Hyderabad businesses on websites, social media, SEO, and performance marketing. Growth Masala is based in Mahabubnagar, Telangana; the people you brief are the people who do the work, with no account-manager layer between you and the output.",
    whyLocal:
      "Hyderabad has no shortage of large agencies, and they are a good fit if you have a large budget and a marketing team to manage them. If you are a growing business that wants senior attention, direct communication, and a fixed quote before anyone starts, a small team is usually the better trade.",
    marketContext:
      "Hyderabad is the most competitive market we work in — search costs more, ads cost more, and every category already has established players. That is exactly why the fundamentals matter more here, not less: a fast site, a clear offer, tight targeting, and honest measurement beat a bigger budget spent carelessly.",
    featuredServices: [
      "website-development",
      "performance-marketing",
      "seo",
      "social-media-growth",
      "ai-automation",
    ],
    relatedSlugs: [
      "website-development-hyderabad",
      "digital-marketing-agency-mahabubnagar",
      "digital-marketing-agency-shadnagar",
    ],
  },
  {
    slug: "website-development-hyderabad",
    city: "Hyderabad",
    serviceLabel: "Website Development",
    title: "Website Development in Hyderabad",
    metaDescription:
      "Need a website for a Hyderabad business? Growth Masala builds mobile-first, search-ready sites remotely from Mahabubnagar. Packages start at ₹9,999 + GST, with 30-day support.",
    h1: "Website Development in Hyderabad",
    intro:
      "Growth Masala is based in Mahabubnagar and builds websites for Hyderabad businesses remotely. We plan mobile-first pages around the questions your customers ask, with search-ready structure, hosting and SSL setup, performance optimisation, and 30 days of post-launch support.",
    whyLocal:
      "Our public Kings Mobile World project is for a Hyderabad mobile-repair business with four branches. The site brings branch details, repair and brand information, and WhatsApp enquiries together so customers can find the right branch and understand the service. Growth Masala works remotely from Mahabubnagar; no traffic or revenue result is claimed for this project.",
    marketContext:
      "A Hyderabad business website needs to make its service, proof, contact path, and next step clear on a phone. We review the current site and goals first, then quote the pages and features needed; a rebuild is not automatically the right answer if the existing site can be improved.",
    featuredServices: ["website-development", "seo", "ai-automation"],
    relatedSlugs: [
      "digital-marketing-agency-hyderabad",
      "website-development-mahabubnagar",
      "seo-services-mahabubnagar",
    ],
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return locationPages.find((page) => page.slug === slug);
}
