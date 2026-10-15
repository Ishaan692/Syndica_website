"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

// 24 fragments: 14 target fragments + 10 duplicate noise fragments
const ALL_FRAGMENTS = [
  { text: "Re: Re: Fwd: Renewal due", targetRow: 0 },
  { text: "Quote_Final_v7 (2).xlsx", targetRow: 1 },
  { text: "sir, revised quote attached", targetRow: 2 },
  { text: "which insurer replied?", targetRow: 3 },
  { text: "scan_0042.pdf", targetRow: 4 },
  { text: "WhatsApp Image 2026-09-12", targetRow: 5 },
  { text: "policy copy pls", targetRow: 6 },
  { text: "Sheet3 / Sheet4 / Sheet5", targetRow: 7 },
  { text: "claim status?", targetRow: 8 },
  { text: "who has the latest?", targetRow: 9 },
  { text: "renewal date ???", targetRow: 10 },
  { text: "Fwd: Fwd: Fwd: slip", targetRow: 11 },
  { text: "call me", targetRow: 12 },
  { text: "Copy of Copy of Master.xlsx", targetRow: 13 },
  // 10 duplicates to be absorbed
  { text: "Quote_Final_v7 (1).xlsx", targetRow: -1 },
  { text: "Re: renewal", targetRow: -1 },
  { text: "pls confirm", targetRow: -1 },
  { text: "attached again", targetRow: -1 },
  { text: "see below", targetRow: -1 },
  { text: "Copy of Master.xlsx", targetRow: -1 },
  { text: "scan_0043.pdf", targetRow: -1 },
  { text: "ok noted", targetRow: -1 },
  { text: "forwarded as requested", targetRow: -1 },
  { text: "latest one?", targetRow: -1 },
];

const SEEDED_SCATTER = [
  { x: "5vw", y: "-20vh", r: 12, s: 15, o: 0.45, b: 1 },
  { x: "18vw", y: "-15vh", r: -8, s: 13, o: 0.5, b: 0 },
  { x: "10vw", y: "-8vh", r: 14, s: 16, o: 0.38, b: 2 },
  { x: "24vw", y: "-2vh", r: -11, s: 12, o: 0.55, b: 1 },
  { x: "8vw", y: "6vh", r: 9, s: 17, o: 0.42, b: 0 },
  { x: "20vw", y: "12vh", r: -14, s: 14, o: 0.48, b: 2 },
  { x: "12vw", y: "18vh", r: 7, s: 15, o: 0.52, b: 0 },
  { x: "26vw", y: "24vh", r: -9, s: 13, o: 0.4, b: 1 },
  { x: "6vw", y: "30vh", r: 11, s: 16, o: 0.46, b: 0 },
  { x: "16vw", y: "36vh", r: -13, s: 12, o: 0.58, b: 1 },
  { x: "22vw", y: "-24vh", r: 6, s: 14, o: 0.36, b: 2 },
  { x: "14vw", y: "-10vh", r: -7, s: 17, o: 0.5, b: 0 },
  { x: "4vw", y: "2vh", r: 13, s: 11, o: 0.44, b: 1 },
  { x: "28vw", y: "8vh", r: -10, s: 15, o: 0.52, b: 0 },
  { x: "9vw", y: "-18vh", r: -12, s: 13, o: 0.4, b: 2 },
  { x: "21vw", y: "-6vh", r: 10, s: 14, o: 0.45, b: 1 },
  { x: "15vw", y: "0vh", r: -5, s: 12, o: 0.5, b: 0 },
  { x: "27vw", y: "14vh", r: 8, s: 15, o: 0.42, b: 2 },
  { x: "7vw", y: "22vh", r: -11, s: 16, o: 0.38, b: 1 },
  { x: "19vw", y: "28vh", r: 13, s: 13, o: 0.48, b: 0 },
  { x: "11vw", y: "-22vh", r: -8, s: 14, o: 0.35, b: 2 },
  { x: "25vw", y: "-14vh", r: 5, s: 12, o: 0.52, b: 1 },
  { x: "13vw", y: "10vh", r: -9, s: 15, o: 0.44, b: 0 },
  { x: "23vw", y: "20vh", r: 11, s: 13, o: 0.46, b: 1 },
];

