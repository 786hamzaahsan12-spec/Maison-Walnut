import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { formatPKR } from "@/lib/utils";
import Reveal from "./Reveal";

export default function PromoBanner() {
  if (!siteConfig.promo.enabled) return null;

  return (
    <section className="container-x section" aria-label="Current offer">
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl bg-[#5a3d2b] px-8 py-14 text-center text-white md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#b08d57]/25 blur-3xl" />
          <p className="eyebrow text-[#e3c892]!">Delivery offer</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Free delivery on orders above {formatPKR(siteConfig.delivery.freeThreshold)}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">The offer is applied automatically at checkout when your order qualifies.</p>
          <Link href="/collections" className="btn btn-gold mt-8">
            Shop Now
          </Link>
        </div>
      </Reveal>
    </section>
  );
}