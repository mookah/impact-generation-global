import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpcomingEventsPopup from "@/components/UpcomingEventsPopup";

export const metadata = {
  title: "Impact Generation Global",
  description:
    "Christ-centered nonprofit focused on youth empowerment, discipleship, and community transformation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-white text-slate-900">
        <UpcomingEventsPopup />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}