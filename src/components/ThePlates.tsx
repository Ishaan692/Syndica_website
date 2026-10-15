"use client";

import React from "react";
import { motion } from "framer-motion";

interface ThePlatesProps {
  activeStep: number; // 0, 1, 2
  gap?: number; // collapsed: 14, exploded: 110
  interactive?: boolean;
  onSelect?: (step: number) => void;
  compact?: boolean;
}

const LAYERS = [
  { id: 0, num: "01", name: "STRUCTURE", zIndex: 1 },
  { id: 1, num: "02", name: "CONNECT", zIndex: 2 },
  { id: 2, num: "03", name: "UNDERSTAND", zIndex: 3 },
];

export default function ThePlates({
  activeStep,
  gap = 110,
  interactive = false,
  onSelect,
  compact = false,
}: ThePlatesProps) {
  const width = compact ? 300 : 420;
  const height = compact ? 180 : 260;
  const scaleGap = compact ? gap * 0.75 : gap;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        perspective: "1600px",
        height: compact ? "360px" : "540px",
        width: "100%",
      }}
    >
      <div
        className="relative transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(62deg) rotateZ(-38deg)",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {LAYERS.map((layer) => {
          const isActive = activeStep === layer.id;
          const translateZ = layer.id * scaleGap;

          return (
            <motion.div
              key={layer.id}
              onClick={() => interactive && onSelect?.(layer.id)}
              className={`absolute inset-0 transition-colors duration-300 ${
                interactive ? "cursor-pointer" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${translateZ}px)`,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: isActive ? "#FF4F2B" : "rgba(236,232,223,0.14)",
                background:
                  "linear-gradient(135deg, rgba(236,232,223,0.07) 0%, rgba(236,232,223,0.01) 100%)",
                boxShadow: isActive
                  ? "0 12px 40px rgba(255, 79, 43, 0.12)"
                  : "0 8px 32px rgba(0,0,0,0.5)",
              }}
              whileHover={interactive ? { scale: 1.02 } : undefined}
            >
              {/* Internal hairline rule mimicking engineering drawing */}
              <div
                className="absolute inset-4 border border-[rgba(236,232,223,0.06)] pointer-events-none"
                style={{ transform: "translateZ(1px)" }}
              />

              {/* Corner tick marks */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-[rgba(236,232,223,0.35)]">
                {layer.num}
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-wider text-[rgba(236,232,223,0.35)]">
                {layer.name}
              </div>

              {/* Leader Line for the active slab */}
              {isActive && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                  style={{
                    transform: "translate3d(100%, 0, 0) rotateZ(38deg) rotateX(-62deg)",
                    transformOrigin: "left center",
                  }}
                >
                  <div className="w-16 h-[1px] bg-[#FF4F2B]" />
                  <div className="ml-3 px-2 py-1 bg-[#111113] border border-[#FF4F2B] font-mono text-[11px] text-[#FF4F2B] uppercase whitespace-nowrap">
                    {layer.num} {layer.name}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
