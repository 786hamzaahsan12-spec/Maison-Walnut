"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useShop } from "@/store/useShop";
import { useHydrated } from "@/lib/hooks";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/collections?room=living", label: "Living Room" },
  { href: "/collections?room=bedroom", label: "Bedroom" },
  { href: "/collections?room=dining", label: "Dining" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useShop((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useShop((s) => s.wishlist.length);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const setSearchOpen = useShop((s) => s.setSearchOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        transparent
          ? "bg-transparent text-white"
          : "bg-[#faf6ef]/95 text-[#2a2623] shadow-[0_1px_0_rgba(90,61,43,.12)] backdrop-blur"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-3">
        <button
          type="button"
          className="icon-btn xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" onClick={() => setOpen(false)} className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm tracking-wide opacity-90 transition-opacity hover:opacity-100 hover:underline hover:underline-offset-8">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <button type="button" className="icon-btn" aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="icon-btn" aria-label={`Wishlist${hydrated ? `, ${wishCount} items` : ""}`}>
            <Heart className="h-5 w-5" />
            {hydrated && wishCount > 0 && <Badge n={wishCount} />}
          </Link>
          <button type="button" className="icon-btn" aria-label={`Open cart${hydrated ? `, ${cartCount} items` : ""}`} onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {hydrated && cartCount > 0 && <Badge n={cartCount} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-[#faf6ef] px-6 py-8 text-[#2a2623] xl:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="font-display block border-b border-[#e6dac6] py-4 text-3xl">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b08d57] px-1 text-[10px] font-semibold text-white">
      {n}
    </span>
  );
}