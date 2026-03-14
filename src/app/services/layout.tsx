import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Growth Masala",
  description:
    "Website development, social media growth, and performance marketing services to help your business thrive online.",
  openGraph: {
    title: "Services — Growth Masala",
    description:
      "Website development, social media growth, and performance marketing services to help your business thrive online.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
