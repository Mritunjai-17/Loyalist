import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter an email address, like name@example.com."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().email("Enter an email address, like name@example.com."),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, "Enter a message of at least 10 characters.").max(5000),
  website: z.string().max(0).optional(),
});

export type FormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

// In-memory, per server instance. Enough to blunt scripted bursts; not a security boundary.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

export function clientKey(request: Request, route: string): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${route}:${forwarded || request.headers.get("x-real-ip") || "unknown"}`;
}

/**
 * Sends a form submission to the configured delivery endpoint.
 * TODO(content): set FORMS_WEBHOOK_URL (and FORMS_WEBHOOK_TOKEN) to the chosen email provider.
 * Without it, development logs the payload and production reports the form as unavailable.
 */
export async function deliver(kind: "contact" | "newsletter", payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${kind} submission (no FORMS_WEBHOOK_URL set)`, payload);
      return true;
    }
    return false;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.FORMS_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.FORMS_WEBHOOK_TOKEN}` } : {}),
    },
    body: JSON.stringify({ kind, ...payload }),
  });
  return res.ok;
}
