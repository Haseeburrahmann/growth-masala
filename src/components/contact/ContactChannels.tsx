import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  address,
  addressLine,
  business,
  openingHoursLine,
} from "@/data/business";

/**
 * Four ways to reach us, ranked.
 *
 * These used to be three bare links in the hero — a label and a number, no
 * indication of which one is fastest or what each is good for. In this district
 * WhatsApp converts better than every other channel combined, so it is the one
 * card with a primary border: the highlight is the recommendation, not
 * decoration.
 *
 * Every value is read from `business.ts`. Retyping a number here is the exact
 * failure mode NAP consistency is scored on — see the warning at the top of that
 * file.
 *
 * ⚠️ "Get directions" on the fourth card. `address.streetAddress` is a
 * road-level placeholder set on the owner's instruction, so this link resolves
 * to the road we publish everywhere, not to a specific door — which is all the
 * published address claims. The card copy says "message first" for the same
 * reason. When the real premises lands in `business.ts` nothing here needs to
 * change; it simply gets more precise.
 */

interface Channel {
  title: string;
  value: string;
  description: string;
  meta: string;
  metaIcon: LucideIcon;
  icon: LucideIcon;
  cta: string;
  href: string;
  external: boolean;
  /** The recommended channel gets the primary border. Exactly one. */
  featured?: boolean;
}

const channels: Channel[] = [
  {
    title: "WhatsApp",
    value: business.phoneDisplay,
    description:
      "Fastest. Send a photo of your current site or shop and we will work from that.",
    meta: "Usually within the hour",
    metaIcon: Clock3,
    icon: MessageCircle,
    cta: "Open WhatsApp",
    href: business.whatsapp,
    external: true,
    featured: true,
  },
  {
    title: "Phone",
    value: business.phoneDisplay,
    description:
      "Talk it through in Telugu, Hindi or English. No script, no gatekeeper.",
    meta: openingHoursLine,
    metaIcon: Clock3,
    icon: Phone,
    cta: "Call now",
    href: `tel:${business.phone}`,
    external: false,
  },
  {
    title: "Email",
    value: business.email,
    description:
      "Best for a detailed brief, a document, or anything you want in writing.",
    meta: "Same working day",
    metaIcon: Clock3,
    icon: Mail,
    cta: "Send an email",
    href: `mailto:${business.email}`,
    external: false,
  },
  {
    title: "Visit us",
    value: `${address.streetAddress}, ${address.locality}`,
    description:
      "Come in and talk it through in person. Message first so someone is at the desk.",
    meta: `${address.region} ${address.postalCode}`,
    metaIcon: MapPin,
    icon: MapPin,
    cta: "Get directions",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${business.name}, ${addressLine}`
    )}`,
    external: true,
  },
];

export default function ContactChannels() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pick a channel
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-balance sm:text-4xl lg:max-w-2xl lg:text-[2.875rem]">
              <span className="block">Four ways to reach us.</span>
              <span className="block text-text-secondary/75">
                WhatsApp is the fastest.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary lg:flex-1 lg:text-[17px]">
              Every one of these reaches the same two people. Use whichever you
              already have open — nothing gets routed to a call centre.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, index) => (
            <AnimatedContainer key={channel.title} delay={index * 80}>
              <ChannelCard channel={channel} />
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  const {
    title,
    value,
    description,
    meta,
    metaIcon: MetaIcon,
    icon: Icon,
    cta,
    href,
    external,
    featured,
  } = channel;

  return (
    /* The whole card is the link target — a 26px-padded card with a 14px text
       link inside it is a 44px target only by accident. `focus-within` moves the
       ring onto the card so keyboard focus is visible on the same box a mouse
       gets. */
    <div
      className={`hover-lift relative flex h-full flex-col rounded-[20px] p-6 transition-colors focus-within:ring-2 focus-within:ring-primary/40 ${
        featured
          ? "border-2 border-primary bg-primary/4"
          : "border border-border bg-surface hover:border-primary/30"
      }`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          featured ? "bg-primary/15" : "bg-primary/8"
        }`}
      >
        <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
      </span>

      <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-1.5 text-sm font-semibold text-primary">{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      {/* mt-auto keeps the meta line and CTA on a shared baseline across the
          row even though the descriptions wrap to different heights. */}
      <div className="mt-auto pt-5">
        <div className="border-t border-border pt-3.5">
          <p className="flex items-center gap-2 text-[13px] leading-[18px] text-text-secondary/85">
            <MetaIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {meta}
          </p>
        </div>

        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary outline-none after:absolute after:inset-0 after:content-['']"
        >
          {cta}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
