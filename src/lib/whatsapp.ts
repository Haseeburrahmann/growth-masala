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
