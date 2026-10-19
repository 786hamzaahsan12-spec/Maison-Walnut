import type { Metadata } from "next";
import Link from "next/link";
import { img } from "@/data/products";
import { siteConfig } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}: furniture designed for comfort and made to last.`,
};

const values = [
  { title: "Craftsmanship", text: "We favour solid materials and careful finishing over shortcuts." },
  { title: "Design", text: "Calm, balanced shapes that sit comfortably in modern homes." },
  { title: "Service", text: "Clear communication from first enquiry to delivery." },
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">About Us</p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl leading-tight sm:text-6xl">Furniture designed for the way you live</h1>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#e6dac6]">
            <SmartImage src={img("1586023492125-27b2c045efd7")} alt="Styled living room" sizes="(max-width: 1024px) 100vw, 50vw" preload />
          </div>
          <div className="space-y-4 leading-relaxed text-[#2a2623]/80">
            <p>
              {siteConfig.name} is a furniture showroom built around one idea: a home should feel calm, welcoming and entirely yours. We bring together considered
              design and everyday comfort.
            </p>
            <p>Every piece in our collection is chosen for its proportions, its materials and how it feels to live with day after day.</p>
            <p className="text-xs text-[#2a2623]/50">Sample copy. Replace this page with your real brand story.</p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl bg-white p-8">
              <h2 className="font-display text-2xl">{v.title}</h2>
              <p className="mt-2 text-sm text-[#2a2623]/70">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/collections" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}