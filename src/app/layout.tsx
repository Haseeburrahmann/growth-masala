import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidgetLazy from "@/components/chatbot/ChatWidgetLazy";

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
    default: "Growth Masala — Spice Up Your Brand Growth",
    template: "%s | Growth Masala",
  },
  description:
    "Growth Masala is a digital marketing agency offering website development, social media growth, and performance marketing services to help your business thrive online.",
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
  alternates: {
    canonical: "https://growthmasala.com",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://growthmasala.com"),
  icons: {
    icon: "/images/icon.png",
    apple: "/images/icon.png",
  },
  openGraph: {
    title: "Growth Masala — Spice Up Your Brand Growth",
    description:
      "Digital marketing agency offering website development, social media growth, and performance marketing.",
    type: "website",
    locale: "en_IN",
    siteName: "Growth Masala",
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
    title: "Growth Masala — Spice Up Your Brand Growth",
    description:
      "Digital marketing agency offering website development, social media growth, and performance marketing.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Growth Masala",
  description:
    "Digital marketing agency in Mahabubnagar, Telangana offering website development, social media management, and performance marketing to help businesses grow online.",
  url: "https://growthmasala.com",
  email: "growthmasala@gmail.com",
  telephone: "+918688269427",
  image: "https://growthmasala.com/images/icon.png",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mahabubnagar",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 16.7488,
    longitude: 77.9869,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/growthmasala",
    "https://www.facebook.com/share/17EGgbmTK9/",
    "https://x.com/growthmasala",
  ],
  serviceType: [
    "Website Development",
    "Social Media Marketing",
    "Performance Marketing",
    "SEO",
    "Meta Ads",
  ],
  areaServed: [
    { "@type": "City", name: "Mahabubnagar" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Telangana" },
  ],
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
