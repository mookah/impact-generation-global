import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Generation Newsletter",
  description: "Read stories and updates from Impact Generation Global's ministry, programs, youth outreach, partnerships and community activities.",
  alternates: { canonical: "/newsletter" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
