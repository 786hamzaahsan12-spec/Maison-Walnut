"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useShop } from "@/store/useShop";
import { useHydrated } from "@/lib/hooks";
import { siteConfig } from "@/lib/config";
import { computeTotals, formatPKR } from "@/lib/utils";
import CartLine from "./CartLine";

export default function CartDrawer() {
  const hydrated = useHydrated();
  const open = useShop((s) => s.cartOpen);
  const setOpen = useShop((s) => s.setCartOpen);
  const items = useShop((s) => s.items);
  const coupon = useShop((s) => s.coupon);
  const setBuyNow = useShop((s) => s.setBuyNow);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const list = hydrated ? items : [];
  const totals = computeTotals(list, coupon);
  const progress = Math.min(100, (totals.subtotal / siteConfig.delivery.freeThreshold) * 100);
  const remaining = siteConfig.delivery.freeThreshold - totals.subtotal;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cart-backdrop"
          className="fixed inset-0 z-55 bg-[#2a2623]/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <motion.aside
          key="cart-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="fixed right-0 top-0 z-56 flex h-full w-full max-w-md flex-col bg-[#faf6ef] shadow-2xl"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between border-b border-[#e6dac6] px-6 py-5">
            <h2 className="font-display text-2xl">Your Cart</h2>
            <button type="button" className="icon-btn" aria-label="Close cart" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {list.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
              <ShoppingBag className="h-12 w-12 text-[#b08d57]" />
              <p className="font-display text-2xl">Your cart is empty</p>
              <p className="text-sm text-[#2a2623]/60">Discover pieces made to be lived with.</p>
              <Link href="/collections" onClick={() => setOpen(false)} className="btn btn-primary">
                Explore Collection
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-[#e6dac6] overflow-y-auto px-6">
                {list.map((i) => (
                  <CartLine key={i.key} item={i} />
                ))}
              </ul>
              <div className="space-y-4 border-t border-[#e6dac6] px-6 py-5">
                <div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#e6dac6]">
                    <div className="h-full rounded-full bg-[#b08d57] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-[#2a2623]/60">
                    {remaining > 0 ? `Add ${formatPKR(remaining)} more for free delivery` : "You qualify for free delivery"}
                  </p>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Subtotal</span>
                  <span className="text-[#5a3d2b]">{formatPKR(totals.subtotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/cart" onClick={() => setOpen(false)} className="btn btn-outline">
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => {
                      setBuyNow(null);
                      setOpen(false);
                    }}
                    className="btn btn-primary"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}