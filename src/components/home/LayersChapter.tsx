"use client";

import React, { useRef, useEffect, useState } from "react";
import StatusMark from "@/components/StatusMark";
import { products } from "@/content/products";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    num: "01",
    name: "STRUCTURE",
    borderStyle: "solid",
    body: "Software that records work as it happens, in a form a computer can use. Clients, policies, quotes, claims, documents.",
    products: ["brokeros", "clientos"],
  },
  {
    num: "02",
    name: "CONNECT",
    borderStyle: "dashed",
    body: "A shared model of how an organization works: who owns what, what depends on what, and the context behind each decision. We are studying this.",
    products: ["fabric", "vector"],
  },
  {
    num: "03",
    name: "UNDERSTAND",
    borderStyle: "dotted",
    body: "Analysis and recommendations built on records that trace back to a source.",
    products: ["atlas"],
  },
];

export default function LayersChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const flareRef = useRef<HTMLDivElement>(null);

  const platesGroupRef = useRef<HTMLDivElement>(null);
  const plateElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      function updatePlateGaps(currentGap: number) {
        plateElementsRef.current.forEach((el, idx) => {
          if (!el) return;
          const baseZ = idx * currentGap;
          const extraZ = activeStepRef.current === idx ? 28 : 0;
          el.style.transform = `translateZ(${baseZ + extraZ}px)`;
        });
      }

      function triggerStep(step: number) {
        activeStepRef.current = step;
        setActiveStep(step);
        updatePlateGaps(140);
        // Radial flare at active plate
        if (flareRef.current) {
          gsap.fromTo(
            flareRef.current,
            { scale: 0.4, opacity: 0.9 },
            { scale: 1.2, opacity: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      }

      // Pinned scrub timeline: +=360%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=360%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => tweenArtStage("04"),
          onEnterBack: () => tweenArtStage("04"),
        },
      });

      // Camera rotation: rotateZ -38 to -26, rotateX 62 to 56
      tl.fromTo(
        platesGroupRef.current,
        { rotateZ: -38, rotateX: 62 },
        { rotateZ: -26, rotateX: 56, ease: "none", duration: 1 },
        0
      );

      // Plate gap expansion: 12px (collapsed) to 120px over 0-0.25, then to 140px by 1.0
      const gapObj = { gap: 12 };
      tl.to(
        gapObj,
        {
          gap: 120,
          duration: 0.25,
          ease: "power2.out",
          onUpdate: () => updatePlateGaps(gapObj.gap),
        },
        0
      );
      tl.to(
        gapObj,
        {
          gap: 140,
          duration: 0.75,
          ease: "none",
          onUpdate: () => updatePlateGaps(gapObj.gap),
        },
        0.25
      );

      // Step changes: 0-0.33 (0), 0.33-0.66 (1), 0.66-1.0 (2)
      tl.to(
        {},
        {
          duration: 0.05,
          onStart: () => triggerStep(0),
          onReverseComplete: () => triggerStep(0),
        },
        0.05
      );
      tl.to(
        {},
        {
          duration: 0.05,
          onStart: () => triggerStep(1),
          onReverseComplete: () => triggerStep(0),
        },
        0.35
      );
      tl.to(
        {},
        {
          duration: 0.05,
          onStart: () => triggerStep(2),
          onReverseComplete: () => triggerStep(1),
        },
        0.68
      );
    }, containerRef);

    return () => ctx.revert();
  }, []); // Empty dependencies ensures GSAP timeline is never destroyed during scroll

  const currentLayer = LAYERS[activeStep];

  return (
    <>
      <style>{`
        @keyframes plateHighlight {
          0% { transform: translate3d(-100%, -100%, 0) rotate(45deg); }
          100% { transform: translate3d(200%, 200%, 0) rotate(45deg); }
        }
      `}</style>

      <section
        ref={containerRef}
        data-folio="04"
        data-name="THREE LAYERS"
        className="relative w-full min-h-[100svh] select-none bg-[#0A0A0B] overflow-hidden"
      >
        {/* ─── DESKTOP PINNED 3D COMPOSITION ─── */}
        <div className="hidden lg:flex items-center h-[100svh] container-grid w-full relative">
          <div className="grid grid-cols-12 gap-8 items-center w-full z-10">
            {/* Left: Columns 1-5 */}
            <div className="col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
                <span className="folio-label">THREE LAYERS</span>
              </div>

              {/* Giant Numeral (wdth 68, weight 800, 180px) */}
              <div
                className="font-display font-extrabold text-[rgba(236,232,223,0.3)] leading-none select-none -ml-2 transition-all duration-300"
                style={{
                  fontVariationSettings: '"wdth" 68',
                  fontSize: "180px",
                }}
              >
                {currentLayer.num}
              </div>

              <h2 className="heading-sub -mt-10 mb-6 text-[#ECE8DF]" data-reading>
                Record the work. Connect it. Then understand it.
              </h2>

              <p className="body-l text-[rgba(236,232,223,0.78)] mb-8 max-w-lg min-h-[4.5em]" data-reading>
                {currentLayer.body}
              </p>

              {/* Product list with StatusMarks */}
              <div className="space-y-3 pt-3 border-t border-[rgba(236,232,223,0.14)] max-w-md min-h-[90px]">
                {currentLayer.products.map((slug) => {
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

              {/* Marginalia */}
              <div className="mt-8 font-mono text-[11px] text-[rgba(236,232,223,0.44)]">
                FIG. 3 &nbsp;The three layers, exploded. Only layer 01 exists today.
              </div>
            </div>

            {/* Right: Columns 6-12 (THE PLATES filling ~60% of right stage) */}
            <div className="col-span-7 relative flex items-center justify-center min-h-[640px] overflow-hidden">
              {/* THE BEAM: 2px vertical light line through center, strictly bounded */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[520px] bg-[#ECE8DF] opacity-70 pointer-events-none z-0"
                style={{
                  boxShadow: "0 0 24px rgba(236,232,223,0.8)",
                }}
              />

              {/* Radial Flare when active plate changes */}
              <div
                ref={flareRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none mix-blend-screen opacity-0 z-40"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,79,43,0.6) 40%, transparent 70%)",
                }}
              />

              {/* 3D Group Container */}
              <div
                style={{
                  perspective: "1800px",
                  transformStyle: "preserve-3d",
                  width: "560px",
                  height: "340px",
                }}
                className="relative flex items-center justify-center"
              >
                <div
                  ref={platesGroupRef}
                  style={{
                    transformStyle: "preserve-3d",
                    width: "560px",
                    height: "340px",
                  }}
                  className="relative transition-transform duration-300"
                >
                  {LAYERS.map((layer, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <div
                        key={layer.num}
                        ref={(el) => {
                          plateElementsRef.current[idx] = el;
                        }}
                        className={`absolute inset-0 transition-all duration-500 overflow-hidden ${
                          isActive ? "brightness-100 z-30" : "brightness-[0.45] z-10"
                        }`}
                        style={{
                          transformStyle: "preserve-3d",
                          borderWidth: "1px",
                          borderStyle: layer.borderStyle,
                          borderColor: isActive ? "rgba(236,232,223,0.9)" : "rgba(236,232,223,0.28)",
                          background:
                            "linear-gradient(135deg, rgba(236,232,223,0.06) 0%, rgba(236,232,223,0.12) 100%)",
                          boxShadow: isActive
                            ? "0 24px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(236,232,223,0.08)"
                            : "0 12px 30px rgba(0,0,0,0.4)",
                        }}
                      >
                        {/* Diagonal Highlight Line */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-40"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
                            width: "200%",
                            height: "200%",
                            animation: "plateHighlight 8s linear infinite",
                          }}
                        />

                        {/* Spectrum Edge Glow on active top edge */}
                        {isActive && (
                          <div
                            className="absolute top-0 left-0 right-0 h-[2px] opacity-100"
                            style={{
                              background:
                                "linear-gradient(90deg, #FF3D2E, #FF9A1F, #F5F03A, #38E08C, #2FB5FF, #6B4DFF, #D83DFF)",
                            }}
                          />
                        )}

                        {/* Leader Line to label in right margin */}
                        {isActive && (
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                            style={{
                              transform: "translate3d(100%, 0, 0) rotateZ(38deg) rotateX(-62deg)",
                              transformOrigin: "left center",
                            }}
                          >
                            <div className="w-20 h-[1px] bg-[#ECE8DF]" />
                            <div className="ml-3 px-3 py-1 bg-[#0A0A0B] border border-[#ECE8DF] font-mono text-[13px] text-[#ECE8DF] uppercase whitespace-nowrap shadow-xl">
                              {layer.num} {layer.name}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE STACKED STEPS (under 1024px) ─── */}
        <div className="block lg:hidden container-grid py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
            <span className="folio-label">THREE LAYERS</span>
          </div>

          <h2 className="heading-sub mb-8 text-[#ECE8DF]">
            Record the work. Connect it. Then understand it.
          </h2>

          <div className="flex flex-col divide-y divide-[rgba(236,232,223,0.14)]">
            {LAYERS.map((layer) => (
              <div key={layer.num} className="py-8">
                <div className="font-mono text-xs uppercase tracking-widest text-[#FF4F2B] mb-2">
                  {layer.num} {layer.name}
                </div>
                <p className="body-default mb-6">{layer.body}</p>
                <div className="space-y-3">
                  {layer.products.map((slug) => {
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
      </section>
    </>
  );
}
