import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, need } = await req.json();

    if (!name || !phone || !need) {
      return NextResponse.json(
        { error: "Missing lead data." },
        { status: 400 }
      );
    }

    await sendLeadEmail({ name, phone, need });

    console.log(`[Lead] Confirmed — name: ${name}, phone: ${phone}, need: ${need}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead] Failed to send lead email:", error);
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
