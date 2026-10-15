"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * The Beam: a 1px vertical paper-colored line (opacity 0.5)
 * that falls from the top of the interlude section to its bottom,
 * echoing the Syndica logo's vertical beam of light. It draws on scroll.
 */
export default function TheBeam({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full h-full flex justify-center">
        {/* Central 1px paper beam */}
        <motion.div
          className="w-[1px] h-full bg-[#ECE8DF] origin-top opacity-50"
          style={{
            scaleY: shouldReduceMotion ? 1 : scaleY,
          }}
        />
        {/* Subtle glow halo */}
        <motion.div
          className="absolute w-[3px] h-full bg-[#ECE8DF] origin-top opacity-20 blur-[2px]"
          style={{
            scaleY: shouldReduceMotion ? 1 : scaleY,
          }}
        />
      </div>
    </div>
  );
}
