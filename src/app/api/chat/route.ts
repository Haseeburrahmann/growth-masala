import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chatbot";
import { sendLeadEmail } from "@/lib/email";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

// Deduplication: track phone numbers already emailed in this server instance
// Prevents duplicate emails when Claude re-emits the tag on follow-up messages
const capturedLeadPhones = new Set<string>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

/** Strip spaces/dashes so "+91 98765 43210" and "9876543210" are treated as the same phone */
function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, "");
}

/**
 * Fallback: scan user messages in the conversation for a phone number + name.
 * Used when Claude forgets to emit the [LEAD] tag.
 */
function extractLeadFromHistory(
  messages: ChatMessage[]
): { name: string; phone: string; need: string } | null {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");

  // Match Indian mobile numbers — +91 prefix optional, must start with 6–9, 10 digits
  const phoneMatch = userText.match(/(?:\+91[-\s]?)?[6-9]\d{9}/);
  if (!phoneMatch) return null;

  // Try to extract name from common patterns
  const nameMatch = userText.match(
    /(?:my name is|i['']?m|i am|this is|name[:\s]+)\s*([A-Za-z]+(?:\s+[A-Za-z]+)?)/i
  );
  const name = nameMatch ? nameMatch[1].trim() : "Unknown";

  // Try to extract service interest
  const needMatch = userText.match(
    /(website|social media|instagram|facebook|ads?|marketing|e-commerce|landing page)/i
  );
  const need = needMatch ? needMatch[1] : "Not specified";

  return { name, phone: phoneMatch[0], need };
}

export async function POST(req: NextRequest) {
  try {
    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chatbot is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const messages: ChatMessage[] = body.messages;

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // Validate last message is from user
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from user." },
        { status: 400 }
      );
    }

    // Sanitize: slice last 20 messages, cap each at 2000 chars
    const sanitizedMessages = messages.slice(-20).map((msg) => ({
      role: msg.role as "user" | "assistant",
      content:
        typeof msg.content === "string" ? msg.content.slice(0, 2000) : "",
    }));

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 350,
      system: SYSTEM_PROMPT,
      messages: sanitizedMessages,
    });

    // Extract text from response
    const textBlock = response.content.find((block) => block.type === "text");
    let reply = textBlock
      ? textBlock.text
      : "Sorry, I couldn't generate a response. Please try again.";

    // --- LEAD DETECTION ---

    // Primary: detect [LEAD] tag emitted by Claude.
    // The `s` flag (dotAll) ensures the tag is matched even if Claude adds newlines inside it.
    const leadTagMatch = reply.match(
      /\[LEAD\][\s\S]*?name:\s*(.+?)\s*\|[\s\S]*?phone:\s*(.+?)\s*\|[\s\S]*?need:\s*(.+?)[\s\S]*?\[\/LEAD\]/is
    );

    // Always strip the tag from the visible reply
    reply = reply.replace(/\[LEAD\][\s\S]*?\[\/LEAD\]/is, "").trim();

    let leadData: { name: string; phone: string; need: string } | null = null;

    if (leadTagMatch) {
      leadData = {
        name: leadTagMatch[1].trim(),
        phone: leadTagMatch[2].trim(),
        need: leadTagMatch[3].trim(),
      };
    } else {
      // Fallback: Claude forgot the tag — extract from conversation history directly
      leadData = extractLeadFromHistory(sanitizedMessages);
    }

    // Send email if we have a lead and haven't already emailed this phone number
    if (leadData) {
      const phoneKey = normalizePhone(leadData.phone);
      if (!capturedLeadPhones.has(phoneKey)) {
        capturedLeadPhones.add(phoneKey);
        try {
          await sendLeadEmail(leadData);
          console.log(
            `[Lead] Email sent — name: ${leadData.name}, phone: ${leadData.phone}, need: ${leadData.need}`
          );
        } catch (err) {
          // Remove from set so the next message can retry
          capturedLeadPhones.delete(phoneKey);
          console.error("[Lead] Failed to send lead email:", err);
        }
      }
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    // Handle specific Anthropic errors
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Chatbot configuration error. Please contact support." },
        { status: 401 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Our AI assistant is busy right now. Please try again in a moment." },
        { status: 429 }
      );
    }

    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
