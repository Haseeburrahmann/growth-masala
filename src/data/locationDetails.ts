/** Specific scopes and evidence, kept separate from shared service summaries. */
export interface LocationDetail {
  heading: string;
  sections: { title: string; text: string }[];
  links: { href: string; label: string }[];
}

export const locationDetails: Record<string, LocationDetail> = {
  "website-development-mahabubnagar": {
    heading: "A website brief you can compare before you commit",
    sections: [
      { title: "Start with the customer's next step", text: "A solar enquiry needs a different path from a school admission. Our SQC Solar & Loans project separates solar and finance at the first screen. We use your services, real photographs and common customer questions to decide the page structure before choosing a visual treatment." },
      { title: "Know what is included", text: "The written scope identifies pages, copy, mobile layouts, enquiry flow, domain and hosting arrangements, and post-launch support. Website packages include basic search setup; an ongoing SEO campaign is a separate scope. We explain account ownership and any recurring costs before you approve the build." },
      { title: "Check the work on your phone", text: "Open the portfolio, follow the enquiry path and read the service information. Screenshots show the design; a working site shows the experience. Our SQC write-up explains the decisions without claiming traffic or sales results we have not measured." },
    ],
    links: [
      { href: "/blog/sqc-solar-loans-website-mahabubnagar", label: "SQC Solar & Loans: the Mahabubnagar website build" },
      { href: "/blog/website-design-cost-mahabubnagar", label: "Compare Mahabubnagar website costs" },
      { href: "/downloads/website-quote-comparison.csv", label: "Download the website quote worksheet" },
    ],
  },
  "website-development-hyderabad": {
    heading: "A practical scope for your Hyderabad website",
    sections: [
      { title: "Plan the enquiry before the pages", text: "A business with several branches needs clear location choices. A clinic needs treatment information, credentials and an appointment request that explains what happens next. We decide those paths with you, then build the pages around them. The Kings Mobile World archive shows our earlier Hyderabad repair-site work; Health Factor demonstrates a separate clinic project in Delhi." },
      { title: "One owner for each account", text: "The proposal sets out who controls the domain, hosting and analytics, what content you need to supply, and which edits are included. We work remotely from Mahabubnagar and review drafts through calls, WhatsApp and shared links. There is no Hyderabad office or required site visit." },
      { title: "Launch with a measurement plan", text: "Mobile checks, indexable page content, route-specific titles, a sitemap and a tested enquiry path form the launch checklist. A WhatsApp click records intent, not a completed sale. Ongoing SEO and AI automation are separately scoped when they solve a real need." },
    ],
    links: [
      { href: "/blog/website-design-cost-hyderabad", label: "Hyderabad website pricing and ownership checklist" },
      { href: "/blog/health-factor-dental-website-case-study", label: "How the Health Factor clinic website handles enquiries" },
      { href: "/seo-services-hyderabad", label: "SEO services for an existing Hyderabad website" },
    ],
  },
  "seo-services-mahabubnagar": {
    heading: "From a search question to a useful local page",
    sections: [
      { title: "Audit before adding pages", text: "We check indexability, canonical URLs, mobile content, internal links and Search Console queries. A report separates technical faults from pages that are accessible but not yet earning visibility. We prioritize the service and pricing questions your customers actually ask, rather than producing a page for every keyword spelling." },
      { title: "Use local evidence", text: "Your service details, work photographs, delivery area and customer-approved project examples make a page useful. Our SQC Solar & Loans write-up is an example of first-hand website evidence from Mahabubnagar; it is not presented as an SEO-results case study. For eligible businesses with real in-person contact, Business Profile work can be scoped separately." },
      { title: "SEO for AI answers as well as search", text: "Clear answers, consistent business facts and crawlable supporting evidence help search systems understand a page. AI search optimization starts with these same foundations. There is no special markup that guarantees a ChatGPT, Gemini or Google AI answer mention. We report observed mentions separately from Google clicks and enquiries." },
    ],
    links: [
      { href: "/blog/ai-seo-local-businesses", label: "AI search visibility: what local businesses can improve" },
      { href: "/blog/sqc-solar-loans-website-mahabubnagar", label: "A real Mahabubnagar project" },
      { href: "/ai-automation-mahabubnagar", label: "AI automation for handling enquiries" },
    ],
  },
  "seo-services-hyderabad": {
    heading: "A scoped SEO engagement with a readable report",
    sections: [
      { title: "Discovery and technical priorities", text: "We begin with your service mix, existing website and Search Console access. The audit checks Google-selected canonicals where available, crawl and indexing issues, mobile page content, duplicate intent, internal navigation and meaningful conversion paths. You receive a prioritized list that distinguishes a technical blocker from a competitive ranking problem." },
      { title: "Content built around buying decisions", text: "For a Hyderabad service business, customers may compare the provider's scope, proof, costs and support before enquiring. We map each important intent to one useful page, then identify missing answers and evidence. We do not create thin neighbourhood pages or imply an office in places your business does not operate." },
      { title: "AI search visibility without invented guarantees", text: "AI Overviews and answer engines still need clear, accessible source material. We improve direct answers, entity consistency, project evidence and relevant structured data where it matches visible content. We can review sampled AI answers, but those observations are not a stable rank or a guaranteed citation. Chatbot installation is a different service from being mentioned by an AI search engine." },
      { title: "Delivery, reporting and ownership", text: "The proposal defines the audit, fixes, pages and reporting period before work starts. You keep your website and search accounts. Reports show the date window, changes shipped, page and query impressions, clicks and recorded contact intent; we separate those from enquiries your team confirms. We do not publish a universal SEO price or promise a first-page position within a fixed number of days." },
    ],
    links: [
      { href: "/blog/ai-seo-local-businesses", label: "Read the local-business AI SEO guide" },
      { href: "/website-development-hyderabad", label: "When your website also needs development work" },
      { href: "/ai-automation-hyderabad", label: "Compare SEO with AI workflow automation" },
    ],
  },
  "ai-automation-mahabubnagar": {
    heading: "Start with one repeated enquiry",
    sections: [
      { title: "A small workflow before a large system", text: "Bring five questions your customers repeatedly ask, the approved answers and the action a staff member takes next. For a local service business, that might be explaining a service, requesting a project brief and handing the conversation to a person. Start there before paying for a larger integration." },
      { title: "A website assistant with boundaries", text: "An assistant can answer from approved business information and offer the next step. It should say when it does not know, avoid inventing prices, and make human contact easy. The Masala Bot on this website is a demonstration you can try; it is not evidence of a client revenue increase." },
      { title: "WhatsApp handoff or WhatsApp automation?", text: "A prefilled WhatsApp link lets a visitor review and send a message. It does not automatically reply, broadcast or confirm a booking. An API-based automation is a different project with account setup, permissions, platform charges and opt-in requirements. We explain which one you need before quoting." },
      { title: "Review the language and the result", text: "We agree the languages and sample questions to test, who owns approved answers and how a handoff reaches your team. Business communication is available in Telugu, Hindi and English; an automated language flow is only part of the delivery if it is specified and tested. Success is whether staff can use the enquiry, not how many messages a bot produces." },
    ],
    links: [
      { href: "/services#groups", label: "Explore AI and WhatsApp service options" },
      { href: "/blog/sqc-solar-loans-website-mahabubnagar", label: "See a simple service-to-enquiry website path" },
      { href: "/seo-services-mahabubnagar", label: "Looking to appear in AI search instead? Start with SEO" },
    ],
  },
  "ai-automation-hyderabad": {
    heading: "Connect the enquiry to the team's next action",
    sections: [
      { title: "Map the workflow you already use", text: "For a team receiving enquiries across a website, WhatsApp and a CRM, the first job is identifying where information is lost. We document the trigger, required fields, routing rules, staff owner and failure path. A proposed integration is checked against the actual tools and permissions you have; an unsupported connection is not promised in the quote." },
      { title: "Choose the appropriate automation", text: "A website chatbot, a structured WhatsApp handoff and a CRM workflow solve different problems. A chatbot can answer approved FAQs; a form can collect a brief; an integration can route it to a queue. We separate deterministic rules from tasks that benefit from a language model so a simple process does not become unnecessarily expensive." },
      { title: "Keep a person responsible", text: "We agree escalation rules for uncertain answers, sensitive requests and failures. Test cases include incomplete contact details, requests outside the service scope and unavailable third-party systems. Access is limited to what the workflow needs, and retention and deletion expectations are documented before connecting customer data." },
      { title: "Price the build and the running costs", text: "The scope separates implementation, testing, handover and support from model usage, messaging-platform charges and third-party subscriptions. We do not promise unlimited conversations or an untested saving. A pilot gives your team a chance to review the workflow before expanding it. Delivery and support are remote from Mahabubnagar." },
    ],
    links: [
      { href: "/website-development-hyderabad", label: "Website development with an enquiry flow" },
      { href: "/seo-services-hyderabad", label: "SEO and AI search visibility in Hyderabad" },
      { href: "/blog/health-factor-dental-website-case-study", label: "A clinic appointment-request handoff explained" },
    ],
  },
};
