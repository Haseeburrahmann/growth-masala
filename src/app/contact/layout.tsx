import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Growth Masala",
  description:
    "Get in touch with Growth Masala for a free consultation. Let's discuss your website, social media, or marketing needs.",
  openGraph: {
    title: "Contact — Growth Masala",
    description:
      "Get in touch with Growth Masala for a free consultation. Let's discuss your website, social media, or marketing needs.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
