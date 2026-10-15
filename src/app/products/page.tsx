"use client";

import React, { useEffect, useRef } from "react";
import ProductIndexList from "@/components/ProductIndexList";
import ThePlates from "@/components/ThePlates";
import { tweenArtStage } from "@/lib/effects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set ArtStage track to "products"
    tweenArtStage("products");

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
        );
      }

      // Rule animation
      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, ease: "power2.inOut", delay: 0.2 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-transparent text-[#ECE8DF] flex flex-col pt-32 pb-36 min-h-[90vh]"
    >
      <div className="container-grid">
        {/* Folio & Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">01</span>
          <span className="folio-label">PRODUCTS</span>
        </div>

        <h1
          ref={titleRef}
          data-skew
          className="heading-hero mb-6 text-[#ECE8DF]"
          data-reading
        >
          What we&apos;re building.
        </h1>

        <p className="body-l text-[rgba(236,232,223,0.78)] max-w-2xl mb-16" data-reading>
          We start where work is least organized. BrokerOS is live. The rest is being built on top of it.
        </p>

        <div
          ref={ruleRef}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-8 will-change-transform"
        />

        {/* Index list with accordion carrying descriptions & 'How it connects' */}
        <div className="mb-28">
          <ProductIndexList showHowItConnects={true} />
        </div>

        <div className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-20" />

        {/* Plates diagram: compact, static, exploded */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="heading-sub mb-4 text-[#ECE8DF]" data-reading>
              Same data, three layers. Only the first is built.
            </h2>
            <p className="body-default text-[rgba(236,232,223,0.78)]" data-reading>
              All intelligence and context models require canonical, structured records underneath. BrokerOS provides that foundation for commercial brokerages.
            </p>
          </div>
          <div className="lg:col-span-7 flex justify-center">
            <ThePlates activeStep={0} gap={75} compact={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
