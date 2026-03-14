import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
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
    "digital marketing",
    "website development",
    "social media growth",
    "performance marketing",
    "Growth Masala",
    "digital marketing agency India",
    "website design",
    "SEO",
    "Meta ads",
    "Facebook ads",
  ],
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
  },
  twitter: {
    card: "summary",
    title: "Growth Masala — Spice Up Your Brand Growth",
    description:
      "Digital marketing agency offering website development, social media growth, and performance marketing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Growth Masala",
  description:
    "Digital marketing agency offering website development, social media growth, and performance marketing services.",
  url: "https://growthmasala.com",
  email: "growthmasala@gmail.com",
  telephone: "+918688269427",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [],
  serviceType: [
    "Website Development",
    "Social Media Marketing",
    "Performance Marketing",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidgetLazy />
      </body>
    </html>
  );
}
