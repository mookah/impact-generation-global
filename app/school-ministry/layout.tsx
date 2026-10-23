import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Ministry in Zambia",
  description: "Explore student mentorship, educational outreach, discipleship and life-skills activities from Impact Generation Global.",
  alternates: { canonical: "/school-ministry" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
