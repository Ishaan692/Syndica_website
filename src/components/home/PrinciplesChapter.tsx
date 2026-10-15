"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: "01",
    title: "Structure before intelligence.",
    body: "Analysis is only as good as the records under it. We fix the records first.",
  },
  {
    num: "02",
    title: "One record, one place.",
    body: "A client, a quote or a policy exists once. Everything else points to it.",
  },
  {
    num: "03",
    title: "People decide.",
    body: "Software prepares the work. A person approves anything that matters.",
  },
  {
    num: "04",
    title: "Say what's built.",
    body: "Every product on this site is labelled live, in development, planned or in research. We change the label when the truth changes.",
  },
];

export default function PrinciplesChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const numeralRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // Pinned Horizontal Track: +=350%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => tweenArtStage("06"),
          onEnterBack: () => tweenArtStage("06"),
        },
      });

      // Track translates 0 to -300vw
      tl.to(
        trackRef.current,
        {
          x: "-300vw",
          ease: "none",
          duration: 1,
        },
        0
      );

      // Bottom 1px progress rule fills
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, ease: "none", duration: 1 },
        0
      );

      // Inner parallax: Numerals move faster (1.25x)
      numeralRefs.current.forEach((numeral) => {
        if (!numeral) return;
        tl.to(
          numeral,
          {
            x: "-60px",
            ease: "none",
            duration: 1,
          },
          0
        );
      });

      // Counter update (01 / 04, 02 / 04, 03 / 04, 04 / 04)
      const counterObj = { step: 1 };
      tl.to(
        counterObj,
        {
          step: 4,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const currentStep = Math.min(4, Math.max(1, Math.round(counterObj.step)));
            if (counterRef.current) {
              counterRef.current.textContent = `0${currentStep} / 04`;
            }
          },
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-folio="06"
      data-name="HOW WE BUILD"
      className="relative w-full overflow-hidden select-none bg-[#0A0A0B]"
    >
      {/* ─── DESKTOP PINNED HORIZONTAL TRACK (400vw width) ─── */}
      <div className="hidden lg:block relative h-[100svh] w-full">
        {/* Track Container */}
        <div
          ref={trackRef}
          className="flex h-full w-[400vw] will-change-transform"
        >
          {PRINCIPLES.map((item, idx) => (
            <div
              key={item.num}
              className="w-[100vw] h-full flex flex-col justify-between px-16 lg:px-24 py-24 border-r border-[rgba(236,232,223,0.06)] relative bg-[#0A0A0B]"
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#ECE8DF]">06</span>
                <span className="folio-label">HOW WE BUILD</span>
              </div>

              {/* Main Panel Content */}
              <div className="grid grid-cols-12 gap-8 items-center my-auto">
                {/* Giant Numeral with inner parallax */}
                <div
                  ref={(el) => {
                    numeralRefs.current[idx] = el;
                  }}
                  className="col-span-3 font-display font-extrabold text-[rgba(236,232,223,0.22)] select-none leading-none -ml-4"
                  style={{
                    fontVariationSettings: '"wdth" 68',
                    fontSize: "220px",
                  }}
                >
                  {item.num}
                </div>

                {/* Statement & Body */}
                <div className="col-span-9 max-w-2xl flex flex-col justify-center">
                  <h3
                    className="heading-hero text-[#ECE8DF] mb-6 leading-tight max-w-xl"
                    data-reading
                  >
                    {item.title}
                  </h3>
                  <p className="body-l text-[rgba(236,232,223,0.78)] max-w-[40ch]" data-reading>
                    {item.body}
                  </p>
                </div>
              </div>

              {/* Footer empty space for alignment */}
              <div className="h-6" />
            </div>
          ))}
        </div>

        {/* Bottom Pinned Progress Rule & Counter */}
        <div className="absolute bottom-10 left-16 right-16 flex items-center justify-between z-30">
          <div className="relative w-48 h-[1px] bg-[rgba(236,232,223,0.14)] overflow-hidden">
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-[#ECE8DF]"
            />
          </div>
          <span ref={counterRef} className="font-mono text-xs text-[#FF4F2B]">
            01 / 04
          </span>
        </div>
      </div>

      {/* ─── MOBILE VERTICAL STACK (under 1024px) ─── */}
      <div className="block lg:hidden container-grid py-16 bg-[#0A0A0B]">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">06</span>
          <span className="folio-label">HOW WE BUILD</span>
        </div>

        <h2 className="heading-hero mb-12 text-[#ECE8DF]">How we build.</h2>

        <div className="flex flex-col divide-y divide-[rgba(236,232,223,0.14)]">
          {PRINCIPLES.map((item) => (
            <div key={item.num} className="py-10 flex flex-col">
              <span className="font-mono text-xs text-[#FF4F2B] mb-2">{item.num}</span>
              <h3 className="heading-sub text-[#ECE8DF] mb-4">{item.title}</h3>
              <p className="body-default">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
