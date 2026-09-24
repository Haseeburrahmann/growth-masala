import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  address,
  business,
  openingHoursLine,
} from "@/data/business";

/**
 * Explains the remote service area beside verified contact methods. Growth
 * Masala has no customer-facing premises, so this section deliberately has no
 * map pin, directions link, or postal address.
 */

const napRows = [
  {
    icon: MapPin,
    label: "Based in",
    value: `${address.locality}, ${address.region} · serving remotely`,
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    icon: Clock3,
    label: "Reply hours",
    value: openingHoursLine,
    href: null,
  },
];

export default function ContactLocal() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-5 lg:grid-cols-5">
          <AnimatedContainer className="lg:col-span-3">
            <div className="flex h-full min-h-72 flex-col justify-between rounded-[20px] border border-border bg-surface p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-2xl font-semibold text-text-primary">
                  Based in {address.locality}
                </p>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-text-secondary">
                  We serve Hyderabad and businesses across Telangana remotely.
                  Project discussions and delivery happen by phone, WhatsApp,
                  email, and shared online workspaces. We do not have a
                  customer-facing office.
                </p>
              </div>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={120} className="lg:col-span-2">
            <div className="rounded-[20px] border border-border bg-surface p-7">
              <p className="font-heading text-xl font-semibold text-text-primary">
                {business.name}
              </p>
              <p className="mt-1.5 text-sm leading-[21px] text-text-secondary/85">
                Digital marketing agency · based in {address.locality}, {address.region}
              </p>

              <dl className="mt-5 divide-y divide-border">
                {napRows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3.5 py-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8">
                      <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary/85">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-[15px] font-medium leading-[23px] text-text-primary">
                        {href ? (
                          <a
                            href={href}
                            className="break-words transition-colors hover:text-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
