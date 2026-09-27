"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CLIENTS = [
  { name: "Acme Corp", status: "active", policies: 8, premium: "$1.2M", risk: "Low", score: 94 },
  { name: "Vertex Industries", status: "active", policies: 12, premium: "$3.4M", risk: "Medium", score: 78 },
  { name: "Helios Energy", status: "renewal", policies: 5, premium: "$890K", risk: "Low", score: 88 },
  { name: "NovaTech LLC", status: "active", policies: 3, premium: "$450K", risk: "High", score: 52 },
  { name: "Meridian Capital", status: "pending", policies: 7, premium: "$2.1M", risk: "Medium", score: 71 },
];

const ACTIVITY_LOG = [
  { time: "2s ago", event: "Policy GL-4401 bound", type: "success" },
  { time: "14s ago", event: "Certificate issued → Acme Corp", type: "info" },
  { time: "31s ago", event: "Claim #8892 opened by Helios", type: "warning" },
  { time: "1m ago", event: "Endorsement approved — Vertex", type: "success" },
  { time: "2m ago", event: "Renewal notice sent → NovaTech", type: "info" },
  { time: "4m ago", event: "Submission received — Meridian", type: "success" },
];

function MiniSparkline({ color = "brand-teal" }: { color?: string }) {
  // Use deterministic data points to prevent SSR hydration mismatch errors
  const points = [14.2, 18.5, 12.1, 22.4, 15.6, 26.2, 18.9, 21.3, 28.5, 20.1, 25.8, 29.5];
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * (100 / 11)} ${32 - p}`).join(" ");
  
  return (
    <svg viewBox="0 0 100 32" className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={path + ` L 100 32 L 0 32 Z`}
        fill={`url(#spark-${color})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function RiskGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 100) * circumference * 0.75; // 270 deg arc
  const color = score >= 80 ? "#2dd4bf" : score >= 60 ? "#facc15" : "#f87171";
  
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-[135deg]">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" 
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} strokeLinecap="round" />
        <motion.circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="3" 
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <motion.span 
          className="text-lg font-bold font-mono" style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span className="text-[7px] font-mono text-white/25 uppercase tracking-wider">Score</span>
      </div>
    </div>
  );
}

