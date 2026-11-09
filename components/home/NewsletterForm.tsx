"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
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
    <div
      className="contact-newsletter-card"
    >
      <div>
        <div>
          <Heading level={3}>
            <span className="text-ink font-bold block">
              Newsletter subscription
            </span>
          </Heading>
          <p id="newsletter-note" className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
            Stay updated with our latest press releases, project milestones and company news.
          </p>
        </div>
      </div>

      {/* Subscription Form */}
      <form onSubmit={onSubmit} noValidate aria-describedby="newsletter-note" className="mt-6">
        <label htmlFor="newsletter-email" className="block text-xs font-semibold text-ink-soft mb-1.5">
          Email <span className="text-accent">*</span>
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={emailError ? true : undefined}
            placeholder="Enter your email address"
            className="flex-1 min-w-0 h-11 rounded-none rounded-t border-0 border-b-2 border-forest/25 bg-white/70 px-4 text-sm text-fg placeholder:text-ink-soft/70 transition-[border-color,background-color] hover:border-forest/40 focus:border-gold focus:bg-white focus:outline-none aria-[invalid=true]:border-error"
          />
          <button
            type="submit"
            disabled={state.status === "sending"}
            className="btn btn-primary btn-md shrink-0 shadow-sm disabled:opacity-50"
          >
            <span>{state.status === "sending" ? "Subscribing..." : "Subscribe"}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Honey pot field */}
        <div aria-hidden className="absolute left-[-9999px]">
          <label htmlFor="newsletter-website">Website</label>
          <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {emailError && <p className="text-xs font-medium text-error mt-2">{emailError}</p>}
        {result && !emailError && (
          <p role="status" className={result.ok ? "text-xs text-accent mt-2.5 font-medium" : "text-xs text-error mt-2.5"}>
            {result.message}
          </p>
        )}
      </form>
    </div>
  );
}
