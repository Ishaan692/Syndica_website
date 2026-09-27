"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrokerVisual() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Cycle through a "live typing" latency value
  const [latency, setLatency] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sidebarGroups = [
    { name: "WORKSPACE", items: ["Dashboard", "Calendar"] },
    { name: "DEALS", items: ["Policies", "RFQs", "Quotes", "Claims", "Renewals"] },
    { name: "FINANCE", items: ["Commissions", "Payments"] },
    { name: "DIRECTORY", items: ["Clients", "Insurers", "Documents"] },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <div className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden flex flex-col select-none
        border border-brand-teal/20 bg-gradient-to-br from-[#0c1518] via-[#0d1117] to-[#0a0f14]
        shadow-[0_0_80px_rgba(26,91,92,0.15),inset_0_1px_0_rgba(26,91,92,0.1)] font-sans">
        
        {/* Ambient glow spots */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-teal/8 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-1/2 -right-12 w-36 h-36 bg-brand-teal/5 rounded-full blur-[50px] pointer-events-none" />
        
        {/* Scanline */}
        <motion.div 
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-brand-teal/[0.03] to-transparent z-30 pointer-events-none"
        />

        {/* Main Container */}
        <div className="relative z-10 flex flex-1 overflow-hidden">
          
          {/* Left Sidebar */}
          <div className="w-48 border-r border-white/[0.06] flex flex-col bg-black/20 shrink-0">
            {/* Logo Header */}
            <div className="h-12 border-b border-white/[0.06] flex items-center px-4 gap-2 shrink-0">
              <div className="w-5 h-5 rounded bg-brand-teal/20 flex items-center justify-center text-brand-teal font-bold font-serif text-[11px]">
                B
              </div>
              <span className="font-semibold text-white/90 text-sm tracking-tight">BrokerOS</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
              {sidebarGroups.map((group) => (
                <div key={group.name} className="mb-4">
                  <div className="px-4 mb-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/30">{group.name}</span>
                  </div>
                  <div className="space-y-0.5 px-2">
                    {group.items.map((item) => {
                      const isActive = activeTab === item;
                      const isClickable = ["Dashboard", "RFQs", "Commissions"].includes(item);
                      return (
                        <div
                          key={item}
                          onClick={() => isClickable && setActiveTab(item)}
                          className={`px-3 py-1.5 rounded-md text-xs transition-colors flex items-center gap-2 relative ${isClickable ? "cursor-pointer" : "cursor-default opacity-40"}
                            ${isActive 
                              ? "bg-brand-teal/10 text-brand-teal font-medium" 
                              : "text-white/60 hover:bg-white/[0.04] hover:text-white/90"}`}
                        >
                          {isActive && (
                            <motion.div layoutId="sidebar-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand-teal rounded-r-full shadow-[0_0_8px_rgba(26,91,92,0.8)]" />
                          )}
                          <span className={`${isActive ? "pl-1" : "pl-1"}`}>{item}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            {/* User Profile */}
            <div className="p-3 border-t border-white/[0.06] flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-terracotta to-brand-teal overflow-hidden flex items-center justify-center shrink-0">
                <span className="text-[9px] text-white font-medium">IV</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-medium text-white/90 truncate">ishaan</span>
                <span className="text-[8px] text-white/40 truncate w-full">ishaan14verma@...</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-black/10 overflow-hidden">
            {/* Top Nav */}
            <div className="h-12 border-b border-white/[0.06] flex items-center px-6 justify-between bg-black/20 shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 w-64">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="text-[10px] text-white/30 font-sans">Search...</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="font-mono text-[9px] text-white/20">{latency}ms</span>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center cursor-pointer hover:bg-white/[0.08]" />
                  <div className="w-5 h-5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center cursor-pointer hover:bg-white/[0.08]" />
                </div>
              </div>
            </div>

            {/* Dynamic Views */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === "Dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 p-6 overflow-y-auto no-scrollbar flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-end shrink-0">
                      <div>
                        <h1 className="text-xl font-bold text-white mb-1">Good afternoon, ishaan</h1>
                        <p className="text-[11px] text-white/50">You have <span className="text-white/90 font-medium">0 pending actions</span> requiring attention today.</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-brand-teal/10 border border-brand-teal/30 rounded-md text-[10px] text-brand-teal font-medium hover:bg-brand-teal/20 transition-colors">+ New Quote</button>
                        <button className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.1] rounded-md text-[10px] text-white/70 hover:bg-white/[0.08] transition-colors">Add Client</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 shrink-0">
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 shadow-sm hover:border-white/[0.1] transition-colors">
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Commission Accrued</p>
                        <p className="text-lg font-mono font-bold text-white">₹35,00,78,078</p>
                        <p className="text-[9px] text-white/40 mt-1">This month</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 shadow-sm hover:border-white/[0.1] transition-colors">
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Premium Collected</p>
                        <p className="text-lg font-mono font-bold text-white">₹0</p>
                        <p className="text-[9px] text-white/40 mt-1">This month</p>
                      </div>
                      <div className="bg-red-500/[0.03] border border-red-500/20 rounded-xl p-4 relative overflow-hidden shadow-sm hover:border-red-500/30 transition-colors">
                        <p className="text-[9px] text-red-400/70 uppercase tracking-wider mb-1">Premium Overdue</p>
                        <p className="text-lg font-mono font-bold text-red-400">₹2,39,580</p>
                        <p className="text-[9px] text-red-400/80 mt-1">Requires action</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex-1 shrink-0 mb-4 hover:border-white/[0.1] transition-colors">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-semibold text-white/80">Active Pipeline</h3>
                        <span className="text-[9px] text-brand-teal hover:text-brand-teal/80 cursor-pointer transition-colors">View Details</span>
                      </div>
                      <div className="relative h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "30%" }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="absolute left-0 top-0 h-full bg-brand-teal shadow-[0_0_8px_rgba(26,91,92,0.8)]" 
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { step: "PROSPECTING", num: 4, pct: "36%" },
                          { step: "QUOTING", num: 0, pct: "0%" },
                          { step: "UNDERWRITING", num: 0, pct: "0%" },
                          { step: "BOUND (LAST 30D)", num: 7, pct: "64%" }
                        ].map((p, i) => (
                          <div key={i}>
                            <p className="text-[8px] font-mono text-white/30 tracking-wider mb-1">{p.step}</p>
                            <p className="text-xl font-bold text-white/90">{p.num}</p>
                            <p className="text-[9px] text-white/40">{p.pct} of pipeline</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "Commissions" && (
                  <motion.div
                    key="commissions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 p-6 overflow-y-auto no-scrollbar flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-end shrink-0">
                      <div>
                        <h1 className="text-xl font-bold text-white mb-1">Commissions</h1>
                        <p className="text-[11px] text-white/50">Track and reconcile broker commissions across all policies.</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.1] rounded-md text-[10px] text-white/70 hover:bg-white/[0.08] transition-colors">Generate Invoice</button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 shrink-0 mt-2">
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Total Accrued</p>
                        <p className="text-lg font-mono font-bold text-white">₹35,00,78,078</p>
                      </div>
                      <div className="bg-white/[0.02] border border-brand-terracotta/20 rounded-xl p-4">
                        <p className="text-[9px] text-brand-terracotta/70 uppercase tracking-wider mb-1">Total Outstanding</p>
                        <p className="text-lg font-mono font-bold text-white">₹32,107.63</p>
                      </div>
                      <div className="bg-white/[0.02] border border-brand-teal/20 rounded-xl p-4">
                        <p className="text-[9px] text-brand-teal/70 uppercase tracking-wider mb-1">Total Received</p>
                        <p className="text-lg font-mono font-bold text-white">₹3,953.07</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-col mt-2 overflow-hidden shrink-0 mb-4">
                      <div className="grid grid-cols-6 border-b border-white/[0.06] p-3 text-[9px] font-mono text-white/30 uppercase tracking-wider bg-black/20">
                        <div className="col-span-2">Client & Policy</div>
                        <div>Premium</div>
                        <div>Comm. Rate</div>
                        <div>Amount</div>
                        <div>Status</div>
                      </div>
                      <div className="flex flex-col">
                        {[
                          { client: "Acme Corp", policy: "GL-4401", premium: "₹2,33,33,33,333", rate: "15.0%", amt: "₹34,99,99,999", status: "Accrued", color: "brand-teal" },
                          { client: "Vertex Ind", policy: "PL-1192", premium: "₹26,353.8", rate: "15.0%", amt: "₹3,953.07", status: "Received", color: "emerald-400" },
                          { client: "Helios Energy", policy: "D&O-883", premium: "₹53,506.2", rate: "15.0%", amt: "₹8,025.93", status: "Invoiced", color: "yellow-400" },
                          { client: "NovaTech LLC", policy: "Cyber-91", premium: "₹53,506.2", rate: "15.0%", amt: "₹8,025.93", status: "Invoiced", color: "yellow-400" },
                        ].map((row, i) => (
                          <div key={i} className="grid grid-cols-6 p-3 border-b border-white/[0.02] hover:bg-white/[0.04] transition-colors items-center text-xs">
                            <div className="col-span-2 flex flex-col gap-0.5">
                              <span className="font-medium text-white/90">{row.client}</span>
                              <span className="text-[9px] text-brand-teal cursor-pointer hover:underline">View Policy {row.policy}</span>
                            </div>
                            <div className="text-white/60 font-mono text-[10px]">{row.premium}</div>
                            <div className="text-white/60 font-mono text-[10px]">{row.rate}</div>
                            <div className="text-white/90 font-mono text-[10px]">{row.amt}</div>
                            <div>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border border-${row.color}/20 text-${row.color} bg-${row.color}/10`}>
                                {row.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "RFQs" && (
                  <motion.div
                    key="rfqs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 p-6 overflow-y-auto no-scrollbar flex flex-col gap-4"
                  >
                     <div className="flex items-center gap-2 mb-2 shrink-0">
                       <span className="text-[10px] font-mono text-white/40 cursor-pointer hover:text-white/60 transition-colors">RFQs</span>
                       <span className="text-[10px] font-mono text-white/20">{">"}</span>
                       <span className="text-[10px] font-mono text-white/80">RFQ-2026-011</span>
                     </div>
                     
                     {/* Deal Stages */}
                     <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-2 shrink-0">
                       <p className="text-[9px] text-white/40 uppercase tracking-wider mb-6 flex items-center gap-2">
                         Deal Stages
                         <span className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center text-[7px]">i</span>
                       </p>
                       <div className="relative flex justify-between items-center px-8">
                         <div className="absolute left-10 right-10 top-1/2 h-[1px] bg-white/[0.06] -translate-y-1/2" />
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "50%" }}
                           transition={{ duration: 1, delay: 0.2 }}
                           className="absolute left-10 top-1/2 h-[1px] bg-brand-teal -translate-y-1/2 shadow-[0_0_8px_rgba(26,91,92,0.8)]" 
                         />
                         
                         {[
                           { step: "RFQ", date: "8/27/2026", done: true },
                           { step: "QCR", date: "Accepted", done: true },
                           { step: "Policy", date: "Not bound", done: false },
                           { step: "Commission", date: "Pending", done: false }
                         ].map((s, i) => (
                           <div key={i} className="relative z-10 flex flex-col items-center gap-2 bg-[#0c1316] px-4 py-1 rounded-md">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${s.done ? "bg-brand-teal border-brand-teal text-black" : "bg-[#0a0f14] border-white/20 text-white/20"}`}>
                               {s.done ? (
                                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                               ) : (
                                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                               )}
                             </div>
                             <div className="flex flex-col items-center">
                               <span className="text-[10px] text-white/80 font-medium">{s.step}</span>
                               <span className="text-[8px] text-white/40">{s.date}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Details */}
                     <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 shrink-0 mb-4">
                       <div className="flex justify-between items-start">
                         <div>
                           <div className="flex items-center gap-3 mb-2">
                             <h2 className="text-xl font-bold text-white">RFQ-2026-011</h2>
                             <span className="px-2 py-0.5 rounded-full text-[8px] bg-white/5 text-white/80 border border-white/10 uppercase tracking-wider flex items-center gap-1.5">
                               <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" /> New
                             </span>
                           </div>
                           <p className="text-[11px] text-white/50">Fire Loss of Profit • Fire</p>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className="text-[10px] text-white/50 hover:text-white/80 cursor-pointer transition-colors">View QCR →</span>
                           <div className="flex gap-1">
                             {[1,2,3].map(i => <div key={i} className="w-7 h-7 rounded border border-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.04] hover:text-white/80 cursor-pointer transition-colors">●</div>)}
                           </div>
                           <button className="px-4 py-2 border border-white/[0.1] rounded-md text-[10px] text-white/70 hover:bg-white/[0.05] transition-colors ml-2">Mark Not Materialized</button>
                           <button className="px-4 py-2 bg-brand-teal/90 rounded-md text-[10px] text-black font-semibold hover:bg-brand-teal transition-colors">+ Add Carrier Quote</button>
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.06]">
                         <div>
                           <p className="text-[8px] font-mono text-white/30 tracking-wider mb-1.5">PRODUCT / COVERAGE</p>
                           <p className="text-xs text-white/90 font-medium">Fire Loss of Profit</p>
                         </div>
                         <div>
                           <p className="text-[8px] font-mono text-white/30 tracking-wider mb-1.5">DATE RECEIVED</p>
                           <p className="text-xs text-white/90 font-medium">Aug 27, 2026</p>
                         </div>
                         <div>
                           <p className="text-[8px] font-mono text-white/30 tracking-wider mb-1.5">ASSIGNED BROKER</p>
                           <p className="text-xs text-white/90 font-medium">David Kim</p>
                         </div>
                       </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
