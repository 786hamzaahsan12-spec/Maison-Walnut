import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container-x pb-24 pt-32">
      <h1 className="font-display mb-8 text-5xl">Your Cart</h1>
      <CartView />
    </div>
  );
}