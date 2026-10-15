"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Lazy-mount WebGL canvas
const ColorBends = dynamic(() => import("./ColorBends"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0A0A0B]" />,
});

// Liquid Chrome Palette with Chromatic Fringes
const SILK_COLORS = ["#2b8284", "#e87a66", "#e6dfd5"];

export interface TrackState {
  ax: string; // focus x (vw)
  ay: string; // focus y (vh)
  as: number; // scale
  ar: number; // rotation (deg)
  ai: number; // intensity (0-1)
  aspec: number; // light bands opacity (0-1)
  ahue: number; // hue-rotate (deg)
}

export const TRACKS: Record<string, TrackState> = {
  "01a": { ax: "50vw", ay: "34vh", as: 1.0, ar: 0, ai: 0.9, aspec: 0.55, ahue: 0 },
  "01b": { ax: "74vw", ay: "46vh", as: 1.3, ar: -8, ai: 0.75, aspec: 0.45, ahue: 0 },
  "02": { ax: "88vw", ay: "86vh", as: 0.9, ar: 12, ai: 0.28, aspec: 0.1, ahue: 0 },
  "03": { ax: "92vw", ay: "50vh", as: 1.0, ar: 0, ai: 0.4, aspec: 0.35, ahue: 210 },
  "04": { ax: "68vw", ay: "52vh", as: 1.15, ar: 6, ai: 0.5, aspec: 0.3, ahue: 0 },
  "05": { ax: "12vw", ay: "100vh", as: 0.8, ar: 0, ai: 0.2, aspec: 0.15, ahue: 0 },
  "06": { ax: "82vw", ay: "40vh", as: 1.1, ar: 0, ai: 0.5, aspec: 0.3, ahue: 0 },
  "07": { ax: "85vw", ay: "25vh", as: 0.9, ar: 0, ai: 0.35, aspec: 0.2, ahue: 0 },
  "08": { ax: "50vw", ay: "120vh", as: 1.0, ar: 0, ai: 0.0, aspec: 0.8, ahue: 0 },
  products: { ax: "12vw", ay: "100vh", as: 0.8, ar: 0, ai: 0.3, aspec: 0.25, ahue: 0 },
  brokeros: { ax: "78vw", ay: "45vh", as: 1.2, ar: -4, ai: 0.8, aspec: 0.5, ahue: 210 },
  platform: { ax: "68vw", ay: "52vh", as: 1.15, ar: 6, ai: 0.5, aspec: 0.3, ahue: 0 },
  vision: { ax: "85vw", ay: "25vh", as: 0.9, ar: 0, ai: 0.35, aspec: 0.2, ahue: 0 },
  about: { ax: "72vw", ay: "32vh", as: 1.05, ar: -4, ai: 0.45, aspec: 0.3, ahue: 0 },
  contact: { ax: "80vw", ay: "20vh", as: 0.8, ar: 0, ai: 0.3, aspec: 0.2, ahue: 0 },
  "404": { ax: "50vw", ay: "50vh", as: 1.0, ar: 0, ai: 0.3, aspec: 0.2, ahue: 0 },
};