export default function BrokerVisual() {
  const [selectedClient, setSelectedClient] = useState(0);
  const [activeTab, setActiveTab] = useState<"clients" | "activity">("clients");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const client = CLIENTS[selectedClient];

  // Cycle through a "live typing" latency value
  const [latency, setLatency] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden flex flex-col select-none
      border border-brand-teal/20 bg-gradient-to-br from-[#0c1518] via-[#0d1117] to-[#0a0f14]
      shadow-[0_0_80px_rgba(26,91,92,0.15),inset_0_1px_0_rgba(26,91,92,0.1)]">
      
      {/* Ambient glow spots */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-teal/8 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-brand-teal/5 rounded-full blur-[50px] pointer-events-none" />
      
      {/* Scanline */}
      <motion.div 
        animate={{ y: ["-100%", "400%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-brand-teal/[0.03] to-transparent z-30 pointer-events-none"
      />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2.5 bg-black/40 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex gap-2 items-center">
          <motion.div 
            animate={{ boxShadow: ["0 0 4px rgba(26,91,92,0.6)", "0 0 12px rgba(26,91,92,1)", "0 0 4px rgba(26,91,92,0.6)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-brand-teal"
          />
          <span className="font-mono text-brand-teal/90 text-[11px] tracking-[0.15em] uppercase font-medium">BrokerOS</span>
          <span className="font-mono text-[9px] text-white/15 ml-1">v2.4.1</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="font-mono text-[9px] text-white/20 mr-2">{latency}ms</span>
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06] hover:bg-red-400/30 transition-colors cursor-pointer border border-white/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06] hover:bg-yellow-400/30 transition-colors cursor-pointer border border-white/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.06] hover:bg-green-400/30 transition-colors cursor-pointer border border-white/[0.08]" />
        </div>
      </div>

      {/* Main body */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        
        {/* Left sidebar */}
        <div className="w-[42%] border-r border-white/[0.06] flex flex-col bg-black/20">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            {(["clients", "activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer relative
                  ${activeTab === tab 
                    ? "text-brand-teal" 
                    : "text-white/20 hover:text-white/40"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="broker-tab-indicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-teal shadow-[0_0_8px_rgba(26,91,92,0.6)]" />
                )}
              </button>
            ))}
          </div>
          
          {/* List */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            <AnimatePresence mode="wait">
              {activeTab === "clients" ? (
                <motion.div
                  key="clients"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5"
                >
                  {CLIENTS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelectedClient(i)}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 font-mono text-[11px] flex items-center justify-between group relative overflow-hidden
                        ${selectedClient === i 
                          ? "bg-brand-teal/10 text-brand-teal border border-brand-teal/25" 
                          : "text-white/40 hover:bg-white/[0.04] hover:text-white/60 border border-transparent"
                        }`}
                    >
                      {/* Hover glow */}
                      {hoveredRow === i && selectedClient !== i && (
                        <motion.div 
                          layoutId="broker-hover-glow"
                          className="absolute inset-0 bg-gradient-to-r from-brand-teal/[0.04] to-transparent rounded-lg"
                          transition={{ type: "spring", bounce: 0.15 }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2 truncate">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold flex-shrink-0
                          ${selectedClient === i ? "bg-brand-teal/20 text-brand-teal" : "bg-white/[0.04] text-white/25"}`}>
                          {c.name[0]}
                        </div>
                        <span className="truncate">{c.name}</span>
                      </div>
                      <span className={`relative z-10 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        c.status === "active" ? "bg-brand-teal shadow-[0_0_4px_rgba(26,91,92,0.8)]" :
                        c.status === "renewal" ? "bg-yellow-400 shadow-[0_0_4px_rgba(250,204,21,0.6)]" : "bg-white/20"
                      }`} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5"
                >
                  {ACTIVITY_LOG.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="px-3 py-2 rounded-lg text-[10px] font-mono hover:bg-white/[0.03] transition-all cursor-default group"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          log.type === "success" ? "bg-brand-teal" :
                          log.type === "warning" ? "bg-yellow-400" : "bg-blue-400"
                        }`} />
                        <span className="text-white/20">{log.time}</span>
                      </div>
                      <span className="text-white/50 leading-tight group-hover:text-white/70 transition-colors">{log.event}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedClient}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">{client.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border
                      ${client.status === "active" ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20" :
                      client.status === "renewal" ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20" :
                      "bg-white/5 text-white/40 border-white/10"}`}>
                      {client.status}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border
                      ${client.risk === "Low" ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/20" :
                      client.risk === "Medium" ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20" :
                      "bg-red-400/10 text-red-400 border-red-400/20"}`}>
                      {client.risk}
                    </span>
                  </div>
                </div>
                <RiskGauge score={client.score} />
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-3 hover:bg-white/[0.04] transition-colors">
                  <p className="font-mono text-[8px] text-white/25 uppercase tracking-wider mb-1">Active Policies</p>
                  <p className="text-lg font-bold text-brand-teal">{client.policies}</p>
                </div>
                <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-3 hover:bg-white/[0.04] transition-colors">
                  <p className="font-mono text-[8px] text-white/25 uppercase tracking-wider mb-1">Total Premium</p>
                  <p className="text-lg font-bold text-white/90">{client.premium}</p>
                </div>
              </div>

              {/* Sparkline chart */}
              <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-3 mb-3">
                <p className="font-mono text-[8px] text-white/25 uppercase tracking-wider mb-2">Premium Trend (12mo)</p>
                <div className="text-brand-teal">
                  <MiniSparkline />
                </div>
              </div>

              {/* Ontology node mini-map */}
              <div className="flex-1 border border-white/[0.06] bg-black/30 rounded-xl p-3 overflow-hidden min-h-[50px]">
                <p className="font-mono text-[8px] text-white/25 uppercase tracking-wider mb-2">Relationship Graph</p>
                <div className="relative w-full h-full min-h-[40px]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60">
                    {/* Connection lines */}
                    {[
                      { x1: 100, y1: 30, x2: 25, y2: 12 },
                      { x1: 100, y1: 30, x2: 175, y2: 12 },
                      { x1: 100, y1: 30, x2: 40, y2: 50 },
                      { x1: 100, y1: 30, x2: 160, y2: 50 },
                      { x1: 25, y1: 12, x2: 40, y2: 50 },
                    ].map((line, i) => (
                      <motion.line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                        stroke="rgba(26,91,92,0.2)" strokeWidth="0.8" strokeDasharray="3 3"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }} />
                    ))}
                    {/* Center node pulse */}
                    <motion.circle cx="100" cy="30" r="10" fill="rgba(26,91,92,0.05)" stroke="rgba(26,91,92,0.15)" strokeWidth="0.5"
                      animate={{ r: [10, 14, 10], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
                    {/* Center node */}
                    <circle cx="100" cy="30" r="5" fill="rgba(26,91,92,0.4)" stroke="rgba(26,91,92,0.8)" strokeWidth="1"
                      style={{ filter: "drop-shadow(0 0 4px rgba(26,91,92,0.6))" }} />
                    <text x="100" y="33" textAnchor="middle" fill="rgba(26,91,92,1)" fontSize="4" fontFamily="monospace">●</text>
                    {/* Outer nodes */}
                    {[{ cx: 25, cy: 12 }, { cx: 175, cy: 12 }, { cx: 40, cy: 50 }, { cx: 160, cy: 50 }].map((n, i) => (
                      <motion.circle key={i} cx={n.cx} cy={n.cy} r="3" fill="rgba(26,91,92,0.25)" stroke="rgba(26,91,92,0.4)" strokeWidth="0.5"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.08, type: "spring" }} />
                    ))}
                    {/* Data pulse */}
                    <motion.circle r="1.5" fill="rgba(26,91,92,1)" style={{ filter: "drop-shadow(0 0 3px rgba(26,91,92,1))" }}
                      animate={{ cx: [100, 25, 40, 100], cy: [30, 12, 50, 30] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-4 py-1.5 border-t border-white/[0.06] flex justify-between font-mono text-[8px] text-white/20 bg-black/30 backdrop-blur-sm">
        <span>{CLIENTS.length} entities · {CLIENTS.reduce((a, c) => a + c.policies, 0)} policies</span>
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-brand-teal"
          />
          <span className="text-brand-teal/50">Sync: Live</span>
        </div>
      </div>
    </div>
  );
}
