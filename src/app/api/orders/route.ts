import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { getProduct, priceFor, variantSku } from "@/data/products";
import { computeTotals } from "@/lib/utils";
import { validateCustomer, type CustomerInput } from "@/lib/validation";
import { appendRecord } from "@/lib/storage";

export const runtime = "nodejs";

const MAX_QTY = 10;
const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 1000) : "");
const fail = (error: string, status = 400, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ error, ...extra }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("Invalid request.");
  }

  const c = (body.customer ?? {}) as Record<string, unknown>;
  const customer: CustomerInput = {
    name: str(c.name),
    phone: str(c.phone),
    email: str(c.email),
    city: str(c.city),
    address: str(c.address),
    instructions: str(c.instructions),
    notes: str(c.notes),
    payment: str(c.payment),
  };

  const enabledIds = siteConfig.payments.filter((p) => p.enabled).map((p) => p.id);
  const fieldErrors = validateCustomer(customer, enabledIds);
  if (Object.keys(fieldErrors).length) return fail("Please correct the highlighted fields.", 400, { fieldErrors });

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 30) {
    return fail("Your cart is empty or invalid.");
  }

  const lines = [];
  for (const raw of body.items as Record<string, unknown>[]) {
    const product = getProduct(str(raw.slug));
    const color = product?.colors.find((x) => x.name === raw.color);
    const size = product?.sizes.find((x) => x.label === raw.size);
    const qty = Number(raw.qty);

    if (!product || !color || !size) return fail("One of the products in your cart is no longer available.");
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return fail("Invalid quantity.");
    if (qty > product.stock) return fail(`Only ${product.stock} of ${product.name} available.`);

    lines.push({
      slug: product.slug,
      name: product.name,
      sku: variantSku(product, color.name, size.label),
      color: color.name,
      size: size.label,
      qty,
      unitPrice: priceFor(product, size.label),
    });
  }

  const couponInput = str(body.coupon).toUpperCase();
  const coupon = Object.keys(siteConfig.coupons).find((k) => k.toUpperCase() === couponInput) ?? null;
  const totals = computeTotals(lines, coupon);

  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const ref = `MW-${stamp}-${randomUUID().slice(0, 6).toUpperCase()}`;

  try {
    await appendRecord("orders.json", {
      ref,
      createdAt: d.toISOString(),
      status: "new",
      demo: siteConfig.demoMode,
      customer,
      items: lines,
      coupon,
      totals,
    });
  } catch (err) {
    console.error("Order save failed:", err);
    return fail("We could not save your order right now. Please try again, or order via WhatsApp.", 500);
  }

  return NextResponse.json({ ok: true, ref, total: totals.total });
}