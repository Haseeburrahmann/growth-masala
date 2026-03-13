import { NextRequest, NextResponse } from "next/server";

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

    // TODO: Send email via Resend or Nodemailer when API keys are configured
    // For now, log the submission
    console.log("Contact form submission:", sanitized);

    // When RESEND_API_KEY is available, uncomment:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Growth Masala <noreply@growthmasala.com>",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New inquiry from ${sanitized.name}`,
    //   text: `Name: ${sanitized.name}\nEmail: ${sanitized.email}\nPhone: ${sanitized.phone}\nBusiness: ${sanitized.business}\nService: ${sanitized.service}\n\nMessage:\n${sanitized.message}`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
