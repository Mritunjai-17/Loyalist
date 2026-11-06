"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
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
      className="contact-newsletter-card p-6 sm:p-8"
      style={{ borderRadius: "20px" }}
    >
      {/* Card Header: Icon + Title & Description */}
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 bg-white text-gold shadow-sm"
          style={{ borderRadius: "10px" }}
          aria-hidden="true"
        >
          <Mail className="h-5 w-5 stroke-[1.75]" />
        </div>
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
          Email <span className="text-gold">*</span>
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email address"
            className="flex-1 min-w-0 h-11 bg-white border border-black/15 px-4 text-sm text-ink placeholder:text-stone/70 focus:border-gold focus:outline-none transition-colors"
            style={{ borderRadius: "10px" }}
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

        {emailError && <p className="text-xs text-error mt-2">{emailError}</p>}
        {result && !emailError && (
          <p role="status" className={result.ok ? "text-xs text-gold mt-2.5 font-medium" : "text-xs text-error mt-2.5"}>
            {result.message}
          </p>
        )}
      </form>
    </div>
  );
}
