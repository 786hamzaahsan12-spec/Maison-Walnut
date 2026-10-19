"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";
import { siteConfig } from "@/lib/config";

export const MAX_QTY = 10;

type NewItem = Omit<CartItem, "key">;
const keyOf = (i: NewItem) => `${i.slug}|${i.color}|${i.size}`;
const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(n) || 1));

interface ShopState {
  items: CartItem[];
  wishlist: string[];
  coupon: string | null;
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: string | null;
  buyNow: CartItem | null;
  addItem: (item: NewItem) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setQuickView: (slug: string | null) => void;
  setBuyNow: (item: NewItem | null) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      coupon: null,
      cartOpen: false,
      searchOpen: false,
      quickView: null,
      buyNow: null,

      addItem: (item) =>
        set((s) => {
          const key = keyOf(item);
          const existing = s.items.find((i) => i.key === key);
          if (existing) {
            return {
              cartOpen: true,
              items: s.items.map((i) => (i.key === key ? { ...i, qty: clamp(i.qty + item.qty) } : i)),
            };
          }
          return { cartOpen: true, items: [...s.items, { ...item, key, qty: clamp(item.qty) }] };
        }),

      setQty: (key, qty) =>
        set((s) => ({ items: s.items.map((i) => (i.key === key ? { ...i, qty: clamp(qty) } : i)) })),

      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [], coupon: null }),

      toggleWish: (slug) =>
        set((s) => ({
          wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug],
        })),

      setCartOpen: (v) => set({ cartOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      setQuickView: (slug) => set({ quickView: slug }),
      setBuyNow: (item) => set({ buyNow: item ? { ...item, key: keyOf(item), qty: clamp(item.qty) } : null }),

      applyCoupon: (code) => {
        const match = Object.keys(siteConfig.coupons).find((k) => k.toUpperCase() === code.trim().toUpperCase());
        if (!match) return false;
        set({ coupon: match });
        return true;
      },
      removeCoupon: () => set({ coupon: null }),
    }),
    {
      name: "maison-walnut-shop",
      partialize: (s) => ({ items: s.items, wishlist: s.wishlist, coupon: s.coupon }),
    }
  )
);