"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import StatusMark from "@/components/StatusMark";
import Button from "@/components/Button";
import ProductFrame from "@/components/ProductFrame";
import ScreenSkeleton from "@/components/ScreenSkeleton";
import DealFlow from "@/components/DealFlow";
import BrokerDocumentsPaper from "@/components/BrokerDocumentsPaper";
import ThePlates from "@/components/ThePlates";
import { products } from "@/content/products";
import { tweenArtStage } from "@/lib/effects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORKSPACE_FEATURES = [
  {
    name: "Clients",
    desc: "Every client, with their policies and claims attached.",
  },
  {
    name: "Policies",
    desc: "Each policy links back to the RFQ and quote that produced it.",
  },
  {
    name: "Renewals",
    desc: "Built from your policy records, so the list builds itself.",
  },
  {
    name: "Claims",
    desc: "Reported, tracked and linked to the policy they belong to.",
  },
  {
    name: "Commissions",
    desc: "Tracked per policy and kept separate from premium.",
  },
  {
    name: "Insurers",
    desc: "Which insurers write what, and how strong the relationship is. Used to suggest who to approach.",
  },
  {
    name: "Documents",
    desc: "A library of everything uploaded or generated.",
  },
  {
    name: "Deal calendar",
    desc: "RFQ deadlines, quote expiries and renewals on one calendar.",
  },
  {
    name: "Search",
    desc: "One search box across clients, policies, quotes and claims.",
  },
  {
    name: "Export",
    desc: "Take your data out as CSV, or as a full organization export.",
  },
  {
    name: "Team and access",
    desc: "Each organization's data is its own. Employees sign in with codes issued by an admin, and roles decide who can see and change what.",
  },
];

