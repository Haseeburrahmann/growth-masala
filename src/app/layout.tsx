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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    // Child routes set a bare, keyword-first title (no brand) and let the
    // template append it exactly once. Including the brand in a child title
    // double-prints it: "Services — Growth Masala | Growth Masala".
    default: "Digital Marketing Agency in Mahabubnagar | Growth Masala",
    template: "%s | Growth Masala",
  },
  description:
    "Growth Masala is a digital marketing agency in Mahabubnagar, Telangana. We build websites and run social media, SEO, and Meta ads campaigns that bring local businesses real, measurable growth.",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Digital Marketing Agency in Mahabubnagar | Growth Masala",
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
    title: "Digital Marketing Agency in Mahabubnagar | Growth Masala",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
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
