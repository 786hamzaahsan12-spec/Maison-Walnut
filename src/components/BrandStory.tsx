import Link from "next/link";
import { img } from "@/data/products";
import { siteConfig } from "@/lib/config";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

const values = [
  { title: "Made to last", text: "Solid materials and honest construction." },
  { title: "Designed to live with", text: "Calm shapes that suit real homes." },
  { title: "Comfort first", text: "Pieces you will want to sit in every day." },
];

export default function BrandStory() {
  return (
    <section className="section container-x" aria-labelledby="story-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-[#e6dac6]">
            <SmartImage src={img("1519710164239-da123dc03ef4")} alt="A calm, warmly lit living room" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Our Story</p>
          <h2 id="story-title" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Furniture with a quiet kind of luxury
          </h2>
          <p className="mt-5 leading-relaxed text-[#2a2623]/80">
            {siteConfig.name} brings together considered design and everyday comfort. We believe a home should feel calm, welcoming and entirely yours.
          </p>
          <p className="mt-3 text-xs text-[#2a2623]/50">Sample brand copy. Replace it with your real story.</p>

          <ul className="mt-8 space-y-5">
            {values.map((v) => (
              <li key={v.title} className="border-l-2 border-[#b08d57] pl-5">
                <p className="font-display text-2xl">{v.title}</p>
                <p className="text-sm text-[#2a2623]/70">{v.text}</p>
              </li>
            ))}
          </ul>

          <Link href="/about" className="btn btn-primary mt-8">
            Discover Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}