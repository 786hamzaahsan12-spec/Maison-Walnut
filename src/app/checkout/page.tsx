import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-x pb-24 pt-32">
      <h1 className="font-display mb-8 text-5xl">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}