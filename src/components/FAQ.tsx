"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/config";
import Reveal from "./Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-[#f3ece0]" aria-labelledby="faq-title">
      <div className="container-x max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Your questions, answered
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#d9ccb4] rounded-3xl bg-white px-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-[#b08d57]">
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 leading-relaxed text-[#2a2623]/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}