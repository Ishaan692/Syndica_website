"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProductFrame from "@/components/ProductFrame";
import ScreenSkeleton from "@/components/ScreenSkeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

interface DealFlowProps {
  variant?: "home" | "page";
}

const STAGES = [
  {
    num: "01",
    node: "RFQ",
    title: "Start with the request.",
    body: "The client, the risk and the insurers to approach, recorded once. BrokerOS suggests insurers from the product appetite and relationship notes you keep.",
    fragments: [
      "need quote for warehouse cover, urgent",
      "Fwd: client details.pdf",
      "which insurers did we send this to?",
    ],
    path: "BrokerOS / RFQs",
    skeletonVariant: "rfq" as const,
    hue: 210,
  },
  {
    num: "02",
    node: "QCR",
    title: "Put the quotes side by side.",
    body: "Every carrier's quote lands in one comparison, with the same fields in one table.",
    fragments: [
      "Quote_A.pdf",
      "Quote_B_final_v2.pdf",
      "sir, revised quote attached",
    ],
    path: "BrokerOS / QCR",
    skeletonVariant: "qcr" as const,
    hue: 170,
  },
  {
    num: "03",
    node: "POLICY",
    title: "The winning quote becomes the policy.",
    body: "The policy keeps its link to the request and the quote it came from. The paperwork is generated in the formats brokers actually send.",
    fragments: ["policy copy pls", "slip signed??", "scan_0042.pdf"],
    path: "BrokerOS / Policies",
    skeletonVariant: "policy" as const,
    hue: 35,
  },
  {
    num: "04",
    node: "COMMISSION",
    title: "Commission follows the policy.",
    body: "Commission is tracked against the policy that earned it, separate from premium.",
    fragments: [
      "commission due from last quarter?",
      "Sheet3 / Sheet4",
      "who paid what",
    ],
    path: "BrokerOS / Commissions",
    skeletonVariant: "commission" as const,
    hue: 320,
  },
];

