import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Youth Camps & Discipleship",
  description: "Explore Impact Generation Global youth camps, where young people grow through worship, mentorship, leadership and community.",
  alternates: { canonical: "/youth-camps" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
