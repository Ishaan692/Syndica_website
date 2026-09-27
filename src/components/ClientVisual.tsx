"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POLICIES = [
  { id: "GL-4401", type: "General Liability", carrier: "Hartford", status: "active", expiry: "Mar 2027", limit: "$2M", prem: "$24,800" },
  { id: "WC-2209", type: "Workers Comp", carrier: "Travelers", status: "active", expiry: "Jan 2027", limit: "$1M", prem: "$18,200" },
  { id: "PL-1187", type: "Professional Liability", carrier: "Chubb", status: "renewal", expiry: "Nov 2026", limit: "$5M", prem: "$42,500" },
  { id: "CP-3320", type: "Commercial Property", carrier: "Zurich", status: "active", expiry: "Jun 2027", limit: "$3M", prem: "$31,000" },
  { id: "CA-5510", type: "Commercial Auto", carrier: "Progressive", status: "active", expiry: "Aug 2027", limit: "$1M", prem: "$12,600" },
];

const CERTIFICATES = [
  { id: "COI-9921", issued: "Today", holder: "GreenBridge Partners", status: "delivered" },
  { id: "COI-9918", issued: "2 days ago", holder: "Lumen Development", status: "delivered" },
  { id: "COI-9915", issued: "5 days ago", holder: "City of Portland", status: "viewed" },
  { id: "COI-9910", issued: "1 week ago", holder: "Atlas Construction", status: "expired" },
];

const TIMELINE_EVENTS = [
  { date: "Today", event: "Certificate COI-9921 issued", icon: "📄" },
  { date: "Yesterday", event: "Policy GL-4401 bound", icon: "✅" },
  { date: "3 days ago", event: "Endorsement request submitted", icon: "📝" },
  { date: "1 week ago", event: "Renewal quote received", icon: "💰" },
];

function CoverageBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-[9px] text-white/40">{percent}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function ClientVisual() {
  const [selectedPolicy, setSelectedPolicy] = useState(0);
  const [activeView, setActiveView] = useState<"policies" | "certificates" | "timeline">("policies");
  const policy = POLICIES[selectedPolicy];

  const [syncTime, setSyncTime] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncTime(Math.floor(Math.random() * 10) + 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden flex flex-col select-none
      border border-brand-terracotta/20 bg-gradient-to-br from-[#14100e] via-[#0d1117] to-[#0f0d14]
      shadow-[0_0_80px_rgba(217,108,91,0.12),inset_0_1px_0_rgba(217,108,91,0.08)]">
      
      {/* Ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-terracotta/6 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-brand-terracotta/4 rounded-full blur-[50px] pointer-events-none" />
      
      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2.5 bg-black/40 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex gap-2 items-center">
          <motion.div 
            animate={{ boxShadow: ["0 0 4px rgba(217,108,91,0.5)", "0 0 12px rgba(217,108,91,0.9)", "0 0 4px rgba(217,108,91,0.5)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-brand-terracotta"
          />
          <span className="font-mono text-brand-terracotta/90 text-[11px] tracking-[0.15em] uppercase font-medium">ClientOS</span>
          <span className="font-mono text-[9px] text-white/15 ml-1">v1.2.0</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
            <div className="w-4 h-4 rounded-full bg-brand-terracotta/20 border border-brand-terracotta/30 flex items-center justify-center">
              <span className="text-[8px] font-bold text-brand-terracotta">A</span>
            </div>
            <span className="font-mono text-[9px] text-white/40">Acme Corp</span>
          </div>
        </div>
      </div>

      {/* Main body */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden bg-black/10">
        
        {/* View Tabs */}
        <div className="flex border-b border-white/[0.06] px-3">
          {(["policies", "certificates", "timeline"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer relative
                ${activeView === tab 
                  ? "text-brand-terracotta" 
                  : "text-white/20 hover:text-white/40"
                }`}
            >
              {tab}
              {activeView === tab && (
                <motion.div layoutId="client-tab-indicator" className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-terracotta shadow-[0_0_8px_rgba(217,108,91,0.5)]" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeView === "policies" ? (
            <motion.div 
              key="policies"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex overflow-hidden"
            >
              {/* Policy list */}
              <div className="w-[38%] border-r border-white/[0.06] p-1.5 space-y-0.5 overflow-y-auto bg-black/20">
                {POLICIES.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelectedPolicy(i)}
                    className={`px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 border relative overflow-hidden group
                      ${selectedPolicy === i 
                        ? "bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/25" 
                        : "text-white/35 hover:bg-white/[0.03] hover:text-white/55 border-transparent"
                      }`}
                  >
                    <p className="font-mono text-[10px] font-medium relative z-10">{p.id}</p>
                    <p className="text-[8px] text-white/20 mt-0.5 truncate relative z-10">{p.type}</p>
                    {selectedPolicy === i && (
                      <motion.div layoutId="client-policy-highlight" className="absolute inset-0 bg-brand-terracotta/[0.06] rounded-lg" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Policy detail */}
              <div className="flex-1 p-3 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPolicy}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[13px] font-semibold text-white">{policy.type}</h3>
                        <p className="font-mono text-[9px] text-white/25 mt-0.5">{policy.id} · {policy.carrier}</p>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border
                        ${policy.status === "active" ? "bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/20" :
                        "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"}`}>
                        {policy.status}
                      </span>
                    </div>

                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Limit", value: policy.limit },
                        { label: "Premium", value: policy.prem },
                        { label: "Expiry", value: policy.expiry },
                      ].map((m, i) => (
                        <motion.div key={m.label}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                          <p className="font-mono text-[7px] text-white/20 uppercase tracking-wider">{m.label}</p>
                          <p className="text-[12px] font-semibold text-white/80 mt-0.5">{m.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Coverage bars */}
                    <div className="p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] space-y-2">
                      <p className="font-mono text-[8px] text-white/25 uppercase tracking-wider mb-1">Coverage Breakdown</p>
                      <CoverageBar label="Bodily Injury" percent={85} color="#d96c5b" />
                      <CoverageBar label="Property Damage" percent={72} color="#e8967f" />
                      <CoverageBar label="Products/Comp Ops" percent={60} color="#f0b8a8" />
                    </div>

                    {/* Live sync */}
                    <div className="p-2.5 rounded-lg border border-brand-terracotta/15 bg-brand-terracotta/[0.04]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shadow-[0_0_6px_rgba(217,108,91,0.8)]"
                        />
                        <span className="font-mono text-[8px] text-brand-terracotta/80 uppercase tracking-wider">Live from Shared Ontology</span>
                      </div>
                      <p className="text-[9px] text-white/30 leading-relaxed">
                        Last broker-side update propagated in {syncTime}ms. This entity is read-only from the client view.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : activeView === "certificates" ? (
            <motion.div 
              key="certificates"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 p-3 space-y-1.5 overflow-y-auto"
            >
              {CERTIFICATES.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-3 border border-white/[0.06] rounded-xl hover:bg-brand-terracotta/[0.04] hover:border-brand-terracotta/15 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-[11px] text-white/60 group-hover:text-brand-terracotta transition-colors">{cert.id}</p>
                      <p className="text-[9px] text-white/25 mt-1">Holder: {cert.holder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-white/15">{cert.issued}</p>
                      <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[7px] font-mono uppercase border
                        ${cert.status === "delivered" ? "bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/20" : 
                        cert.status === "viewed" ? "bg-blue-400/10 text-blue-400 border-blue-400/20" :
                        "bg-red-400/10 text-red-400 border-red-400/20"}`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 p-4 overflow-y-auto"
            >
              <div className="relative pl-6">
                {/* Vertical line */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-[7px] top-1 w-[1px] bg-gradient-to-b from-brand-terracotta/40 to-transparent"
                />
                <div className="space-y-5">
                  {TIMELINE_EVENTS.map((evt, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Dot on timeline */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                        className="absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full bg-[#0d1117] border-2 border-brand-terracotta/40 flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                      </motion.div>
                      <p className="font-mono text-[8px] text-white/20 uppercase tracking-wider mb-0.5">{evt.date}</p>
                      <p className="text-[11px] text-white/60">{evt.icon} {evt.event}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-4 py-1.5 border-t border-white/[0.06] flex justify-between font-mono text-[8px] text-white/20 bg-black/30 backdrop-blur-sm">
        <span>Acme Corp · {POLICIES.length} policies</span>
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-brand-terracotta"
          />
          <span className="text-brand-terracotta/50">Graph: Connected</span>
        </div>
      </div>
    </div>
  );
}
