import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  products: Product[];
  href: string;
  tinted?: boolean;
}

export default function ProductSection({ id, eyebrow, title, products, href, tinted = false }: Props) {
  return (
    <section className={`section ${tinted ? "bg-[#f3ece0]" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
              {title}
            </h2>
          </div>
          <Link href={href} className="btn btn-outline">
            View all
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <p className="mt-6 text-xs text-[#2a2623]/50">Sample products, prices and ratings. Replace with your real catalogue in src/data/products.ts.</p>
      </div>
    </section>
  );
}