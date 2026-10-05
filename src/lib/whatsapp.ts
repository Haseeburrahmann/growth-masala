import { business } from "@/data/business";

/**
 * Pre-filled WhatsApp deep link — the lowest-friction contact path in this
 * market, and the one most enquiries actually arrive through.
 *
 * Shared by the homepage pricing section and the services pricing block. It
 * lives here rather than in either component because the two must produce the
 * same message for the same tier: an enquiry that reads differently depending on
 * which page it came from is harder to answer, not easier.
 */
export function pricingWhatsappLink(itemName: string, price: string): string {
  const message = `Hi Growth Masala, I'm interested in the ${itemName} plan (${price}). Could you tell me more?`;
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const ENQUIRY_LIMITS = {
  name: 100,
  business: 150,
  service: 150,
  message: 1500,
} as const;

export type EnquiryValues = Record<keyof typeof ENQUIRY_LIMITS, string>;
export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

/** Validate a brief before opening WhatsApp; no data is posted to our server. */
export function validateEnquiry(values: unknown): EnquiryErrors {
  const fields = values && typeof values === "object"
    ? values as Record<string, unknown>
    : {};
  const errors: EnquiryErrors = {};
  for (const field of Object.keys(ENQUIRY_LIMITS) as (keyof EnquiryValues)[]) {
    const value = fields[field];
    const text = typeof value === "string" ? value.trim() : "";
    if (field === "name" && !text) errors.name = "Please tell us your name.";
    else if (field === "message" && !text) errors.message = "Tell us a line or two about what you need.";
    else if (value != null && typeof value !== "string") errors[field] = "Please enter text here.";
    else if (typeof value === "string" && value.length > ENQUIRY_LIMITS[field]) {
      errors[field] = `Please keep this under ${ENQUIRY_LIMITS[field] + 1} characters.`;
    }
  }
  return errors;
}

/** Fixed business destination, bounded text, and one safely encoded text parameter. */
export function enquiryWhatsappLink(values: unknown): string {
  const fields = values && typeof values === "object"
    ? values as Record<string, unknown>
    : {};
  const clean = (field: string, limit: number) =>
    typeof fields[field] === "string" ? fields[field].trim().slice(0, limit) : "";
  const details = [
    ["Name", clean("name", ENQUIRY_LIMITS.name)],
    ["Business", clean("business", ENQUIRY_LIMITS.business)],
    ["Phone", clean("phone", 30)],
    ["Service", clean("service", ENQUIRY_LIMITS.service)],
  ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  const message = [
    "Hi Growth Masala, I'd like to discuss a project.",
    details.join("\n"),
    clean("message", ENQUIRY_LIMITS.message),
  ].filter(Boolean).join("\n\n");
  const url = new URL(business.whatsapp);
  url.searchParams.set("text", message);
  return url.toString();
}
