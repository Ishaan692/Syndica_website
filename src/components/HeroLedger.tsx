"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fragments, type FragmentRow } from "@/content/fragments";

// Seeded deterministic initial positions (prevents hydration mismatch)
const SEEDED_SCATTER = [
  { x: 120, y: -240, r: 12, s: 15, o: 0.45 },
  { x: -180, y: -190, r: -8, s: 13, o: 0.5 },
  { x: 260, y: -110, r: 14, s: 16, o: 0.38 },
  { x: -220, y: -50, r: -11, s: 12, o: 0.55 },
  { x: 190, y: 30, r: 9, s: 17, o: 0.42 },
  { x: -140, y: 90, r: -14, s: 14, o: 0.48 },
  { x: 210, y: 160, r: 7, s: 15, o: 0.52 },
  { x: -260, y: 220, r: -9, s: 13, o: 0.4 },
  { x: 150, y: 280, r: 11, s: 16, o: 0.46 },
  { x: -190, y: 340, r: -13, s: 12, o: 0.58 },
  { x: 240, y: -280, r: 6, s: 14, o: 0.36 },
  { x: -120, y: -140, r: -7, s: 17, o: 0.5 },
  { x: 180, y: 120, r: 13, s: 11, o: 0.44 },
  { x: -210, y: 40, r: -10, s: 15, o: 0.52 },
];

export default function HeroLedger() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!shouldReduceMotion) {
      // At ~2000ms the first row's index and bottom rule turn vermilion for 600ms
      const timer = setTimeout(() => {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 600);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  const displayFragments = fragments.slice(0, 14);

  return (
    <div className="w-full relative">
      <div className="flex flex-col">
        {displayFragments.map((frag, idx) => {
          const scatter = SEEDED_SCATTER[idx % SEEDED_SCATTER.length];
          const isFirstRow = idx === 0;

          // Mobile hide rows 9-14
          const isMobileHidden = idx >= 8 ? "hidden md:flex" : "flex";

          return (
            <div
              key={frag.index}
              className={`h-[44px] items-center relative border-b transition-colors duration-300 ${
                isFirstRow && isLocked
                  ? "border-[#FF4F2B]"
                  : "border-[rgba(236,232,223,0.14)]"
              } ${isMobileHidden}`}
            >
              {/* Row index 01-14 */}
              <div className="w-10 flex-shrink-0 flex items-center gap-2">
                <span
                  className={`font-mono text-[11px] transition-colors duration-300 ${
                    isFirstRow && isLocked
                      ? "text-[#FF4F2B] font-bold"
                      : "text-[rgba(236,232,223,0.44)]"
                  }`}
                >
                  {frag.index}
                </span>
                {isFirstRow && (
                  <span
                    className={`w-[5px] h-[5px] transition-colors duration-300 ${
                      isLocked ? "bg-[#FF4F2B]" : "bg-[#ECE8DF]"
                    }`}
                  />
                )}
              </div>

              {/* Fragment text flying onto the grid */}
              <div className="flex-1 overflow-hidden relative h-full flex items-center">
                {shouldReduceMotion || !mounted ? (
                  <span className="font-mono text-[13px] text-[rgba(236,232,223,0.68)] truncate select-none">
                    {frag.text}
                  </span>
                ) : (
                  <motion.span
                    initial={{
                      x: scatter.x,
                      y: scatter.y,
                      rotate: scatter.r,
                      opacity: scatter.o,
                      fontSize: `${scatter.s}px`,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 0.68,
                      fontSize: "13px",
                    }}
                    transition={{
                      delay: 0.5 + idx * 0.045, // 500ms start, 45ms stagger
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1], // ease-out
                    }}
                    className="font-mono text-[13px] text-[rgba(236,232,223,0.68)] truncate select-none block"
                  >
                    {frag.text}
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lock rule beneath the ledger */}
      <div
        className={`w-full h-[1px] mt-2 transition-colors duration-300 ${
          isLocked ? "bg-[#FF4F2B]" : "bg-[rgba(236,232,223,0.06)]"
        }`}
      />
    </div>
  );
}
