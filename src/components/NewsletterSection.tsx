import Reveal from "./Reveal";
import NewsletterForm from "./NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="section container-x" aria-labelledby="newsletter-title">
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-4xl bg-[#2a2623] px-6 py-14 text-center text-white md:px-12">
          <p className="eyebrow">Newsletter</p>
          <h2 id="newsletter-title" className="font-display mt-3 text-4xl leading-tight">
            Stay inspired
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">New arrivals and styling ideas, straight to your inbox.</p>
          <div className="mx-auto mt-8 max-w-md text-left">
            <NewsletterForm dark />
          </div>
        </div>
      </Reveal>
    </section>
  );
}