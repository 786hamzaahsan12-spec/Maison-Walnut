"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { categories, categoryLabel, products, roomTitles } from "@/data/products";
import type { RoomSlug } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ShopClient() {
  const params = useSearchParams();
  const router = useRouter();

  const category = params.get("category") ?? "all";
  const room = params.get("room") as RoomSlug | null;
  const tag = params.get("tag");
  const sort = params.get("sort") ?? "featured";
  const query = params.get("q") ?? "";

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all" && value !== "featured") next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(`/collections${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const t = query.trim().toLowerCase();
    const r = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!room || p.room === room) &&
        (tag !== "bestseller" || p.bestseller) &&
        (tag !== "new" || p.isNew) &&
        (!t || `${p.name} ${p.short} ${categoryLabel(p.category)}`.toLowerCase().includes(t))
    );
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [category, room, tag, sort, query]);

  const title = room
    ? roomTitles[room] ?? "Collection"
    : category !== "all"
      ? categoryLabel(category as never)
      : tag === "bestseller"
        ? "Bestsellers"
        : tag === "new"
          ? "New Arrivals"
          : "All Collections";

  return (
    <div className="container-x pb-24 pt-32">
      <p className="eyebrow">Maison Walnut</p>
      <h1 className="font-display mt-3 text-5xl leading-tight sm:text-6xl">{title}</h1>
      <p className="mt-3 max-w-xl text-[#2a2623]/70">Explore pieces designed for comfort and made to last.</p>

      <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0" role="tablist" aria-label="Categories">
        {[{ slug: "all", label: "All" }, ...categories].map((c) => {
          const active = category === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setParam("category", c.slug)}
              className={`relative shrink-0 rounded-full border border-[#d9ccb4] px-5 py-2.5 text-sm transition-colors ${active ? "text-white" : "bg-white hover:bg-[#f3ece0]"}`}
            >
              {active && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-[#5a3d2b]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative z-10">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2a2623]/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setParam("q", e.target.value || null)}
            placeholder="Search furniture…"
            aria-label="Search furniture"
            className="input pl-11!"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[#2a2623]/70">Sort by</span>
          <select value={sort} onChange={(e) => setParam("sort", e.target.value)} className="input w-auto!">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>

      {(room || tag) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {room && <Chip label={roomTitles[room] ?? room} onClear={() => setParam("room", null)} />}
          {tag && <Chip label={tag === "new" ? "New Arrivals" : "Bestsellers"} onClear={() => setParam("tag", null)} />}
        </div>
      )}

      <p className="mt-6 text-sm text-[#2a2623]/60" aria-live="polite">
        {list.length} {list.length === 1 ? "product" : "products"} · prices in PKR · ratings are demo data
      </p>

      {list.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-white p-12 text-center">
          <p className="font-display text-3xl">No products found</p>
          <p className="mt-2 text-sm text-[#2a2623]/60">Try a different category or search term.</p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => router.replace("/collections")}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button type="button" onClick={onClear} aria-label={`Remove filter ${label}`} className="inline-flex items-center gap-2 rounded-full bg-[#e6dac6] px-4 py-1.5 text-sm">
      {label} <X className="h-3.5 w-3.5" />
    </button>
  );
}