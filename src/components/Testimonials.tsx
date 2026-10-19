import { Star } from "lucide-react";
import Reveal from "./Reveal";

const reviews = [
  { name: "Sample Customer A", city: "Lahore", text: "The sofa is comfortable and looks exactly like the photos. Delivery was smooth." },
  { name: "Sample Customer B", city: "Karachi", text: "Beautiful finish on the dining table. It became the centre of our living space." },
  { name: "Sample Customer C", city: "Islamabad", text: "Easy ordering and helpful support when I had questions about sizes." },
];

export default function Testimonials() {
  return (
    <section className="section bg-[#f3ece0]" aria-labelledby="reviews-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Customer Reviews</p>
          <h2 id="reviews-title" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Loved in real homes
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#b3261e]">Demo content: replace with genuine reviews</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl bg-white p-7 shadow-[0_2px_18px_rgba(90,61,43,.06)]">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-[#b08d57] text-[#b08d57]" />
                  ))}
                </div>
                <blockquote className="mt-4 leading-relaxed text-[#2a2623]/85">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-[#2a2623]/60"> · {r.city}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}