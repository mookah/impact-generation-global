"use client";

import Link from "next/link";
import { Bot, MessageCircle, Minus, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Reply = { role: "visitor" | "guide"; text: string; href?: string; label?: string; sources?: { title: string; url: string }[] };

const initialMessage: Reply = {
  role: "guide",
  text: "Welcome to Impact Generation Global! I can help you discover our programs, latest updates, gallery, newsletters and ways to support our mission.",
};

export default function ImpactAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Reply[]>([initialMessage]);

  const end = useRef<HTMLDivElement>(null);
  const entry = useRef<HTMLInputElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [messages, busy]);
  useEffect(() => { if (open) entry.current?.focus(); }, [open]);

  const respond = async (question: string) => {
    const message = question.trim();
    if (!message || busy || messages.length > 12) return;
    setInput("");
    setMessages((previous) => [...previous, { role: "visitor", text: message }]);
    setBusy(true);
    try {
      const conversation = [...messages.slice(1), { role: "visitor", text: message }];
      const response = await fetch("/api/impact-ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversation.map(m => ({ role: m.role, text: m.text })) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessages(previous => [...previous, { role: "guide", text: result.text, sources: result.sources }]);
    } catch (error) {
      setMessages(previous => [...previous, { role: "guide", text: error instanceof Error ? error.message : "The assistant is temporarily unavailable.", href: "/contact", label: "Contact our team" }]);
    } finally { setBusy(false); }
  };

  return (
    <div className="impact-chat fixed bottom-5 right-4 z-[9998] font-sans sm:bottom-6 sm:right-6">
      {open && (
        <section aria-label="IMPACT AI conversation" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}
          className="mb-3 motion-safe:animate-[impact-chat-in_180ms_ease-out] flex h-[min(550px,80dvh)] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-brand-950 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gold-400 p-2 text-brand-950"><Bot size={23}/></div>
              <div><p className="font-black">IMPACT AI</p><p className="text-xs text-brand-100">Source-grounded visitor assistant</p></div>
            </div>
            <button type="button" aria-label="Minimize IMPACT AI" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/20"><Minus size={20}/></button>
            <button type="button" aria-label="Close IMPACT AI" onClick={() => { setOpen(false); setMessages([initialMessage]); }}
              className="rounded-full p-2 hover:bg-white/20"><X size={20}/></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((m, index) => (
              <div key={index} className={m.role === "visitor" ? "ml-9 rounded-2xl bg-brand-800 p-3 text-sm leading-6 text-white" : "mr-7 rounded-2xl border bg-white p-3 text-sm leading-6 text-slate-800"}>
                <p className="whitespace-pre-line break-words">{m.text}</p>
                {m.sources?.map(source => <Link key={source.url} href={source.url} onClick={() => setOpen(false)} className="mt-2 block font-bold underline">{source.title} &rarr;</Link>)}
                {m.href && <Link href={m.href} onClick={() => setOpen(false)}
                  className="mt-2 inline-block font-bold underline underline-offset-4">{m.label || "Find out more"} →</Link>}
              </div>
            ))}
            {busy && <p className="text-sm text-slate-500">Checking the latest public updates…</p>}
            <div ref={end}/>
          </div>
          <div className="border-t bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {[["Latest", "Latest updates"], ["Programs", "Programs"], ["Gallery", "Gallery"], ["Donate", "Donate"]].map(([label, text]) =>
                <button type="button" key={label} disabled={busy || messages.length > 12} onClick={() => void respond(text)}
                  className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-bold text-brand-950 hover:bg-brand-50">{label}</button>
              )}
            </div>
            {messages.length > 12 && <button type="button" onClick={() => setMessages([initialMessage])} className="mb-3 text-sm font-bold underline">Start a new conversation</button>}
            <form className="flex items-center gap-2" onSubmit={(e) => {e.preventDefault(); void respond(input);}}>
              <input ref={entry} aria-label="Ask IMPACT AI" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our mission…" maxLength={300}
                className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-600"/>
              <button type="submit" disabled={!input.trim() || busy || messages.length > 12} aria-label="Send message"
                className="rounded-full bg-brand-800 p-3 text-white hover:bg-brand-950 disabled:opacity-40"><Send size={17}/></button>
            </form>
            <p className="mt-2 text-center text-[10px] text-slate-500">AI can make mistakes. Check linked sources; keep personal details private.</p>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open} aria-label={open ? "Hide IMPACT AI" : "Chat with IMPACT AI"}
        className="ml-auto flex items-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 font-extrabold text-white shadow-xl ring-2 ring-gold-400 transition hover:scale-105">
        {open ? <X size={22}/> : <MessageCircle size={23}/>}
        {open ? "Close guide" : "Ask IMPACT AI"}
      </button>
    </div>
  );
}
