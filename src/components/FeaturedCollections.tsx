import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/data/products";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

const items = [
  { title: "Living Room", href: "/collections?room=living", image: img("1618220179428-22790b461013"), tall: true },
  { title: "Bedroom", href: "/collections?room=bedroom", image: img("1616594039964-ae9021a400a0"), tall: false },
  { title: "Dining Room", href: "/collections?room=dining", image: img("1538688525198-9b88f6f53126"), tall: false },
  { title: "Office", href: "/collections?room=office", image: img("1497366216548-37526070297c"), tall: true },
];

export default function FeaturedCollections() {
  return (
    <section className="section container-x" aria-labelledby="featured-title">
      <Reveal>
        <p className="eyebrow">Featured Collections</p>
        <h2 id="featured-title" className="font-display mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
          A room for every moment
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <Link
              href={c.href}
              className={`group relative block overflow-hidden rounded-3xl bg-[#e6dac6] ${c.tall ? "aspect-4/5 md:aspect-5/6" : "aspect-4/3 md:aspect-5/5"}`}
            >
              <div className="absolute inset-0 transition-transform duration-900 group-hover:scale-105">
                <SmartImage src={c.image} alt={`${c.title} furniture collection`} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-8">
                <h3 className="font-display text-3xl md:text-4xl">{c.title}</h3>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-colors group-hover:bg-[#b08d57]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}