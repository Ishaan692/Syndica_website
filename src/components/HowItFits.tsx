"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import ThePlates from "./ThePlates";
import StatusMark from "./StatusMark";
import Rule from "./Rule";
import { products } from "@/content/products";

const STEPS = [
  {
    num: "01",
    name: "STRUCTURE",
    body: "Software that records work as it happens, in a form a computer can use: clients, policies, quotes, claims, documents.",
    products: ["brokeros", "clientos"],
  },
  {
    num: "02",
    name: "CONNECT",
    body: "A shared model of how an organization works: who owns what, what depends on what, and the context behind each decision. We are studying this, not selling it.",
    products: ["fabric", "vector"],
  },
  {
    num: "03",
    name: "UNDERSTAND",
    body: "Analysis and recommendations built on records that trace back to a source.",
    products: ["atlas"],
  },
];

export default function HowItFits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [gap, setGap] = useState(14);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Step calculation
      if (latest < 0.33) {
        setActiveStep(0);
        // Expand from 14 to 110px over step 0
        const calculatedGap = 14 + (latest / 0.33) * 96;
        setGap(Math.min(110, Math.max(14, calculatedGap)));
      } else if (latest < 0.67) {
        setActiveStep(1);
        setGap(110);
      } else {
        setActiveStep(2);
        setGap(110);
      }
    });
  }, [scrollYProgress]);

  const currentStepData = STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      data-folio="04"
      data-name="HOW IT FITS"
      className="relative w-full"
    >
      {/* DESKTOP SCROLLYTELLING (320vh height with sticky 100svh stage) */}
      <div className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="container-grid w-full">
            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Left: Columns 1-5 */}
              <div className="col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
                  <span className="folio-label">HOW IT FITS</span>
                </div>

                <h2 className="heading-sub mb-8">
                  Record the work. Connect it. Then understand it.
                </h2>

                <Rule className="mb-8" />

                {/* Swapping step block */}
                <div className="min-h-[220px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="font-mono text-xs uppercase tracking-widest text-[#ECE8DF] mb-3">
                        {currentStepData.num} {currentStepData.name}
                      </div>

                      <p className="body-l text-[rgba(236,232,223,0.68)] mb-8">
                        {currentStepData.body}
                      </p>

                      <div className="space-y-3 pt-2">
                        {currentStepData.products.map((slug) => {
                          const p = products.find((prod) => prod.slug === slug);
                          if (!p) return null;
                          return (
                            <div
                              key={p.slug}
                              className="flex items-center justify-between max-w-sm py-2 border-b border-[rgba(236,232,223,0.06)]"
                            >
                              <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                                {p.name}
                              </span>
                              <StatusMark status={p.status} label={p.statusLabel} />
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Columns 6-12 (The Plates) */}
              <div className="col-span-7 flex items-center justify-center pl-8">
                <ThePlates activeStep={activeStep} gap={gap} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LIST FALLBACK (under 1024px: no 3D, no sticky, vertical list divided by rules) */}
      <div className="block lg:hidden py-16">
        <div className="container-grid">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
            <span className="folio-label">HOW IT FITS</span>
          </div>

          <h2 className="heading-sub mb-10">
            Record the work. Connect it. Then understand it.
          </h2>

          <div className="flex flex-col divide-y divide-[rgba(236,232,223,0.14)]">
            {STEPS.map((step) => (
              <div key={step.num} className="py-8">
                <div className="font-mono text-xs uppercase tracking-widest text-[#ECE8DF] mb-2">
                  {step.num} {step.name}
                </div>
                <p className="body-default mb-6">{step.body}</p>
                <div className="space-y-3">
                  {step.products.map((slug) => {
                    const p = products.find((prod) => prod.slug === slug);
                    if (!p) return null;
                    return (
                      <div
                        key={p.slug}
                        className="flex items-center justify-between py-2 border-b border-[rgba(236,232,223,0.06)]"
                      >
                        <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                          {p.name}
                        </span>
                        <StatusMark status={p.status} label={p.statusLabel} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
