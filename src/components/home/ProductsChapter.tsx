"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import StatusMark from "@/components/StatusMark";
import { products } from "@/content/products";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tweenArtStage } from "@/lib/effects";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const brokerRowRef = useRef<HTMLDivElement>(null);
  const brokerNameRef = useRef<HTMLHeadingElement>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ArtStage track 05 trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        onEnter: () => tweenArtStage("05"),
        onEnterBack: () => tweenArtStage("05"),
      });

      // SPOTLIGHT LIST: the row nearest viewport center has full opacity, others at 0.32
      rowRefs.current.forEach((row) => {
        if (!row) return;

        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => gsap.to(row, { opacity: 1, duration: 0.3 }),
          onLeave: () => gsap.to(row, { opacity: 0.32, duration: 0.3 }),
          onEnterBack: () => gsap.to(row, { opacity: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(row, { opacity: 0.32, duration: 0.3 }),
        });
      });

      // BrokerOS tightening scrub
      if (brokerRowRef.current && brokerNameRef.current) {
        gsap.fromTo(
          brokerNameRef.current,
          { letterSpacing: "0.04em", scale: 0.94 },
          {
            letterSpacing: "0em",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: brokerRowRef.current,
              start: "top 80%",
              end: "center 50%",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section
      ref={containerRef}
      data-folio="05"
      data-name="PRODUCTS"
      className="relative w-full py-28 md:py-36 select-none bg-[#0A0A0B]"
    >
      <div className="container-grid">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">05</span>
          <span className="folio-label">WHAT WE&apos;RE BUILDING</span>
        </div>

        <h2 className="heading-hero mb-8" data-reading>
          What we&apos;re building.
        </h2>

        {/* Legend of 4 status marks */}
        <div className="pb-8 pt-4 border-b border-[rgba(236,232,223,0.14)] flex flex-wrap gap-8 items-center text-xs font-mono text-[rgba(236,232,223,0.68)]">
          <StatusMark status="live" label="LIVE · PILOT IN PROGRESS" />
          <StatusMark status="dev" label="IN DEVELOPMENT" />
          <StatusMark status="planned" label="PLANNED · 2026" />
          <StatusMark status="research" label="IN RESEARCH" />
        </div>

        {/* 5-row Index List */}
        <div className="divide-y divide-[rgba(236,232,223,0.14)]">
          {products.map((p, idx) => {
            const indexNum = String(idx + 1).padStart(2, "0");
            const isBrokerOS = p.slug === "brokeros";
            const isExpanded = expandedSlug === p.slug;

            return (
              <div
                key={p.slug}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                  if (isBrokerOS) brokerRowRef.current = el;
                }}
                className={`w-full group transition-colors duration-200 hover:bg-[#111113] ${
                  isBrokerOS ? "py-14" : "py-8"
                } px-2 sm:px-4`}
                style={{ opacity: idx === 0 ? 1 : 0.32 }}
              >
                {isBrokerOS ? (
                  <Link href="/products/brokeros" className="block focus-visible:outline-[#FF4F2B]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                      <div className="md:col-span-1 font-mono text-sm text-[rgba(236,232,223,0.44)]">
                        {indexNum}
                      </div>
                      <div className="md:col-span-4">
                        <h3
                          ref={brokerNameRef}
                          className="font-display font-semibold text-[#ECE8DF]"
                          style={{
                            fontSize: "clamp(40px, 6vw, 92px)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.015em",
                          }}
                          data-reading
                        >
                          {p.name}
                        </h3>
                      </div>
                      <div className="md:col-span-4 body-default text-[rgba(236,232,223,0.78)]" data-reading>
                        {p.oneLiner}
                      </div>
                      <div className="md:col-span-3 flex flex-col md:items-end gap-2">
                        <StatusMark status={p.status} label={p.statusLabel} />
                        <span className="font-mono text-xs uppercase text-[#FF4F2B] mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Open BrokerOS &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(p.slug)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleAccordion(p.slug);
                        }
                      }}
                      className="w-full text-left focus-visible:outline-[#FF4F2B]"
                      aria-expanded={isExpanded}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                        <div className="md:col-span-1 font-mono text-sm text-[rgba(236,232,223,0.44)]">
                          {indexNum}
                        </div>
                        <div className="md:col-span-4">
                          <h3
                            className="font-display font-semibold text-[#ECE8DF]"
                            style={{
                              fontSize: "clamp(36px, 5vw, 72px)",
                              lineHeight: 1.0,
                              letterSpacing: "-0.015em",
                            }}
                            data-reading
                          >
                            {p.name}
                          </h3>
                        </div>
                        <div className="md:col-span-4 body-default text-[rgba(236,232,223,0.68)]" data-reading>
                          {p.oneLiner}
                        </div>
                        <div className="md:col-span-3 flex justify-start md:justify-end">
                          <StatusMark status={p.status} label={p.statusLabel} />
                        </div>
                      </div>
                    </button>

                    {/* Accordion Expand State */}
                    {isExpanded && (
                      <div className="pt-6 pb-2 pl-0 md:pl-28 max-w-3xl">
                        <p className="body-l text-[rgba(236,232,223,0.85)] mb-3" data-reading>
                          {p.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
