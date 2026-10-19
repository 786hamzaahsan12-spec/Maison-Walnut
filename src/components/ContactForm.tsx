"use client";

import { useState } from "react";
import { isEmail } from "@/lib/validation";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (v.name.trim().length < 2) er.name = "Please enter your name.";
    if (!isEmail(v.email)) er.email = "Please enter a valid email address.";
    if (v.message.trim().length < 10) er.message = "Please write a few more words (at least 10 characters).";
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setV({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center">
        <p className="font-display text-3xl">Message received</p>
        <p className="mt-2 text-sm text-[#2a2623]/70">Thank you. Our team will get back to you soon.</p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl bg-white p-6 md:p-8">
      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">
          Name <span className="text-[#b3261e]">*</span>
        </label>
        <input id="c-name" className="input" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
        {errors.name && (
          <p id="c-name-err" role="alert" className="mt-1.5 text-sm text-[#b3261e]">
            {errors.name}
          </p>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">
            Email <span className="text-[#b3261e]">*</span>
          </label>
          <input id="c-email" type="email" className="input" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} />
          {errors.email && (
            <p id="c-email-err" role="alert" className="mt-1.5 text-sm text-[#b3261e]">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium">
            Phone (optional)
          </label>
          <input id="c-phone" type="tel" className="input" value={v.phone} onChange={set("phone")} />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">
          Message <span className="text-[#b3261e]">*</span>
        </label>
        <textarea id="c-message" rows={5} className="input" value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} />
        {errors.message && (
          <p id="c-message-err" role="alert" className="mt-1.5 text-sm text-[#b3261e]">
            {errors.message}
          </p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-[#fdecea] p-3 text-sm text-[#b3261e]">
          We could not send your message. Please try again in a moment.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}