import type { FaqItem } from "@/lib/schema";
import { address, business, languages, openingHoursLine } from "@/data/business";
import { addOns, websiteTiers, carePlans, formatPrice } from "@/data/pricing";

/**
 * FAQ content shown on the homepage and rendered as FAQPage schema.
 *
 * IMPORTANT: every answer here must be literally true. FAQ schema is a
 * high-trust surface — it is read verbatim by AI answer engines, which is now
 * its main audience: Google removed FAQ rich results entirely on 2026-05-07.
 * Do not add timelines, client counts, or guarantees here unless the business
 * has confirmed them.
 *
 * Prices are read from `src/data/pricing.ts` rather than typed as literals, so
 * an answer can never quote a figure the pricing section does not show. If you
 * add a price here, interpolate it — never hardcode the number.
 *
 * TODO(owner): a typical delivery timeline is still the highest-value missing
 * answer. Competitors publish one and buyers search for it, but it needs your
 * confirmation before it can go in a high-trust surface like this.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "Where is Growth Masala based?",
    answer: `Growth Masala is a digital marketing agency based in ${address.locality}, ${address.region}. We work with businesses across ${address.locality} district, Hyderabad, and the rest of India — most of our work is delivered remotely, and we meet locally when a project calls for it.`,
  },
  {
    question: "What services does Growth Masala offer?",
    answer:
      "We offer website development, social media growth, performance marketing (Meta and Google ads), SEO, and AI and automation. Most clients start with one service and add others as they grow.",
  },
  {
    question: "Do you work with small and local businesses?",
    answer: `Yes — most of our clients are local businesses, schools, and service providers in and around ${address.locality} and Hyderabad. We have built websites for schools, mobile retail chains, and construction firms.`,
  },
  {
    question: "How much does a website cost?",
    answer: `Our website packages start at ${formatPrice(websiteTiers[0].amount)} for a five-page site, ${formatPrice(websiteTiers[1].amount)} for a larger SEO-focused build, and ${formatPrice(websiteTiers[2].amount)} for an online store with payments. All prices exclude GST. Anything outside those packages is quoted as a fixed price before work starts, and the consultation is free.`,
  },
  {
    question: "What is not included in the price?",
    answer:
      "GST is charged on top of the listed price. Domain and hosting are billed at cost with no markup from us. Advertising budget is paid directly to Meta or Google, never through us. Google Business Profile setup is a separate add-on.",
  },
  {
    question: "Do I have to pay anything monthly?",
    answer: `No. The website packages are one-time payments. Ongoing care — backups, security, and content updates — is optional and starts at ${formatPrice(carePlans[0].amount)} a month. You can decline it and the site remains entirely yours.`,
  },
  {
    question: "What is included in a website project?",
    answer:
      "Every website we build includes responsive design for mobile and desktop, an SEO-optimised page structure, performance optimisation, SSL and hosting setup, deployment, and 30 days of post-launch support.",
  },
  {
    question: "How do I get started?",
    answer: `Call or WhatsApp us on ${business.phoneDisplay}, email ${business.email}, or send a message through the contact form. We will set up a free consultation to understand what you need before quoting anything.`,
  },
];

/**
 * FAQs for `/services`, rendered as `FAQPage` schema on that route.
 *
 * Deliberately not a subset of `generalFaqs`. Two pages carrying the same
 * question-and-answer pair split the signal for that query the same way two
 * pages carrying the same title do, so these ask what a reader who has already
 * decided to hire someone wants to know — scope, combinations, and what happens
 * when the job is not on the list — rather than re-answering "where are you
 * based".
 *
 * Same rule as above: every answer must be literally true, and every rupee
 * figure is interpolated from `src/data/pricing.ts` so it cannot drift from the
 * pricing tables further up the page.
 */
