"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { getProduct, makeCartItem } from "@/data/products";
import { formatPKR } from "@/lib/utils";
import { useShop } from "@/store/useShop";
import SmartImage from "./SmartImage";

export default function QuickView() {
  const slug = useShop((s) => s.quickView);
  const setQuickView = useShop((s) => s.setQuickView);
  const product = slug ? getProduct(slug) : undefined;

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setQuickView(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [slug, setQuickView]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="qv"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.name}`}
          className="fixed inset-0 z-60 flex items-center justify-center bg-[#2a2623]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(null)}
        >
          <motion.div
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#faf6ef] md:grid-cols-2"
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" aria-label="Close quick view" onClick={() => setQuickView(null)} className="icon-btn absolute right-3 top-3 z-10 bg-white/90">
              <X className="h-5 w-5" />
            </button>
            <QuickViewBody key={product.slug} product={product} onClose={() => setQuickView(null)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickViewBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const [colorIdx, setColorIdx] = useState(0);
  const addItem = useShop((s) => s.addItem);
  const color = product.colors[colorIdx];
  const size = product.sizes[0];
  const inStock = product.stock > 0;

  return (
    <>
      <div className="relative aspect-4/3 bg-[#e6dac6] md:aspect-auto md:min-h-115">
        <SmartImage key={color.image} src={product.images[color.image] ?? product.images[0]} alt={product.name} sizes="(max-width: 768px) 100vw, 450px" />
      </div>
      <div className="flex flex-col p-6 md:p-8">
        <h2 className="font-display text-3xl leading-tight">{product.name}</h2>
        <p className="mt-2 text-sm text-[#2a2623]/70">{product.short}</p>
        <p className="mt-4 text-2xl font-semibold text-[#5a3d2b]">{formatPKR(product.price)}</p>
        {product.originalPrice && <p className="text-sm text-[#2a2623]/50 line-through">{formatPKR(product.originalPrice)}</p>}

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">
            Colour: <span className="font-normal text-[#2a2623]/70">{color.name}</span>
          </legend>
          <div className="mt-2 flex gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={i === colorIdx}
                onClick={() => setColorIdx(i)}
                className={`h-8 w-8 rounded-full border border-black/20 ring-offset-2 transition ${i === colorIdx ? "ring-2 ring-[#5a3d2b]" : ""}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-auto grid gap-3 pt-8">
          <button
            type="button"
            disabled={!inStock}
            className="btn btn-primary"
            onClick={() => {
              addItem(makeCartItem(product, color.name, size.label, 1));
              onClose();
            }}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <Link href={`/products/${product.slug}`} onClick={onClose} className="btn btn-outline">
            View Full Details
          </Link>
        </div>
      </div>
    </>
  );
}