export default function ArtStage({ defaultTrack = "01a" }: { defaultTrack?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Initialize CSS variables on stage element
  useEffect(() => {
    if (!stageRef.current) return;
    const initial = TRACKS[defaultTrack] || TRACKS["01a"];
    const el = stageRef.current;
    el.style.setProperty("--ax", initial.ax);
    el.style.setProperty("--ay", initial.ay);
    el.style.setProperty("--as", String(initial.as));
    el.style.setProperty("--ar", `${initial.ar}deg`);
    el.style.setProperty("--ai", String(initial.ai));
    el.style.setProperty("--aspec", String(initial.aspec));
    el.style.setProperty("--ahue", `${initial.ahue}deg`);
  }, [defaultTrack]);

  return (
    <>
      <style>{`
        @keyframes driftBand1 {
          0% { transform: translate3d(-10%, -5%, 0) rotate(-15deg); }
          50% { transform: translate3d(8%, 10%, 0) rotate(-8deg); }
          100% { transform: translate3d(-10%, -5%, 0) rotate(-15deg); }
        }
        @keyframes driftBand2 {
          0% { transform: translate3d(5%, 12%, 0) rotate(25deg); }
          50% { transform: translate3d(-8%, -10%, 0) rotate(15deg); }
          100% { transform: translate3d(5%, 12%, 0) rotate(25deg); }
        }
        @keyframes driftBand3 {
          0% { transform: translate3d(0, 0, 0) rotate(-5deg); }
          50% { transform: translate3d(12%, 8%, 0) rotate(5deg); }
          100% { transform: translate3d(0, 0, 0) rotate(-5deg); }
        }
      `}</style>

      <div
        id="art-stage"
        ref={stageRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none z-[-1] overflow-hidden bg-[#0A0A0B]"
        style={{
          /* Radial gradient focus mask: everything outside fades to pure ink */
          maskImage:
            "radial-gradient(ellipse 46vmax 38vmax at var(--ax, 50vw) var(--ay, 34vh), #000 0%, #000 22%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 46vmax 38vmax at var(--ax, 50vw) var(--ay, 34vh), #000 0%, #000 22%, transparent 72%)",
        }}
      >
        {/* Inner container transformed by scale and rotation */}
        <div
          className="relative w-full h-full origin-center transition-transform duration-700 ease-out"
          style={{
            transform: "scale(var(--as, 1)) rotate(var(--ar, 0deg))",
            opacity: "var(--ai, 0.9)",
          }}
        >
          {/* LAYER 1: SILK WebGL Shader (The ONLY WebGL context) */}
          {!shouldReduceMotion ? (
            <div className="absolute inset-0">
              <ColorBends
                colors={SILK_COLORS}
                speed={0.05}
                scale={1.25}
                frequency={1.05}
                warpStrength={0.8}
                noise={0.04}
                intensity={1.0}
                bandWidth={5.5}
                iterations={4}
                autoRotate={-0.8}
                transparent={true}
              />
            </div>
          ) : (
            /* Reduced motion static poster */
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: "linear-gradient(135deg, #111113 0%, #2b8284 30%, #e87a66 60%, #e6dfd5 100%)",
              }}
            />
          )}

          {/* LAYER 2: LIGHT BANDS (2-3 elongated spectrum bands in CSS) */}
          <div
            className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none"
            style={{
              opacity: "var(--aspec, 0.55)",
              filter: "hue-rotate(var(--ahue, 0deg))",
            }}
          >
            {/* Band 1 */}
            <div
              className="absolute w-[140vw] h-[220px] blur-[60px] saturate-[1.3] opacity-60"
              style={{
                top: "15%",
                left: "-20vw",
                background: "linear-gradient(90deg, #FF3D2E, #FF9A1F, #F5F03A, transparent)",
                animation: shouldReduceMotion ? "none" : "driftBand1 40s ease-in-out infinite",
              }}
            />
            {/* Band 2 */}
            <div
              className="absolute w-[130vw] h-[190px] blur-[60px] saturate-[1.3] opacity-60"
              style={{
                top: "45%",
                left: "-10vw",
                background: "linear-gradient(90deg, transparent, #38E08C, #2FB5FF, #6B4DFF, transparent)",
                animation: shouldReduceMotion ? "none" : "driftBand2 36s ease-in-out infinite",
              }}
            />
            {/* Band 3 */}
            <div
              className="absolute w-[150vw] h-[240px] blur-[60px] saturate-[1.3] opacity-55"
              style={{
                top: "70%",
                left: "-25vw",
                background: "linear-gradient(90deg, transparent, #2FB5FF, #6B4DFF, #D83DFF, #FF3D2E)",
                animation: shouldReduceMotion ? "none" : "driftBand3 44s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
