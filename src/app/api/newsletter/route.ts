import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/storage";
import { isEmail } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof b.email === "string" ? b.email.trim().slice(0, 200) : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  try {
    await appendRecord("newsletter.json", { email, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("Newsletter save failed:", err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}