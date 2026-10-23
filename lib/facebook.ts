/**
 * Facebook Page sync read model.
 * No Facebook secret is exposed to client components.
 * This displays public/authorized Page content; permanent media archiving and
 * newsletter publishing will require an approved editorial database/workflow.
 */
export type ImpactUpdate = {
  id: string;
  text: string;
  publishedAt: string;
  url: string;
  imageUrl: string | null;
  isVideo: boolean;
  event: string;
};

export type FacebookFeed = {
  status: "connected" | "unconfigured" | "unavailable";
  posts: ImpactUpdate[];
};

type MetaAttachment = {
  media_type?: string;
  type?: string;
  subattachments?: { data?: MetaAttachment[] };
};

type MetaPost = {
  id?: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  full_picture?: string;
  attachments?: { data?: MetaAttachment[] };
};

const eventPatterns: Array<[RegExp, string]> = [
  [/youth\s+camps?|\bcamp\s+20\d{2}\b/i, "Youth Camps"],
  [/cycle\s+for\s+change|\bcycling\b|\bbicycle/i, "Cycle for Change"],
  [/pad\s+a\s+girl|menstrual\s+health|dignity\s+kit/i, "Pad a Girl"],
  [/boys\s+to\s+men|mentorship\s+for\s+boys/i, "Boys to Men"],
  [/pastors?\s+kids|pastors?\s+children/i, "Pastors Kids"],
  [/school\s+ministry|school\s+outreach|\bstudents\b/i, "School Ministry"],
  [/crusade|evangelis[mt]|outreach/i, "Community Outreach"],
];

export function classifyEvent(text: string): string {
  return eventPatterns.find(([pattern]) => pattern.test(text))?.[1] ?? "Community Updates";
}

export function isTrustedFacebookUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "facebook.com" || url.hostname.endsWith(".facebook.com"));
  } catch {
    return false;
  }
}

export async function getFacebookUpdates(limit = 15): Promise<FacebookFeed> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return { status: "unconfigured", posts: [] };

  const version = /^v\d+\.\d+$/.test(process.env.FACEBOOK_GRAPH_VERSION || "")
    ? process.env.FACEBOOK_GRAPH_VERSION
    : "v26.0";
  const endpoint = new URL(
    "https://graph.facebook.com/" + version + "/" + encodeURIComponent(pageId) + "/posts"
  );
  endpoint.searchParams.set(
    "fields",
    "id,message,created_time,permalink_url,full_picture,attachments{media_type,type,subattachments}"
  );
  endpoint.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 50)));

  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: "Bearer " + token },
      next: { revalidate: 600 },
    });
    if (!response.ok) {
      console.error("Facebook Page sync returned HTTP", response.status);
      return { status: "unavailable", posts: [] };
    }

    const body: { data?: MetaPost[] } = await response.json();
    const posts: ImpactUpdate[] = (body.data ?? []).flatMap((post) => {
      if (!post.id || !post.permalink_url ||
          !isTrustedFacebookUrl(post.permalink_url) || !post.created_time) return [];
      const attachments = post.attachments?.data ?? [];
      const isVideo = attachments.some(
        (item) => item.media_type === "video" ||
          item.type?.toLowerCase().includes("video")
      );
      const text = (post.message || "").trim();
      const imageUrl = post.full_picture?.startsWith("https://")
        ? post.full_picture
        : null;
      return [{
        id: post.id,
        text,
        publishedAt: post.created_time,
        url: post.permalink_url,
        imageUrl,
        isVideo,
        event: classifyEvent(text),
      }];
    });
    return { status: "connected", posts };
  } catch (error) {
    console.error("Facebook Page sync network error", error instanceof Error ? error.message : "unknown");
    return { status: "unavailable", posts: [] };
  }
}
