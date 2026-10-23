"use client";

import { useEffect, useRef, useState } from "react";

type FacebookFeedProps = {
  pageUrl: string;
  pageName: string;
  height?: number;
};

type FBWindow = Window & {
  FB?: { XFBML: { parse: (element?: HTMLElement) => void } };
  fbAsyncInit?: () => void;
};

const LOAD_TIMEOUT_MS = 8000;

/**
 * Embeds the Facebook Page timeline via Facebook's official SDK so new posts
 * appear automatically.
 *
 * Facebook frequently blocks its own embeds (content blockers, privacy
 * settings, restricted regions), and when it does the plugin renders a
 * zero-height box. We check that a real iframe was mounted and otherwise show
 * a clear fallback rather than a silent empty strip.
 */
export default function FacebookFeed({
  pageUrl,
  pageName,
  height = 620,
}: FacebookFeedProps) {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fbWindow = window as FBWindow;
    let cancelled = false;
    let attempts = 0;

    const mounted = () => Boolean(container.current?.querySelector("iframe"));

    const poll = () => {
      if (cancelled) return;
      if (mounted()) return;
      attempts += 1;
      if (attempts > 24) {
        setFailed(true);
        return;
      }
      window.setTimeout(poll, 350);
    };

    const parse = () => {
      if (fbWindow.FB && container.current) {
        fbWindow.FB.XFBML.parse(container.current);
      }
      poll();
    };

    fbWindow.fbAsyncInit = parse;

    if (document.getElementById("facebook-jssdk")) {
      parse();
    } else {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
        "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0";
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);

      window.setTimeout(() => {
        if (!cancelled && !mounted()) setFailed(true);
      }, LOAD_TIMEOUT_MS);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
        <p className="text-sm font-bold text-brand-950">Facebook updates</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Facebook&apos;s feed could not load here — a content blocker or
          privacy setting may be blocking it. Every post is still on our page.
        </p>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-4 w-full text-sm"
        >
          Open Facebook
        </a>
      </div>
    );
  }

  return (
    <div ref={container} className="overflow-hidden rounded-xl bg-white">
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width="500"
        data-height={height}
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite={pageUrl}
          className="fb-xfbml-parse-ignore overflow-hidden text-sm"
        >
          <a href={pageUrl}>{pageName} on Facebook</a>
        </blockquote>
      </div>
    </div>
  );
}
