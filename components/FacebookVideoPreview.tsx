"use client";

import { useState } from "react";

export default function FacebookVideoPreview({
  url, title,
}: { url: string; title: string }) {
  const [showPlayer, setShowPlayer] = useState(false);
  if (!showPlayer) {
    return (
      <button
        type="button"
        onClick={() => setShowPlayer(true)}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-5 py-8 text-center font-bold text-white transition hover:bg-slate-800"
        aria-label={"Play Facebook video: " + title}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-xl text-slate-950">▶</span>
        Play video from Facebook
      </button>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      <iframe
        title={title}
        src={"https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(url) + "&show_text=false"}
        className="aspect-video w-full"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
