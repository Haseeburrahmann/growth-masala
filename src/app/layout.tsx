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
  title: "Growth Masala — Spice Up Your Brand Growth",
  description:
    "Growth Masala is a digital marketing agency offering website development, social media growth, and performance marketing services to help your business thrive online.",
  keywords: [
    "digital marketing",
    "website development",
    "social media growth",
    "performance marketing",
    "Growth Masala",
  ],
  openGraph: {
    title: "Growth Masala — Spice Up Your Brand Growth",
    description:
      "Digital marketing agency offering website development, social media growth, and performance marketing.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
