"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Heart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabel } from "@/data/products";
import { discountPercent, formatPKR } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { useHydrated } from "@/lib/hooks";
import { useShop } from "@/store/useShop";
import SmartImage from "./SmartImage";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const reduced = hydrated && !!reduce;
  const wished = useShop((s) => s.wishlist.includes(product.slug));
  const toggleWish = useShop((s) => s.toggleWish);
  const setQuickView = useShop((s) => s.setQuickView);
  const off = discountPercent(product.price, product.originalPrice);
  const isWished = hydrated && wished;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.07, ease: EASE }}
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_18px_rgba(90,61,43,.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(90,61,43,.16)]">
        <div className="relative aspect-4/5 overflow-hidden bg-[#e6dac6]">
          <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-0">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <SmartImage src={product.images[0]} alt={product.name} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
              {product.images[1] && (
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <SmartImage src={product.images[1]} alt="" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
              )}
            </div>
          </Link>

          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {off > 0 && <span className="rounded-full bg-[#b3261e] px-3 py-1 text-xs font-semibold text-white">−{off}%</span>}
            {product.isNew && <span className="rounded-full bg-[#2a2623] px-3 py-1 text-xs font-medium text-white">New</span>}
            {product.bestseller && <span className="rounded-full bg-[#b08d57] px-3 py-1 text-xs font-medium text-white">Bestseller</span>}
          </div>

          <button
            type="button"
            aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWished}
            onClick={() => toggleWish(product.slug)}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-110"
          >
            <Heart className={`h-5 w-5 ${isWished ? "fill-[#b3261e] text-[#b3261e]" : "text-[#2a2623]"}`} />
          </button>

          <button
            type="button"
            onClick={() => setQuickView(product.slug)}
            className="btn btn-light btn-sm absolute inset-x-4 bottom-4 z-10 shadow-lg transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <Eye className="h-4 w-4" /> Quick View
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#2a2623]/50">{categoryLabel(product.category)}</p>
          <Link href={`/products/${product.slug}`} className="font-display mt-1 text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-0.5 hover:underline">
            {product.name}
          </Link>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#2a2623]/70" title="Sample rating data">
            <Star className="h-3.5 w-3.5 fill-[#b08d57] text-[#b08d57]" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviews}) · demo</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5" aria-label="Available colours">
            {product.colors.map((c) => (
              <span key={c.name} title={c.name} className="h-4 w-4 rounded-full border border-black/15" style={{ background: c.hex }} />
            ))}
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-[#5a3d2b]">{formatPKR(product.price)}</p>
              {product.originalPrice && <p className="text-xs text-[#2a2623]/50 line-through">{formatPKR(product.originalPrice)}</p>}
            </div>
            <Link href={`/products/${product.slug}`} className="btn btn-outline btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}