export const servicesFaqs: FaqItem[] = [
  {
    question: `Which services do you actually deliver in ${address.locality}?`,
    answer: `All of them. Websites and online stores, custom software and internal tools, SEO and Google Business Profile, Meta and Google ads, social media management, and AI chatbots and WhatsApp automation. We are based in ${address.locality}, so local projects can be run face to face; everything else is delivered remotely.`,
  },
  {
    question: "Can I start with one service and add others later?",
    answer:
      "Yes, and most clients do. A website is the usual starting point because ads and SEO both need somewhere to send people. Once that is live, marketing or automation can be added without rebuilding anything.",
  },
  {
    question: "Do I have to take a monthly plan with my website?",
    answer: `No. The website packages are one-time payments and the site is yours outright. Care plans — backups, security, and content updates — are optional and start at ${formatPrice(carePlans[0].amount)} a month. Declining one changes nothing about what you receive at launch.`,
  },
  {
    question: "What if what I need is not on this page?",
    answer:
      "Then we scope it and send a fixed price before any work starts. Custom software, integrations, and one-off builds are quoted this way as a matter of course, and the consultation that produces the quote is free.",
  },
  {
    question: "Who pays for advertising budget, domains, and hosting?",
    answer:
      "You do, directly. Ad spend goes to Meta or Google, never through us, so you keep control of the account and the budget. Domain and hosting are billed at cost with no markup. Our fee is only ever for the work.",
  },
  {
    question: "Do you work with businesses outside Mahabubnagar?",
    answer: `Yes. Alongside ${address.locality} district we work with businesses in Hyderabad and across the rest of India — our published client work includes schools in Telangana and Bengaluru and a mobile-retail chain in Hyderabad.`,
  },
];

/**
 * FAQs for `/contact`, rendered as `FAQPage` schema on that route.
 *
 * Scoped to the act of getting in touch — what happens after you send, what to
 * have ready, whether it costs anything — rather than re-answering what we sell.
 * That keeps it from competing with the homepage and `/services` sets.
 *
 * ⚠️ Note the meeting answer. It says we meet clients in and around the
 * district; it does not invite anyone to an office. `address.streetAddress` is
 * a road-level placeholder, and an FAQ that tells someone to turn up at a
 * building we have not verified is the one mistake here that wastes a
 * customer's afternoon. Rewrite it when the real address lands, not before.
 */
export const contactFaqs: FaqItem[] = [
  {
    question: "How quickly will I get a reply?",
    answer:
      "Within 24 hours, and usually the same day if you message during working hours. WhatsApp is the fastest of the three — it goes straight to a phone rather than an inbox.",
  },
  {
    question: "What happens after I send the form?",
    answer:
      "We read it and come back with questions about what you actually need. If it is something we can price, you get a fixed quote before any work starts. If it is not something we should be doing, we will say so and point you somewhere better.",
  },
  {
    question: "Does the first conversation cost anything?",
    answer:
      "No. The consultation is free and carries no obligation. We would rather spend an hour working out whether there is a fit than sell you something that does not help.",
  },
  {
    question: "Do I need to know exactly what I want first?",
    answer:
      "No. Most people arrive knowing what is not working rather than which service fixes it — that is a normal starting point. Tell us what the business does and what you are trying to change, and we will work out the rest.",
  },
  {
    question: `Can we meet in person in ${address.locality}?`,
    answer: `Yes. We are based in ${address.locality} and regularly meet clients in and around the district — that is the point of hiring someone local rather than a metro agency. Call or WhatsApp first and we will arrange a time and a place that suits you.`,
  },
  {
    question: "Do I have to talk to you to find out your prices?",
    answer: `No, and you should not have to. Website build prices, care plans, and every add-on are published in full on our services page — ours start at ${formatPrice(websiteTiers[0].amount)}, excluding GST. Anything outside those packages is quoted as a fixed price before work begins.`,
  },
];

/**
 * Builds FAQs for a location landing page. Keeps the answers grounded in the
 * same facts as the general set, with the city swapped in.
 *
 * ⚠️ This is the *fallback*, and it is the largest duplicated block on any page
 * that still uses it. Measured on the rendered HTML, it is ~208 words — more
 * than any unique section on a location page — and it is identical across every
 * page it renders on except for the interpolated city. Removing it from the
 * five "crawled – currently not indexed" pages dropped mean pairwise
 * duplication across the DMA cluster from 42.2% to 29.4%, about two thirds of
 * all the duplication reduction available on those pages.
 *
 * Prefer writing a real set in `locationFaqOverrides` for any page that matters.
 * See the note there before adding one.
 */
