import { img } from "@/data/products";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

const shots = [
  { id: "1618220179428-22790b461013", alt: "Modern living room with a grey sofa", span: "md:col-span-2 md:row-span-2" },
  { id: "1616594039964-ae9021a400a0", alt: "Calm bedroom with upholstered bed", span: "" },
  { id: "1538688525198-9b88f6f53126", alt: "Dining room with a wooden table", span: "" },
  { id: "1586023492125-27b2c045efd7", alt: "Bright living space with styled furniture", span: "" },
  { id: "1567538096630-e0c55bd6374c", alt: "Designer armchair in a cosy corner", span: "" },
];

export default function InspirationGallery() {
  return (
    <section className="section container-x" aria-labelledby="gallery-title">
      <Reveal className="text-center">
        <p className="eyebrow">Inspiration</p>
        <h2 id="gallery-title" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
          See it in a real space
        </h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-55 grid-cols-2 gap-4 md:auto-rows-65 md:grid-cols-4">
        {shots.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06} className={`${s.span} h-full`}>
            <div className="group relative h-full overflow-hidden rounded-2xl bg-[#e6dac6]">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <SmartImage src={img(s.id, 1000)} alt={s.alt} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}