/**
 * Masala Bot's face.
 *
 * ## Why it is drawn here and not generated
 *
 * The widget used `/images/logo.png` — the company logo, squeezed into a 28px
 * circle — as the assistant's avatar, and a stock `MessageCircle` glyph on the
 * launcher. Neither is a character. A logo in an avatar slot reads as "brand
 * badge", not "someone is talking to you", and the two together meant the bot
 * had no face anywhere in the product.
 *
 * It is inline SVG rather than a raster because it renders at 20px in a message
 * row and 30px on the launcher: any bitmap is either soft at the top of that
 * range or oversized for the bottom of it. Inline also means it inherits the
 * page's colour tokens and costs no request.
 *
 * ## It is built from the real mark, not approximated
 *
 * Per the project rule about visual assets, the geometry here is taken from
 * `public/brand-assets/logo-mark.svg` rather than eyeballed:
 *
 *   - The gradient is the mark's own `markGrad`, #1D4ED8 → #38BDF8, at the same
 *     bottom-left-to-top-right angle.
 *   - The four ascending bars on the visor are the mark's four `rect`s at their
 *     published opacities (0.65 / 0.8 / 0.92 / 1), rescaled into the visor box.
 *     That is what makes this Growth Masala's bot and not a generic robot head.
 *   - Amber #F59E0B appears once, on the antenna. It is the brand accent and it
 *     is the only warm note in the mark — which is the whole "masala" idea,
 *     used as a highlight rather than as a chilli emoji. (An earlier OG image
 *     did use a chilli in place of the logo. Not again.)
 *
 * No colour in this file is invented; every value is in
 * `brand-guidelines.svg` and in the `@theme` block of `globals.css`.
 *
 * ## Accessibility
 *
 * Decorative by default — every place it is used has a real text label beside
 * it or an `aria-label` on the control that wraps it. Pass a `title` only if
 * you put it somewhere that has neither.
 */

interface MasalaBotMarkProps {
  className?: string;
  /** Accessible name. Omit when an adjacent label or the parent already names it. */
  title?: string;
}

export default function MasalaBotMark({ className, title }: MasalaBotMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        {/* The mark's own gradient. Same stops, same 0%,100% → 100%,0% angle. */}
        <linearGradient id="gm-bot-head" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Antenna — the one amber element. Drawn before the head so the stalk
          tucks behind it rather than crossing the top edge. */}
      <path
        d="M24 10.5V6.5"
        stroke="#F59E0B"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="4.6" r="3" fill="#F59E0B" />

      {/* Head */}
      <rect
        x="6"
        y="10"
        width="36"
        height="30"
        rx="10"
        fill="url(#gm-bot-head)"
      />

      {/* Visor. Dark navy so the bars read against it at 20px — the same
          #0B1121 the site uses for every dark surface. */}
      <rect x="11.5" y="16" width="25" height="13" rx="5" fill="#0B1121" />

      {/* The logo mark's four ascending bars, rescaled into the visor.
          Opacities are the published ones, so the ramp matches the real mark. */}
      <rect x="15" y="24" width="3" height="3" rx="1.2" fill="#38BDF8" opacity="0.65" />
      <rect x="19.7" y="22" width="3" height="5" rx="1.2" fill="#38BDF8" opacity="0.8" />
      <rect x="24.4" y="20.2" width="3" height="6.8" rx="1.2" fill="#38BDF8" opacity="0.92" />
      <rect x="29.1" y="18.4" width="3" height="8.6" rx="1.2" fill="#38BDF8" />

      {/* Mouth — a short bar under the visor, not a smile curve. A curve at
          20px collapses into a smudge; a bar stays a shape. */}
      <rect x="19" y="33" width="10" height="2.6" rx="1.3" fill="#0B1121" opacity="0.35" />

      {/* Ears */}
      <rect x="2.6" y="20" width="3.4" height="9" rx="1.7" fill="#1D4ED8" />
      <rect x="42" y="20" width="3.4" height="9" rx="1.7" fill="#38BDF8" />
    </svg>
  );
}
