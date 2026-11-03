import { NextResponse } from "next/server";
import { clientKey, contactSchema, deliver, fieldErrors, rateLimited, type FormResult } from "@/lib/forms";

export async function POST(request: Request) {
  if (rateLimited(clientKey(request, "contact"))) {
    return NextResponse.json<FormResult>({ ok: false, message: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }
  // Honeypot filled: answer as if it worked so bots learn nothing.
  if (parsed.data.website) return NextResponse.json<FormResult>({ ok: true, message: "Thanks. Your message has been sent." });

  const { name, email, subject, message } = parsed.data;
  const delivered = await deliver("contact", { name, email, subject: subject ?? "", message });
  if (!delivered) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "The form is unavailable right now. Email us directly instead." },
      { status: 503 },
    );
  }
  return NextResponse.json<FormResult>({ ok: true, message: "Thanks. Your message has been sent and we will reply by email." });
}
