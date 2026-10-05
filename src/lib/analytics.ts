import { services } from "@/data/services";

export type EnquirySource = "contact_form" | "chatbot";

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
      eventName: "whatsapp_click",
      parameters: { method: EnquirySource; service?: string },
    ) => void;
  }
}

/** Count intent to open WhatsApp, not delivery. Never include names, numbers, or message text. */
export function trackWhatsAppClick(
  source: EnquirySource,
  service?: string,
): void {
  if (
    (source !== "contact_form" && source !== "chatbot") ||
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_GA_ID
  ) {
    return;
  }

  const parameters: { method: EnquirySource; service?: string } = { method: source };
  if (service && serviceCategories.has(service)) {
    parameters.service = service;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", parameters);
    return;
  }

  // Queue the documented gtag command shape if the lazy-loaded GA bootstrap
  // has not run yet; its initialization consumes the same dataLayer array.
  (window.dataLayer ??= []).push(["event", "whatsapp_click", parameters]);
}
