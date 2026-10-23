import { NextResponse } from "next/server";
import { getFacebookUpdates } from "@/lib/facebook";

export async function GET() {
  const updates = await getFacebookUpdates(5);
  return NextResponse.json(updates, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
  });
}
