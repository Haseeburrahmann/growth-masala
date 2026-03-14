import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  business: string;
  service: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Sanitize input — cap lengths
    const sanitized = {
      name: body.name.slice(0, 200),
      phone: (body.phone || "").slice(0, 20),
      email: body.email.slice(0, 200),
      business: (body.business || "").slice(0, 200),
      service: (body.service || "").slice(0, 200),
      message: body.message.slice(0, 5000),
    };

    await sendContactEmail(sanitized);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
