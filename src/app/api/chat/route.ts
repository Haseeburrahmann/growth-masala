import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/chatbot";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

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
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: sanitizedMessages,
    });

    // Extract text from response
    const textBlock = response.content.find((block) => block.type === "text");
    let reply = textBlock
      ? textBlock.text
      : "Sorry, I couldn't generate a response. Please try again.";

    // ── Detect and strip [PICK_SERVICE] tag ───────────────────────────────
    const showServicePicker = /\[PICK_SERVICE\]/i.test(reply);
    reply = reply.replace(/\[PICK_SERVICE\]/gi, "").trim();

    // ── Detect and strip [AWAIT_CONFIRM] tag ──────────────────────────────
    const awaitConfirmMatch = reply.match(
      /\[AWAIT_CONFIRM\]\s*name:\s*(.+?)\s*\|\s*phone:\s*(.+?)\s*\|\s*need:\s*(.+?)\s*\[\/AWAIT_CONFIRM\]/i
    );
    reply = reply.replace(/\[AWAIT_CONFIRM\][\s\S]*?\[\/AWAIT_CONFIRM\]/gi, "").trim();

    let pendingLead = null;
    if (awaitConfirmMatch) {
      const rawPhone = awaitConfirmMatch[2].trim();
      // Strip +91, leading 0, spaces, dashes — then check for exactly 10 digits
      const digitsOnly = rawPhone.replace(/^(\+91|0)/, "").replace(/[\s\-]/g, "");
      const isValidPhone = /^\d{10}$/.test(digitsOnly);
      if (isValidPhone) {
        pendingLead = {
          name: awaitConfirmMatch[1].trim(),
          phone: rawPhone,
          need: awaitConfirmMatch[3].trim(),
        };
      }
      // If invalid phone, pendingLead stays null — no lead is created
    }

    return NextResponse.json({ reply, showServicePicker, pendingLead });
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
