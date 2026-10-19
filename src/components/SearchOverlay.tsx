"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useShop } from "@/store/useShop";
import { categoryLabel, searchProducts } from "@/data/products";
import { formatPKR } from "@/lib/utils";
import SmartImage from "./SmartImage";

export default function SearchOverlay() {
  const open = useShop((s) => s.searchOpen);
  const setOpen = useShop((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          className="fixed inset-0 z-60 bg-[#2a2623]/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="mx-auto mt-16 w-[92%] max-w-2xl rounded-3xl bg-[#faf6ef] p-5 shadow-2xl"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-[#5a3d2b]" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sofas, beds, dining tables…"
                aria-label="Search products"
                className="input"
              />
              <button type="button" className="icon-btn shrink-0" aria-label="Close search" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {q.trim() === "" ? (
                <p className="px-1 py-6 text-center text-sm text-[#2a2623]/60">Start typing to search our collection.</p>
              ) : results.length === 0 ? (
                <p className="px-1 py-6 text-center text-sm text-[#2a2623]/60">No products found for “{q}”.</p>
              ) : (
                <ul className="divide-y divide-[#e6dac6]">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-[#f3ece0]"
                      >
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e6dac6]">
                          <SmartImage src={p.images[0]} alt={p.name} sizes="64px" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{p.name}</span>
                          <span className="block text-xs text-[#2a2623]/60">{categoryLabel(p.category)}</span>
                        </span>
                        <span className="text-sm font-medium text-[#5a3d2b]">{formatPKR(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {q.trim() !== "" && (
              <Link
                href={`/collections?q=${encodeURIComponent(q.trim())}`}
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-4 w-full"
              >
                View all results
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}