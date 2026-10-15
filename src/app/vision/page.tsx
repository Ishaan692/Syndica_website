"use client";

import React, { useEffect, useRef } from "react";
import StatusMark from "@/components/StatusMark";
import { tweenArtStage, applyWordLight } from "@/lib/effects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATUS_TABLE = [
  {
    name: "BrokerOS",
    slug: "brokeros",
    status: "live" as const,
    label: "LIVE · PILOT IN PROGRESS",
    whatItIs: "The workspace for a commercial insurance brokerage.",
  },
  {
    name: "ClientOS",
    slug: "clientos",
    status: "dev" as const,
    label: "IN DEVELOPMENT",
    whatItIs: "The client's side of the same deal.",
  },
  {
    name: "Atlas",
    slug: "atlas",
    status: "planned" as const,
    label: "PLANNED · 2026",
    whatItIs: "Analysis on top of BrokerOS and ClientOS data.",
  },
  {
    name: "Fabric",
    slug: "fabric",
    status: "research" as const,
    label: "IN RESEARCH",
    whatItIs: "A shared model of how an organization works.",
  },
  {
    name: "Vector",
    slug: "vector",
    status: "research" as const,
    label: "IN RESEARCH",
    whatItIs: "Context for AI models that is current, sourced and permission-safe.",
  },
];

export default function VisionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);
  const tableRuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set ArtStage track to "vision"
    tweenArtStage("vision");

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Word light on pull quote
      if (pullQuoteRef.current) {
        applyWordLight(pullQuoteRef.current);
      }

      // Rule draw on status table
      if (tableRuleRef.current) {
        gsap.fromTo(
          tableRuleRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: tableRuleRef.current,
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
          <span className="folio-label">VISION</span>
        </div>

        <h1 data-skew className="heading-hero mb-16 text-[#ECE8DF]" data-reading>
          Why order is a product.
        </h1>

        <div className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-16" />

        {/* 7-column long-form text (cols 1-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28">
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Paragraph 1 */}
            <p className="body-l text-[rgba(236,232,223,0.85)] leading-relaxed" data-reading>
              Most of what an organization knows is not written down in a form software can use. It sits in email threads, spreadsheets, PDFs and people&apos;s heads. Software that tries to help, AI included, starts from that mess and gets only as good as the mess allows.
            </p>

            {/* Paragraph 2 */}
            <p className="body-l text-[rgba(236,232,223,0.85)] leading-relaxed" data-reading>
              So we start one step earlier. We build the systems where work is recorded properly in the first place. BrokerOS does that for commercial insurance brokerages, because that is where we began and where we can learn from people doing real work.
            </p>

            {/* Pull Statement between P2 and P3 with Word Light */}
            <div className="py-8 my-4 border-y border-[rgba(236,232,223,0.14)]">
              <h2
                ref={pullQuoteRef}
                className="heading-sub text-[#ECE8DF] leading-tight"
                data-reading
              >
                A model is only as good as the records under it.
              </h2>
            </div>

            {/* Paragraph 3 */}
            <p className="body-l text-[rgba(236,232,223,0.85)] leading-relaxed" data-reading>
              Once work is recorded as structured, sourced data, a harder question opens up. Can a model of how an organization works, covering its people and responsibilities, its projects, decisions and dependencies, with permissions and sources attached, make AI assistants better at helping that organization decide and act? Some call this an organizational digital twin. We call it Fabric, and we do not yet know the answer.
            </p>

            {/* Paragraph 4 */}
            <p className="body-l text-[rgba(236,232,223,0.85)] leading-relaxed" data-reading>
              Alongside it, Vector asks a narrower question. Given documents, decisions and tasks that keep changing, what is the smallest set of current, sourced, permitted context a model needs for the task in front of it? We plan to test that against plain retrieval on real project tasks. If it does not beat the simple version, we will say so.
            </p>

            {/* Paragraph 5 */}
            <p className="body-l text-[rgba(236,232,223,0.85)] leading-relaxed" data-reading>
              What we will not do: model employees&apos; personalities, imitate people, or give software access to everything. We model documented responsibilities and work, and people approve anything that matters.
            </p>
          </div>
        </div>

        {/* Status Table Rule */}
        <div
          ref={tableRuleRef}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-16 will-change-transform"
        />

        {/* Five-Row Status Table */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
            <span className="folio-label">HONEST STATUS</span>
          </div>

          <h2 className="heading-sub mb-10 text-[#ECE8DF]" data-reading>
            Say what&apos;s built.
          </h2>

          <div className="divide-y divide-[rgba(236,232,223,0.14)] border-y border-[rgba(236,232,223,0.14)]">
            {STATUS_TABLE.map((row) => (
              <div
                key={row.slug}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-3">
                  <span className="font-display font-semibold text-lg text-[#ECE8DF]">
                    {row.name}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <StatusMark status={row.status} label={row.label} />
                </div>
                <div className="md:col-span-5 body-default text-[rgba(236,232,223,0.78)]" data-reading>
                  {row.whatItIs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
