import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business } from "@/data/business";

/**
 * The page's single ask.
 *
 * Navy, because it closes a run of light sections and the homepage uses the same
 * device to mark a change of room. Three contact paths rather than one: in this
 * market WhatsApp outperforms a form badly enough that making it the secondary
 * option costs real enquiries.
 */
export default function ServicesCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <AnimatedContainer>
          <h2 className="font-heading text-3xl font-bold text-white text-balance sm:text-4xl">
            Not sure which of these you need?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            Tell us what the business does and what is not working. We will say
            which service actually fixes it — and if that is none of them, we
            will say that too. The consultation is free, and we are in{" "}
            {address.locality} if you would rather meet.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:w-auto"
            >
              Book a free consultation
              <ArrowRight className="cta-arrow h-4 w-4" />
            </Link>

            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>

          <a
            href={`tel:${business.phone}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </AnimatedContainer>
      </div>
    </section>
  );
}
