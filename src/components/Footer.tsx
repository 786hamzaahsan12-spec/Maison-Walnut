import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { categories } from "@/data/products";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => url);

  return (
    <footer className="bg-[#2a2623] text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl text-white">{siteConfig.name}</p>
          <p className="mt-3 text-sm">{siteConfig.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize underline-offset-4 hover:underline">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Shop categories">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Shop</p>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections?category=${c.slug}`} className="hover:text-white hover:underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Help</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white hover:underline">
                FAQ, delivery & returns
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white hover:underline">
                Wishlist
              </Link>
            </li>
          </ul>

          <p className="mb-2 mt-8 text-sm font-semibold uppercase tracking-wider text-white">Contact</p>
          <ul className="space-y-1 text-sm">
            {contact.phone && <li>{contact.phone}</li>}
            {contact.email && <li>{contact.email}</li>}
            {contact.address && <li>{contact.address}</li>}
            {contact.hours && <li>{contact.hours}</li>}
            {!contact.phone && !contact.email && !contact.address && !contact.hours && (
              <li className="text-white/50">Contact details coming soon.</li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Newsletter</p>
          <p className="mb-4 text-sm">Get new arrivals and styling ideas.</p>
          <NewsletterForm dark />
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}