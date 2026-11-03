"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, fieldErrors as toFieldErrors, type FormResult } from "@/lib/forms";

type State = { status: "idle" | "sending" } | { status: "done"; result: FormResult };

/** Validates in the browser with the same zod schema the route uses, then posts to /api/contact. */
export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setState({
        status: "done",
        result: { ok: false, message: "Check the highlighted fields.", fieldErrors: toFieldErrors(parsed.error) },
      });
      return;
    }
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as FormResult;
      if (result.ok) form.reset();
      setState({ status: "done", result });
    } catch {
      setState({ status: "done", result: { ok: false, message: "Could not reach the server. Try again." } });
    }
  }

  const result = state.status === "done" ? state.result : null;
  const errors = result && !result.ok ? (result.fieldErrors ?? {}) : {};

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6" aria-label="Contact form">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Name" name="name" autoComplete="name" required error={errors.name} />
        <Input label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      </div>
      <Input label="Subject" name="subject" error={errors.subject} />
      <Textarea label="Message" name="message" required error={errors.message} />
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending" : "Send message"}
        </Button>
        <p className="text-small">* Required</p>
      </div>
      <p role="status" className={result ? (result.ok ? "text-fg" : "field-error") : "sr-only"}>
        {result ? result.message : ""}
      </p>
    </form>
  );
}
