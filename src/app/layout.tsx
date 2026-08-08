import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidgetLazy from "@/components/chatbot/ChatWidgetLazy";
import { SITE_URL } from "@/data/business";
import { buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/schema";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

// 600 is not optional. Every button label, uppercase eyebrow, and inline link
// on the site is `font-semibold`, and 85 of those are body-font elements. Ship
// 400/500 only and the browser matches Medium and synthesises the emboldening —
// smeared strokes and wrong sidebearings at exactly the 13-14px the labels use.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    // Child routes set a bare, keyword-first title (no brand) and let the
    // template append it exactly once. Including the brand in a child title
    // double-prints it: "Services — Growth Masala | Growth Masala".
    //
    // This is deliberately NOT "Digital Marketing Agency in Mahabubnagar" —
    // that exact-match phrase belongs to /digital-marketing-agency-mahabubnagar,
    // which has the FAQ and Service schema plus internal links to support it.
    // Two pages carrying the same title compete with each other for the same
    // query and split the signal. The homepage takes the broader service angle.
    default: "Websites, SEO & Meta Ads in Mahabubnagar | Growth Masala",
    template: "%s | Growth Masala",
  },
  description:
    "Growth Masala builds websites and runs social media, SEO, and Meta ads for businesses in Mahabubnagar, Hyderabad, and across Telangana. Free consultation, fixed quotes before work starts.",
  keywords: [
    // Brand
    "Growth Masala",
    // Local — primary
    "digital marketing agency Mahabubnagar",
    "digital marketing agency near me Mahabubnagar",
    "best digital marketing agency Mahabubnagar",
    "website development Mahabubnagar",
    "website designer Mahabubnagar",
    "social media agency Mahabubnagar",
    "SEO agency Mahabubnagar",
    // Local — secondary
    "digital marketing agency Telangana",
    "performance marketing Hyderabad",
    "social media management Telangana",
    "website development Telangana",
    // Generic
    "digital marketing agency India",
    "website development",
    "social media growth",
    "performance marketing",
    "Meta ads",
    "Facebook ads",
    "SEO",
  ],
  // NOTE: no `alternates.canonical` here on purpose. In the App Router this
  // field is inherited by every child route, so a canonical set at the root
  // makes all inner pages declare themselves duplicates of the homepage and
  // drops them from the index. Each route sets its own relative canonical.
  metadataBase: new URL(SITE_URL),
  // NOTE: no `icons` block here on purpose. `src/app/favicon.ico` and
  // `src/app/apple-icon.png` are App Router file conventions — Next.js serves
  // them and emits their <link> tags automatically. Declaring them here too
  // double-prints the tags. Both files are generated from
  // `public/images/logo.png`; regenerate them from that image, never from an
  // SVG redraw of the mark.
  openGraph: {
    title: "Websites, SEO & Meta Ads in Mahabubnagar | Growth Masala",
    description:
      "Websites, social media, SEO, and Meta ads for businesses in Mahabubnagar, Hyderabad, and across Telangana.",
    type: "website",
    locale: "en_IN",
    siteName: "Growth Masala",
    url: SITE_URL,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Growth Masala — Digital Marketing Agency in Mahabubnagar, Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites, SEO & Meta Ads in Mahabubnagar | Growth Masala",
    description:
      "Websites, social media, SEO, and Meta ads for businesses in Mahabubnagar, Hyderabad, and across Telangana.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console HTML-tag verification. Set
  // GOOGLE_SITE_VERIFICATION in the Vercel environment to the token Search
  // Console gives you. Left unset, the tag is simply omitted.
  //
  // IMPORTANT: these pages are statically prerendered, so this value is read at
  // BUILD time, not request time. Setting the variable is not enough — you must
  // trigger a new deploy (Vercel → Deployments → Redeploy) for the tag to
  // appear. Verified: restarting the server with the var set does nothing.
  //
  // Only needed for the HTML-tag method. DNS TXT verification (recommended,
  // since it covers www and all subdomains) requires nothing here.
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

// Site-wide entity graph. Page-level schema (breadcrumbs, FAQ, services,
// articles) lives on the individual routes and references these by @id.
const localBusinessSchema = buildLocalBusinessSchema();
const webSiteSchema = buildWebSiteSchema();

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables belong on <html>, not <body>. next/font emits them on
    // whichever element carries the class, and globals.css needs them to resolve
    // at `:root` — with them on <body> the base `html`/`body` rules could not see
    // them and the whole site rendered in the OS default font. See the base-layer
    // comment in globals.css before moving these.
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        {/*
          Scroll-reveal fallback.

          `AnimatedContainer` server-renders its children with `opacity-0` and
          only reveals them once an IntersectionObserver fires after hydration.
          If JavaScript fails, is blocked, or simply has not run yet, that leaves
          most of the page invisible — measured at 62 hidden elements on the
          homepage with JS disabled.

          The content is all in the HTML, so this is purely a visibility problem,
          and one CSS rule fixes it. Kept in <noscript> so it costs nothing in the
          normal case.

          Targets `.reveal-pending`, not `.opacity-0` — the latter is also used
          for genuinely hover-only affordances (the footer's arrow icons), which
          should stay hidden.
        */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: ".reveal-pending{opacity:1!important}" }} />
        </noscript>
      </head>
      <body className="antialiased">
        {/* Google Analytics — only loads when GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidgetLazy />
      </body>
    </html>
  );
}
