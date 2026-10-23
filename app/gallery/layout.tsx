import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery & Impact Stories",
  description: "Browse photographs from Impact Generation Global's youth camps, outreach, school ministry, mentorship and community activities.",
  alternates: { canonical: "/gallery" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