export default function MessChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h2Line1Ref = useRef<HTMLDivElement>(null);
  const h2Line2Ref = useRef<HTMLDivElement>(null);
  const closingLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rowElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const absorbedElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sampleRecordRef = useRef<HTMLDivElement>(null);
  const lockIndicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // PINNED TIMELINE: +=320%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => tweenArtStage("02"),
          onEnterBack: () => tweenArtStage("02"),
        },
      });

      // 0.00 - 0.12: H2 LINE REVEAL
      tl.fromTo(
        [h2Line1Ref.current, h2Line2Ref.current],
        { yPercent: 105 },
        { yPercent: 0, duration: 0.12, stagger: 0.04, ease: "expo.out" },
        0
      );

      // 0.12 - 0.62: 14 fragments fly into ledger rows; 10 duplicates shrink & fade
      const counterObj = { count: 24 };

      // Fly 14 rows into place
      rowElementsRef.current.forEach((row, idx) => {
        if (!row) return;
        const scatter = SEEDED_SCATTER[idx % SEEDED_SCATTER.length];
        const fragSpan = row.querySelector(".frag-text");
        const ruleLine = row.querySelector(".row-rule");

        tl.fromTo(
          fragSpan,
          {
            x: scatter.x,
            y: scatter.y,
            rotation: scatter.r,
            opacity: scatter.o,
            filter: `blur(${scatter.b}px)`,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power3.inOut",
          },
          0.12 + idx * 0.02
        );

        // Rule draws as fragment lands
        tl.fromTo(
          ruleLine,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.15, ease: "power2.out" },
          0.2 + idx * 0.02
        );
      });

      // Fade & shrink the 10 duplicate fragments
      absorbedElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        const scatter = SEEDED_SCATTER[(14 + idx) % SEEDED_SCATTER.length];
        tl.fromTo(
          el,
          {
            x: scatter.x,
            y: scatter.y,
            rotation: scatter.r,
            opacity: scatter.o,
            scale: 1,
          },
          {
            x: "5vw",
            y: "0vh",
            scale: 0.4,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          },
          0.15 + idx * 0.02
        );
      });

      // Counter: 24 to 14
      tl.to(
        counterObj,
        {
          count: 14,
          duration: 0.45,
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counterObj.count)} FRAGMENTS`;
            }
          },
        },
        0.15
      );

      // 0.62 - 0.80: The Collapse into 1 SAMPLE RECORD
      // Rows 6-14 collapse to zero height
      const collapsingRows = rowElementsRef.current.slice(5);
      tl.to(
        collapsingRows,
        {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.18,
          ease: "power2.inOut",
        },
        0.62
      );

      // Rows 1-5 crossfade into the canonical 5-line sample record
      const topRows = rowElementsRef.current.slice(0, 5);
      tl.to(topRows, { opacity: 0, duration: 0.08 }, 0.64);

      tl.fromTo(
        sampleRecordRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
        0.66
      );

      // Counter to 1 RECORD
      tl.to(
        counterObj,
        {
          count: 1,
          duration: 0.15,
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = "1 RECORD";
            }
          },
        },
        0.65
      );

      // Lock square turns signal for 600ms
      tl.to(
        lockIndicatorRef.current,
        {
          backgroundColor: "#FF4F2B",
          borderColor: "#FF4F2B",
          duration: 0.05,
        },
        0.72
      );
      tl.to(
        lockIndicatorRef.current,
        {
          backgroundColor: "#ECE8DF",
          borderColor: "#ECE8DF",
          duration: 0.08,
        },
        0.78
      );

      // 0.80 - 1.00: Closing line line reveal
      tl.fromTo(
        closingLineRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.15, ease: "expo.out" },
        0.82
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="the-mess"
      data-folio="02"
      data-name="THE MESS"
      className="relative w-full min-h-[100svh] py-24 select-none bg-[#0A0A0B]"
    >
      <div className="container-grid h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
          {/* Left: Columns 1-6 */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
                <span className="folio-label">THE MESS</span>
              </div>

              <h2 className="heading-hero max-w-xl mb-12">
                <div className="overflow-hidden pb-[0.12em]">
                  <div ref={h2Line1Ref} className="reveal-line" data-reading>
                    Your data lives in ten places
                  </div>
                </div>
                <div className="overflow-hidden pb-[0.12em]">
                  <div ref={h2Line2Ref} className="reveal-line" data-reading>
                    and agrees in none.
                  </div>
                </div>
              </h2>
            </div>

            {/* Closing Line */}
            <div ref={closingLineRef} className="mt-8 max-w-[34ch]">
              <h3 className="heading-h3 text-[#ECE8DF] leading-snug" style={{ textWrap: "balance" }} data-reading>
                None of this is hard. It is just nobody&apos;s job. We turned it into a product.
              </h3>
            </div>
          </div>

          {/* Right: Columns 8-12 (The Ledger & Flying Fragments) */}
          <div className="lg:col-span-5 lg:col-start-8 relative">
            {/* Header / Counter */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[rgba(236,232,223,0.14)] text-xs font-mono text-[rgba(236,232,223,0.44)]">
              <span ref={counterRef} className="text-[#FF4F2B]">24 FRAGMENTS</span>
              <span>ILLUSTRATION</span>
            </div>

            {/* Floating absorbed duplicates */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {ALL_FRAGMENTS.filter((f) => f.targetRow === -1).map((frag, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    absorbedElementsRef.current[idx] = el;
                  }}
                  className="absolute font-mono text-xs text-[rgba(236,232,223,0.44)] whitespace-nowrap"
                >
                  {frag.text}
                </div>
              ))}
            </div>

            {/* The 14 Rows of Ledger */}
            <div className="relative flex flex-col">
              {ALL_FRAGMENTS.filter((f) => f.targetRow >= 0).map((frag, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    rowElementsRef.current[idx] = el;
                  }}
                  className="h-[44px] flex items-center relative overflow-hidden"
                >
                  {/* Row index 01-14 */}
                  <span className="w-8 font-mono text-xs text-[rgba(236,232,223,0.44)] flex-shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Fragment text flying in */}
                  <span className="frag-text font-mono text-[13px] text-[rgba(236,232,223,0.8)] truncate">
                    {frag.text}
                  </span>

                  {/* Row hairline bottom rule */}
                  <div className="row-rule absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(236,232,223,0.14)]" />
                </div>
              ))}

              {/* Collapsed 5-line SAMPLE RECORD */}
              <div
                ref={sampleRecordRef}
                className="absolute inset-0 bg-[#0A0A0B] p-4 border border-[rgba(236,232,223,0.2)] rounded-[2px] opacity-0 pointer-events-none z-30 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(236,232,223,0.14)]">
                  <div className="flex items-center gap-2">
                    <span
                      ref={lockIndicatorRef}
                      className="w-2 h-2 bg-[#ECE8DF] rounded-[1px] transition-colors"
                    />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#ECE8DF]">
                      SAMPLE RECORD
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[rgba(236,232,223,0.44)]">
                    CANONICAL STATE
                  </span>
                </div>

                <div className="space-y-2 py-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[rgba(236,232,223,0.44)]">CLIENT</span>
                    <span className="text-[#ECE8DF]">Sample Client Pvt. Ltd.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(236,232,223,0.44)]">INSURER</span>
                    <span className="text-[#ECE8DF]">Insurer A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(236,232,223,0.44)]">POLICY</span>
                    <span className="text-[#ECE8DF]">POL-2026-0001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(236,232,223,0.44)]">RENEWAL</span>
                    <span className="text-[#ECE8DF]">14 MAR 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(236,232,223,0.44)]">STATUS</span>
                    <span className="text-[#38E08C]">Active</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(236,232,223,0.08)] text-[10px] font-mono text-[rgba(236,232,223,0.44)]">
                  ONE RECORD · ONE CANONICAL SOURCE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
