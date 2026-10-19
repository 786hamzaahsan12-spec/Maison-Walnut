import { Hammer, Headset, Ruler, ShieldCheck, Truck } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: Hammer, title: "Quality craftsmanship", text: "Built with solid materials and careful finishing." },
  { icon: Ruler, title: "Thoughtful design", text: "Balanced proportions that suit modern homes." },
  { icon: Truck, title: "Reliable delivery", text: "We confirm your delivery details before dispatch." },
  { icon: Headset, title: "Customer support", text: "Reach us by phone, WhatsApp or the contact form." },
  { icon: ShieldCheck, title: "Warranty", text: "Warranty terms are listed on each product page." },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-[#f3ece0]" aria-labelledby="why-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Choose Us</p>
          <h2 id="why-title" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Furniture you can trust
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <div className="h-full rounded-3xl bg-white p-6 text-center shadow-[0_2px_18px_rgba(90,61,43,.06)]">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3ece0] text-[#b08d57]">
                  <it.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-4 text-xl">{it.title}</h3>
                <p className="mt-2 text-sm text-[#2a2623]/70">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}