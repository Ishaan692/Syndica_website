"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Dynamic import for ColorBends with ssr: false
const ColorBends = dynamic(() => import("./ColorBends"), {
  ssr: false,
  loading: () => <SpectralFallback />,
});

// The 7 spectrum colors from Part C1
const SPECTRUM_COLORS = [
  "#FF3D2E",
  "#FF9A1F",
  "#F5F03A",
  "#38E08C",
  "#2FB5FF",
  "#6B4DFF",
  "#D83DFF",
];

// Static CSS fallback: five rotated, blurred (40px) spectrum gradient bands with screen blending
function SpectralFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#0A0A0B] pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-70">
        {/* Band 1 */}
        <div
          className="absolute w-[120%] h-[180px] -rotate-12 blur-[40px] mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, #FF3D2E, #FF9A1F, transparent)",
            top: "15%",
          }}
        />
        {/* Band 2 */}
        <div
          className="absolute w-[110%] h-[160px] rotate-6 blur-[40px] mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent, #F5F03A, #38E08C, transparent)",
            top: "30%",
          }}
        />
        {/* Band 3 */}
        <div
          className="absolute w-[130%] h-[200px] -rotate-3 blur-[40px] mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent, #2FB5FF, #6B4DFF, transparent)",
            top: "45%",
          }}
        />
        {/* Band 4 */}
        <div
          className="absolute w-[100%] h-[150px] rotate-14 blur-[40px] mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, #6B4DFF, #D83DFF, transparent)",
            top: "60%",
          }}
        />
        {/* Band 5 */}
        <div
          className="absolute w-[115%] h-[170px] -rotate-8 blur-[40px] mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent, #FF3D2E, #FF9A1F, #F5F03A)",
            top: "75%",
          }}
        />
      </div>
    </div>
  );
}

export default function SpectralField({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // IntersectionObserver for lazy mounting
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Page visibility API: pause rendering when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const shouldRenderWebGL = !shouldReduceMotion && hasWebGL && inView && isTabVisible;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#0A0A0B] ${className}`}
    >
      {shouldRenderWebGL ? (
        <div className="absolute inset-0">
          <ColorBends
            colors={SPECTRUM_COLORS}
            speed={0.12}
            scale={1.3}
            frequency={1.1}
            warpStrength={0.85}
            noise={0.06}
            intensity={0.9}
            bandWidth={6.0}
            iterations={4}
            autoRotate={0.5}
            transparent={true}
          />
        </div>
      ) : (
        <SpectralFallback />
      )}
    </div>
  );
}
