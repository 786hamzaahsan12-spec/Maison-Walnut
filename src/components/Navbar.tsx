
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

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
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const cartCount = useShop((s) =>
    s.items.reduce((n, item) => n + item.qty, 0)
  );
  const wishCount = useShop((s) => s.wishlist.length);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const setSearchOpen = useShop((s) => s.setSearchOpen);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close the mobile menu when navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent =
    pathname === "/" && !scrolled && !open;

  const closeMenu = () => setOpen(false);

  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: "easeOut" as const };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-300 ${
        transparent
          ? "bg-transparent text-white"
          : "bg-[#faf6ef]/95 text-[#2a2623] shadow-[0_1px_0_rgba(90,61,43,.12)] backdrop-blur-xl"
      }`}
    >
      <div className="container-x mx-auto flex h-[68px] items-center justify-between gap-2 sm:h-[76px] sm:gap-4 lg:h-20">
        {/* Mobile menu button */}
        <button
          type="button"
          className="icon-btn shrink-0 xl:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{
                opacity: 0,
                rotate: reduceMotion ? 0 : -30,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                rotate: reduceMotion ? 0 : 30,
              }}
              transition={motionTransition}
              className="flex items-center justify-center"
            >
              {open ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display min-w-0 shrink text-xl font-semibold tracking-wide sm:text-2xl lg:text-3xl"
          aria-label={`${siteConfig.name} homepage`}
        >
          <span className="block max-w-[145px] truncate sm:max-w-none">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 items-center justify-center gap-4 2xl:gap-7 xl:flex"
        >
          {links.map((link) => {
            const active = pathname === link.href.split("?")[0];

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-2 text-[13px] tracking-wide transition-opacity hover:opacity-70 2xl:text-sm ${
                  active ? "font-semibold" : "opacity-90"
                }`}
              >
                {link.label}

                {active && (
                  <motion.span
                    layoutId="navbar-active-link"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-current"
                    transition={motionTransition}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action icons */}
        <div className="flex shrink-0 items-center justify-end gap-0 sm:gap-1">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search products"
            onClick={() => {
              closeMenu();
              setSearchOpen(true);
            }}
          >
            <Search className="h-[19px] w-[19px] sm:h-5 sm:w-5" />
          </button>

          <Link
            href="/wishlist"
            className="icon-btn"
            aria-label={`Wishlist${
              hydrated ? `, ${wishCount} items` : ""
            }`}
          >
            <Heart className="h-[19px] w-[19px] sm:h-5 sm:w-5" />

            {hydrated && wishCount > 0 && (
              <Badge n={wishCount} />
            )}
          </Link>

          <button
            type="button"
            className="icon-btn"
            aria-label={`Open cart${
              hydrated ? `, ${cartCount} items` : ""
            }`}
            onClick={() => {
              closeMenu();
              setCartOpen(true);
            }}
          >
            <ShoppingBag className="h-[19px] w-[19px] sm:h-5 sm:w-5" />

            {hydrated && cartCount > 0 && (
              <Badge n={cartCount} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile and tablet navigation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            key="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -8,
            }}
            transition={motionTransition}
            className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto overscroll-contain border-t border-[#e6dac6] bg-[#faf6ef] text-[#2a2623] sm:top-[76px] xl:hidden"
          >
            <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-5 sm:px-8 sm:pt-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9b8056] sm:text-xs">
                Explore our collection
              </p>

              <ul className="flex flex-col">
                {links.map((link, index) => {
                  const active =
                    pathname === link.href.split("?")[0];

                  return (
                    <motion.li
                      key={link.label}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion ? 0 : index * 0.035,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`font-display flex min-h-[58px] items-center justify-between gap-4 border-b border-[#e6dac6] py-4 text-2xl transition-colors hover:text-[#9b8056] sm:min-h-[66px] sm:text-3xl ${
                          active ? "text-[#9b8056]" : ""
                        }`}
                      >
                        <span>{link.label}</span>

                        <ChevronIcon />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6d6256]">
                <Link
                  href="/wishlist"
                  onClick={closeMenu}
                  className="rounded-full border border-[#e6dac6] px-4 py-2.5 transition-colors hover:bg-[#eee5d8]"
                >
                  Wishlist {hydrated ? `(${wishCount})` : ""}
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    setSearchOpen(true);
                  }}
                  className="rounded-full border border-[#e6dac6] px-4 py-2.5 transition-colors hover:bg-[#eee5d8]"
                >
                  Search products
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ChevronIcon() {
  return (
    <span aria-hidden="true" className="text-[#a18a6b]">
      <ChevronRightIcon />
    </span>
  );
}

function ChevronRightIcon() {
  return <span className="text-xl">›</span>;
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b08d57] px-1 text-[10px] font-semibold leading-none text-white">
      {n > 99 ? "99+" : n}
    </span>
  );
}
