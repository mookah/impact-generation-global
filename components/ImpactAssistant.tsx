"use client";

import Link from "next/link";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type Reply = { role: "visitor" | "guide"; text: string; href?: string; label?: string };
type Post = { text: string; event: string; url: string };
type Feed = { status: "connected" | "unconfigured" | "unavailable"; posts: Post[] };

const initialMessage: Reply = {
  role: "guide",
  text: "Welcome to Impact Generation Global! I can help you discover our programs, latest updates, gallery, newsletters and ways to support our mission.",
};

export default function ImpactAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Reply[]>([initialMessage]);

  const respond = async (question: string) => {
    const message = question.trim();
    if (!message || busy) return;
    setInput("");
    setMessages((previous) => [...previous, { role: "visitor", text: message }]);
    const q = message.toLowerCase();

    let answer: Reply = {
      role: "guide",
      text: "I can guide you to our programs, latest ministry updates, event pictures, newsletters, donations, or contact information. Please choose one of these topics.",
      href: "/programs",
      label: "Explore our programs",
    };

    if (/latest|news|happening|recent|facebook|update/.test(q)) {
      setBusy(true);
      try {
        const response = await fetch("/api/impact-updates");
        if (!response.ok) throw new Error("Updates unavailable");
        const feed: Feed = await response.json();
        if (feed.status === "connected" && feed.posts.length) {
          answer = {
            role: "guide",
            text: "Here are our newest Facebook updates:\n\n" + feed.posts.slice(0, 3)
              .map((post, index) => String(index + 1) + ". " + post.event + ": " +
                (post.text.replace(/\s+/g, " ").slice(0, 150) || "New activity posted"))
              .join("\n\n"),
            href: "/updates",
            label: "See all recent posts",
          };
        } else {
          answer = {
            role: "guide",
            text: "Our Facebook updates are not available to the website yet. You can still visit our official Page or browse our current newsletter.",
            href: "/updates",
            label: "Visit the updates page",
          };
        }
      } catch {
        answer = { role: "guide", text: "I could not load the latest updates just now. Please try the updates page.", href: "/updates", label: "Open updates" };
      } finally {
        setBusy(false);
      }
    } else if (/gallery|photo|picture|album|image|event/.test(q)) {
      answer = { role: "guide", text: "Explore our photographs from youth camps, Cycle for Change, school ministry and outreach. Photos are grouped by program and event where possible.", href: "/gallery", label: "View gallery" };
    } else if (/newsletter|subscribe|email|bulletin/.test(q)) {
      answer = { role: "guide", text: "Read our published Impact Generation newsletter. Automated email subscriptions will be available after we connect an approved mailing service.", href: "/newsletter", label: "Read newsletter" };
    } else if (/donat|support|partner|sponsor|fund|give/.test(q)) {
      answer = { role: "guide", text: "Partnerships support youth empowerment, mentorship, school outreach, discipleship and dignity initiatives. See secure support options on our donations page.", href: "/donate", label: "Support the mission" };
    } else if (/contact|phone|reach|office|location/.test(q)) {
      answer = { role: "guide", text: "You can contact our Zambia or USA ministry team through the official contact page.", href: "/contact", label: "Contact Impact Generation" };
    } else if (/boys|men|mentor/.test(q)) {
      answer = { role: "guide", text: "Boys to Men focuses on character, responsibility, faith, confidence and leadership in young men.", href: "/boys-to-men", label: "See Boys to Men" };
    } else if (/pad|girl|period|dignity/.test(q)) {
      answer = { role: "guide", text: "Pad a Girl supports dignity and helps young girls stay in school through menstrual hygiene support.", href: "/pad-a-girl", label: "See Pad a Girl" };
    } else if (/cycle|bike|cycling/.test(q)) {
      answer = { role: "guide", text: "Cycle for Change connects young people through cycling, teamwork, healthy living and community awareness.", href: "/cycle-for-change", label: "Explore Cycle for Change" };
    } else if (/camp/.test(q)) {
      answer = { role: "guide", text: "Youth Camps offer discipleship, mentorship, friendship and leadership development experiences.", href: "/youth-camps", label: "Explore Youth Camps" };
    } else if (/school|student/.test(q)) {
      answer = { role: "guide", text: "Our School Ministry encourages young people through teaching, mentoring and positive life choices.", href: "/school-ministry", label: "Explore School Ministry" };
    } else if (/pastor/.test(q)) {
      answer = { role: "guide", text: "Pastors Kids is a space for identity, encouragement, support and spiritual growth.", href: "/pastors-kids", label: "Explore Pastors Kids" };
    } else if (/program|mission|about|do you do/.test(q)) {
      answer = { role: "guide", text: "Impact Generation Global empowers young people through Christ-centered discipleship, mentorship, education, counseling and practical community outreach.", href: "/programs", label: "Explore all programs" };
    }
    setMessages((previous) => [...previous, answer]);
  };

  return (
    <div className="fixed bottom-5 right-4 z-[9998] font-sans sm:bottom-6 sm:right-6">
      {open && (
        <section aria-label="Impact Generation visitor guide"
          className="mb-3 flex h-[min(550px,75vh)] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-emerald-900 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-400 p-2 text-emerald-950"><Bot size={23}/></div>
              <div><p className="font-black">Impact Guide</p><p className="text-xs text-emerald-100">Interactive website assistant</p></div>
            </div>
            <button type="button" aria-label="Close Impact Guide" onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-white/20"><X size={20}/></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((m, index) => (
              <div key={index} className={m.role === "visitor" ? "ml-9 rounded-2xl bg-emerald-800 p-3 text-sm leading-6 text-white" : "mr-7 rounded-2xl border bg-white p-3 text-sm leading-6 text-slate-800"}>
                <p className="whitespace-pre-line break-words">{m.text}</p>
                {m.href && <Link href={m.href} onClick={() => setOpen(false)}
                  className="mt-2 inline-block font-bold underline underline-offset-4">{m.label || "Find out more"} →</Link>}
              </div>
            ))}
            {busy && <p className="text-sm text-slate-500">Checking the latest public updates…</p>}
          </div>
          <div className="border-t bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {[["Latest", "Latest updates"], ["Programs", "Programs"], ["Gallery", "Gallery"], ["Donate", "Donate"]].map(([label, text]) =>
                <button type="button" key={label} onClick={() => void respond(text)}
                  className="rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50">{label}</button>
              )}
            </div>
            <form className="flex items-center gap-2" onSubmit={(e) => {e.preventDefault(); void respond(input);}}>
              <input aria-label="Ask Impact Guide" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our mission…" maxLength={300}
                className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600"/>
              <button type="submit" disabled={!input.trim() || busy} aria-label="Send message"
                className="rounded-full bg-emerald-800 p-3 text-white hover:bg-emerald-900 disabled:opacity-40"><Send size={17}/></button>
            </form>
            <p className="mt-2 text-center text-[10px] text-slate-500">Guide answers use public website information; no personal details needed.</p>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open} aria-label={open ? "Hide Impact Guide" : "Chat with Impact Guide"}
        className="ml-auto flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-3.5 font-extrabold text-white shadow-xl ring-2 ring-amber-400 transition hover:scale-105">
        {open ? <X size={22}/> : <MessageCircle size={23}/>}
        {open ? "Close guide" : "Ask Impact Guide"}
      </button>
    </div>
  );
}
