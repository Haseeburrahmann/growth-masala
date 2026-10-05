import { NextResponse } from "next/server";
import { business } from "@/data/business";

/** Legacy clients must explicitly continue in WhatsApp; no enquiry is accepted here. */
export async function POST() {
  return NextResponse.json(
    {
      error: "This enquiry endpoint is retired. Continue in WhatsApp, review your message, and press Send there.",
      whatsapp: business.whatsapp,
    },
    { status: 410 },
  );
}