export default function BrokerOSPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);

  const clientOS = products.find((p) => p.slug === "clientos");
  const atlas = products.find((p) => p.slug === "atlas");
  const fabric = products.find((p) => p.slug === "fabric");
  const vector = products.find((p) => p.slug === "vector");

  useEffect(() => {
    // Set ArtStage track to "brokeros"
    tweenArtStage("brokeros");

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero product frame Tilt Up: rotateX 16deg -> 0deg on scroll
      if (heroFrameRef.current) {
        gsap.fromTo(
          heroFrameRef.current,
          { rotateX: 16, transformPerspective: 1200, transformOrigin: "top center" },
          {
            rotateX: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroFrameRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      }

      // Rising dawn at the bottom
      if (dawnRef.current) {
        gsap.fromTo(
          dawnRef.current,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: dawnRef.current,
              start: "top 95%",
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
    <div
      ref={containerRef}
      className="w-full bg-transparent text-[#ECE8DF] flex flex-col"
    >
      {/* ─── SCENE 1: HERO ─── */}
      <section
        data-folio="01"
        data-name="HERO"
        className="relative min-h-[100svh] min-h-[720px] w-full flex flex-col justify-between pt-28 pb-20 overflow-hidden"
      >
        <div className="container-grid w-full my-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Columns 1-6 */}
            <div className="lg:col-span-6 flex flex-col justify-end">
              <div className="mb-6">
                <StatusMark status="live" label="LIVE · PILOT IN PROGRESS" />
              </div>

              <h1
                data-skew
                className="font-display font-bold tracking-tight text-[#ECE8DF] mb-6"
                style={{
                  fontSize: "clamp(56px, 10vw, 150px)",
                  lineHeight: 0.9,
                  fontVariationSettings: '"wdth" 82',
                }}
                data-reading
              >
                BrokerOS
              </h1>

              <div className="max-w-[48ch] mb-8">
                <p className="body-l text-[rgba(236,232,223,0.78)]" data-reading>
                  One workspace for the whole commercial insurance deal: the client, the RFQ, the quotes, the policy, the commission and every document in between.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/contact?interest=brokeros" variant="primary">
                  Request a pilot
                </Button>
                <Button href="#deal-flow" variant="secondary">
                  See the flow
                </Button>
              </div>
            </div>

            {/* Right: Columns 7-12, Tilt Up ProductFrame */}
            <div className="lg:col-span-6 mt-8 lg:mt-0 flex items-center justify-center">
              <div
                ref={heroFrameRef}
                className="w-full max-w-2xl lg:-mr-12 will-change-transform"
              >
                <ProductFrame path="BrokerOS / Deal Pipeline" tag="ILLUSTRATION">
                  <ScreenSkeleton variant="hero" />
                </ProductFrame>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-[rgba(236,232,223,0.08)]">
            <span className="font-mono text-xs text-[rgba(236,232,223,0.44)]">
              Designed from the back-office files and workflows of a working brokerage.
            </span>
          </div>
        </div>
      </section>

      {/* ─── SCENE 2: THE DEAL, ONE FLOW (GSAP PINNED SCRUB) ─── */}
      <div id="deal-flow">
        <DealFlow variant="page" />
      </div>

      {/* ─── SCENE 3: DOCUMENTS (PAPER SECTION) ─── */}
      <BrokerDocumentsPaper />

      {/* ─── SCENE 4: THE REST OF THE WORKSPACE ─── */}
      <section
        data-folio="04"
        data-name="WORKSPACE"
        className="relative w-full py-28 md:py-36 bg-transparent"
      >
        <div className="container-grid">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
            <span className="folio-label">WORKSPACE</span>
          </div>

          <h2 className="heading-hero mb-16 text-[#ECE8DF]" data-reading>
            Everything around the deal.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 divide-y md:divide-y-0 divide-[rgba(236,232,223,0.14)]">
            {WORKSPACE_FEATURES.map((item, idx) => (
              <div
                key={item.name}
                className="py-8 border-b border-[rgba(236,232,223,0.14)] flex flex-col justify-between group hover:border-[#ECE8DF] transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display text-2xl font-semibold text-[#ECE8DF]">
                    {item.name}
                  </h3>
                  <span className="font-mono text-[11px] text-[rgba(236,232,223,0.35)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="body-default text-[rgba(236,232,223,0.68)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCENE 5: PART OF SOMETHING LARGER ─── */}
      <section
        data-folio="05"
        data-name="ECOSYSTEM"
        className="relative w-full py-28 md:py-36 bg-transparent border-t border-[rgba(236,232,223,0.14)]"
      >
        <div className="container-grid">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">05</span>
            <span className="folio-label">PART OF SOMETHING LARGER</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text & Product marks */}
            <div className="lg:col-span-6">
              <h2 className="heading-hero mb-8 text-[#ECE8DF]" data-reading>
                Part of something larger.
              </h2>

              <p className="body-l text-[rgba(236,232,223,0.78)] mb-8" data-reading>
                BrokerOS is the first layer of what we are building. ClientOS gives your clients their side of the same deal. Atlas will analyse the data underneath. Fabric and Vector are research into connecting an organization&apos;s work and context for AI.
              </p>

              <div className="space-y-4 py-4 border-y border-[rgba(236,232,223,0.14)] mb-8">
                <div className="flex items-center justify-between max-w-md py-1">
                  <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                    BrokerOS
                  </span>
                  <StatusMark status="live" label="LIVE · PILOT IN PROGRESS" />
                </div>
                {clientOS && (
                  <div className="flex items-center justify-between max-w-md py-1">
                    <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                      {clientOS.name}
                    </span>
                    <StatusMark status={clientOS.status} label={clientOS.statusLabel} />
                  </div>
                )}
                {atlas && (
                  <div className="flex items-center justify-between max-w-md py-1">
                    <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                      {atlas.name}
                    </span>
                    <StatusMark status={atlas.status} label={atlas.statusLabel} />
                  </div>
                )}
                {fabric && (
                  <div className="flex items-center justify-between max-w-md py-1">
                    <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                      {fabric.name}
                    </span>
                    <StatusMark status={fabric.status} label={fabric.statusLabel} />
                  </div>
                )}
                {vector && (
                  <div className="flex items-center justify-between max-w-md py-1">
                    <span className="font-display text-sm uppercase tracking-wider text-[#ECE8DF]">
                      {vector.name}
                    </span>
                    <StatusMark status={vector.status} label={vector.statusLabel} />
                  </div>
                )}
              </div>

              <div>
                <Link
                  href="/vision"
                  className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.14em] text-[#ECE8DF] hover:text-white underline underline-offset-4 decoration-[rgba(236,232,223,0.3)] hover:decoration-[#FF4F2B] transition-colors"
                >
                  Read the vision &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Compact static exploded plates diagram */}
            <div className="lg:col-span-6 flex justify-center">
              <ThePlates activeStep={0} gap={75} compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCENE 6: PILOT CTA ─── */}
      <section
        data-folio="06"
        data-name="PILOT"
        className="relative w-full pt-28 pb-32 bg-transparent overflow-hidden"
      >
        <div className="container-grid relative z-10">
          <div className="max-w-3xl">
            <h2 className="heading-hero mb-8 text-[#ECE8DF]" data-reading>
              We&apos;re looking for brokerages to pilot with.
            </h2>

            <div className="pt-4">
              <Button href="/contact?interest=brokeros" variant="primary">
                Request a pilot
              </Button>
            </div>
          </div>
        </div>

        {/* Rising Dawn */}
        <div
          ref={dawnRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none select-none overflow-hidden z-0 will-change-transform"
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
                "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>
      </section>
    </div>
  );
}
