"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founders } from "@/content/founders";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

export default function PeopleChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ArtStage track 07 trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => tweenArtStage("07"),
        onEnterBack: () => tweenArtStage("07"),
      });

      // Rule draw animation
      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ruleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-folio="07"
      data-name="PEOPLE"
      className="relative w-full py-28 md:py-36 bg-transparent"
    >
      <div className="container-grid">
        {/* Folio Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">07</span>
          <span className="folio-label">PEOPLE</span>
        </div>

        <h2 className="heading-hero mb-16 text-[#ECE8DF]" data-reading>
          Who&apos;s building it.
        </h2>

        {/* 1px Rule */}
        <div
          ref={ruleRef}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-12 will-change-transform"
        />

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col">
              <h3
                data-skew
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#ECE8DF] mb-2"
                style={{ fontVariationSettings: '"wdth" 82' }}
              >
                {founder.name}
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-4">
                {founder.role}
              </span>
              {founder.bio ? (
                <p className="body-default text-[rgba(236,232,223,0.68)]">
                  {founder.bio}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