export function buildLocationFaqs(city: string, serviceLabel: string): FaqItem[] {
  return [
    {
      question: `Do you offer ${serviceLabel.toLowerCase()} in ${city}?`,
      answer: `Yes. Growth Masala is based in ${address.locality}, ${address.region}, and we work with businesses in ${city} and the surrounding area. Get in touch for a free consultation.`,
    },
    {
      question: `How much does ${serviceLabel.toLowerCase()} cost in ${city}?`,
      answer: `Website packages start at ${formatPrice(websiteTiers[0].amount)} and go up to ${formatPrice(websiteTiers[2].amount)} for an online store, excluding GST. Marketing, SEO, and software work varies too much to list a flat rate, so we scope it and send a fixed quote before any work begins.`,
    },
    {
      question: `Why choose a local agency in ${city} over a large agency elsewhere?`,
      answer: `A local agency understands the market you actually sell into — the customers, the competition, and the seasons that matter. We are based in ${address.locality}, not a metro office running a template, so you get direct access to the people doing the work.`,
    },
    {
      question: "How do I get a quote?",
      answer: `Call or WhatsApp ${business.phoneDisplay}, email ${business.email}, or use the contact form. We respond within 24 hours and the first consultation is free.`,
    },
  ];
}

/** Price of a published add-on, by name. Throws rather than rendering a blank. */
function addOnPrice(name: string): string {
  const addOn = addOns.find((item) => item.name === name);
  if (!addOn) {
    throw new Error(
      `addOnPrice: no add-on named "${name}" in src/data/pricing.ts. ` +
        `Renaming an add-on breaks any FAQ answer quoting its price.`,
    );
  }
  return formatPrice(addOn.amount);
}

/**
 * Hand-written FAQ sets, by location-page slug.
 *
 * ## Why these exist
 *
 * `buildLocationFaqs` renders the same four questions on every page it touches.
 * On 2026-08-11 five pages sat in Search Console as "crawled – currently not
 * indexed", and that shared block was ~39% of each of their rendered words. The
 * five sets below replace it on exactly those pages.
 *
 * The seven pages not listed here still use the template deliberately:
 *
 *   - The four **indexed** Mahabubnagar pages — do not disturb what works.
 *   - `digital-marketing-agency-jadcherla`, `digital-marketing-agency-narayanpet`
 *     and `website-development-hyderabad` — status unknown, so they are the
 *     control group. If the rewritten pages get indexed and these do not, the
 *     rewrite is the likely reason. Leave them templated until that reads out.
 *
 * ## Rules for writing a new set
 *
 * 1. **Every answer must be literally true.** These are served as `FAQPage`
 *    JSON-LD and read verbatim by AI answer engines. No invented client names,
 *    project details, neighbourhood references, statistics, or delivery
 *    timelines. If an answer needs a fact the repo does not hold, ask the owner
 *    — do not approximate it.
 * 2. **Interpolate every price.** Same rule as the rest of this file: a figure
 *    typed as a literal here can drift from `pricing.ts` silently.
 * 3. **Ask a different question, do not reword the same one.** The point is not
 *    to defeat a duplicate-text check — it is that a reader in Kalwakurthy and a
 *    reader in Hyderabad genuinely arrive with different objections. Each set
 *    below follows the angle that page's own `whyLocal` and `marketContext`
 *    copy already establishes in `src/data/locations.ts`.
 * 4. **Four per set.** `LocationFaq` lays these out `md:grid-cols-2`; four fills
 *    two clean rows. Three leaves a hole.
 *
 * Note on rich results: FAQ rich results were fully removed from Google Search
 * on 2026-05-07, so none of this produces a SERP feature any more. It is here
 * for on-page value and because AI crawlers — which `public/robots.txt`
 * explicitly invites — still parse `FAQPage`.
 */
