"use client";

import { useState } from "react";
import { isEmail } from "@/lib/validation";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className={`text-sm ${dark ? "text-white" : "text-[#5a3d2b]"}`}>
        Thank you for subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-${dark ? "d" : "l"}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${dark ? "d" : "l"}`}
          type="email"
          className="input"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
        />
        <button type="submit" disabled={status === "sending"} className="btn btn-gold shrink-0">
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-[#ffb4a9]">
          {error}
        </p>
      )}
    </form>
  );
}