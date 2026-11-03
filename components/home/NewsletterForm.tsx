"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { FormResult } from "@/lib/forms";

type State = { status: "idle" | "sending" } | { status: "done"; result: FormResult };

export function NewsletterForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setState({ status: "done", result: (await res.json()) as FormResult });
    } catch {
      setState({ status: "done", result: { ok: false, message: "Could not reach the server. Try again." } });
    }
  }

  const result = state.status === "done" ? state.result : null;
  const emailError = result && !result.ok ? result.fieldErrors?.email : undefined;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="newsletter-note" className="newsletter">
      <p className="font-medium text-ivory">Newsletter subscription</p>
      {/* Source A wording. */}
      <p id="newsletter-note" className="text-small mt-2">
        Stay updated with our latest press releases.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <Input label="Email" name="email" type="email" autoComplete="email" required error={emailError} />
        <Button type="submit" disabled={state.status === "sending"} className="sm:mb-0">
          {state.status === "sending" ? "Subscribing" : "Subscribe"}
        </Button>
      </div>
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="newsletter-website">Website</label>
        <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p role="status" className={result ? (result.ok ? "mt-4 text-ivory" : "field-error mt-4") : "sr-only"}>
        {result && !emailError ? result.message : ""}
      </p>
    </form>
  );
}
