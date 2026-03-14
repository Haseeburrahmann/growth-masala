import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Growth Masala",
  description:
    "Real results from real clients — see how Growth Masala helped businesses grow with websites, social media, and performance marketing.",
  openGraph: {
    title: "Case Studies — Growth Masala",
    description:
      "Real results from real clients — see how Growth Masala helped businesses grow with websites, social media, and performance marketing.",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
