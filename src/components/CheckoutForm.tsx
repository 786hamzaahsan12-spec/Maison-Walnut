"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { useHydrated } from "@/lib/hooks";
import { formatPKR, computeTotals } from "@/lib/utils";
import { validateCustomer, type CustomerErrors, type CustomerInput } from "@/lib/validation";
import { useShop } from "@/store/useShop";
import OrderSummary from "./OrderSummary";
import SmartImage from "./SmartImage";
import WhatsAppOrderButton from "./WhatsAppOrderButton";

const FIELD_ORDER: (keyof CustomerInput)[] = ["name", "phone", "email", "city", "address", "payment"];

export default function CheckoutForm() {
  const hydrated = useHydrated();
  const router = useRouter();
  const cartItems = useShop((s) => s.items);
  const buyNow = useShop((s) => s.buyNow);
  const coupon = useShop((s) => s.coupon);
  const clear = useShop((s) => s.clear);
  const setBuyNow = useShop((s) => s.setBuyNow);

  const enabledPayments = siteConfig.payments.filter((p) => p.enabled);
  const enabledIds = enabledPayments.map((p) => p.id);

  const [values, setValues] = useState<CustomerInput>({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    instructions: "",
    notes: "",
    payment: enabledPayments[0]?.id ?? "",
  });
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  if (!hydrated) {
    return <div className="skeleton h-96 w-full" aria-label="Loading checkout" />;
  }

  const items = buyNow ? [buyNow] : cartItems;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center">
        <p className="font-display text-3xl">Nothing to check out yet</p>
        <p className="mt-2 text-sm text-[#2a2623]/60">Add a piece you love to your cart first.</p>
        <Link href="/collections" className="btn btn-primary mt-6">
          Explore Collection
        </Link>
      </div>
    );
  }

  const set = (k: keyof CustomerInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const totals = computeTotals(items, coupon);

  const waMessage = [
    "Hello, I'd like to order:",
    ...items.map((i) => `- ${i.name} (${i.color}, ${i.size}) x${i.qty} = ${formatPKR(i.unitPrice * i.qty)}`),
    `Total (incl. delivery): ${formatPKR(totals.total)}`,
    "",
    values.name && `Name: ${values.name}`,
    values.phone && `Phone: ${values.phone}`,
    values.city && `City: ${values.city}`,
    values.address && `Address: ${values.address}`,
  ]
    .filter((line): line is string => typeof line === "string" && line.length > 0)
    .join("\n");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateCustomer(values, enabledIds);
    setErrors(errs);
    const firstBad = FIELD_ORDER.find((k) => errs[k]);
    if (firstBad) {
      document.getElementById(`field-${firstBad}`)?.focus();
      return;
    }

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: values,
          coupon,
          items: items.map((i) => ({ slug: i.slug, color: i.color, size: i.size, qty: i.qty })),
        }),
      });
      const data = (await res.json().catch(() => null)) as { ref?: string; error?: string; fieldErrors?: CustomerErrors } | null;

      if (!res.ok || !data?.ref) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setServerError(data?.error ?? "We could not place your order. Please try again.");
        setSending(false);
        return;
      }

      if (buyNow) setBuyNow(null);
      else clear();
      router.push(`/checkout/order-confirmation?ref=${encodeURIComponent(data.ref)}`);
    } catch {
      setServerError("Network problem. Please check your connection and try again.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        {siteConfig.demoMode && (
          <p className="rounded-2xl bg-[#f3ece0] p-4 text-sm text-[#5a3d2b]">
            <strong>Demo checkout:</strong> orders are saved on the server for the shop owner to review. No payment is taken online.
          </p>
        )}

        <section className="space-y-5 rounded-3xl bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl">Delivery details</h2>

          <Field id="name" label="Full name" required error={errors.name}>
            <input id="field-name" className="input" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Phone number" required error={errors.phone}>
              <input id="field-phone" type="tel" inputMode="tel" className="input" autoComplete="tel" placeholder="0300 1234567" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
            </Field>
            <Field id="email" label="Email (optional)" error={errors.email}>
              <input id="field-email" type="email" className="input" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
            </Field>
          </div>

          <Field id="city" label="City" required error={errors.city}>
            <input id="field-city" className="input" autoComplete="address-level2" value={values.city} onChange={set("city")} aria-invalid={!!errors.city} aria-describedby={errors.city ? "err-city" : undefined} />
          </Field>

          <Field id="address" label="Complete delivery address" required error={errors.address}>
            <textarea id="field-address" rows={3} className="input" autoComplete="street-address" value={values.address} onChange={set("address")} aria-invalid={!!errors.address} aria-describedby={errors.address ? "err-address" : undefined} />
          </Field>

          <Field id="instructions" label="Delivery instructions (optional)">
            <textarea id="field-instructions" rows={2} className="input" value={values.instructions} onChange={set("instructions")} />
          </Field>

          <Field id="notes" label="Order notes (optional)">
            <textarea id="field-notes" rows={2} className="input" value={values.notes} onChange={set("notes")} />
          </Field>
        </section>

        <fieldset className="space-y-3 rounded-3xl bg-white p-6 md:p-8" id="field-payment" tabIndex={-1}>
          <legend className="font-display mb-2 text-2xl">Payment method</legend>
          {siteConfig.payments.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                values.payment === p.id ? "border-[#5a3d2b] bg-[#f3ece0]" : "border-[#d9ccb4]"
              } ${p.enabled ? "" : "cursor-not-allowed opacity-50"}`}
            >
              <input
                type="radio"
                name="payment"
                value={p.id}
                disabled={!p.enabled}
                checked={values.payment === p.id}
                onChange={() => setValues((v) => ({ ...v, payment: p.id }))}
                className="mt-1 accent-[#5a3d2b]"
              />
              <span>
                <span className="block font-medium">{p.label}</span>
                <span className="block text-sm text-[#2a2623]/60">{p.note}</span>
              </span>
            </label>
          ))}
          {errors.payment && (
            <p role="alert" className="text-sm text-[#b3261e]">
              {errors.payment}
            </p>
          )}
        </fieldset>
      </div>

      <aside className="h-fit space-y-5 rounded-3xl bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Your order</h2>
        <ul className="divide-y divide-[#e6dac6]">
          {items.map((i) => (
            <li key={i.key} className="flex gap-3 py-3">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e6dac6]">
                <SmartImage src={i.image} alt={i.name} sizes="64px" />
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="block font-medium">{i.name}</span>
                <span className="block text-xs text-[#2a2623]/60">
                  {i.color} · {i.size} · Qty {i.qty}
                </span>
              </span>
              <span className="text-sm font-medium">{formatPKR(i.unitPrice * i.qty)}</span>
            </li>
          ))}
        </ul>

        <OrderSummary items={items} coupon={coupon} />

        {serverError && (
          <p role="alert" className="rounded-xl bg-[#fdecea] p-3 text-sm text-[#b3261e]">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={sending} className="btn btn-primary w-full">
          {sending ? "Placing order…" : "Place Order"}
        </button>

        <div className="border-t border-[#e6dac6] pt-4">
          <p className="mb-3 text-center text-xs text-[#2a2623]/60">Prefer to talk to us first?</p>
          <WhatsAppOrderButton message={waMessage} label="Order via WhatsApp" className="btn btn-outline w-full" />
        </div>
      </aside>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-[#b3261e]">*</span>}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} role="alert" className="mt-1.5 text-sm text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}