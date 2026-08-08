import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business } from "@/data/business";
import { formatPrice, websiteTiers } from "@/data/pricing";

/**
 * Contact hero.
 *
 * Two deliberate choices:
 *
 * The three channels sit above the fold as real links, not as a paragraph
 * pointing further down the page. In this market WhatsApp converts better than
 * a form by a wide margin, and burying it under a six-field form to make the
 * form look important costs enquiries.
 *
 * The price line is here rather than in a pricing table. Repeating the whole
 * ladder on a contact page would be noise, but "you can find out what this
 * costs without talking to us" is the single most disarming thing this page can
 * say — every competitor in the district gates it behind a call.
 *
 * White H1 with an amber underline, per the homepage. `.text-gradient` was here
 * and measured 3.64:1 on navy.
 */
export default function ContactHero() {
  const channels = [
    {
      label: "WhatsApp",
      value: business.phoneDisplay,
      href: business.whatsapp,
      external: true,
      icon: MessageCircle,
    },
    {
      label: "Call",
      value: business.phoneDisplay,
      href: `tel:${business.phone}`,
      external: false,
      icon: Phone,
    },
    {
      label: "Email",
      value: business.email,
      href: `mailto:${business.email}`,
      external: false,
      icon: Mail,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 right-[10%] h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="animate-float hidden md:block absolute top-24 left-[6%] h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Contact
            </span>
          </div>

          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Talk to a real person</span>
            <span
              className="headline-mark animate-headline-mark"
              style={{ animationDelay: "600ms" }}
            >
              in {address.locality}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Not a call centre and not a chatbot handoff — the people who would do
            the work. Tell us what the business does and what is not working, and
            we will tell you straight whether we can help. The first conversation
            is free and comes with no obligation.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            You do not need to contact us to find out what we charge.{" "}
            <Link
              href="/services#pricing"
              className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              Every price is published
            </Link>{" "}
            — websites start at {formatPrice(websiteTiers[0].amount)}, excluding
            GST.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={140} animation="fade-in">
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {channels.map(({ label, value, href, external, icon: Icon }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/[0.08]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 transition-colors group-hover:bg-primary/25">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                  </span>
                  <span className="block truncate text-sm font-medium text-white">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
