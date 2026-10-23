import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cycle for Change",
  description: "Discover Cycle for Change, bringing young people together through cycling, healthy living, teamwork, purpose and community outreach.",
  alternates: { canonical: "/cycle-for-change" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
