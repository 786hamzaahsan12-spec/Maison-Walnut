"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { formatPKR } from "@/lib/utils";
import { MAX_QTY, useShop } from "@/store/useShop";
import QtyControl from "./QtyControl";
import SmartImage from "./SmartImage";

export default function CartLine({ item }: { item: CartItem }) {
  const setQty = useShop((s) => s.setQty);
  const removeItem = useShop((s) => s.removeItem);
  const setCartOpen = useShop((s) => s.setCartOpen);

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/products/${item.slug}`}
        onClick={() => setCartOpen(false)}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#e6dac6]"
      >
        <SmartImage src={item.image} alt={item.name} sizes="96px" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/products/${item.slug}`} onClick={() => setCartOpen(false)} className="font-display block text-lg leading-tight hover:underline">
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-[#2a2623]/60">
              {item.color} · {item.size}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.key)}
            className="rounded-full p-2 text-[#2a2623]/50 transition-colors hover:bg-[#f3ece0] hover:text-[#b3261e]"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QtyControl value={item.qty} max={MAX_QTY} label={item.name} onChange={(n) => setQty(item.key, n)} />
          <p className="text-sm font-semibold text-[#5a3d2b]">{formatPKR(item.unitPrice * item.qty)}</p>
        </div>
      </div>
    </li>
  );
}