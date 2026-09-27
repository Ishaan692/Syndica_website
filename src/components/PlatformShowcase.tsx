"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "./FaultyTerminal";

const FEATURES = [
  {
    title: "Structured Records",
    desc: "Every client, policy, and claim in BrokerOS is a structured record with clear relationships — not a duplicated row across disconnected spreadsheets.",
    kicker: "01 // Connected Data",
  },
  {
    title: "Renewal Tracking",
    desc: "Upcoming renewals surface automatically based on policy dates. No more manually checking calendars or hoping someone remembers.",
    kicker: "02 // Never Miss a Renewal",
  },
  {
    title: "Quote Comparison",
    desc: "Carrier quotes come in across email, portals, and PDFs. BrokerOS structures them side by side so brokers can compare coverage and pricing instantly.",
    kicker: "03 // Side-by-Side",
  },
];

export default function PlatformShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const terminalOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.3, 0.3, 0]);

  return (
    <section ref={containerRef} id="platform" className="relative w-full h-[400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row">
        
        {/* Background Terminal */}
        <motion.div style={{ opacity: terminalOpacity }} className="absolute inset-0 z-0">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={0.9}
            timeScale={0.8}
            pause={false}
            scanlineIntensity={0.2}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={0.8}
            chromaticAberration={0}
            dither={0}
            curvature={0.09}
            tint="#22c55e"
            mouseReact={false}
            mouseStrength={0.1}
            pageLoadAnimation={false}
            brightness={1.0}
          />
        </motion.div>
        
        {/* Left: Scroll-driven Text */}
        <div className="relative z-10 w-full md:w-5/12 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="mb-20">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-green-400/60 mb-4">How it works</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              The broker workspace, rebuilt.
            </h2>
          </div>

          <div className="relative h-[200px] md:h-[300px]">
            {FEATURES.map((feature, i) => {
              const start = i * 0.33;
              const end = start + 0.33;

              const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
              const y = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [30, 0, 0, -30]);
              const pointerEvents = useTransform(scrollYProgress, (v) => v >= start && v < end ? "auto" : "none");

              return (
                <motion.div
                  key={i}
                  style={{ opacity, y, pointerEvents: pointerEvents as any }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="text-green-500 font-mono text-xs uppercase tracking-widest mb-4">{feature.kicker}</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Dynamic Visualizations */}
        <div className="relative z-10 w-full md:w-7/12 h-[50vh] md:h-full flex items-center justify-center p-6 md:p-12">
          <div className="relative w-full max-w-2xl aspect-square md:aspect-[4/3] bg-black/50 backdrop-blur-md border border-green-500/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.08)] flex items-center justify-center">
            
            <VisualEntityResolution progress={scrollYProgress} />
            <VisualLivePropagation progress={scrollYProgress} />
            <VisualIntegrationLayer progress={scrollYProgress} />

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VIS 1: Entity Resolution ───
// Shows 3 duplicate records from different systems merging into a single canonical entity

function VisualEntityResolution({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.05, 0.28, 0.33], [0, 1, 1, 0]);
  const mergeProgress = useTransform(progress, [0.08, 0.22], [0, 1]);
  
  // Cards slide inward and fade
  const card1X = useTransform(mergeProgress, [0, 0.6], [-120, 0]);
  const card1Y = useTransform(mergeProgress, [0, 0.6], [-40, 0]);
  const card1Opacity = useTransform(mergeProgress, [0.5, 0.8], [1, 0]);
  
  const card2X = useTransform(mergeProgress, [0, 0.6], [120, 0]);
  const card2Y = useTransform(mergeProgress, [0, 0.6], [-40, 0]);
  const card2Opacity = useTransform(mergeProgress, [0.5, 0.8], [1, 0]);
  
  const card3Y = useTransform(mergeProgress, [0, 0.6], [80, 0]);
  const card3Opacity = useTransform(mergeProgress, [0.5, 0.8], [1, 0]);
  
  // Unified card appears
  const unifiedOpacity = useTransform(mergeProgress, [0.7, 0.9], [0, 1]);
  const unifiedScale = useTransform(mergeProgress, [0.7, 0.9], [0.9, 1]);
  
  // Glow ring
  const ringScale = useTransform(mergeProgress, [0.6, 0.85], [0.3, 1]);
  const ringOpacity = useTransform(mergeProgress, [0.6, 0.75, 0.85], [0, 0.6, 0]);

  const DUPES = [
    { sys: "CRM", name: "Acme Corp", id: "CRM-4421", field: "acme-corp@email.com" },
    { sys: "AMS", name: "ACME Corporation", id: "AMS-881", field: "acme.corp@email.com" },
    { sys: "XLSX", name: "Acme Corp.", id: "ROW-227", field: "acme-corp@email.com" },
  ];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center p-8">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Duplicate cards */}
      {DUPES.map((d, i) => {
        const x = i === 0 ? card1X : i === 1 ? card2X : 0;
        const y = i === 0 ? card1Y : i === 1 ? card2Y : card3Y;
        const op = i === 0 ? card1Opacity : i === 1 ? card2Opacity : card3Opacity;
        
        return (
          <motion.div
            key={i}
            style={{ x: x as any, y: y as any, opacity: op }}
            className="absolute w-44 p-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider">{d.sys}</span>
              <span className="font-mono text-[8px] text-white/15">{d.id}</span>
            </div>
            <p className="text-[12px] text-white/70 font-medium mb-1">{d.name}</p>
            <p className="font-mono text-[9px] text-white/30">{d.field}</p>
            {/* Red "duplicate" indicator */}
            <div className="mt-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
              <span className="font-mono text-[7px] text-red-400/50 uppercase">Unresolved</span>
            </div>
          </motion.div>
        );
      })}

      {/* Merge pulse ring */}
      <motion.div 
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute w-60 h-60 rounded-full border-2 border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      />

      {/* Unified canonical entity */}
      <motion.div 
        style={{ opacity: unifiedOpacity, scale: unifiedScale }}
        className="absolute w-56 p-4 bg-black/80 backdrop-blur-md border border-green-500/40 rounded-xl shadow-[0_0_40px_rgba(34,197,94,0.15)]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] text-green-400/80 uppercase tracking-wider">Canonical Entity</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,1)]" />
            <span className="font-mono text-[7px] text-green-400/60 uppercase">Resolved</span>
          </div>
        </div>
        <p className="text-[14px] text-white font-semibold mb-1">Acme Corp</p>
        <p className="font-mono text-[10px] text-white/40 mb-3">entity:org:acme-corp</p>
        <div className="space-y-1.5">
          {[
            { k: "Type", v: "Organization" },
            { k: "Sources", v: "CRM · AMS · XLSX" },
            { k: "Policies", v: "8 active" },
          ].map((row) => (
            <div key={row.k} className="flex justify-between items-center">
              <span className="font-mono text-[8px] text-white/20 uppercase tracking-wider">{row.k}</span>
              <span className="text-[10px] text-white/60">{row.v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── VIS 2: Live Propagation ───
// Shows a change in BrokerOS propagating in real-time to ClientOS and PlatformAPI

function VisualLivePropagation({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.33, 0.38, 0.61, 0.66], [0, 1, 1, 0]);
  
  // Pulse traveling from source to targets
  const pulseProgress = useTransform(progress, [0.40, 0.58], [0, 1]);
  
  // Source node highlight
  const sourceGlow = useTransform(pulseProgress, [0, 0.15], [0, 1]);
  
  // Pulse positions along the lines
  const pulse1 = useTransform(pulseProgress, [0.15, 0.5], [0, 1]);
  const pulse2 = useTransform(pulseProgress, [0.2, 0.55], [0, 1]);
  const pulse3 = useTransform(pulseProgress, [0.25, 0.6], [0, 1]);
  
  // Target nodes light up
  const target1Glow = useTransform(pulseProgress, [0.45, 0.6], [0, 1]);
  const target2Glow = useTransform(pulseProgress, [0.5, 0.65], [0, 1]);
  const target3Glow = useTransform(pulseProgress, [0.55, 0.7], [0, 1]);

  // Timestamp that appears
  const timestampOpacity = useTransform(pulseProgress, [0.7, 0.85], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center p-6">
      
      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        {/* Lines from source to each target */}
        {[
          { x1: 100, y1: 135, x2: 300, y2: 75 },
          { x1: 100, y1: 135, x2: 300, y2: 195 },
          { x1: 100, y1: 135, x2: 220, y2: 255 },
        ].map((line, i) => (
          <React.Fragment key={i}>
            <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(34,197,94,0.12)" strokeWidth="1" />
            {/* Animated pulse dot traveling along line */}
            <motion.circle
              r="4"
              fill="#22c55e"
              style={{
                cx: useTransform([pulse1, pulse2, pulse3][i], [0, 1], [line.x1, line.x2]),
                cy: useTransform([pulse1, pulse2, pulse3][i], [0, 1], [line.y1, line.y2]),
                opacity: useTransform([pulse1, pulse2, pulse3][i], [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                filter: "drop-shadow(0 0 6px rgba(34,197,94,0.8))",
              }}
            />
          </React.Fragment>
        ))}
      </svg>

      {/* Source node: BrokerOS */}
      <motion.div 
        style={{ 
          boxShadow: useTransform(sourceGlow, (v) => `0 0 ${v * 30}px rgba(34,197,94,${v * 0.4})`)
        }}
        className="absolute left-[15%] top-[35%] w-28 p-2.5 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-xl"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <motion.div 
            style={{ scale: useTransform(sourceGlow, [0, 1], [1, 1.3]) }}
            className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,1)]" 
          />
          <span className="font-mono text-[9px] text-green-400 uppercase tracking-wider">BrokerOS</span>
        </div>
        <div className="mt-1 p-1.5 rounded bg-green-500/10 border border-green-500/20">
          <p className="font-mono text-[8px] text-green-400/70">policy.status</p>
          <p className="font-mono text-[10px] text-white/80 font-medium">→ "bound"</p>
        </div>
      </motion.div>

      {/* Target nodes */}
      {[
        { label: "ClientOS", left: "65%", top: "15%", glow: target1Glow },
        { label: "Platform API", left: "65%", top: "55%", glow: target2Glow },
        { label: "Analytics", left: "45%", top: "75%", glow: target3Glow },
      ].map((node) => (
        <motion.div 
          key={node.label}
          style={{ 
            left: node.left,
            top: node.top,
            borderColor: useTransform(node.glow, [0, 1], ["rgba(255,255,255,0.08)", "rgba(34,197,94,0.4)"]),
            boxShadow: useTransform(node.glow, (v) => `0 0 ${v * 20}px rgba(34,197,94,${v * 0.2})`)
          }}
          className="absolute w-24 p-2 bg-black/70 backdrop-blur-sm border rounded-lg"
        >
          <div className="flex items-center gap-1 mb-1">
            <motion.div 
              style={{ 
                backgroundColor: useTransform(node.glow, [0, 1], ["rgba(255,255,255,0.15)", "rgba(34,197,94,1)"]),
              }}
              className="w-1.5 h-1.5 rounded-full" 
            />
            <span className="font-mono text-[8px] text-white/40 uppercase tracking-wider">{node.label}</span>
          </div>
          <motion.div
            style={{ opacity: node.glow }}
            className="p-1 rounded bg-green-500/10 border border-green-500/15"
          >
            <p className="font-mono text-[7px] text-green-400/60">Received update</p>
          </motion.div>
        </motion.div>
      ))}

      {/* Latency timestamp */}
      <motion.div 
        style={{ opacity: timestampOpacity }}
        className="absolute bottom-6 right-6 font-mono text-[10px] text-green-400/60 flex items-center gap-2"
      >
        <span className="text-green-400/30">Propagation:</span>
        <span className="text-green-400 font-bold">12ms</span>
        <span className="text-green-400/30">across 3 consumers</span>
      </motion.div>
    </motion.div>
  );
}

// ─── VIS 3: Integration Layer ───
// Shows messy legacy data being ingested and structured into the ontology

function VisualIntegrationLayer({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.66, 0.71, 0.95, 1.0], [0, 1, 1, 0]);
  const ingestProgress = useTransform(progress, [0.73, 0.92], [0, 1]);

  // Legacy system cards fade in from top
  const legacyOpacity = useTransform(ingestProgress, [0, 0.15], [0, 1]);
  const legacyY = useTransform(ingestProgress, [0, 0.15], [-20, 0]);

  // Arrow / data flow
  const flowOpacity = useTransform(ingestProgress, [0.15, 0.35], [0, 1]);
  const flowHeight = useTransform(ingestProgress, [0.15, 0.5], ["0%", "100%"]);
  
  // Structured output appears
  const outputOpacity = useTransform(ingestProgress, [0.45, 0.65], [0, 1]);
  const outputY = useTransform(ingestProgress, [0.45, 0.65], [20, 0]);
  
  // Rows fill in one by one  
  const row1 = useTransform(ingestProgress, [0.55, 0.65], [0, 1]);
  const row2 = useTransform(ingestProgress, [0.6, 0.7], [0, 1]);
  const row3 = useTransform(ingestProgress, [0.65, 0.75], [0, 1]);
  const row4 = useTransform(ingestProgress, [0.7, 0.8], [0, 1]);

  const LEGACY = [
    { name: "Applied Epic", type: "AMS", format: "XML" },
    { name: "Salesforce", type: "CRM", format: "API" },
    { name: "Spreadsheets", type: "Manual", format: "CSV" },
  ];

  const ONTOLOGY_ROWS = [
    { entity: "Acme Corp", type: "Organization", source: "Applied + SF" },
    { entity: "GL-4401", type: "Policy", source: "Applied Epic" },
    { entity: "Jane Chen", type: "Contact", source: "Salesforce" },
    { entity: "CLM-892", type: "Claim", source: "CSV Import" },
  ];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-between p-6 md:p-8">
      
      {/* Top: Legacy Systems */}
      <motion.div 
        style={{ opacity: legacyOpacity, y: legacyY }}
        className="w-full flex justify-center gap-3"
      >
        {LEGACY.map((sys) => (
          <div key={sys.name} className="px-3 py-2 bg-black/60 border border-white/10 rounded-lg border-dashed">
            <p className="font-mono text-[10px] text-white/50 font-medium">{sys.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-mono text-[7px] text-white/20 uppercase">{sys.type}</span>
              <span className="text-white/10">·</span>
              <span className="font-mono text-[7px] text-yellow-400/40 uppercase">{sys.format}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Middle: Ingestion Flow */}
      <motion.div 
        style={{ opacity: flowOpacity }}
        className="flex-shrink-0 flex flex-col items-center gap-1 my-2"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/10 to-green-400/40 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-3 bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
          />
        </div>
        <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/25 rounded-lg">
          <p className="font-mono text-[8px] text-green-400/70 uppercase tracking-wider text-center">Syndica Ingestion Engine</p>
        </div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-green-400/40 to-green-400/10 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
            className="w-full h-3 bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
          />
        </div>
      </motion.div>

      {/* Bottom: Structured Ontology Table */}
      <motion.div 
        style={{ opacity: outputOpacity, y: outputY }}
        className="w-full bg-black/60 backdrop-blur-sm border border-green-500/25 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.06)]"
      >
        {/* Table header */}
        <div className="px-4 py-2 border-b border-green-500/15 flex items-center justify-between">
          <span className="font-mono text-[9px] text-green-400/60 uppercase tracking-wider">Structured Knowledge Graph</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_4px_rgba(34,197,94,1)]" />
            <span className="font-mono text-[7px] text-green-400/40">Live</span>
          </div>
        </div>
        
        {/* Column headers */}
        <div className="px-4 py-1.5 border-b border-white/[0.04] flex text-[8px] font-mono text-white/20 uppercase tracking-wider">
          <span className="w-[35%]">Entity</span>
          <span className="w-[30%]">Type</span>
          <span className="w-[35%]">Source</span>
        </div>
        
        {/* Data rows */}
        {ONTOLOGY_ROWS.map((row, i) => {
          const rowOpacity = [row1, row2, row3, row4][i];
          return (
            <motion.div 
              key={i}
              style={{ opacity: rowOpacity }}
              className="px-4 py-2 border-b border-white/[0.03] flex items-center text-[10px] hover:bg-green-500/[0.03] transition-colors"
            >
              <span className="w-[35%] text-white/70 font-medium">{row.entity}</span>
              <span className="w-[30%]">
                <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400/60 font-mono text-[8px]">{row.type}</span>
              </span>
              <span className="w-[35%] font-mono text-[9px] text-white/30">{row.source}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
