import { MapPin, UserCheck, FileCheck, Bot, Check } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";

/**
 * Four buying questions paired with the commitments we already publish.
 * Keep the compact four-pillar strip and four-row layout; describe our work
 * without assigning unsupported shortcomings to other providers.
 */
const pillars = [
  {
    icon: MapPin,
    title: "A Telangana-based team",
    body: "Based in Mahabubnagar, working remotely in Telugu, Hindi or English.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "You get the senior person",
    body: "Whoever quotes it, builds it.",
    accent: false,
  },
  {
    icon: FileCheck,
    title: "Fixed quote, up front",
    body: "Scope and number in writing, before anything starts.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI enquiry workflows",
    body: "Chatbots, WhatsApp automation, voice agents.",
    accent: true,
  },
];

const buyingQuestions = [
  {
    topic: "Project scope",
    question: "What is included in the quote?",
    ours: "Scope and price in writing before work starts.",
  },
  {
    topic: "Your point of contact",
    question: "Who will answer questions about the work?",
    ours: "A direct line to the person building it.",
  },
  {
    topic: "Delivery",
    question: "When will the website be ready?",
    ours: "A launch date agreed in writing.",
  },
  {
    topic: "Ownership and handover",
    question: "Who controls the domain and website accounts?",
    ours: "Your domain. Your logins. Handed over.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      {/* Grid texture + warm bloom. Both decorative, both pointer-transparent. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 hidden h-130 w-130 rounded-full bg-accent/12 blur-[110px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          tone="dark"
          eyebrow="Why choose us"
          lead="Compare the scope."
          trail="Know who will deliver."
          standfirst="Four questions to ask any website provider, and how we work."
        />

        {/* Four short claims as a strip, not as cards. A hairline above each
            one is enough separation at this length; boxing them would put four
            bordered rectangles directly above four more. */}
        <AnimatedContainer delay={120} className="mt-10 lg:mt-12">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              /* Icon beside the text until `lg`, above it from there. In one
                 column an icon on its own line costs a whole row of height per
                 pillar for no gain; in a 280px grid cell there is no room for
                 it beside the title. */
              <div
                key={pillar.title}
                className="flex gap-3.5 border-t border-white/12 pt-5 lg:block"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:mb-3.5 ${
                    pillar.accent
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/20 text-secondary"
                  }`}
                >
                  <pillar.icon aria-hidden="true" className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold leading-snug text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContainer>

        {/* Buying questions and our commitments share one responsive layout:
            two columns on desktop, a stacked question and answer on mobile. */}
        <AnimatedContainer animation="fade-in" delay={160} className="mt-10 lg:mt-14">
          <div className="md:overflow-hidden md:rounded-2xl md:border md:border-white/12 md:bg-navy-light">
            {/* Column headings only exist where there are columns. Separation
                from the first row is a bottom border here rather than a top
                border on the row, so it never has to out-rank `md:border-0`. */}
            <div className="hidden bg-white/4 md:grid md:grid-cols-2 md:border-b md:border-white/8">
              <p className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
                Ask before you choose
              </p>
              <p className="bg-primary/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-blue-300">
                With Growth Masala
              </p>
            </div>

            {/* `divide-y` rather than a border on each row: its selector
                out-specifies `md:border-0`, so the card border can be switched
                off at `md` without the row separators going with it. */}
            <div className="flex flex-col gap-3 md:gap-0 md:divide-y md:divide-white/8">
              {buyingQuestions.map((row) => (
                <div
                  key={row.topic}
                  className="overflow-hidden rounded-2xl border border-white/12 bg-navy-light md:grid md:grid-cols-2 md:items-stretch md:rounded-none md:border-0"
                >
                  <div className="px-4 pb-3.5 pt-4 sm:px-6 md:py-5">
                    <p className="font-heading text-base font-semibold leading-snug text-white">
                      {row.topic}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-slate-400">
                      {row.question}
                    </p>
                  </div>

                  {/* Top-aligned, not centred: from `md` this line sits on the
                      same baseline as the topic it answers, so the eye
                      pairs them across the gutter without a rule between. */}
                  <p className="flex gap-2.5 bg-primary/12 px-4 py-3.5 text-sm font-medium leading-snug text-white sm:px-6 md:py-5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    />
                    {row.ours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
