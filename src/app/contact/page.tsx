import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for product questions, orders and support.`,
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const rows: [string, string][] = [
    ["Phone", contact.phone],
    ["Email", contact.email],
    ["Address", contact.address],
    ["Store hours", contact.hours],
  ];
  const filled = rows.filter(([, v]) => v);

  return (
    <div className="container-x pb-24 pt-32">
      <p className="eyebrow">Contact</p>
      <h1 className="font-display mt-3 text-5xl leading-tight sm:text-6xl">We would love to hear from you</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ContactForm />

        <aside className="h-fit space-y-6 rounded-3xl bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl">Reach us directly</h2>
          {filled.length > 0 ? (
            <dl className="space-y-4 text-sm">
              {filled.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[#2a2623]/50">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-[#2a2623]/60">Store contact details will appear here once they are added in the configuration.</p>
          )}
          <WhatsAppOrderButton
            message={`Hello ${siteConfig.name}, I have a question about your furniture.`}
            label="Chat on WhatsApp"
            className="btn btn-primary w-full"
          />
        </aside>
      </div>
    </div>
  );
}