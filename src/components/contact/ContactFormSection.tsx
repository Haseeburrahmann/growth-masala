import { Clock, MapPin, MessageCircle, Timer } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import ContactForm from "@/components/forms/ContactForm";
import { address, addressLine, business, openingHoursLine } from "@/data/business";

/**
 * The form, with the details a visitor needs in order to trust sending it.
 *
 * The sidebar is not decoration. Opening hours had lived only inside the
 * JSON-LD — Google was told when we are open and the visitor was not — and a
 * stated reply window is the thing that makes a form feel like it reaches
 * someone rather than a void.
 *
 * The address is labelled "Based in", never "Visit us", and there is no
 * directions link. `address.streetAddress` is a road-level placeholder set on
 * the owner's instruction; it is accurate enough to keep NAP consistent across
 * citations and nowhere near accurate enough to send someone to a door. When
 * the real premises lands in `business.ts`, this is where a directions link
 * belongs.
 */

const assurances = [
  {
    icon: Timer,
    title: "A reply within 24 hours",
    body: "Usually the same day if you write during working hours.",
  },
  {
    icon: MessageCircle,
    title: "A person, not a form letter",
    body: "You will be talking to whoever would actually do the work.",
  },
];

export default function ContactFormSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          {/* Details column */}
          <div className="lg:col-span-2">
            <AnimatedContainer>
              <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                Send us the details
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                The more you can tell us about the business and what you are
                trying to change, the more useful our first reply will be. If you
                would rather just talk, WhatsApp is faster than any form.
              </p>

              <div className="mt-9 space-y-5">
                {assurances.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-semibold text-text-primary">
                        {title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* NAP + hours. This block must stay byte-identical to
                  `business.ts` — it is the same address every external listing
                  has to carry character for character. */}
              <dl className="mt-10 space-y-5 border-t border-border pt-8">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Based in
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-text-primary">
                      {addressLine}, India
                    </dd>
                    <dd className="mt-1 text-sm text-text-secondary">
                      Serving {address.locality} district, Hyderabad, and the
                      rest of India.
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Working hours
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-text-primary">
                      {openingHoursLine}
                    </dd>
                    <dd className="mt-1 text-sm text-text-secondary">
                      Closed Sundays. WhatsApp messages sent outside these hours
                      are answered the next working morning.
                    </dd>
                  </div>
                </div>
              </dl>

              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-text-primary/15 px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Message us on WhatsApp instead
              </a>
            </AnimatedContainer>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <AnimatedContainer delay={120}>
              <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
                <ContactForm />
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
