"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShieldCheck, Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabel, makeCartItem, priceFor, variantSku } from "@/data/products";
import { discountPercent, formatPKR } from "@/lib/utils";
import { MAX_QTY, useShop } from "@/store/useShop";
import { useHydrated } from "@/lib/hooks";
import ProductGallery from "./ProductGallery";
import QtyControl from "./QtyControl";
import WhatsAppOrderButton from "./WhatsAppOrderButton";

export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const addItem = useShop((s) => s.addItem);
  const setBuyNow = useShop((s) => s.setBuyNow);
  const toggleWish = useShop((s) => s.toggleWish);
  const wished = useShop((s) => s.wishlist.includes(product.slug));

  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  const color = product.colors[colorIdx];
  const size = product.sizes[sizeIdx];
  const price = priceFor(product, size.label);
  const delta = price - product.price;
  const original = product.originalPrice ? product.originalPrice + delta : undefined;
  const off = discountPercent(price, original);
  const sku = variantSku(product, color.name, size.label);
  const inStock = product.stock > 0;
  const maxQty = Math.max(1, Math.min(MAX_QTY, product.stock));
  const isWished = hydrated && wished;

  const message = [
    "Hello, I'm interested in this product:",
    product.name,
    `SKU: ${sku}`,
    `Colour: ${color.name}`,
    `Size: ${size.label}`,
    `Quantity: ${qty}`,
    `Price: ${formatPKR(price)} each`,
    `Total: ${formatPKR(price * qty)}`,
    "",
    "Is it available?",
  ].join("\n");

  const item = () => makeCartItem(product, color.name, size.label, qty);

  const specs: [string, string][] = [
    ["SKU", sku],
    ["Dimensions (W × H × D)", `${product.dimensions.w} × ${product.dimensions.h} × ${product.dimensions.d} cm`],
    ...(product.weightKg ? ([["Weight", `${product.weightKg} kg`]] as [string, string][]) : []),
    ["Materials & construction", product.materials],
    ["Upholstery / finish", product.upholstery],
    ["Assembly", product.assembly],
    ["Warranty", product.warranty],
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <ProductGallery images={product.images} name={product.name} active={active} onChange={setActive} />

      <div>
        <p className="eyebrow">{categoryLabel(product.category)}</p>
        <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">{product.name}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#2a2623]/70">
          <span>SKU: {sku}</span>
          <span className="flex items-center gap-1" title="Sample rating data">
            <Star className="h-4 w-4 fill-[#b08d57] text-[#b08d57]" />
            {product.rating.toFixed(1)} ({product.reviews}) · demo
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline gap-3">
          <p className="text-3xl font-semibold text-[#5a3d2b]">{formatPKR(price)}</p>
          {original && <p className="text-lg text-[#2a2623]/50 line-through">{formatPKR(original)}</p>}
          {off > 0 && <span className="rounded-full bg-[#b3261e] px-3 py-1 text-xs font-semibold text-white">Save {off}%</span>}
        </div>

        <p className="mt-5 text-[#2a2623]/80">{product.short}</p>

        <fieldset className="mt-7">
          <legend className="text-sm font-medium">
            Colour: <span className="font-normal text-[#2a2623]/70">{color.name}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={i === colorIdx}
                onClick={() => {
                  setColorIdx(i);
                  setActive(c.image);
                }}
                className={`h-10 w-10 rounded-full border border-black/20 ring-offset-2 transition ${i === colorIdx ? "ring-2 ring-[#5a3d2b]" : "hover:scale-110"}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium">Size / configuration</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={i === sizeIdx}
                onClick={() => setSizeIdx(i)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  i === sizeIdx ? "border-[#5a3d2b] bg-[#5a3d2b] text-white" : "border-[#d9ccb4] bg-white hover:bg-[#f3ece0]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <p className={`mt-6 text-sm font-medium ${inStock ? "text-[#2f6b3a]" : "text-[#b3261e]"}`}>
          {!inStock ? "Out of stock" : product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
          <span className="font-normal text-[#2a2623]/50"> · sample stock data</span>
        </p>

        <div className="mt-4 flex items-center gap-4">
          <QtyControl value={qty} max={maxQty} onChange={setQty} label="quantity" />
          <p className="text-sm text-[#2a2623]/70">Total: {formatPKR(price * qty)}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" disabled={!inStock} className="btn btn-primary" onClick={() => addItem(item())}>
            Add to Cart
          </button>
          <button
            type="button"
            disabled={!inStock}
            className="btn btn-gold"
            onClick={() => {
              setBuyNow(item());
              router.push("/checkout");
            }}
          >
            Buy Now
          </button>
          <button
            type="button"
            aria-pressed={isWished}
            onClick={() => toggleWish(product.slug)}
            className="btn btn-outline"
          >
            <Heart className={`h-4 w-4 ${isWished ? "fill-[#b3261e] text-[#b3261e]" : ""}`} />
            {isWished ? "In Wishlist" : "Add to Wishlist"}
          </button>
          <WhatsAppOrderButton message={message} label="Ask on WhatsApp" />
        </div>

        <div className="mt-8 space-y-4 rounded-2xl bg-[#f3ece0] p-5 text-sm">
          <p className="flex gap-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#b08d57]" />
            <span>{product.delivery}</span>
          </p>
          <p className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#b08d57]" />
            <span>{product.warranty}</span>
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl">Description</h2>
          <p className="mt-3 leading-relaxed text-[#2a2623]/80">{product.description}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl">Specifications</h2>
          <p className="mt-1 text-xs text-[#2a2623]/50">Sample data until real product details are supplied.</p>
          <dl className="mt-4 divide-y divide-[#e6dac6] text-sm">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[40%_1fr] gap-4 py-3">
                <dt className="text-[#2a2623]/60">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl">Care instructions</h2>
          <p className="mt-3 leading-relaxed text-[#2a2623]/80">{product.care}</p>
        </div>
      </div>
    </div>
  );
}