export const locationFaqOverrides: Record<string, FaqItem[]> = {
  "digital-marketing-agency-wanaparthy": [
    {
      question:
        "Hardly any businesses here are doing this. Is there any point being first?",
      answer:
        "That is the argument for it rather than against it. When almost nobody in a category has a real website or has claimed their search results, you are not trying to outspend an established competitor — you are just the one who turned up. The same work costs the same whether a category is crowded or empty, and in an empty one it goes considerably further.",
    },
    {
      question:
        "You are based in Mahabubnagar, not Wanaparthy. How does that work day to day?",
      answer: `Most of it — the build, the ads, the content, the reporting — is delivered remotely and would be identical from anywhere. The part that benefits from being close is the beginning: seeing the business, photographing it properly rather than buying stock, and sitting with whoever makes the decision. We work in ${languages.join(", ")}, and we are reachable on ${business.phoneDisplay}, ${openingHoursLine}.`,
    },
    {
      question: "Should I start with a website or with social media?",
      answer:
        "A website first, in most cases. Social media sends people somewhere, and if that somewhere is a Facebook page you control neither the impression it makes nor whether the enquiry reaches you. Most of our clients start with a site and add social or ads once it is earning its keep. If you already have one that works, we will say so and start somewhere else.",
    },
    {
      question: "What does it cost to get a business here online?",
      answer: `A five-page website is ${formatPrice(websiteTiers[0].amount)}, excluding GST, including mobile-responsive design, SEO page structure, SSL and hosting setup, and 30 days of support after launch. Domain and hosting are billed at cost with no markup. Ongoing care is optional and starts at ${formatPrice(carePlans[0].amount)} a month — decline it and the site is still entirely yours.`,
    },
  ],

  "digital-marketing-agency-shadnagar": [
    {
      question:
        "My customers are a mix of local people and people who commute to Hyderabad. Who should the advertising target?",
      answer:
        "Both, but not in the same campaign. Someone buying near home at the weekend and someone passing through on a weekday are different buyers who respond to different offers at different hours. Splitting them costs nothing extra in ad spend and it makes the reporting readable, because you can finally see which of the two is actually producing enquiries instead of averaging them together.",
    },
    {
      question: "Should I just target Hyderabad instead, since it is close?",
      answer:
        "Only if your customers will genuinely make the trip. Hyderabad is the most competitive market we work in and clicks cost more there, so a wide radius usually spends most of the budget on people who were never going to visit you. Tight local targeting on a modest budget almost always beats a broad one — the radius being too wide is the most common reason a local ad account quietly fails.",
    },
    {
      question: "Most of my enquiries arrive on WhatsApp. Does that change anything?",
      answer:
        "It changes what we build for. Every site we make can put a one-tap WhatsApp button on the pages where people decide, and ads can open a chat directly rather than sending someone to a form they will not fill in. What it does not change is measurement — we still need to know how many enquiries arrived and what each one cost, or there is no way to tell a good month from a lucky one.",
    },
    {
      question: "Who holds the advertising budget?",
      answer: `You do. Ad spend goes to Meta or Google directly from your own account and never passes through us, so you keep control of the card and can stop it whenever you like. Our fee is only ever for the work. If you also need a Google Business Profile set up, that is a separate one-time add-on at ${addOnPrice("Google Business Profile setup")}.`,
    },
  ],

  "digital-marketing-agency-kalwakurthy": [
    {
      question: "My business already runs on word of mouth. What does being online add?",
      answer:
        "It makes the word of mouth survive being checked. Someone is given your name, then looks you up — and what they find in that moment either confirms the recommendation or quietly undoes it. Being online is not a replacement for being recommended. It is what happens in the ten seconds afterwards.",
    },
    {
      question: "Is Instagram actually worth it for a business in a town this size?",
      answer:
        "It can be, but not measured as a follower count. The version that works for a local business is a page that shows the work, the premises and the people, so that somebody checking you out finds something recent and real. That is a much smaller job than a content strategy, and here it is worth more than reach numbers are.",
    },
    {
      question: "Can you work in Telugu?",
      answer: `Yes — we work in ${languages.join(", ")}, both in conversation and in the copy itself where that is the right call. Content written for a metro audience tends to read like content written for a metro audience, which is usually the opposite of what you want a local customer to feel when they land on your page.`,
    },
    {
      question: "What is the smallest sensible thing to start with?",
      answer: `A five-page website at ${formatPrice(websiteTiers[0].amount)}, excluding GST. It gives every other channel somewhere to point, and ads, social and SEO all work better once it exists. If a full site is not the right first step for your business we will tell you — the consultation is free and carries no obligation.`,
    },
  ],

  "digital-marketing-agency-hyderabad": [
    {
      question: "Why hire a team based in Mahabubnagar for Hyderabad work?",
      answer: `Because the work is the same and the overhead is not. Websites, ads and search work are delivered remotely by whoever is actually doing them — the only real question is who that person is. With a small team you brief the people doing the work instead of an account manager who relays it, and we are in ${address.locality}, roughly two hours down the road rather than in another state.`,
    },
    {
      question: "Can a small team compete with a large Hyderabad agency?",
      answer:
        "For a growing business, usually yes. A large agency is the right choice when you have a large budget and someone in-house to direct them. What a small team offers instead is senior attention, direct contact and a fixed price agreed before anything starts. What it cannot offer is a big bench on standby — if that is genuinely what your business needs, we will tell you so rather than take the work.",
    },
    {
      question: "Do you meet clients in Hyderabad?",
      answer: `Yes, when a project calls for it. Day to day the work runs on calls and WhatsApp, which is how most clients in the city prefer it anyway. We are reachable on ${business.phoneDisplay} or ${business.email}, ${openingHoursLine}.`,
    },
    {
      question: "How does your pricing compare with a Hyderabad agency retainer?",
      answer: `It is structured differently, not simply cheaper. Website builds are one-time and published in full — ${formatPrice(websiteTiers[0].amount)}, ${formatPrice(websiteTiers[1].amount)} and ${formatPrice(websiteTiers[2].amount)}, excluding GST. Ongoing work is quoted as a fixed price against a defined scope rather than an open monthly retainer, and advertising budget goes straight to the platform from your own account.`,
    },
  ],

  "seo-services-mahabubnagar": [
    {
      question: "How long does SEO take before it produces enquiries?",
      answer:
        "We do not publish a number, because anyone who does is guessing about your category. What we can describe honestly is the shape of it: technical fixes and Google Business Profile work show up soonest, ranking for competitive commercial terms is the slowest part by a distance, and nothing meaningful happens in the first few weeks. We will tell you which of those your situation looks like at the quote stage, before you have paid anything.",
    },
    {
      question: "Can you guarantee a first-page ranking?",
      answer:
        "No, and neither can anyone else — Google does not sell placement in organic results and no agency controls them. What can be guaranteed is the work: the technical setup, your business details being consistent everywhere you appear, and pages that answer what people are actually typing. If you want a guaranteed position, that is advertising, and we run that too.",
    },
    {
      question: "Do I need a new website before SEO will work?",
      answer: `Not always. If your current site loads reasonably, works properly on a phone and can be edited, search work goes on top of it. A rebuild is the answer when a site is slow enough or rigid enough that fixing it costs more than replacing it, which is often the case with heavy page-builder sites. We look before recommending either — and our builds start at ${formatPrice(websiteTiers[0].amount)} with SEO page structure included.`,
    },
    {
      question: "What is the difference between SEO and running Google Ads?",
      answer: `Ads buy position immediately and stop the day you stop paying. SEO earns position slowly and holds it for as long as the work holds up. Most local businesses need both at different stages — ads while nothing ranks yet, search work so the same enquiries eventually arrive without a cost per click. A Google Business Profile sits alongside both: ${addOnPrice("Google Business Profile setup")} to set up, ${addOnPrice("Google Business Profile management")} a month to manage.`,
    },
  ],
};

/**
 * FAQs for a location page: the hand-written set if one exists, otherwise the
 * template. The page passes the result to both `buildFaqSchema` and the visible
 * `LocationFaq` cards — never let those two read different arrays.
 */
export function getLocationFaqs(
  slug: string,
  city: string,
  serviceLabel: string,
): FaqItem[] {
  return locationFaqOverrides[slug] ?? buildLocationFaqs(city, serviceLabel);
}
