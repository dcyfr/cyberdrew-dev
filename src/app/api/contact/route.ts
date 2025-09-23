import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.includes("@") ||
      !message.trim()
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Placeholder: log to server. Swap with email/SaaS integration.
    console.log("Contact message:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
