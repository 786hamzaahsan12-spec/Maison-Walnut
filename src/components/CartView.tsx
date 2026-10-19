"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/store/useShop";
import { useHydrated } from "@/lib/hooks";
import { siteConfig } from "@/lib/config";
import CartLine from "./CartLine";
import OrderSummary from "./OrderSummary";

export default function CartView() {
  const hydrated = useHydrated();
  const items = useShop((s) => s.items);
  const coupon = useShop((s) => s.coupon);
  const applyCoupon = useShop((s) => s.applyCoupon);
  const removeCoupon = useShop((s) => s.removeCoupon);
  const setBuyNow = useShop((s) => s.setBuyNow);
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const hasCoupons = Object.keys(siteConfig.coupons).length > 0;

  if (!hydrated) {
    return <div className="skeleton h-72 w-full" aria-label="Loading cart" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-[#b08d57]" />
        <p className="font-display mt-4 text-3xl">Your cart is empty</p>
        <p className="mt-2 text-sm text-[#2a2623]/60">Discover pieces made to be lived with.</p>
        <Link href="/collections" className="btn btn-primary mt-6">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-[#e6dac6] rounded-3xl bg-white px-6">
        {items.map((i) => (
          <CartLine key={i.key} item={i} />
        ))}
      </ul>

      <aside className="h-fit space-y-5 rounded-3xl bg-white p-6">
        <h2 className="font-display text-2xl">Order Summary</h2>

        {hasCoupons && (
          <div>
            {coupon ? (
              <p className="flex items-center justify-between text-sm">
                <span>Coupon {coupon} applied</span>
                <button type="button" className="underline" onClick={removeCoupon}>
                  Remove
                </button>
              </p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setCouponError(applyCoupon(code) ? "" : "This coupon code is not valid.");
                  setCode("");
                }}
              >
                <label className="sr-only" htmlFor="coupon">
                  Coupon code
                </label>
                <input id="coupon" className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" />
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              </form>
            )}
            {couponError && (
              <p role="alert" className="mt-2 text-xs text-[#b3261e]">
                {couponError}
              </p>
            )}
          </div>
        )}

        <OrderSummary items={items} coupon={coupon} />

        <Link href="/checkout" onClick={() => setBuyNow(null)} className="btn btn-primary w-full">
          Proceed to Checkout
        </Link>
        <Link href="/collections" className="block text-center text-sm underline">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}