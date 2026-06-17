import { Bot, MessageCircle, Workflow, ArrowRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import Link from "next/link";

const aiHighlights = [
  {
    icon: MessageCircle,
    title: "AI Chatbots",
    text: "Answer customers on your website + WhatsApp, 24/7.",
  },
  {
    icon: Bot,
    title: "WhatsApp CRM",
    text: "Auto-replies, broadcasts, and a lead pipeline.",
  },
  {
    icon: Workflow,
    title: "Automation",
    text: "Lead comes in → AI qualifies → follow-up fires.",
  },
];

export default function AISpotlight() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-8 sm:p-12 lg:p-16">
            {/* Accent glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              {/* Copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Bot className="h-3.5 w-3.5" />
                  New · AI &amp; Automation
                </div>
                <h2 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl">
                  The AI assistant in the corner?{" "}
                  <span className="text-gradient">We built it.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                  We can build one for your business too — an AI agent that answers
                  customers and captures leads on your website and WhatsApp around the
                  clock, then automates the follow-up so nothing slips through.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/services#ai-automation"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
                  >
                    Explore AI &amp; Automation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-sm text-slate-500">
                    👉 Try it now — tap the chat bubble below.
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid gap-4">
                {aiHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
