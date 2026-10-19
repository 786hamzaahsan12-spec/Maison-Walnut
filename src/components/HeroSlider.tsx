"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { img } from "@/data/products";
import { EASE } from "@/lib/motion";
import { useHydrated } from "@/lib/hooks";
import SmartImage from "./SmartImage";

const INTERVAL_MS = 6500;

const slides = [
  {
    image: img("1618220179428-22790b461013", 2000),
    label: "Living Room",
    title: "Make Room for Beautiful Living",
    text: "Sofas and sectionals designed to hold every conversation.",
    primary: { label: "Explore Collection", href: "/collections" },
    secondary: { label: "Shop Bestsellers", href: "/collections?tag=bestseller" },
  },
  {
    image: img("1586023492125-27b2c045efd7", 2000),
    label: "Everyday Comfort",
    title: "Designed for the Way You Live",
    text: "Considered proportions and soft textures for real homes.",
    primary: { label: "Shop Bestsellers", href: "/collections?tag=bestseller" },
    secondary: { label: "Explore Collection", href: "/collections" },
  },
  {
    image: img("1616594039964-ae9021a400a0", 2000),
    label: "Bedroom",
    title: "Timeless Furniture. Exceptional Comfort.",
    text: "Beds and storage crafted for calm, restful evenings.",
    primary: { label: "Explore Collection", href: "/collections?room=bedroom" },
    secondary: { label: "Discover Our Story", href: "/about" },
  },
  {
    image: img("1519710164239-da123dc03ef4", 2000),
    label: "Maison Walnut",
    title: "Your Dream Home Starts Here.",
    text: "A showroom of premium pieces, delivered to your door.",
    primary: { label: "Explore Collection", href: "/collections" },
    secondary: { label: "Discover Our Story", href: "/about" },
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } } };
const title = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE, delayChildren: 0.04, staggerChildren: 0.025 } },
};
const word = {
  hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.34, ease: EASE } },
};

export default function HeroSlider() {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const reduced = hydrated && !!reduce;
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hover || userPaused || reduced;
  const n = slides.length;
  const titleWords = slides[i].title.split(" ");

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  const s = slides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured furniture"
      className="relative h-svh min-h-155 w-full overflow-hidden bg-[#2a2623] text-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.65 }, scale: { duration: 1.8, ease: EASE } }}
        >
          <SmartImage src={s.image} alt={`${s.label}: ${s.title}`} sizes="100vw" preload={i === 0} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />

      <div className="container-x relative z-10 flex h-full flex-col justify-center pb-24 pt-24">
        <motion.div
          key={i}
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
          aria-live={paused ? "polite" : "off"}
        >
            <motion.p variants={item} className="eyebrow text-[#e3c892]!">
              {s.label}
            </motion.p>
            <motion.h1 variants={title} aria-label={s.title} className="font-display mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
              {titleWords.map((part, index) => (
                <span key={`${part}-${index}`}>
                  <motion.span aria-hidden="true" variants={word} className="inline-block">
                    {part}
                  </motion.span>
                  {index < titleWords.length - 1 ? " " : null}
                </span>
              ))}
            </motion.h1>
            <motion.p variants={item} className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
              {s.text}
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Link href={s.primary.href} className="btn btn-gold">
                {s.primary.label}
              </Link>
              <Link href={s.secondary.href} className="btn btn-ghost-light">
                {s.secondary.label}
              </Link>
            </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-x flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((sl, idx) => (
              <button
                key={sl.title}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className="group flex h-8 w-12 items-center"
              >
                <span className="relative block h-0.75 w-full overflow-hidden rounded-full bg-white/35">
                  {idx === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="absolute inset-0 origin-left rounded-full bg-white"
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0 : INTERVAL_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="icon-btn border border-white/40 hover:bg-white/20!" aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((v) => !v)}>
              {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button type="button" className="icon-btn border border-white/40 hover:bg-white/20!" aria-label="Previous slide" onClick={() => setI((v) => (v - 1 + n) % n)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" className="icon-btn border border-white/40 hover:bg-white/20!" aria-label="Next slide" onClick={() => setI((v) => (v + 1) % n)}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}