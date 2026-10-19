
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { img } from "@/data/products";
import { EASE } from "@/lib/motion";
import SmartImage from "./SmartImage";

const INTERVAL_MS = 2000;

const slides = [
  {
    image: img("1600210492486-724fe5c67fb0", 2000),
    label: "Luxury Living",
    title: "Make Room for Beautiful Living",
    text: "Discover statement sofas and elegant furniture designed to make every moment special.",
    primary: {
      label: "Explore Collection",
      href: "/collections",
    },
    secondary: {
      label: "Shop Bestsellers",
      href: "/collections?tag=bestseller",
    },
  },
  {
    image: img("1600607687939-ce8a6c25118c", 2000),
    label: "Modern Elegance",
    title: "Designed for the Way You Live",
    text: "Beautiful textures, timeless silhouettes and exceptional comfort for your home.",
    primary: {
      label: "Shop Bestsellers",
      href: "/collections?tag=bestseller",
    },
    secondary: {
      label: "Explore Collection",
      href: "/collections",
    },
  },
  {
    image: img("1616486338812-3dadae4b4ace", 2000),
    label: "Bedroom Collection",
    title: "Your Sanctuary of Comfort",
    text: "Create a peaceful retreat with beautifully crafted beds and refined bedroom furniture.",
    primary: {
      label: "Shop Bedroom",
      href: "/collections?room=bedroom",
    },
    secondary: {
      label: "Discover Our Story",
      href: "/about",
    },
  },
  {
    image: img("1600607687920-4e2a09cf159d", 2000),
    label: "Timeless Craftsmanship",
    title: "Elevate Every Corner of Your Home",
    text: "Thoughtfully selected furniture that brings luxury, warmth and personality to every space.",
    primary: {
      label: "Explore Collection",
      href: "/collections",
    },
    secondary: {
      label: "Discover Our Story",
      href: "/about",
    },
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const title = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
};

const word = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(3px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: EASE,
    },
  },
};

export default function HeroSlider() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const n = slides.length;
  const s = slides[i];
  const titleWords = s.title.split(" ");

  useEffect(() => {
    setLoaded(true);

    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setI((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const goTo = (index: number) => {
    setI((index + n) % n);
  };

  const motionDuration = reduceMotion ? 0 : undefined;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured furniture"
      className="relative h-svh min-h-[600px] w-full overflow-hidden bg-[#24201c] text-white"
    >
      {/* Background images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={s.image}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.035,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            opacity: {
              duration: reduceMotion ? 0 : 0.7,
              ease: "easeInOut",
            },
            scale: {
              duration: reduceMotion ? 0 : 3,
              ease: "easeOut",
            },
          }}
        >
          <SmartImage
            src={s.image}
            alt={`${s.label} — ${s.title}`}
            sizes="100vw"
            preload={i === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Premium image overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/5" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

      {/* Hero content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-center pb-28 pt-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            variants={container}
            initial="hidden"
            animate="show"
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -10 }
            }
            transition={{
              duration: motionDuration,
            }}
            className="max-w-3xl"
            aria-live="polite"
          >
            <motion.p
              variants={item}
              className="eyebrow text-[#e8c991]!"
            >
              <span className="mr-3 inline-block h-px w-8 bg-[#e8c991] align-middle" />
              {s.label}
            </motion.p>

            <motion.h1
              variants={title}
              aria-label={s.title}
              className="font-display mt-5 max-w-3xl text-5xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {titleWords.map((part, index) => (
                <span key={`${i}-${index}`} className="inline-block">
                  <motion.span
                    aria-hidden="true"
                    variants={word}
                    className="inline-block"
                  >
                    {part}
                  </motion.span>
                  {index < titleWords.length - 1 ? " " : null}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
            >
              {s.text}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href={s.primary.href}
                className="btn btn-gold transition-transform duration-300 hover:-translate-y-0.5"
              >
                {s.primary.label}
              </Link>

              <Link
                href={s.secondary.href}
                className="btn btn-ghost-light transition-colors duration-300"
              >
                {s.secondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators and navigation — no pause button */}
      <div className="absolute inset-x-0 bottom-6 z-20">
        <div className="container-x flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2"
            aria-label="Choose a featured slide"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                aria-current={index === i ? "true" : undefined}
                onClick={() => goTo(index)}
                className="group flex h-8 w-10 items-center sm:w-12"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/40">
                  {index === i && (
                    <motion.span
                      key={i}
                      className="absolute inset-0 origin-left rounded-full bg-[#e8c991]"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : INTERVAL_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="icon-btn border border-white/40 transition-colors hover:bg-white/20!"
              aria-label="Previous slide"
              onClick={() => goTo(i - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="icon-btn border border-white/40 transition-colors hover:bg-white/20!"
              aria-label="Next slide"
              onClick={() => goTo(i + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
