"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StatusMark from "@/components/StatusMark";
import Button from "@/components/Button";
import { founders } from "@/content/founders";
import { tweenArtStage, applyWordLight } from "@/lib/effects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SYSTEM_METRICS = [
  { label: "FOUNDED", value: "2024 · OPERATING 2026" },
  { label: "HEADQUARTERS", value: "OSLO / LISBON / GLOBAL" },
  { label: "PRIMARY DOMAIN", value: "COMMERCIAL INSURANCE" },
  { label: "ENGINEERING CORE", value: "STRUCTURE BEFORE INTELLIGENCE" },
];

const COMPARISON_ROWS = [
  {
    topic: "Record Lineage",
    chaos: "Copy of Copy of Master_v7(2).xlsx edited by 4 people with conflicting formulas.",
    syndica: "Atomic, immutable ledger records where every quote, policy, and client exists once.",
  },
  {
    topic: "Document Ingestion",
    chaos: "Scanned policy PDFs retyped manually into 3 disparate carrier portals.",
    syndica: "Structured extraction and automatic reconciliation into a single unified deal room.",
  },
  {
    topic: "Version Truth",
    chaos: "Back-and-forth WhatsApp and email threads asking 'who has the latest draft?'.",
    syndica: "Real-time state machines with cryptographic timestamps and auditable change logs.",
  },
  {
    topic: "AI / Automation",
    chaos: "Unbounded chatbots hallucinating financial figures from unverified inbox dumps.",
    syndica: "Deterministic records first; sourced, permission-safe context for verified analysis.",
  },
  {
    topic: "Human Authority",
    chaos: "Accidental silent omissions buried in spreadsheets with zero accountability.",
    syndica: "People decide. Software structures the ledger; operators approve what matters.",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Structure before intelligence.",
    statement:
      "Analysis and automation are only as good as the records under them. You cannot fine-tune models on spreadsheet chaos. We build the clean operational state engine first.",
  },
  {
    number: "02",
    title: "One record, one place.",
    statement:
      "A client, a quote, a policy, or a claim exists in exactly one canonical location. Every team, operator, and external stakeholder interacts with the same ground truth.",
  },
  {
    number: "03",
    title: "People decide.",
    statement:
      "Software prepares, organizes, and accelerates the work. A qualified human professional approves any action of legal, operational, or financial consequence.",
  },
  {
    number: "04",
    title: "Say what's built.",
    statement:
      "We never present research or mockups as production software. Every module across our system is explicitly marked live, in development, planned, or in research.",
  },
];