export default function DealFlow({ variant = "home" }: DealFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const railProgressRef = useRef<HTMLDivElement>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const stageTitleRef = useRef<HTMLHeadingElement>(null);
  const stageBodyRef = useRef<HTMLParagraphElement>(null);
  const stageCounterRef = useRef<HTMLDivElement>(null);
  const fragmentsWrapperRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline: +=480%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=480%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => tweenArtStage("03"),
          onEnterBack: () => tweenArtStage("03"),
        },
      });

      // Rail progress bar (0% to 100%)
      tl.fromTo(
        railProgressRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, ease: "none", duration: 1 },
        0
      );

      // 4 Stages across 4 quarters (0 to 0.25, 0.25 to 0.50, 0.50 to 0.75, 0.75 to 1.0)
      STAGES.forEach((stage, sIdx) => {
        const start = sIdx * 0.25;

        // Stage enter
        tl.to(
          {},
          {
            duration: 0.05,
            onStart: () => {
              setActiveStageIdx(sIdx);
              // Shift ArtStage hue gently
              const stageEl = document.getElementById("art-stage");
              if (stageEl) {
                stageEl.style.setProperty("--ahue", `${stage.hue}deg`);
              }
            },
            onReverseComplete: () => {
              const prevIdx = Math.max(0, sIdx - 1);
              setActiveStageIdx(prevIdx);
              const stageEl = document.getElementById("art-stage");
              if (stageEl) {
                stageEl.style.setProperty("--ahue", `${STAGES[prevIdx].hue}deg`);
              }
            },
          },
          start
        );

        // Frame transition: clip wipe top to bottom & counter-zoom 1.15 to 1
        const currentFrame = framesRef.current[sIdx];
        if (currentFrame) {
          tl.fromTo(
            currentFrame,
            { clipPath: "inset(100% 0 0 0)", opacity: 1, scale: 1.12 },
            {
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
              duration: 0.1,
              ease: "power3.inOut",
            },
            start
          );

          if (sIdx > 0) {
            const prevFrame = framesRef.current[sIdx - 1];
            if (prevFrame) {
              tl.to(prevFrame, { y: -24, opacity: 0, duration: 0.08, ease: "power2.in" }, start);
            }
          }
        }
      });

      // Progress 0.92 - 1.00: reveal CTA buttons on home variant
      if (variant === "home" && ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.92
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [variant]);

  const currentStage = STAGES[activeStageIdx];

  return (
    <section
      ref={containerRef}
      id="deal-flow"
      data-folio="03"
      data-name="ONE DEAL"
      className="relative w-full min-h-[100svh] py-20 select-none bg-[#0A0A0B] overflow-hidden"
    >
      {/* ─── DESKTOP PINNED STAGE (480% scrub) ─── */}
      <div className="hidden lg:flex flex-col justify-between h-[100svh] container-grid w-full">
        {/* Top Rail: RFQ, QCR, POLICY, COMMISSION */}
        <div className="w-full pt-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] text-[#ECE8DF]">03</span>
            <span className="folio-label">ONE DEAL, FOLLOWED</span>
          </div>

          <div className="relative flex items-center justify-between max-w-2xl">
            {/* Background hairline rule */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[rgba(236,232,223,0.14)] -translate-y-1/2 z-0" />
            {/* Active progress hairline */}
            <div
              ref={railProgressRef}
              className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#ECE8DF] -translate-y-1/2 z-0"
            />

            {STAGES.map((s, idx) => {
              const isActive = activeStageIdx === idx;
              const isPast = activeStageIdx >= idx;

              return (
                <div
                  key={s.node}
                  className="relative z-10 flex items-center gap-2 bg-[#0A0A0B] px-3 py-1 border border-[rgba(236,232,223,0.14)]"
                >
                  <span
                    className={`w-[7px] h-[7px] flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-[#FF4F2B]"
                        : isPast
                        ? "bg-[#ECE8DF]"
                        : "border border-[rgba(236,232,223,0.3)] bg-transparent"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-[#ECE8DF] font-semibold"
                        : isPast
                        ? "text-[#ECE8DF]"
                        : "text-[rgba(236,232,223,0.44)]"
                    }`}
                  >
                    {s.node}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Stage: Left copy & fragments / Right product frame */}
        <div className="grid grid-cols-12 gap-12 items-center my-auto w-full">
          {/* Left: Columns 1-5 */}
          <div className="col-span-5 flex flex-col justify-center min-h-[340px]">
            <div ref={stageCounterRef} className="font-mono text-xs text-[rgba(236,232,223,0.44)] mb-4">
              {currentStage.num} / 04 · {currentStage.node}
            </div>

            <h3 ref={stageTitleRef} className="heading-sub mb-4 text-[#ECE8DF]" data-reading>
              {currentStage.title}
            </h3>

            <p ref={stageBodyRef} className="body-l text-[rgba(236,232,223,0.78)] mb-8" data-reading>
              {currentStage.body}
            </p>

            {/* 3 Fragment lines with strike-through animation */}
            <div ref={fragmentsWrapperRef} className="space-y-3 pt-2 border-t border-[rgba(236,232,223,0.08)]">
              {currentStage.fragments.map((frag, idx) => (
                <div key={idx} className="relative inline-block text-xs font-mono text-[rgba(236,232,223,0.44)]">
                  <span>{frag}</span>
                  {/* 1px horizontal strike line */}
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#FF4F2B] opacity-80" />
                </div>
              ))}
            </div>

            {/* Progress 0.92-1.00 CTA Buttons */}
            {variant === "home" && (
              <div ref={ctaButtonsRef} className="mt-8 flex items-center gap-6 opacity-0">
                <Button href="/products/brokeros" variant="primary">
                  Open the BrokerOS page
                </Button>
                <Link
                  href="/contact?interest=brokeros"
                  className="font-mono text-xs uppercase tracking-wider text-[rgba(236,232,223,0.68)] hover:text-[#FF4F2B] underline"
                >
                  Or request a pilot &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Right: Columns 6-12 (Product Frame) */}
          <div className="col-span-7 relative h-[62vh] max-h-[560px] flex items-center">
            {STAGES.map((s, idx) => (
              <div
                key={s.node}
                ref={(el) => {
                  framesRef.current[idx] = el;
                }}
                className={`absolute inset-0 flex flex-col justify-center ${
                  idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <ProductFrame path={s.path} tag="ILLUSTRATION">
                  <ScreenSkeleton variant={s.skeletonVariant} />
                </ProductFrame>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Tag */}
        <div className="w-full pb-6 text-xs font-mono text-[rgba(236,232,223,0.35)]">
          ILLUSTRATIVE DEAL. SAMPLE DATA.
        </div>
      </div>

      {/* ─── MOBILE STACKED STEPS (under 1024px) ─── */}
      <div className="block lg:hidden container-grid py-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">03</span>
          <span className="folio-label">ONE DEAL, FOLLOWED</span>
        </div>

        <div className="flex flex-col gap-16 mt-8">
          {STAGES.map((s) => (
            <div key={s.num} className="flex flex-col gap-6 pb-12 border-b border-[rgba(236,232,223,0.14)]">
              <div className="font-mono text-xs text-[#FF4F2B]">
                {s.num} / 04 · {s.node}
              </div>
              <h3 className="heading-sub text-[#ECE8DF]">{s.title}</h3>
              <p className="body-default">{s.body}</p>

              <div className="space-y-2 py-2">
                {s.fragments.map((frag, idx) => (
                  <div key={idx} className="relative inline-block text-xs font-mono text-[rgba(236,232,223,0.44)] mr-3">
                    <span>{frag}</span>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#FF4F2B] opacity-70" />
                  </div>
                ))}
              </div>

              <ProductFrame path={s.path} tag="ILLUSTRATION">
                <ScreenSkeleton variant={s.skeletonVariant} />
              </ProductFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
