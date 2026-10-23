import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pad a Girl Initiative",
  description: "Learn how the Pad a Girl initiative supports menstrual health, girls' dignity and access to education through outreach in Zambia.",
  alternates: { canonical: "/pad-a-girl" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
