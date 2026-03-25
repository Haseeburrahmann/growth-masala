"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────────────────────────

interface LeadData {
  name: string;
  phone: string;
  need: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  showServicePicker?: boolean;
  pendingLead?: LeadData;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "gm-chat-history";
const AUTO_OPENED_KEY = "gm-chat-auto-opened";
const WHATSAPP_URL = "https://wa.me/918688269427";

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "👋 Hey! I'm **Masala Bot** — Growth Masala's assistant.\n\nLooking to grow your business online? I can help you get started in 2 minutes.",
};

// ─── Quick Reply Config (initial chips) ────────────────────────────────────

type QuickReplyLevel = "main" | "services";

interface QuickReply {
  id: string;
  label: string;
  message?: string;
  href?: string;
  nextLevel?: QuickReplyLevel;
}

const MAIN_QUICK_REPLIES: QuickReply[] = [
  {
    id: "book",
    label: "📅 Book a Call",
    message: "I'd like to book a free consultation call",
  },
  {
    id: "services",
    label: "🚀 Our Services",
    message: "What services do you offer?",
    nextLevel: "services",
  },
  {
    id: "quote",
    label: "💰 Get a Quote",
    message: "I'd like to get a quote for my business",
  },
  {
    id: "whatsapp",
    label: "💬 WhatsApp",
    href: WHATSAPP_URL,
  },
];

const SERVICES_QUICK_REPLIES: QuickReply[] = [
  {
    id: "website",
    label: "🌐 Website Dev",
    message: "Tell me more about website development",
  },
  {
    id: "social",
    label: "📱 Social Media",
    message: "Tell me more about social media management",
  },
  {
    id: "ads",
    label: "📊 Performance Ads",
    message: "Tell me more about performance marketing and ads",
  },
  {
    id: "seo",
    label: "🔍 SEO",
    message: "Tell me more about your SEO services",
  },
];

// ─── Lead service options (shown inline during lead capture) ───────────────

const LEAD_SERVICE_OPTIONS = [
  { id: "website", label: "🌐 Website Development", value: "Website Development" },
  { id: "social", label: "📱 Social Media Management", value: "Social Media Management" },
  { id: "ads", label: "📊 Performance Marketing & Ads", value: "Performance Marketing & Ads" },
  { id: "seo", label: "🔍 SEO", value: "SEO" },
];

// ─── Chip button (shared style for initial quick replies) ──────────────────

function ChipButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-primary/40 bg-white px-3 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
    >
      {label}
    </button>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [quickReplyLevel, setQuickReplyLevel] = useState<QuickReplyLevel>("main");
  const [isTyping, setIsTyping] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [leadConfirmed, setLeadConfirmed] = useState(false);
  const [leadConfirmLoading, setLeadConfirmLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load session history ──────────────────────────────────────────────────
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {}
    setMessages([WELCOME_MESSAGE]);
    setShowQuickReplies(true);
  }, []);

  // ── Save session history ──────────────────────────────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // ── Auto-open logic ───────────────────────────────────────────────────────
  useEffect(() => {
    const alreadyAutoOpened = sessionStorage.getItem(AUTO_OPENED_KEY);
    if (alreadyAutoOpened) return;

    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      autoOpenTimerRef.current = setTimeout(() => {
        sessionStorage.setItem(AUTO_OPENED_KEY, "1");
        setIsOpen(true);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      }, 4000);
    } else {
      autoOpenTimerRef.current = setTimeout(() => {
        sessionStorage.setItem(AUTO_OPENED_KEY, "1");
        setWiggle(true);
        setTimeout(() => setWiggle(false), 1000);
      }, 4000);
    }

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    };
  }, []);

  // ── Scroll to bottom on new messages ─────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isTyping]);

  // ── Focus input when opened ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ── Hide initial chips when user starts typing ────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) setShowQuickReplies(false);
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (overrideText?: string) => {
      const trimmed = (overrideText ?? input).trim();
      if (!trimmed || isLoading) return;

      setShowQuickReplies(false);

      const userMessage: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        // Strip UI-only fields before sending to Claude
        const apiMessages = updatedMessages
          .filter((_, i) => i > 0 || updatedMessages[0].role === "user")
          .map(({ role, content }) => ({ role, content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const data = await res.json();

        if (res.ok && data.reply) {
          const botMessage: Message = {
            role: "assistant",
            content: data.reply,
            showServicePicker: data.showServicePicker ?? false,
            pendingLead: data.pendingLead ?? undefined,
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.error || "Sorry, something went wrong. Please try again.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Network error. Please check your connection and try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  // ── Confirm lead — calls /api/lead, fires email ───────────────────────────
  const handleConfirmLead = useCallback(
    async (lead: LeadData) => {
      setLeadConfirmLoading(true);
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });

        if (res.ok) {
          setLeadConfirmed(true);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "✅ Done! Our team will reach out to you shortly.\n\nYou can also WhatsApp us anytime at **+91 86882 69427** or email **growthmasala@gmail.com**.",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, something went wrong. Please reach us directly on WhatsApp at **+91 86882 69427**.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Network error. Please reach us directly on WhatsApp at **+91 86882 69427**.",
          },
        ]);
      } finally {
        setLeadConfirmLoading(false);
      }
    },
    []
  );

  // ── Handle initial quick reply chip click ─────────────────────────────────
  const handleQuickReply = (reply: QuickReply) => {
    if (isLoading) return;

    if (reply.href) {
      window.open(reply.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (reply.nextLevel) {
      setQuickReplyLevel(reply.nextLevel);
      setShowQuickReplies(true);
    }

    if (reply.message) {
      sendMessage(reply.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentQuickReplies =
    quickReplyLevel === "services" ? SERVICES_QUICK_REPLIES : MAIN_QUICK_REPLIES;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Chat panel */}
      <div
        className="absolute right-0 flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
        style={{
          bottom: "4.5rem",
          width: "min(21rem, calc(100vw - 2rem))",
          height: "520px",
          transformOrigin: "bottom right",
          transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
          ...(isOpen
            ? {
                visibility: "visible" as const,
                opacity: 1,
                transform: "scale(1) translateY(0px)",
              }
            : {
                visibility: "hidden" as const,
                opacity: 0,
                transform: "scale(0.95) translateY(8px)",
                pointerEvents: "none" as const,
              }),
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-navy px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/15">
              <Image
                src="/images/logo.png"
                alt="Growth Masala"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Masala Bot</p>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="text-[11px] text-white/60">Online • Growth Masala</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => {
            const isLastMessage = i === messages.length - 1;
            return (
              <div key={i}>
                {/* Message bubble */}
                <div
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-white"
                        : "rounded-bl-md bg-surface text-text-primary"
                    }`}
                  >
                    <FormattedMessage content={msg.content} />
                  </div>
                </div>

                {/* Inline service picker — shown on last bot message requesting service */}
                {msg.role === "assistant" &&
                  msg.showServicePicker &&
                  isLastMessage &&
                  !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-1">
                      {LEAD_SERVICE_OPTIONS.map((opt) => (
                        <ChipButton
                          key={opt.id}
                          label={opt.label}
                          onClick={() =>
                            sendMessage(`I'm interested in ${opt.value}`)
                          }
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                  )}

                {/* Confirm card — shown with collected lead data */}
                {msg.role === "assistant" &&
                  msg.pendingLead &&
                  !leadConfirmed && (
                    <div className="mt-3 ml-1 rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        Your Details
                      </p>
                      <div className="space-y-1 text-sm text-text-primary mb-3">
                        <div>
                          <span className="font-medium">Name: </span>
                          {msg.pendingLead.name}
                        </div>
                        <div>
                          <span className="font-medium">Phone: </span>
                          {msg.pendingLead.phone}
                        </div>
                        <div>
                          <span className="font-medium">Service: </span>
                          {msg.pendingLead.need}
                        </div>
                      </div>
                      <button
                        onClick={() => handleConfirmLead(msg.pendingLead!)}
                        disabled={leadConfirmLoading}
                        className="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {leadConfirmLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "✅ Yes, send my details!"
                        )}
                      </button>
                    </div>
                  )}
              </div>
            );
          })}

          {/* Auto-open fake typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-surface px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Bot responding indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-surface px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Initial quick reply chips */}
          {showQuickReplies && !isLoading && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-1">
              {quickReplyLevel === "services" && (
                <p className="w-full text-[11px] text-text-secondary/60 px-1">
                  Which service are you interested in?
                </p>
              )}
              {currentQuickReplies.map((reply) => (
                <ChipButton
                  key={reply.id}
                  label={reply.label}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-primary disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-dark disabled:opacity-40"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="flex items-center gap-3">
        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105 hover:bg-[#1ebe5d] active:scale-95"
          aria-label="Chat on WhatsApp"
          style={{ touchAction: "manipulation" }}
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Chat toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary-dark active:scale-95 ${wiggle ? "animate-wiggle" : ""}`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          style={{ touchAction: "manipulation" }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Markdown formatter ────────────────────────────────────────────────────

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
              <span dangerouslySetInnerHTML={{ __html: boldFormat(line.slice(2)) }} />
            </div>
          );
        }
        if (!line.trim()) return <div key={i} className="h-1" />;
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: boldFormat(line) }} />
        );
      })}
    </div>
  );
}

function boldFormat(text: string): string {
  return text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold">$1</strong>'
  );
}
