import { siteConfig } from "./config";

export const formatPKR = (n: number) =>
  `Rs. ${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const discountPercent = (price: number, original?: number) =>
  original && original > price ? Math.round((1 - price / original) * 100) : 0;

export function computeTotals(items: { unitPrice: number; qty: number }[], couponCode: string | null) {
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const pct = couponCode ? siteConfig.coupons[couponCode] ?? 0 : 0;
  const discount = Math.round((subtotal * pct) / 100);
  const after = subtotal - discount;
  const delivery = after === 0 || after >= siteConfig.delivery.freeThreshold ? 0 : siteConfig.delivery.fee;
  return { subtotal, discount, delivery, total: after + delivery, pct };
}
