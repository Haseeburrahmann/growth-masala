/**
 * Clients shown in the homepage trust strip.
 *
 * `logo` points at a mark cropped from that client's own live site (the same
 * screenshots used in `portfolio.ts`). They are normalised to a uniform 128px
 * height with their native background intact, so the strip reads as one system
 * even though the sources have clashing grounds.
 *
 * These are raster crops, not supplied brand files. When a client sends a real
 * logo, drop it in `public/images/clients/` and update the path here — nothing
 * else needs to change.
 *
 * Only add a client here whose work is genuinely live and who is happy to be
 * named. This strip is a credibility claim.
 */
export interface Client {
  name: string;
  logo: string;
  /** Intrinsic size of the cropped file — required by next/image. */
  width: number;
  height: number;
}

export const clients: Client[] = [
  {
    name: "Triveni Balavikas Central School",
    logo: "/images/clients/triveni.webp",
    width: 613,
    height: 128,
  },
  {
    name: "Freewings School",
    logo: "/images/clients/freewings.webp",
    width: 282,
    height: 128,
  },
  {
    name: "Kings Mobile World",
    logo: "/images/clients/kings-mobile.webp",
    width: 191,
    height: 128,
  },
  {
    name: "Razzak Constructions",
    logo: "/images/clients/razzak.webp",
    width: 665,
    height: 128,
  },
  {
    name: "TrustWave FinServ",
    logo: "/images/clients/trustwave.webp",
    width: 372,
    height: 128,
  },
  {
    name: "Automotive Dudes",
    logo: "/images/clients/automotive-dudes.webp",
    width: 702,
    height: 128,
  },
];
