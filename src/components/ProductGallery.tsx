"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SmartImage from "./SmartImage";

interface Props {
  images: string[];
  name: string;
  active: number;
  onChange: (i: number) => void;
}

export default function ProductGallery({ images, name, active, onChange }: Props) {
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const n = images.length;
  const next = () => onChange((active + 1) % n);
  const prev = () => onChange((active - 1 + n) % n);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") onChange((active + 1) % n);
      if (e.key === "ArrowLeft") onChange((active - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, active, n, onChange]);

  return (
    <div>
      <button
        type="button"
        aria-label="Open full-screen gallery"
        onClick={() => setLightbox(true)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-3xl bg-[#e6dac6] md:aspect-5/4"
      >
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: zoom ? "scale(1.7)" : "scale(1)", transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center" }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SmartImage src={images[active]} alt={`${name}, view ${active + 1}`} sizes="(max-width: 1024px) 100vw, 50vw" preload />
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow">
          <Expand className="h-4 w-4" />
        </span>
      </button>

      <ul className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <li key={src + i} className="shrink-0">
            <button
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              onClick={() => onChange(i)}
              className={`relative block h-20 w-24 overflow-hidden rounded-xl bg-[#e6dac6] ring-offset-2 transition ${
                i === active ? "ring-2 ring-[#5a3d2b]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <SmartImage src={src} alt="" sizes="96px" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} gallery`}
            className="fixed inset-0 z-70 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setLightbox(false)}
              className="icon-btn absolute right-4 top-4 z-10 bg-white/15 text-white hover:bg-white/30!"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="icon-btn absolute left-3 z-10 bg-white/15 text-white hover:bg-white/30!"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="relative h-[80vh] w-[84vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <SmartImage key={active} src={images[active]} alt={`${name}, view ${active + 1}`} sizes="100vw" className="object-contain!" />
            </div>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="icon-btn absolute right-3 z-10 bg-white/15 text-white hover:bg-white/30!"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <p className="absolute bottom-5 text-sm text-white/80">
              {active + 1} / {n}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}