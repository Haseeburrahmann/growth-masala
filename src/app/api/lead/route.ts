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

    // Validate name — at least 2 chars, letters/spaces only
    const cleanName = String(name).trim();
    if (cleanName.length < 2 || !/^[\p{L}\s'-]+$/u.test(cleanName)) {
      return NextResponse.json(
        { error: "Invalid name." },
        { status: 400 }
      );
    }

    // Validate phone — exactly 10 digits after stripping +91/0/spaces/dashes
    const digitsOnly = String(phone).replace(/^(\+91|0)/, "").replace(/[\s\-]/g, "");
    if (!/^\d{10}$/.test(digitsOnly)) {
      return NextResponse.json(
        { error: "Invalid phone number." },
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
