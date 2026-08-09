import Link from "next/link";
import { Info } from "lucide-react";
import { formatPrice, websiteTiers } from "@/data/pricing";

/**
 * "What we charge" — the box the canvas draws inside the article body.
 *
 * Two things about it are deliberate.
 *
 * **The number is read, never typed.** It comes off the entry tier in
 * `src/data/pricing.ts`, the same object the pricing UI, the `Offer` JSON-LD and
 * the chatbot read. Posts already resolve `{{price:starter}}` from that file for
 * exactly this reason; a rupee figure hardcoded here would be the one copy that
 * does not move when the price does.
 *
 * **The copy is generic, not per-post.** The canvas writes this callout for the
 * five-page-cost article. Rendering that specific wording under a Meta ads post
 * would be nonsense, and a per-post callout would have to live in the markdown —
 * which needs a block syntax the renderer does not have. So it says the thing
 * that is true under every post: our numbers are published, here is the floor,
 * here is the list.
 */
export default function PriceCallout() {
  const entry = websiteTiers[0];
  if (!entry) return null;

  return (
    <aside className="my-10 rounded-2xl border border-primary/15 bg-primary/4 p-5 sm:p-6.5">
      <div className="flex items-center gap-2.5">
        <Info aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-primary" />
        <h2 className="font-heading text-base font-semibold text-text-primary sm:text-[17px]">
          What we charge
        </h2>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-text-secondary sm:text-base">
        Every rupee figure in this post is the same number we quote on a call.
        Website builds start at{" "}
        <strong className="font-semibold text-text-primary">
          {formatPrice(entry.amount)}
        </strong>{" "}
        excluding GST for the {entry.name} package, and the whole ladder — builds,
        care plans and add-ons — is on{" "}
        <Link
          href="/services#pricing"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
        >
          our price list
        </Link>
        , so you do not have to book a call to find out.
      </p>
    </aside>
  );
}
