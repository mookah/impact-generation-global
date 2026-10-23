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
  videoUrl?:string|null;
};

export type FacebookFeed = {
  status: "connected" | "unconfigured" | "unavailable";
  posts: ImpactUpdate[];
};

type MetaAttachment = {
  media_type?: string;
  type?: string;
  url?:string;
  target?:{url?:string};
  media?:{image?:{src?:string}};
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
  [/boys\s*(?:to|2)\s*men|mentorship\s+for\s+boys/i, "Boys to Men"],
  [/pastors?\s+kids|pastors?\s+children/i, "Pastors Kids"],
  [/school\s+ministry|school\s+outreach|\bstudents\b/i, "School Ministry"],
  [/crusade|evangelis[mt]|outreach/i, "Community Outreach"],
  [/partnership|partnering|collaborat/i, "Partnerships"],
  [/youth\s+empowerment|leadership\s+development/i, "Youth Empowerment"],
];

export function classifyEvent(text: string): string {
  return eventPatterns.find(([pattern]) => pattern.test(text))?.[1] ?? "Community Updates";
}

export function isTrustedFacebookUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.searchParams.has('access_token') &&
      (url.hostname === "facebook.com" || url.hostname.endsWith(".facebook.com"));
  } catch {
    return false;
  }
}

export async function getFacebookUpdates(limit = 15): Promise<FacebookFeed> {
  const pageId = process.env.FACEBOOK_PAGE_ID || "370924362777718";
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
    "id,message,created_time,permalink_url,full_picture,attachments{media_type,type,url,target,media,subattachments{media_type,type,url,target,media}}"
  );
  endpoint.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 50)));

  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: "Bearer " + token },
      signal: AbortSignal.timeout(15000),
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
      const attachments = (post.attachments?.data ?? []).flatMap(a=>[a,...(a.subattachments?.data||[])]);
      const isVideo = attachments.some(
        (item) => item.media_type === "video" ||
          item.type?.toLowerCase().includes("video")
      );
      const text = (post.message || "").trim();
      const picture=attachments.find(a=>/video/i.test(`${a.media_type} ${a.type}`))?.media?.image?.src||post.full_picture;
      const imageUrl = picture?.startsWith("https://")
        ? picture
        : null;
      return [{
        id: post.id,
        text,
        publishedAt: post.created_time,
        url: post.permalink_url,
        imageUrl,
        isVideo,
        event: classifyEvent(text),
        videoUrl:attachments.map(a=>a.target?.url||a.url).find(u=>u&&isTrustedFacebookUrl(u)&&/\/(?:videos|reel|watch)(?:\/|\?)/i.test(u))||null,
      }];
    });
    return { status: "connected", posts };
  } catch (error) {
      void error; // Never log provider errors: they may contain credential-bearing URLs.
    return { status: "unavailable", posts: [] };
  }
}
