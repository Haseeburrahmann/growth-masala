import { services } from "@/data/services";

export type LeadSource = "contact_form" | "chatbot";

const serviceCategories = new Set([
  ...services.map((service) => service.slug),
  "full-package",
  "not-sure",
]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: "generate_lead",
      parameters: { method: LeadSource; service?: string },
    ) => void;
  }
}

/** Emit only controlled lead metadata after a server-accepted enquiry. */
export function trackAcceptedLead(
  source: LeadSource,
  service?: string,
): void {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_ID) {
    return;
  }

  const parameters: { method: LeadSource; service?: string } = { method: source };
  if (service && serviceCategories.has(service)) {
    parameters.service = service;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", parameters);
    return;
  }

  // Queue the documented gtag command shape if the lazy-loaded GA bootstrap
  // has not run yet; its initialization consumes the same dataLayer array.
  (window.dataLayer ??= []).push(["event", "generate_lead", parameters]);
}
