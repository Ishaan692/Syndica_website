"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white selection:bg-brand-terracotta/30 selection:text-white">
      
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100 mix-blend-screen">
        <ColorBends
          colors={["#2b8284", "#e87a66", "#e6dfd5", "#22c55e"]}
          rotation={30}
          speed={0.6}
          scale={1.5}
          frequency={3.0}
          warpStrength={2.0}
          mouseInfluence={1.5}
          noise={0.15}
          parallax={0.4}
          iterations={4}
          intensity={3.0}
          bandWidth={4}
          transparent={true}
          autoRotate={-2.0}
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-[#0a0a0a]/20 pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-terracotta/70 mb-6">Our Thesis</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
            Insurance broking doesn&rsquo;t have a software problem. <br />
            <span className="text-white/70">It has a workflow problem.</span>
          </h1>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">Scroll to read</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* Chapter 1: The Fragmented Broker Workflow */}
      <VisionChapter
        num="01"
        kicker="The Crisis"
        title="The fragmented broker workflow"
        accentColor="brand-terracotta"
        visual={<FragmentationVisual />}
      >
        <p>
          A broker managing a mid-market client might have policy details in their AMS, client contact info in a CRM, submission documents in email, certificates in a shared drive, and commission data in a spreadsheet. The same information exists in five places and agrees in none.
        </p>
        <p>
          This isn&rsquo;t a technology gap &mdash; it&rsquo;s a structural one. Each tool was built in isolation, for one narrow function. None of them were designed to connect to each other, and none of them model the actual relationships between clients, policies, carriers, and claims.
        </p>
        <p>
          The result: brokers spend more time managing their tools than managing their clients. Renewals get missed. Quotes get lost in inboxes. And critical data lives wherever someone last happened to save it.
        </p>
      </VisionChapter>

      {/* Chapter 2: Why New Tools Keep Making It Worse */}
      <VisionChapter
        num="02"
        kicker="The Pattern"
        title="Why new tools keep making it worse"
        accentColor="white"
        visual={<FailedApproachVisual />}
      >
        <p>
          The insurance industry has adopted a lot of software over the past two decades. CRMs, agency management systems, analytics dashboards, chatbots, portals. Each one promised to fix a specific pain point, and many of them did &mdash; narrowly.
        </p>
        <p>
          But each new tool also created its own data store, its own schema, its own version of the truth. The net effect is that brokerages now have more software than ever and less coherence than ever. Every &ldquo;solution&rdquo; became another silo.
        </p>
        <p>
          The reason is structural: these tools were designed as standalone products, not as parts of a connected system. What&rsquo;s missing isn&rsquo;t another application &mdash; it&rsquo;s software that understands the relationships between the things brokers actually work with.
        </p>
      </VisionChapter>

      {/* Chapter 3: Our Approach */}
      <VisionChapter
        num="03"
        kicker="Our Approach"
        title="Start with the work. Structure it."
        accentColor="brand-teal"
        visual={<OntologyVisual />}
      >
        <p>
          We didn&rsquo;t start by designing a platform. We started by watching brokers work &mdash; the tab-switching, the copy-pasting, the &ldquo;let me check my email for that.&rdquo; We built BrokerOS to fix those specific, daily pain points with structured, connected records.
        </p>
        <p>
          Every client, policy, quote, and claim in BrokerOS is a structured entity with clear relationships. When a broker creates an RFQ, it&rsquo;s connected to the client, the expiring policy, and the carrier submissions. When a policy binds, the commission, documents, and renewal timeline are created automatically.
        </p>
        <p>
          Over time, we believe this structured foundation can grow into something larger &mdash; a shared data layer that connects the broker&rsquo;s workspace with the client&rsquo;s view, and eventually with carriers and other tools in the chain. But we&rsquo;re building from the ground up, proving each layer before moving to the next.
        </p>
      </VisionChapter>

      {/* Closing Statement */}
      <section className="relative z-10 w-full py-32 md:py-48">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-brand-teal/40 via-brand-terracotta/30 to-transparent mb-16" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              We believe the best insurance software will be built on structured, connected data.
            </h2>
            <p className="text-xl leading-relaxed text-white/90 max-w-3xl">
              Syndica is building that software. We&rsquo;re starting with the tools brokers need most &mdash; BrokerOS &mdash; and working outward from there. Not because we have a grand platform thesis to sell, but because we&rsquo;ve seen what happens when broker data is finally structured: workflows get faster, renewals stop getting missed, and clients get better service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Reusable Chapter Layout ───

function VisionChapter({ 
  num, kicker, title, accentColor, visual, children 
}: { 
  num: string; kicker: string; title: string; accentColor: string; visual: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="relative z-10 w-full py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className={`font-mono text-sm text-${accentColor}/60 tracking-widest`}>{num}</span>
            <div className={`h-[1px] w-12 bg-${accentColor}/30`} />
            <span className={`font-mono text-xs uppercase tracking-widest text-${accentColor}/50`}>{kicker}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          {visual}
        </motion.div>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6 text-lg md:text-xl leading-relaxed text-white/90 font-serif"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Visual 1: Data Fragmentation ───
// Shows labeled data fragments floating chaotically, representing the broken status quo

function FragmentationVisual() {
  const FRAGMENTS = [
    { label: "Policy PDF", sys: "Email", x: "8%", y: "15%", rot: -12, w: "w-28" },
    { label: "Client Row", sys: "Spreadsheet", x: "65%", y: "8%", rot: 8, w: "w-26" },
    { label: "Claim Notes", sys: "AMS", x: "38%", y: "55%", rot: -5, w: "w-24" },
    { label: "Submission", sys: "Portal", x: "72%", y: "52%", rot: 15, w: "w-26" },
    { label: "Certificate", sys: "Drive", x: "15%", y: "60%", rot: -20, w: "w-24" },
    { label: "Endorsement", sys: "Fax (!)", x: "50%", y: "25%", rot: 3, w: "w-28" },
  ];

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Red warning lines connecting nothing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="15%" y1="25%" x2="45%" y2="60%" stroke="rgba(239,68,68,0.08)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="70%" y1="15%" x2="40%" y2="55%" stroke="rgba(239,68,68,0.08)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="20%" y1="65%" x2="75%" y2="55%" stroke="rgba(239,68,68,0.06)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      {/* Floating fragments */}
      {FRAGMENTS.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className={`absolute ${f.w} p-2.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg`}
          style={{ left: f.x, top: f.y, rotate: f.rot }}
        >
          <motion.div
            animate={{ y: [0, (i % 2 === 0 ? -4 : 4), 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-white/50 font-medium">{f.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
            </div>
            <span className="font-mono text-[8px] text-white/20 uppercase tracking-wider">{f.sys}</span>
            {/* Fake content lines */}
            <div className="mt-1.5 space-y-1">
              <div className="h-[2px] w-full bg-white/[0.06] rounded" />
              <div className="h-[2px] w-3/4 bg-white/[0.04] rounded" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Caption */}
      <div className="absolute bottom-3 right-4 font-mono text-[9px] text-white/15 uppercase tracking-wider">
        No canonical representation. No graph. No ontology.
      </div>
    </div>
  );
}

// ─── Visual 2: Failed Approaches ───
// Shows the "more software, less coherence" paradox with stacking silos

function FailedApproachVisual() {
  const SILOS = [
    { name: "CRM v1", year: "2008", color: "bg-white/[0.04]" },
    { name: "Portal v2", year: "2012", color: "bg-white/[0.05]" },
    { name: "Analytics", year: "2016", color: "bg-white/[0.06]" },
    { name: "AI Chatbot", year: "2020", color: "bg-white/[0.07]" },
    { name: "New CRM", year: "2023", color: "bg-white/[0.08]" },
  ];

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Stacking silos timeline */}
        <div className="flex-1 p-6 md:p-8">
          <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest mb-4">Each "solution" adds another silo</p>
          <div className="space-y-2">
            {SILOS.map((silo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20, width: "0%" }}
                whileInView={{ opacity: 1, x: 0, width: `${50 + i * 10}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`${silo.color} border border-white/[0.06] rounded-lg p-2.5 flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm bg-white/10" />
                  <span className="text-[11px] text-white/50 font-medium">{silo.name}</span>
                </div>
                <span className="font-mono text-[9px] text-white/20">{silo.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right: Coherence meter going down */}
        <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-white/[0.06] p-6 md:p-8 flex flex-col items-center justify-center">
          <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest mb-4 text-center">Data Coherence</p>
          <div className="relative w-8 h-40 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.06]">
            <motion.div 
              initial={{ height: "80%" }}
              whileInView={{ height: "15%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-red-500/40 to-yellow-400/20 rounded-full"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.5 }}
            className="font-mono text-[10px] text-red-400/50 mt-3 text-center"
          >
            Declining
          </motion.p>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 3: The Ontology ───
// Shows the unified graph with products as views into it

function OntologyVisual() {
  const NODES = [
    { label: "Broker", x: 100, y: 75 },
    { label: "Client", x: 300, y: 75 },
    { label: "Policy", x: 200, y: 150 },
    { label: "Carrier", x: 100, y: 225 },
    { label: "Claim", x: 300, y: 225 },
  ];

  const EDGES = [
    [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [1, 4], [0, 3],
  ];

  const APPS = [
    { label: "BrokerOS", color: "brand-teal", side: "left" },
    { label: "ClientOS", color: "brand-terracotta", side: "right" },
  ];

  return (
    <div className="relative w-full h-80 md:h-96 rounded-2xl border border-brand-teal/15 bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* App labels on sides */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
      >
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-brand-teal/40 to-transparent" />
        <div>
          <p className="font-mono text-[9px] text-brand-teal/60 uppercase tracking-widest">BrokerOS</p>
          <p className="font-mono text-[7px] text-white/20 mt-0.5">View into graph</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
      >
        <div>
          <p className="font-mono text-[9px] text-brand-terracotta/60 uppercase tracking-widest text-right">ClientOS</p>
          <p className="font-mono text-[7px] text-white/20 mt-0.5 text-right">View into graph</p>
        </div>
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-brand-terracotta/40 to-transparent" />
      </motion.div>

      {/* Center label */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-brand-teal/40 uppercase tracking-widest"
      >
        Shared Knowledge Graph
      </motion.div>

      {/* Graph */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
            stroke="rgba(26,91,92,0.2)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
          />
        ))}

        {/* Animated data pulse along first edge */}
        <motion.circle r="3" fill="rgba(26,91,92,0.8)"
          style={{ filter: "drop-shadow(0 0 4px rgba(26,91,92,0.8))" }}
          animate={{ 
            cx: [NODES[0].x, NODES[2].x, NODES[1].x, NODES[4].x, NODES[2].x, NODES[3].x, NODES[0].x],
            cy: [NODES[0].y, NODES[2].y, NODES[1].y, NODES[4].y, NODES[2].y, NODES[3].y, NODES[0].y],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Nodes */}
        {NODES.map((node, i) => (
          <React.Fragment key={i}>
            {/* Glow ring */}
            <motion.circle
              cx={node.x} cy={node.y} r="18"
              fill="rgba(26,91,92,0.03)" stroke="rgba(26,91,92,0.08)" strokeWidth="0.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
            />
            {/* Node dot */}
            <motion.circle
              cx={node.x} cy={node.y} r="6"
              fill="rgba(26,91,92,0.3)" stroke="rgba(26,91,92,0.6)" strokeWidth="1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
            />
            {/* Label */}
            <motion.text
              x={node.x} y={node.y + 26}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              {node.label}
            </motion.text>
          </React.Fragment>
        ))}
      </svg>

      {/* Caption */}
      <div className="absolute bottom-3 right-4 font-mono text-[9px] text-brand-teal/20 uppercase tracking-wider">
        The data layer is the product. Everything else is a view.
      </div>
    </div>
  );
}
