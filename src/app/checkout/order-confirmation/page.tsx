import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Order Received", robots: { index: false } };

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const { ref } = await searchParams;

  return (
    <div className="container-x pb-24 pt-36">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-[0_2px_18px_rgba(90,61,43,.08)]">
        <CheckCircle2 className="mx-auto h-16 w-16 text-[#2f6b3a]" />
        <h1 className="font-display mt-4 text-4xl">Thank you for your order</h1>

        {ref ? (
          <>
            <p className="mt-3 text-sm text-[#2a2623]/70">Your order reference</p>
            <p className="font-display mt-1 text-3xl text-[#5a3d2b]">{ref}</p>
          </>
        ) : (
          <p className="mt-3 text-sm text-[#2a2623]/70">We have received your order.</p>
        )}

        <p className="mt-6 text-sm leading-relaxed text-[#2a2623]/75">
          Our team will contact you on the phone number you provided to confirm delivery details and payment. Please keep your order reference handy.
        </p>
        {siteConfig.demoMode && <p className="mt-4 rounded-xl bg-[#f3ece0] p-3 text-xs text-[#5a3d2b]">Demo mode is on: no online payment was taken.</p>}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/collections" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}