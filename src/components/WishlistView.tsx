"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useShop } from "@/store/useShop";
import ProductCard from "./ProductCard";

export default function WishlistView() {
  const hydrated = useHydrated();
  const wishlist = useShop((s) => s.wishlist);

  if (!hydrated) return <div className="skeleton h-72 w-full" aria-label="Loading wishlist" />;

  const list = products.filter((p) => wishlist.includes(p.slug));

  if (list.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center">
        <Heart className="mx-auto h-14 w-14 text-[#b08d57]" />
        <p className="font-display mt-4 text-3xl">Your wishlist is empty</p>
        <p className="mt-2 text-sm text-[#2a2623]/60">Tap the heart on any piece to save it here.</p>
        <Link href="/collections" className="btn btn-primary mt-6">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}