/**
 * The canonical public website. Override for staging/custom domains in Vercel.
 * Avoid using a deployment preview URL for production search indexing.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.impactgenerationglobal.org"
).replace(/\/+$/, "");

export const FACEBOOK_PAGE_URL = "https://www.facebook.com/impactgeneration.com2022";
