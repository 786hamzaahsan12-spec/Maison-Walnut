import type { Metadata } from "next";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <div className="container-x pb-24 pt-32">
      <h1 className="font-display mb-8 text-5xl">Your Wishlist</h1>
      <WishlistView />
    </div>
  );
}