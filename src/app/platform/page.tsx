"use client";

import React, { useState, useEffect, useRef } from "react";
import ThePlates from "@/components/ThePlates";
import StatusMark from "@/components/StatusMark";
import { products, type Product } from "@/content/products";
import { tweenArtStage } from "@/lib/effects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLATFORM_LAYERS = [
  {
    step: 0,
    number: "01",
    name: "STRUCTURE",
    headline: "Record the work.",
    plainMeaning:
      "Software that records work as it happens, in a form a computer can use: clients, policies, quotes, claims, documents. BrokerOS is the workspace for a commercial insurance brokerage. ClientOS is the client-facing counterpart.",
    productSlugs: ["brokeros", "clientos"],
  },
  {
    step: 1,
    number: "02",
    name: "CONNECT",
    headline: "Model the organization and context.",
    plainMeaning:
      "Fabric is research into a shared, permissioned model of how an organization works (sometimes called an organizational digital twin). Vector is research into giving AI models small, current, sourced, permission-safe context.",
    productSlugs: ["fabric", "vector"],
  },
  {
    step: 2,
    number: "03",
    name: "UNDERSTAND",
    headline: "Analyze on top of source records.",
    plainMeaning:
      "Atlas is the planned analysis layer over BrokerOS and ClientOS data. Analysis and recommendations built on records that trace back to a verifiable source.",
    productSlugs: ["atlas"],
  },
];

const FOUNDATIONAL_RULES = [
  {
    statement:
      "Your data stays yours. Each organization's records are scoped to that organization.",
    tag: "IN BROKEROS TODAY",
  },
  {
    statement:
      "Roles decide access. People see and change what their role allows.",
    tag: "IN BROKEROS TODAY",
  },
  {
    statement:
      "People approve what matters. A rule for everything we build, including the research projects.",
    tag: "DESIGN RULE",
  },
];

export default function PlatformPage() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  const activeLayer = PLATFORM_LAYERS[selectedLayerIndex];

  useEffect(() => {
    // Set ArtStage track to "platform"
    tweenArtStage("platform");

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
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
              start: "top 90%",
              once: true,
            },
          }
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
          <span className="folio-label">PLATFORM</span>
        </div>

        <h1 data-skew className="heading-hero mb-6 text-[#ECE8DF]" data-reading>
          How it fits together.
        </h1>

        <p className="body-l text-[rgba(236,232,223,0.78)] max-w-3xl mb-16" data-reading>
          Syndica is one idea built in layers. This page shows what exists today and what is still research.
        </p>

        <div className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-12" />

        {/* Interactive Plates Diagram & Right Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left: The Plates (interactive) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <ThePlates
              activeStep={selectedLayerIndex}
              gap={100}
              interactive={true}
              onSelect={(step) => setSelectedLayerIndex(step)}
            />

            {/* Quick selector buttons below plates */}
            <div className="flex items-center gap-3 mt-6">
              {PLATFORM_LAYERS.map((layer) => (
                <button
                  key={layer.number}
                  type="button"
                  onClick={() => setSelectedLayerIndex(layer.step)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border ${
                    selectedLayerIndex === layer.step
                      ? "border-[#FF4F2B] text-[#FF4F2B] bg-[#111113]"
                      : "border-[rgba(236,232,223,0.14)] text-[rgba(236,232,223,0.68)] hover:border-[#ECE8DF]"
                  }`}
                >
                  {layer.number} {layer.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Layer Spec Sheet / Detail Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#FF4F2B]">
                LAYER {activeLayer.number}
              </span>
              <span className="font-mono text-xs text-[rgba(236,232,223,0.44)] uppercase">
                {activeLayer.name}
              </span>
            </div>

            <h2 className="heading-hero text-3xl sm:text-4xl md:text-5xl mb-6 text-[#ECE8DF]" data-reading>
              {activeLayer.headline}
            </h2>

            <p className="body-l text-[rgba(236,232,223,0.78)] mb-8" data-reading>
              {activeLayer.plainMeaning}
            </p>

            {/* Products attached to this layer */}
            <div className="border-t border-[rgba(236,232,223,0.14)] pt-6">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] block mb-4">
                Products in this layer
              </span>

              <div className="space-y-4">
                {activeLayer.productSlugs.map((slug) => {
                  const product = products.find((p) => p.slug === slug);
                  if (!product) return null;
                  return (
                    <div
                      key={product.slug}
                      className="flex items-center justify-between p-4 bg-[#111113] border border-[rgba(236,232,223,0.08)]"
                    >
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-base font-semibold text-[#ECE8DF]">
                            {product.name}
                          </span>
                          <span className="font-mono text-xs text-[rgba(236,232,223,0.44)]">
                            {product.oneLiner}
                          </span>
                        </div>
                      </div>
                      <StatusMark
                        status={product.status}
                        label={product.statusLabel}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Foundational Rules Section */}
        <div
          ref={ruleRef}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-16 will-change-transform"
        />

        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
            <span className="folio-label">FOUNDATIONS</span>
          </div>

          <h2 className="heading-sub mb-10 text-[#ECE8DF]" data-reading>
            Three rules we don&apos;t change.
          </h2>

          <div className="space-y-8">
            {FOUNDATIONAL_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="pb-8 border-b border-[rgba(236,232,223,0.14)] flex flex-col md:flex-row md:items-baseline md:justify-between gap-4"
              >
                <p className="body-l text-[#ECE8DF] max-w-2xl" data-reading>
                  {rule.statement}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)] shrink-0">
                  {rule.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
