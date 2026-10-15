"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

export default function CloseChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ArtStage track 08 trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom bottom",
        onEnter: () => tweenArtStage("08"),
        onEnterBack: () => tweenArtStage("08"),
      });

      // The Dawn: rising spectral horizon light
      if (dawnRef.current) {
        gsap.fromTo(
          dawnRef.current,
          { yPercent: 35, opacity: 0 },
          {
            yPercent: 0,
            opacity: 0.85,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: true,
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
      data-folio="08"
      data-name="CLOSE"
      className="relative w-full pt-28 pb-36 bg-transparent overflow-hidden"
    >
      <div className="container-grid relative z-10">
        {/* Folio Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-[11px] text-[#ECE8DF]">08</span>
          <span className="folio-label">CLOSE</span>
        </div>

        {/* Headline forced on two lines with data-skew */}
        <div className="max-w-4xl mb-8">
          <h2
            data-skew
            className="display-xl -ml-[0.04em] leading-[0.88] text-[#ECE8DF]"
            data-reading
          >
            <span className="block">PILOT</span>
            <span className="block">WITH US.</span>
          </h2>
        </div>

        {/* Safe Reading Zone copy */}
        <div className="max-w-2xl mb-12">
          <p className="body-l text-[rgba(236,232,223,0.78)]" data-reading>
            We&apos;re looking for commercial insurance brokerages to run BrokerOS with, and for people who want to talk about where this goes next.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact?interest=brokeros" variant="primary">
            Request a pilot
          </Button>
          <Button href="/contact" variant="secondary">
            Say hello
          </Button>
        </div>
      </div>

      {/* The Dawn: Rising Spectral Horizon Light */}
      <div
        ref={dawnRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none select-none overflow-hidden z-0 will-change-transform"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, #FF3D2E, #FF9A1F, #F5F03A, #38E08C, #2FB5FF, #6B4DFF, #D83DFF, #FF3D2E)",
            backgroundSize: "200% 100%",
            filter: "blur(64px) saturate(1.4)",
            mixBlendMode: "screen",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
