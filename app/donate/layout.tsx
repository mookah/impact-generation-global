import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate to Empower Young People",
  description: "Help support Impact Generation Global's youth mentorship, education, dignity, discipleship and outreach initiatives in Zambia.",
  alternates: { canonical: "/donate" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
