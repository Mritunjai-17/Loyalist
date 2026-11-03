import { NextResponse } from "next/server";
import { clientKey, deliver, fieldErrors, newsletterSchema, rateLimited, type FormResult } from "@/lib/forms";

export async function POST(request: Request) {
  if (rateLimited(clientKey(request, "newsletter"))) {
    return NextResponse.json<FormResult>({ ok: false, message: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "Check the email address.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }
  // Honeypot filled: answer as if it worked so bots learn nothing.
  if (parsed.data.website) return NextResponse.json<FormResult>({ ok: true, message: "Thanks. You're on the list." });

  const delivered = await deliver("newsletter", { email: parsed.data.email });
  if (!delivered) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "Sign-up is unavailable right now. Email us instead." },
      { status: 503 },
    );
  }
  return NextResponse.json<FormResult>({ ok: true, message: "Thanks. You're on the list for new press releases." });
}
