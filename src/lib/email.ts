import nodemailer from "nodemailer";

/** Escapes HTML special characters to prevent XSS in email bodies */
function htmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  business: string;
  service: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, business, service, message } = data;

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    business && `Business: ${business}`,
    service && `Service: ${service}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #2563EB; margin-bottom: 20px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${htmlEscape(name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${htmlEscape(email)}">${htmlEscape(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${htmlEscape(phone)}</td></tr>` : ""}
        ${business ? `<tr><td style="padding: 8px 0; font-weight: bold;">Business</td><td>${htmlEscape(business)}</td></tr>` : ""}
        ${service ? `<tr><td style="padding: 8px 0; font-weight: bold;">Service</td><td>${htmlEscape(service)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
        <p style="font-weight: bold; margin: 0 0 8px;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap;">${htmlEscape(message)}</p>
      </div>
      <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
        Sent from Growth Masala website contact form
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Growth Masala" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    replyTo: email,
    subject: `[Growth Masala] New Inquiry: ${service || "General"} — ${name}`,
    text: textBody,
    html: htmlBody,
  });
}

interface LeadData {
  name: string;
  phone: string;
  need: string;
}

export async function sendLeadEmail(data: LeadData) {
  const { name, phone, need } = data;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #2563EB; margin-bottom: 20px;">🔥 New Lead from Chatbot</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${htmlEscape(name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td><a href="tel:${htmlEscape(phone)}">${htmlEscape(phone)}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Need</td><td>${htmlEscape(need)}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
        Captured via Masala Bot on growthmasala.com
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Growth Masala" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    subject: `[Growth Masala] 🔥 Chatbot Lead: ${name} — ${need}`,
    text: `New chatbot lead:\nName: ${name}\nPhone: ${phone}\nNeed: ${need}`,
    html: htmlBody,
  });
}