const TRAJECTORY_STAGES = [
  {
    step: "STAGE 01",
    name: "BrokerOS",
    status: "live" as const,
    label: "LIVE · PILOT IN PROGRESS",
    description:
      "The dedicated operational workspace for commercial insurance brokerages. Manages clients, RFQs, quotes, policies, and commissions in one unified state machine.",
  },
  {
    step: "STAGE 02",
    name: "ClientOS",
    status: "dev" as const,
    label: "IN DEVELOPMENT",
    description:
      "The counterpart portal for commercial policyholders. Gives corporate clients real-time visibility into quotes, policy schedules, and claims status without email friction.",
  },
  {
    step: "STAGE 03",
    name: "Atlas",
    status: "planned" as const,
    label: "PLANNED · 2026",
    description:
      "Automated portfolio intelligence and risk analytics built on top of verified BrokerOS and ClientOS operational records—eliminating guesswork.",
  },
  {
    step: "STAGE 04",
    name: "Fabric & Vector",
    status: "research" as const,
    label: "IN RESEARCH",
    description:
      "Foundational research into organizational digital twins (Fabric) and permission-safe, sourced context infrastructure for enterprise AI reasoning (Vector).",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);
  const ruleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ambient Silk Lighting for About page
    tweenArtStage("about");

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Word light on manifesto pull quote
      if (pullQuoteRef.current) {
        applyWordLight(pullQuoteRef.current);
      }

      // Animate hairline rules on scroll
      ruleRefs.current.forEach((rule) => {
        if (!rule) return;
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rule,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-transparent text-[#ECE8DF] flex flex-col pt-32 pb-36 min-h-[90vh]"
    >
      <div className="container-grid">
        {/* ─── SECTION 01: HERO ─── */}
        <section className="mb-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">01</span>
            <span className="folio-label">ABOUT SYNDICA</span>
          </div>

          <h1
            data-skew
            className="display-xl mb-8 text-[#ECE8DF] max-w-4xl"
          >
            ORDER IS NOT AN ACCIDENT.
            <br />
            IT IS ENGINEERED.
          </h1>

          <p
            className="body-l text-[rgba(236,232,223,0.78)] max-w-3xl mb-14"
            data-reading
          >
            Most work in high-stakes industries—underwriting billions in risk,
            managing complex balance sheets, moving commercial deals—still lives
            in spreadsheets, PDFs, inboxes, and memory. Syndica builds the
            operational software that puts it in order.
          </p>

          {/* System Spec Ledger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-[rgba(236,232,223,0.14)] bg-[#111113] rounded-[2px]">
            {SYSTEM_METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-1">
                  {metric.label}
                </span>
                <span className="font-mono text-[13px] font-semibold text-[#ECE8DF] tracking-wider">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[0] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── PULL QUOTE MANIFESTO ─── */}
        <section className="mb-28 max-w-4xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)] mb-6 block">
            THE THESIS
          </span>
          <h2
            ref={pullQuoteRef}
            className="heading-hero text-3xl sm:text-5xl md:text-6xl text-[#ECE8DF] leading-[1.05]"
          >
            You cannot train intelligence on bad records. Before software can
            reason about work, it must accurately record the work.
          </h2>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[1] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── SECTION 02: THE GROUND TRUTH ─── */}
        <section className="mb-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">02</span>
            <span className="folio-label">THE PROBLEM WE SOLVE</span>
          </div>

          <h2 className="heading-sub mb-6 text-[#ECE8DF]" data-reading>
            The modern enterprise is built on quicksand.
          </h2>
          <p className="body-default text-[rgba(236,232,223,0.68)] max-w-2xl mb-12">
            Companies spend millions on point solutions, yet critical decisions
            still rest on ad-hoc spreadsheets and fragile inboxes. Here is how
            work happens today versus what we build:
          </p>

          {/* Technical Comparative Ledger */}
          <div className="border border-[rgba(236,232,223,0.14)] rounded-[2px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-[#1A1A1D] border-b border-[rgba(236,232,223,0.14)] p-4 font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.6)]">
              <div className="md:col-span-3">Dimension</div>
              <div className="md:col-span-4 text-[rgba(236,232,223,0.44)]">
                Unstructured Reality
              </div>
              <div className="md:col-span-5 text-[#ECE8DF]">
                The Syndica Architecture
              </div>
            </div>

            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.topic}
                className={`grid grid-cols-1 md:grid-cols-12 p-5 gap-3 md:gap-4 text-sm ${
                  idx !== COMPARISON_ROWS.length - 1
                    ? "border-b border-[rgba(236,232,223,0.08)]"
                    : ""
                } hover:bg-[#111113] transition-colors`}
              >
                <div className="md:col-span-3 font-display font-semibold tracking-wider text-[#ECE8DF]">
                  {row.topic}
                </div>
                <div className="md:col-span-4 font-body text-[rgba(236,232,223,0.5)]">
                  {row.chaos}
                </div>
                <div className="md:col-span-5 font-body text-[rgba(236,232,223,0.85)]">
                  {row.syndica}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[2] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── SECTION 03: OPERATING PRINCIPLES ─── */}
        <section className="mb-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">03</span>
            <span className="folio-label">PRINCIPLES</span>
          </div>

          <h2 className="heading-sub mb-14 text-[#ECE8DF]" data-reading>
            Rules we do not compromise on.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="p-8 border border-[rgba(236,232,223,0.14)] bg-[#111113] rounded-[2px] flex flex-col justify-between hover:border-[rgba(236,232,223,0.3)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[#FF4F2B]">
                      // {principle.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(236,232,223,0.3)]">
                      DETERMINISTIC RULE
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#ECE8DF] mb-4">
                    {principle.title}
                  </h3>
                  <p className="body-default text-[rgba(236,232,223,0.68)]">
                    {principle.statement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[3] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── SECTION 04: THE BUILDERS ─── */}
        <section className="mb-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">04</span>
            <span className="folio-label">THE BUILDERS</span>
          </div>

          <h2 className="heading-sub mb-6 text-[#ECE8DF]" data-reading>
            Who is behind Syndica.
          </h2>

          <p className="body-default text-[rgba(236,232,223,0.68)] max-w-2xl mb-14">
            We don&apos;t build from an ivory tower. We spend our weeks alongside
            commercial brokers, risk managers, and operators, mapping workflows
            keystroke by keystroke. We don&apos;t automate until we understand the
            grain of the work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="p-8 border border-[rgba(236,232,223,0.14)] bg-[#111113] rounded-[2px]"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3
                    data-skew
                    className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#ECE8DF]"
                    style={{ fontVariationSettings: '"wdth" 82' }}
                  >
                    {founder.name}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[rgba(236,232,223,0.44)]">
                    {founder.role}
                  </span>
                </div>
                <div className="h-[1px] w-full bg-[rgba(236,232,223,0.08)] my-4" />
                <p className="font-mono text-xs text-[rgba(236,232,223,0.68)] leading-relaxed">
                  Systems architecture, operational state engines, and relentless
                  domain immersion in high-stakes commercial infrastructure.
                </p>
              </div>
            ))}
          </div>

          {/* Engineering Commitment */}
          <div className="p-6 border-l-2 border-[#FF4F2B] bg-[#111113] text-sm font-mono text-[rgba(236,232,223,0.8)]">
            <span className="text-[#ECE8DF] font-semibold block mb-1">
              ENGINEERING COMMITMENT
            </span>
            Every line of software shipped by Syndica is engineered for durability,
            instant response times, and zero tolerance for data corruption.
          </div>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[4] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── SECTION 05: TRAJECTORY & ROADMAP ─── */}
        <section className="mb-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] text-[#ECE8DF]">05</span>
            <span className="folio-label">TRAJECTORY</span>
          </div>

          <h2 className="heading-sub mb-6 text-[#ECE8DF]" data-reading>
            From specialized workspace to systemic order.
          </h2>

          <p className="body-default text-[rgba(236,232,223,0.68)] max-w-2xl mb-12">
            Order starts at the operational edge where the deal is written, then
            scales upward into connected risk analysis and organizational intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAJECTORY_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="p-6 border border-[rgba(236,232,223,0.14)] bg-[#111113] rounded-[2px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] text-[rgba(236,232,223,0.44)]">
                      {stage.step}
                    </span>
                    <StatusMark status={stage.status} label={stage.label} />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#ECE8DF] mb-3">
                    {stage.name}
                  </h3>
                  <p className="body-default text-sm text-[rgba(236,232,223,0.68)]">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1px Rule */}
        <div
          ref={(el) => { ruleRefs.current[5] = el; }}
          className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-28 will-change-transform"
        />

        {/* ─── SECTION 06: INITIATE / CTA ─── */}
        <section className="p-12 border border-[rgba(236,232,223,0.14)] bg-[#111113] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[#ECE8DF]">06</span>
              <span className="folio-label">INITIATE</span>
            </div>
            <h2 className="heading-sub text-3xl font-bold text-[#ECE8DF] mb-2">
              Ready to replace quicksand with structure?
            </h2>
            <p className="body-default text-sm text-[rgba(236,232,223,0.68)]">
              BrokerOS is live today for commercial brokerages. Join our pilot program.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Button href="/contact?interest=brokeros" variant="primary">
              Pilot with us
            </Button>
            <Button href="/platform" variant="secondary">
              Explore the Platform
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
