import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Growth Masala",
  description:
    "Growth Masala is a digital marketing agency helping businesses grow online with strategy, creativity, and data-driven results.",
  openGraph: {
    title: "About — Growth Masala",
    description:
      "Growth Masala is a digital marketing agency helping businesses grow online with strategy, creativity, and data-driven results.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
