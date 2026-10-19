import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/storage";
import { isEmail } from "@/lib/validation";

export const runtime = "nodejs";

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const msg = {
    name: str(b.name, 200),
    email: str(b.email, 200),
    phone: str(b.phone, 50),
    message: str(b.message, 3000),
  };

  if (msg.name.length < 2 || !isEmail(msg.email) || msg.message.length < 10) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  try {
    await appendRecord("messages.json", { ...msg, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("Message save failed:", err);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}